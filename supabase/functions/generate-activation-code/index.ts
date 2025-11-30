import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'jsr:@supabase/supabase-js@2';

const ALLOWED_CHARS = 'ABCDEFGHJKMNPRTUVWXY2346789';

function generateActivationCode(): string {
  let code = '';
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * ALLOWED_CHARS.length);
    code += ALLOWED_CHARS[randomIndex];
  }
  return code;
}

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
    // Verify caller authorization - NOT publicly callable
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized - Missing authorization header' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Extract service role key from header
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!serviceRoleKey) {
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Verify the request uses service role key
    const providedKey = authHeader.replace('Bearer ', '');
    if (providedKey !== serviceRoleKey) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized - Invalid service role key' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const { company_id, full_name, plan_id, count = 1 } = await req.json();

    if (!company_id || !full_name) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: company_id, full_name' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Global plan ID - all companies use the same plan
    const GLOBAL_PLAN_ID = '00000000-0000-0000-0000-000000000001';
    const finalPlanId = plan_id || GLOBAL_PLAN_ID;

    const codes: string[] = [];
    const users: Array<{
      company_id: string;
      plan_id: string;
      full_name: string;
      activation_code_hash: string;
      activation_code_created_at: string;
    }> = [];

    // Generate codes
    for (let i = 0; i < count; i++) {
      const code = generateActivationCode();
      const hash = await hashActivationCode(code);
      codes.push(code);
      
      users.push({
        company_id,
        plan_id: finalPlanId,
        full_name,
        activation_code_hash: hash,
        activation_code_created_at: new Date().toISOString(),
      });
    }

    // Insert users into database
    const { error } = await supabase
      .from('users')
      .insert(users);

    if (error) {
      return new Response(
        JSON.stringify({ error: 'Failed to create users', details: error.message }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ 
        codes: codes.length === 1 ? codes[0] : codes,
        count: codes.length 
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
