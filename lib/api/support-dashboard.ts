import { supabase } from '../supabase';

export interface SupportRequest {
  id: string;
  user_id: string;
  user_phone: string;
  user_name: string;
  gender?: string;
  age?: number;
  city?: string;
  company_name: string;
  company_country: string;
  status: string;
  current_status: string;
  status_message?: string;
  assigned_to?: string;
  internal_notes?: string;
  customer_notes?: string;
  requested_at: string;
  last_activity_at: string;
}

export interface ChatHistory {
  user_id: string;
  messages: Array<{
    id: string;
    role: 'user' | 'ai';
    content: string;
    created_at: string;
  }>;
  summary?: string;
  total_messages: number;
}

const getServiceRoleKey = () => {
  // This should only be called server-side
  return process.env.SUPABASE_SERVICE_ROLE_KEY;
};

export async function getSupportRequests(): Promise<SupportRequest[]> {
  const serviceRoleKey = getServiceRoleKey();
  if (!serviceRoleKey) {
    throw new Error('Service role key not configured');
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/support_requests?select=*&order=requested_at.desc`, {
    headers: {
      'Authorization': `Bearer ${serviceRoleKey}`,
      'apikey': serviceRoleKey,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch support requests');
  }

  return response.json();
}

export async function getSupportRequest(requestId: string): Promise<SupportRequest> {
  const serviceRoleKey = getServiceRoleKey();
  if (!serviceRoleKey) {
    throw new Error('Service role key not configured');
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/support_requests?id=eq.${requestId}&select=*`, {
    headers: {
      'Authorization': `Bearer ${serviceRoleKey}`,
      'apikey': serviceRoleKey,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch support request');
  }

  const data = await response.json();
  return data[0];
}

export async function getUserChatHistory(userId: string): Promise<ChatHistory> {
  const serviceRoleKey = getServiceRoleKey();
  if (!serviceRoleKey) {
    throw new Error('Service role key not configured');
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/get-user-chat-history?user_id=${userId}`, {
    headers: {
      'Authorization': `Bearer ${serviceRoleKey}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch chat history');
  }

  return response.json();
}

export async function updateSupportRequestStatus(
  requestId: string,
  current_status: string,
  status_message?: string,
  agent_name?: string
) {
  const serviceRoleKey = getServiceRoleKey();
  if (!serviceRoleKey) {
    throw new Error('Service role key not configured');
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/update-support-status`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${serviceRoleKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      request_id: requestId,
      current_status,
      status_message,
      agent_name,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update status');
  }

  return response.json();
}

export async function updateSupportRequestNotes(
  requestId: string,
  internal_notes?: string,
  customer_notes?: string
) {
  const serviceRoleKey = getServiceRoleKey();
  if (!serviceRoleKey) {
    throw new Error('Service role key not configured');
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/update-support-status`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${serviceRoleKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      request_id: requestId,
      internal_notes,
      customer_notes,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update notes');
  }

  return response.json();
}

export async function assignSupportRequest(
  requestId: string,
  assigned_to: string
) {
  const serviceRoleKey = getServiceRoleKey();
  if (!serviceRoleKey) {
    throw new Error('Service role key not configured');
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/update-support-status`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${serviceRoleKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      request_id: requestId,
      assigned_to,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to assign request');
  }

  return response.json();
}
