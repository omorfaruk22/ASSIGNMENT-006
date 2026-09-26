'use client';

import { Bookmark, Check, Plus } from 'lucide-react';
import { useFitlog } from '@/context/FitlogContext';
import type { Workout } from '@/lib/types';

interface WorkoutActionsProps {
  workout: Workout;
}

export default function WorkoutActions({ workout }: WorkoutActionsProps) {
  const { addToPlan, addToSaved, isInPlan, isSaved } = useFitlog();
  const inPlan = isInPlan(workout.id);
  const saved = isSaved(workout.id);

  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <button type="button" onClick={() => addToPlan(workout)} disabled={inPlan} className="green-button disabled:cursor-default disabled:opacity-70">
        {inPlan ? <><Check size={14} /> In today&apos;s plan</> : <><Plus size={14} /> Add to today&apos;s plan</>}
      </button>
      <button type="button" onClick={() => addToSaved(workout)} className="outline-button">
        <Bookmark size={14} className={saved ? 'fill-fit-green text-fit-green' : ''} />
        {saved ? 'Saved' : 'Save for later'}
      </button>
    </div>
  );
}
