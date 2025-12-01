import { NextRequest, NextResponse } from 'next/server';
import { getSupportRequest } from '@/lib/api/support-dashboard';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get('id');

    if (!requestId) {
      return NextResponse.json(
        { error: 'Missing id parameter' },
        { status: 400 }
      );
    }

    const supportRequest = await getSupportRequest(requestId);
    return NextResponse.json(supportRequest);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch request' },
      { status: 500 }
    );
  }
}
