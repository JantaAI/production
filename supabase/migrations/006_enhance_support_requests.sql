-- Enhance support_requests table with customer info and status tracking
-- This enables the support dashboard with progress tracking (like Uber)

-- Add customer information fields
ALTER TABLE support_requests ADD COLUMN IF NOT EXISTS gender TEXT;
ALTER TABLE support_requests ADD COLUMN IF NOT EXISTS age INTEGER;
ALTER TABLE support_requests ADD COLUMN IF NOT EXISTS city TEXT;

-- Add progress tracking fields
ALTER TABLE support_requests ADD COLUMN IF NOT EXISTS current_status TEXT DEFAULT 'pending';
ALTER TABLE support_requests ADD COLUMN IF NOT EXISTS status_message TEXT; -- e.g., "Working on claim verification"
ALTER TABLE support_requests ADD COLUMN IF NOT EXISTS assigned_to TEXT; -- Support agent name/ID

-- Add notes system
ALTER TABLE support_requests ADD COLUMN IF NOT EXISTS internal_notes TEXT; -- Not visible to customer
ALTER TABLE support_requests ADD COLUMN IF NOT EXISTS customer_notes TEXT; -- Visible to customer

-- Add timestamps for status tracking
ALTER TABLE support_requests ADD COLUMN IF NOT EXISTS status_updated_at TIMESTAMPTZ;
ALTER TABLE support_requests ADD COLUMN IF NOT EXISTS last_activity_at TIMESTAMPTZ DEFAULT NOW();

-- Add status history (JSONB array of status changes)
ALTER TABLE support_requests ADD COLUMN IF NOT EXISTS status_history JSONB DEFAULT '[]'::jsonb;

-- Update status check constraint to include new statuses
ALTER TABLE support_requests DROP CONSTRAINT IF EXISTS support_requests_status_check;
ALTER TABLE support_requests ADD CONSTRAINT support_requests_status_check 
  CHECK (status IN ('pending', 'in_progress', 'waiting_for_customer', 'waiting_for_team', 'resolved', 'cancelled'));

-- Add current_status check constraint (more granular statuses)
ALTER TABLE support_requests ADD CONSTRAINT support_requests_current_status_check 
  CHECK (current_status IN (
    'pending',
    'reviewing_case',
    'contacting_customer',
    'working_on_solution',
    'discussion_with_team',
    'waiting_for_approval',
    'preparing_response',
    'resolved',
    'cancelled'
  ));

-- Create indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_support_requests_current_status 
  ON support_requests(current_status, last_activity_at DESC);
CREATE INDEX IF NOT EXISTS idx_support_requests_assigned_to 
  ON support_requests(assigned_to) WHERE assigned_to IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_support_requests_last_activity 
  ON support_requests(last_activity_at DESC);

-- Add trigger to update last_activity_at on any change
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

DROP TRIGGER IF EXISTS trigger_update_support_request_activity ON support_requests;
CREATE TRIGGER trigger_update_support_request_activity
  BEFORE UPDATE ON support_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_support_request_activity();

-- Add function to update status with history tracking
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
