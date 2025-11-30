import { NextResponse } from 'next/server';
import { getSupportRequests } from '@/lib/api/support-dashboard';

export async function GET() {
  try {
    const requests = await getSupportRequests();
    return NextResponse.json(requests);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch requests' },
      { status: 500 }
    );
  }
}
