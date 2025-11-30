import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'jsr:@supabase/supabase-js@2';

Deno.serve(async (req: Request) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    });
  }

  try {
    // Only allow POST method (creates support request)
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed. Use POST.' }),
        { status: 405, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Verify JWT and extract user - identity from JWT ONLY
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized - Missing authorization header' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Verify JWT and extract user_id from token
    const { data: { user: authUser }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !authUser) {
      return new Response(
        JSON.stringify({ error: 'Invalid or expired token' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const jwtUserId = authUser.id;

    // Get user profile - filter by auth_user_id from JWT
    // Include gender, age, city for support dashboard
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, full_name, phone, company_id, plan_id, gender, age, city')
      .eq('auth_user_id', jwtUserId)
      .single();

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'User not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get company info
    const { data: company } = await supabase
      .from('companies')
      .select('name, country')
      .eq('id', user.company_id)
      .single();

    // Get plan info
    const { data: plan } = await supabase
      .from('plans')
      .select('coverage_text')
      .eq('id', user.plan_id)
      .single();

    // Check if user has phone number (required for support)
    if (!user.phone) {
      return new Response(
        JSON.stringify({ error: 'Phone number not found. Please ensure your account is activated.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get chat summary for context
    const { data: summary } = await supabase
      .from('chat_summaries')
      .select('summary_text')
      .eq('user_id', user.id)
      .single();

    // Get recent messages for problem context (last 10 messages)
    const { data: recentMessages } = await supabase
      .from('chat_messages')
      .select('role, content, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(10);

    // Store support request in Supabase database
    // Include all customer info for support dashboard
    const { data: supportRequest, error: insertError } = await supabase
      .from('support_requests')
      .insert({
        user_id: user.id,
        user_phone: user.phone,
        user_name: user.full_name,
        gender: user.gender || null,
        age: user.age || null,
        city: user.city || null,
        company_name: company?.name || 'Unknown',
        company_country: company?.country || 'Unknown',
        plan_coverage_summary: plan?.coverage_text?.substring(0, 500) || 'No plan details available',
        chat_summary: summary?.summary_text || '',
        recent_messages: recentMessages?.reverse() || [], // Reverse to show chronological order
        status: 'pending',
        current_status: 'pending',
        last_activity_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (insertError) {
      console.error('Failed to create support request:', insertError);
      return new Response(
        JSON.stringify({ error: 'Failed to create support request', details: insertError.message }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Return user's phone number for frontend to display
    return new Response(
      JSON.stringify({ 
        phone: user.phone,
        message: 'Support request submitted. We will call you shortly.'
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Internal server error', message: error.message }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
});
