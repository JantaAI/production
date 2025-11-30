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
    // Extract user identity from JWT ONLY - NEVER from request body
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized - Missing authorization header' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    
    if (!openaiApiKey) {
      return new Response(
        JSON.stringify({ error: 'OpenAI API key not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

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

    const { message } = await req.json();
    if (!message) {
      return new Response(
        JSON.stringify({ error: 'Missing message field' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Load user profile - filter by auth_user_id from JWT
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('auth_user_id', jwtUserId)
      .single();

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'User not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Store user message in chat_messages - filter by auth_user_id from JWT
    const { error: messageError } = await supabase
      .from('chat_messages')
      .insert({
        user_id: user.id,
        role: 'user',
        content: message,
      });

    if (messageError) {
      return new Response(
        JSON.stringify({ error: 'Failed to store message', details: messageError.message }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Load context - ALL filtered by auth_user_id from JWT
    // Company - filter by auth_user_id from JWT
    const { data: company, error: companyError } = await supabase
      .from('companies')
      .select('*')
      .eq('id', user.company_id)
      .single();

    if (companyError || !company) {
      return new Response(
        JSON.stringify({ error: 'Company not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Plan - get global plan (all companies share the same plan)
    // Use the user's plan_id (which should always be the global plan)
    const { data: plan, error: planError } = await supabase
      .from('plans')
      .select('*')
      .eq('id', user.plan_id)
      .single();

    // Summary - filter by auth_user_id from JWT
    const { data: summary } = await supabase
      .from('chat_summaries')
      .select('*')
      .eq('user_id', user.id)
      .single();

    // Last 20 messages - filter by auth_user_id from JWT
    const { data: messages } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(20);

    // Build context for AI
    let context = `User: ${user.full_name}\nCompany: ${company.name} (${company.country})\n`;

    // If plan data is missing or NULL, AI MUST explicitly refuse policy interpretation
    if (!plan || planError) {
      const aiResponse = "I apologize, but I cannot access your policy data at this time. Please contact support for assistance with policy-related questions.";
      
      // Store AI response
      await supabase
        .from('chat_messages')
        .insert({
          user_id: user.id,
          role: 'ai',
          content: aiResponse,
        });

      return new Response(
        JSON.stringify({ 
          response: aiResponse,
          error: 'Plan data unavailable'
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    // Build comprehensive system prompt using plan's ai_behavior_rules
    const aiRules = plan.coverage_json?.ai_behavior_rules || {};
    const complianceFlags = plan.coverage_json?.compliance_flags || {};
    const coveragePhilosophy = plan.coverage_json?.coverage_philosophy?.principle || '';
    
    let systemPrompt = `You are a helpful and accurate insurance assistant for ${company.name}. Your role is to answer questions about the insurance plan based ONLY on the provided policy information.

CRITICAL RULES (from plan):
${aiRules.must_reference_policy_data ? '✓ You MUST reference the policy data when answering questions.' : ''}
${aiRules.must_never_invent_coverage ? '✓ You MUST NEVER invent or assume coverage that is not explicitly stated in the plan.' : ''}
${aiRules.must_refuse_if_policy_missing ? '✓ If policy information is missing or unclear, you MUST explicitly refuse to answer and direct the user to contact support.' : ''}
${aiRules.escalate_if_uncertain ? '✓ If you are uncertain about coverage, escalate to human support rather than guessing.' : ''}

COVERAGE PHILOSOPHY:
${coveragePhilosophy || 'Coverage is determined by the plan details provided.'}

COMPLIANCE NOTES:
${complianceFlags.not_a_legal_plan ? '⚠️ This is NOT a legal plan document - it is for AI reference only.' : ''}
${complianceFlags.ai_reference_only ? '⚠️ This information is for AI system reference only.' : ''}

RESPONSE GUIDELINES:
- Answer questions clearly and concisely
- Always cite specific plan sections when possible
- If asked about coverage not in the plan, state it is not covered or refer to exclusions
- For cost questions, reference the cost_model section
- For eligibility questions, reference the eligibility section
- If the question is ambiguous or you're uncertain, recommend contacting support
- Be helpful but never make up information`;

    context += `Plan Coverage (JSON): ${JSON.stringify(plan.coverage_json)}\n`;
    context += `Plan Coverage (Text): ${plan.coverage_text}\n`;

    if (summary) {
      context += `Previous Conversation Summary: ${summary.summary_text}\n`;
    }

    context += `\nRecent Messages:\n`;
    if (messages && messages.length > 0) {
      messages.reverse().forEach((msg: any) => {
        context += `${msg.role === 'user' ? 'User' : 'AI'}: ${msg.content}\n`;
      });
    }

    context += `\nUser: ${message}\nAI:`;

    // Call OpenAI API
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: context,
          },
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.json();
      return new Response(
        JSON.stringify({ error: 'OpenAI API error', details: errorData }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const openaiData = await openaiResponse.json();
    const aiResponse = openaiData.choices[0]?.message?.content || 'I apologize, but I could not generate a response.';

    // Store AI response - filter by auth_user_id from JWT
    await supabase
      .from('chat_messages')
      .insert({
        user_id: user.id,
        role: 'ai',
        content: aiResponse,
      });

    // UPSERT chat_summaries with new summary (ON CONFLICT DO UPDATE)
    const newSummary = `User ${user.full_name} from ${company.name} asked about: ${message.substring(0, 100)}...`;
    
    await supabase
      .from('chat_summaries')
      .upsert({
        user_id: user.id,
        summary_text: newSummary,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id',
      });

    return new Response(
      JSON.stringify({ response: aiResponse }),
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
