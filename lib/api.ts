import type { Workout } from './types';

export const API_BASE = '/api/fitlog';

async function request<T>(url: string): Promise<T> {
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) throw new Error(`Request failed (${response.status})`);
  return response.json() as Promise<T>;
}

export function getWorkouts(): Promise<Workout[]> { return request<Workout[]>(API_BASE); }
export function getWorkout(id: string): Promise<Workout> { return request<Workout>(`${API_BASE}/${encodeURIComponent(id)}`); }
