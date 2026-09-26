'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { toast } from 'sonner';
import { getWorkouts } from '@/lib/api';
import type { PlanWorkout, StorageData, Totals, Workout } from '@/lib/types';

interface FitlogContextValue {
  workouts: Workout[];
  loading: boolean;
  error: string;
  plan: PlanWorkout[];
  saved: Workout[];
  totals: Totals;
  hydrated: boolean;
  planCount: number;
  savedCount: number;
  addToPlan: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;
  markDone: (id: number) => void;
  addToSaved: (workout: Workout) => void;
  removeFromSaved: (id: number) => void;
  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
  reload: () => Promise<void>;
}

const FitlogContext = createContext<FitlogContextValue | null>(null);
const STORAGE_KEY = 'fitlog-hands-on-v8';

function normalizeWorkouts(payload: unknown): Workout[] {
  const root = (payload ?? {}) as Record<string, unknown>;
  const list = Array.isArray(payload)
    ? payload
    : Array.isArray(root.workouts)
      ? root.workouts
      : Array.isArray(root.data)
        ? root.data
        : Array.isArray(root.results)
          ? root.results
          : [];

  return list.map((item, index) => {
    const value = (item ?? {}) as Record<string, unknown>;
    return {
      id: Number(value.id ?? index + 1) || index + 1,
      name: String(value.name ?? value.title ?? 'Workout'),
      image: String(value.image ?? value.imageUrl ?? value.thumbnail ?? value.photo ?? ''),
      muscleGroups: Array.isArray(value.muscleGroups)
        ? value.muscleGroups.map(String)
        : Array.isArray(value.muscles)
          ? value.muscles.map(String)
          : [],
      equipment: String(value.equipment ?? 'Bodyweight'),
      difficulty: String(value.difficulty ?? 'All levels'),
      sets: Number(value.sets ?? 3),
      reps: String(value.reps ?? '8–12'),
      duration: Number(value.duration ?? value.durationMinutes ?? 0),
      caloriesBurned: Number(value.caloriesBurned ?? value.calories ?? 0),
      rating: Number(value.rating ?? 0),
      description: String(value.description ?? ''),
      instructions: Array.isArray(value.instructions) ? value.instructions.map(String) : [],
    };
  });
}

export function FitlogProvider({ children }: { children: ReactNode }) {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [plan, setPlan] = useState<PlanWorkout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<StorageData>;
        setPlan(Array.isArray(parsed.plan) ? parsed.plan : []);
        setSaved(Array.isArray(parsed.saved) ? parsed.saved : []);
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
      setPlan([]);
      setSaved([]);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ plan, saved } satisfies StorageData));
  }, [hydrated, plan, saved]);

  const reload = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const payload = await getWorkouts();
      setWorkouts(normalizeWorkouts(payload));
    } catch {
      setError('Could not load the workout library. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  const addToPlan = useCallback((workout: Workout) => {
    setPlan((current) => {
      if (current.some((item) => item.id === workout.id)) {
        toast.warning("Already in today's plan");
        return current;
      }

      if (current.length >= 5) {
        toast.error("Today's plan is full. The limit is 5 lifts.");
        return current;
      }

      toast.success("Added to today's plan");
      return [...current, { ...workout, done: false }];
    });
  }, []);

  const removeFromPlan = useCallback((id: number) => {
    setPlan((current) => current.filter((item) => item.id !== id));
    toast.success("Removed from today's plan");
  }, []);

  const markDone = useCallback((id: number) => {
    setPlan((current) => current.map((item) => item.id === id ? { ...item, done: true } : item));
    toast.success('Workout marked as done');
  }, []);

  const addToSaved = useCallback((workout: Workout) => {
    setSaved((current) => {
      if (current.some((item) => item.id === workout.id)) {
        toast.warning('Already saved for later');
        return current;
      }

      toast.success('Saved for later');
      return [...current, workout];
    });
  }, []);

  const removeFromSaved = useCallback((id: number) => {
    setSaved((current) => current.filter((item) => item.id !== id));
    toast.success('Removed from saved');
  }, []);

  const isInPlan = useCallback((id: number) => plan.some((item) => item.id === id), [plan]);
  const isSaved = useCallback((id: number) => saved.some((item) => item.id === id), [saved]);

  const totals = useMemo<Totals>(() => ({
    exercises: plan.length,
    minutes: plan.reduce((sum, item) => sum + Number(item.duration || 0), 0),
    calories: plan.reduce((sum, item) => sum + Number(item.caloriesBurned || 0), 0),
  }), [plan]);

  const value = useMemo<FitlogContextValue>(() => ({
    workouts,
    loading,
    error,
    plan,
    saved,
    totals,
    hydrated,
    planCount: plan.length,
    savedCount: saved.length,
    addToPlan,
    removeFromPlan,
    markDone,
    addToSaved,
    removeFromSaved,
    isInPlan,
    isSaved,
    reload,
  }), [
    workouts,
    loading,
    error,
    plan,
    saved,
    totals,
    hydrated,
    addToPlan,
    removeFromPlan,
    markDone,
    addToSaved,
    removeFromSaved,
    isInPlan,
    isSaved,
    reload,
  ]);

  return <FitlogContext.Provider value={value}>{children}</FitlogContext.Provider>;
}

export function useFitlog() {
  const value = useContext(FitlogContext);
  if (!value) {
    throw new Error('useFitlog must be used inside FitlogProvider');
  }
  return value;
}
