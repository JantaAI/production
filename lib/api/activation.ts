import { supabase } from '../supabase';

export interface GenerateActivationCodeRequest {
  company_id: string;
  full_name: string;
  plan_id?: string;
  count?: number;
}

export interface ActivateUserRequest {
  activation_code: string;
  phone: string;
  password: string;
  gender?: string;
  age?: number;
  city?: string;
}

export async function generateActivationCode(request: GenerateActivationCodeRequest) {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) {
    throw new Error('Service role key not configured');
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/generate-activation-code`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${serviceRoleKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to generate activation code');
  }

  return response.json();
}

export async function activateUser(request: ActivateUserRequest) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/activate-user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to activate user');
  }

  const data = await response.json();
  
  // Set session in Supabase client
  if (data.session) {
    await supabase.auth.setSession(data.session);
  }

  return data;
}
