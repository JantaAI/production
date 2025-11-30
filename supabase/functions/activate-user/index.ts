import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'jsr:@supabase/supabase-js@2';

async function hashActivationCode(code: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(code);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

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
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const { activation_code, phone, password, gender, age, city } = await req.json();

    if (!activation_code || !phone || !password) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: activation_code, phone, password' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Hash the provided code
    const codeHash = await hashActivationCode(activation_code);

    // Find user with matching hash where activated_at IS NULL
    const { data: user, error: findError } = await supabase
      .from('users')
      .select('*')
      .eq('activation_code_hash', codeHash)
      .is('activated_at', null)
      .single();

    if (findError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid activation code' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check code age (reject if > 30 days old via activation_code_created_at)
    if (user.activation_code_created_at) {
      const codeCreatedAt = new Date(user.activation_code_created_at);
      const now = new Date();
      const daysDiff = (now.getTime() - codeCreatedAt.getTime()) / (1000 * 60 * 60 * 24);
      
      if (daysDiff > 30) {
        return new Response(
          JSON.stringify({ error: 'Activation code has expired (30 days)' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    // Phone uniqueness is enforced by partial unique index (automatic)
    // Create Supabase Auth user with phone + password
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      phone: phone,
      password: password,
      email_confirm: true,
    });

    if (authError || !authUser.user) {
      return new Response(
        JSON.stringify({ error: 'Failed to create auth user', details: authError?.message }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Update user: set auth_user_id, phone, activated_at, profile info, clear activation_code_hash and activation_code_created_at
    const { error: updateError } = await supabase
      .from('users')
      .update({
        auth_user_id: authUser.user.id,
        phone: phone,
        activated_at: new Date().toISOString(),
        activation_code_hash: null,
        activation_code_created_at: null,
        // Profile information (optional but recommended)
        gender: gender || null,
        age: age || null,
        city: city || null,
      })
      .eq('id', user.id);

    if (updateError) {
      // If update fails, try to delete the auth user we just created
      await supabase.auth.admin.deleteUser(authUser.user.id);
      return new Response(
        JSON.stringify({ error: 'Failed to activate user', details: updateError.message }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create a session for the new user
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      phone: phone,
      password: password,
    });

    if (signInError || !signInData.session) {
      return new Response(
        JSON.stringify({ 
          error: 'User activated but failed to create session',
          user_id: authUser.user.id 
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ 
        session: signInData.session,
        user: signInData.user 
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
