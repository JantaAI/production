import { NextRequest, NextResponse } from 'next/server';
import { activateUser } from '@/lib/api/activation';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await activateUser(body);
    
    // Return session data to client
    return NextResponse.json(result);
  } catch (error) {
    console.error('Activation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Activation failed' },
      { status: 400 }
    );
  }
}
