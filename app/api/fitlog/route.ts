import { NextResponse } from 'next/server';

const API_URL = 'https://api.abcz.workers.dev/api/fitlog';

export async function GET() {
  try {
    const response = await fetch(API_URL, { cache: 'no-store' });
    if (!response.ok) return NextResponse.json({ error: 'Workout service unavailable' }, { status: response.status });
    return NextResponse.json(await response.json(), { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return NextResponse.json({ error: 'Unable to reach workout service' }, { status: 502 });
  }
}
