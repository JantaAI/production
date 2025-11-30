-- Create support_requests table for storing support requests
-- These will be displayed in an internal dashboard later

CREATE TABLE IF NOT EXISTS support_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  user_phone TEXT NOT NULL,
  user_name TEXT NOT NULL,
  company_name TEXT NOT NULL,
  company_country TEXT NOT NULL,
  plan_coverage_summary TEXT,
  chat_summary TEXT,
  recent_messages JSONB DEFAULT '[]'::jsonb,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'waiting_for_customer', 'waiting_for_team', 'resolved', 'cancelled')),
  requested_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ,
  notes TEXT
);

-- Index for efficient querying by status and date
CREATE INDEX IF NOT EXISTS idx_support_requests_status_requested_at 
ON support_requests(status, requested_at DESC);

-- Index for querying by user
CREATE INDEX IF NOT EXISTS idx_support_requests_user_id 
ON support_requests(user_id);

-- Enable RLS
ALTER TABLE support_requests ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can only read their own support requests
CREATE POLICY "Users can read own support requests"
ON public.support_requests FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE users.id = support_requests.user_id 
    AND users.auth_user_id = (SELECT auth.uid())
  )
);

-- No INSERT/UPDATE/DELETE via RLS - Edge Functions handle with service role
