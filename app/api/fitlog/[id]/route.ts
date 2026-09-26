import { NextResponse } from 'next/server';

const API_URL = 'https://api.abcz.workers.dev/api/fitlog';

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const response = await fetch(`${API_URL}/${encodeURIComponent(id)}`, { cache: 'no-store' });
    if (response.status === 404) return NextResponse.json({ error: 'Workout not found' }, { status: 404 });
    if (!response.ok) return NextResponse.json({ error: 'Workout service unavailable' }, { status: response.status });
    return NextResponse.json(await response.json(), { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return NextResponse.json({ error: 'Unable to reach workout service' }, { status: 502 });
  }
}
