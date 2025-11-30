import { NextRequest, NextResponse } from 'next/server';
import {
  updateSupportRequestStatus,
  updateSupportRequestNotes,
  assignSupportRequest,
} from '@/lib/api/support-dashboard';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { request_id, current_status, status_message, agent_name, internal_notes, customer_notes, assigned_to } = body;

    if (current_status) {
      await updateSupportRequestStatus(request_id, current_status, status_message, agent_name);
    }

    if (internal_notes !== undefined || customer_notes !== undefined) {
      await updateSupportRequestNotes(request_id, internal_notes, customer_notes);
    }

    if (assigned_to !== undefined) {
      await assignSupportRequest(request_id, assigned_to);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update status' },
      { status: 500 }
    );
  }
}
