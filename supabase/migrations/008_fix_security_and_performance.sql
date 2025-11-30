-- Fix security and performance issues found in audit

-- ============================================
-- SECURITY FIXES
-- ============================================

-- Fix 1: Set search_path for update_support_request_activity function
CREATE OR REPLACE FUNCTION update_support_request_activity()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  NEW.last_activity_at = NOW();
  RETURN NEW;
END;
$$;

-- Fix 2: Set search_path for update_support_request_status function
CREATE OR REPLACE FUNCTION update_support_request_status(
  request_id UUID,
  new_status TEXT,
  new_status_message TEXT DEFAULT NULL,
  agent_name TEXT DEFAULT NULL
)
RETURNS void 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  old_status TEXT;
BEGIN
  -- Get current status
  SELECT current_status INTO old_status
  FROM public.support_requests
  WHERE id = request_id;
  
  -- Update status
  UPDATE public.support_requests
  SET 
    current_status = new_status,
    status_message = COALESCE(new_status_message, status_message),
    status_updated_at = NOW(),
    last_activity_at = NOW(),
    assigned_to = COALESCE(agent_name, assigned_to),
    status_history = status_history || jsonb_build_object(
      'status', new_status,
      'message', COALESCE(new_status_message, ''),
      'timestamp', NOW(),
      'agent', COALESCE(agent_name, ''),
      'previous_status', old_status
    )
  WHERE id = request_id;
END;
$$;

-- ============================================
-- PERFORMANCE FIXES
-- ============================================

-- Fix 3: Add indexes on foreign keys for better join performance
CREATE INDEX IF NOT EXISTS idx_users_company_id ON public.users(company_id);
CREATE INDEX IF NOT EXISTS idx_users_plan_id ON public.users(plan_id);

-- Fix 4: Optimize RLS policies to use subquery pattern (better performance at scale)
-- Drop existing policies
DROP POLICY IF EXISTS "Users can read own row" ON public.users;
DROP POLICY IF EXISTS "Users can read own company" ON public.companies;
DROP POLICY IF EXISTS "Users can read own plan" ON public.plans;
DROP POLICY IF EXISTS "Users can read own messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Users can insert own messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Users can read own summary" ON public.chat_summaries;
DROP POLICY IF EXISTS "Users can read own support requests" ON public.support_requests;

-- Recreate with optimized subquery pattern
CREATE POLICY "Users can read own row"
ON public.users FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.users u 
    WHERE u.id = users.id 
    AND u.auth_user_id = (SELECT auth.uid())
  )
);

CREATE POLICY "Users can read own company"
ON public.companies FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE users.company_id = companies.id 
    AND users.auth_user_id = (SELECT auth.uid())
  )
);

CREATE POLICY "Users can read own plan"
ON public.plans FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE users.plan_id = plans.id 
    AND users.auth_user_id = (SELECT auth.uid())
  )
);

CREATE POLICY "Users can read own messages"
ON public.chat_messages FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE users.id = chat_messages.user_id 
    AND users.auth_user_id = (SELECT auth.uid())
  )
);

CREATE POLICY "Users can insert own messages"
ON public.chat_messages FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE users.id = chat_messages.user_id 
    AND users.auth_user_id = (SELECT auth.uid())
  )
);

CREATE POLICY "Users can read own summary"
ON public.chat_summaries FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE users.id = chat_summaries.user_id 
    AND users.auth_user_id = (SELECT auth.uid())
  )
);

CREATE POLICY "Users can read own support requests"
ON public.support_requests FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE users.id = support_requests.user_id 
    AND users.auth_user_id = (SELECT auth.uid())
  )
);
