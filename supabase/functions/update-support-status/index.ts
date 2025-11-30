import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'jsr:@supabase/supabase-js@2';

Deno.serve(async (req: Request) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    });
  }

  try {
    // Only allow POST/PATCH methods
    if (req.method !== 'POST' && req.method !== 'PATCH') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed. Use POST or PATCH.' }),
        { status: 405, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Verify service role key (admin only)
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized - Missing authorization header' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    // Verify service role key
    const token = authHeader.replace('Bearer ', '');
    if (token !== serviceRoleKey) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized - Invalid service role key' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);
    const body = await req.json();

    const { request_id, current_status, status_message, agent_name, internal_notes, customer_notes, assigned_to } = body;

    if (!request_id) {
      return new Response(
        JSON.stringify({ error: 'Missing required field: request_id' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Update status using database function (includes history tracking)
    if (current_status) {
      const { error: statusError } = await supabase.rpc('update_support_request_status', {
        request_id,
        new_status: current_status,
        new_status_message: status_message || null,
        agent_name: agent_name || null,
      });

      if (statusError) {
        console.error('Failed to update status:', statusError);
        return new Response(
          JSON.stringify({ error: 'Failed to update status', details: statusError.message }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    // Update notes if provided
    const updateData: any = {
      last_activity_at: new Date().toISOString(),
    };

    if (internal_notes !== undefined) {
      updateData.internal_notes = internal_notes;
    }

    if (customer_notes !== undefined) {
      updateData.customer_notes = customer_notes;
    }

    if (assigned_to !== undefined) {
      updateData.assigned_to = assigned_to;
    }

    // Update main status field if current_status was provided
    if (current_status) {
      // Map current_status to main status field
      if (['resolved'].includes(current_status)) {
        updateData.status = 'resolved';
        updateData.resolved_at = new Date().toISOString();
      } else if (['cancelled'].includes(current_status)) {
        updateData.status = 'cancelled';
      } else {
        updateData.status = 'in_progress';
      }
    }

    // Apply updates
    if (Object.keys(updateData).length > 1) { // More than just last_activity_at
      const { error: updateError } = await supabase
        .from('support_requests')
        .update(updateData)
        .eq('id', request_id);

      if (updateError) {
        console.error('Failed to update support request:', updateError);
        return new Response(
          JSON.stringify({ error: 'Failed to update support request', details: updateError.message }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Support request updated successfully' }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (error: any) {
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
