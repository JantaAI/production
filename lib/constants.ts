export const GLOBAL_PLAN_ID = '00000000-0000-0000-0000-000000000001';

export const SUPPORT_STATUSES = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  WAITING_FOR_CUSTOMER: 'waiting_for_customer',
  WAITING_FOR_TEAM: 'waiting_for_team',
  RESOLVED: 'resolved',
  CANCELLED: 'cancelled',
} as const;

export const SUPPORT_CURRENT_STATUSES = {
  PENDING: 'pending',
  REVIEWING_CASE: 'reviewing_case',
  CONTACTING_CUSTOMER: 'contacting_customer',
  WORKING_ON_SOLUTION: 'working_on_solution',
  DISCUSSION_WITH_TEAM: 'discussion_with_team',
  WAITING_FOR_APPROVAL: 'waiting_for_approval',
  PREPARING_RESPONSE: 'preparing_response',
  RESOLVED: 'resolved',
  CANCELLED: 'cancelled',
} as const;
