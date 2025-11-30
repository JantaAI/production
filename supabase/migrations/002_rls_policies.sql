-- JANTA Backend v1 - Row Level Security Policies
-- All RLS policies use EXISTS syntax as required

-- Enable RLS on all tables
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_summaries ENABLE ROW LEVEL SECURITY;

-- Users table policies
CREATE POLICY "Users can read own row"
ON public.users FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.users u 
    WHERE u.id = users.id 
    AND u.auth_user_id = (SELECT auth.uid())
  )
);

-- Companies table policies
CREATE POLICY "Users can read own company"
ON public.companies FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE users.company_id = companies.id 
    AND users.auth_user_id = (SELECT auth.uid())
  )
);

-- Plans table policies
-- All companies share the same global plan, so users can read if they have a plan_id
CREATE POLICY "Users can read own plan"
ON public.plans FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE users.plan_id = plans.id 
    AND users.auth_user_id = (SELECT auth.uid())
  )
);

-- Chat messages table policies
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

-- Chat summaries table policies
CREATE POLICY "Users can read own summary"
ON public.chat_summaries FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE users.id = chat_summaries.user_id 
    AND users.auth_user_id = (SELECT auth.uid())
  )
);
