'use client';

import Link from 'next/link';
import { Bookmark, Check, Plus } from 'lucide-react';
import { useFitlog } from '@/context/FitlogContext';
import type { Workout } from '@/lib/types';
import StatPill from './StatPill';

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  const { addToPlan, addToSaved, isInPlan, isSaved } = useFitlog();
  const inPlan = isInPlan(workout.id);
  const saved = isSaved(workout.id);

  return (
    <article className="group overflow-hidden rounded-sm border border-fit-line bg-fit-panel transition duration-300 hover:-translate-y-1 hover:border-fit-green/40 hover:shadow-glow">
      <Link
        href={`/workout/${workout.id}`}
        className="relative block aspect-[16/10] overflow-hidden bg-fit-panel2"
        aria-label={`View ${workout.name} details`}
      >
        {workout.image ? (
          <img src={workout.image} alt={workout.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        ) : (
          <div className="grid h-full place-items-center bg-[radial-gradient(circle_at_50%_40%,rgba(34,197,94,.18),transparent_55%)] text-5xl font-black uppercase text-fit-green/30">
            {workout.name.slice(0, 2)}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
      </Link>

      <div className="p-4 sm:p-5">
        <div className="mb-2 flex min-h-5 flex-wrap gap-1.5">
          {workout.muscleGroups.slice(0, 3).map((muscle) => (
            <span key={muscle} className="rounded-full bg-fit-green px-2 py-1 text-[8px] font-black uppercase tracking-wider text-black">
              {muscle}
            </span>
          ))}
        </div>

        <Link href={`/workout/${workout.id}`} className="block text-base font-black uppercase leading-tight tracking-tight text-white hover:text-fit-green">
          {workout.name}
        </Link>
        <p className="mt-1 truncate text-[10px] font-semibold text-slate-500">{workout.equipment}</p>

        <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-fit-line pt-4">
          <StatPill kind="duration" value={workout.duration} />
          <StatPill kind="calories" value={workout.caloriesBurned} />
          <StatPill kind="rating" value={workout.rating} />
        </div>

        <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
          <button
            type="button"
            onClick={() => addToPlan(workout)}
            disabled={inPlan}
            className="green-button !py-2.5 disabled:cursor-default disabled:opacity-70"
          >
            {inPlan ? <><Check size={13} /> In plan</> : <><Plus size={13} /> Add to plan</>}
          </button>

          <button
            type="button"
            onClick={() => addToSaved(workout)}
            className="outline-button !px-3 !py-2.5"
            aria-label={saved ? 'Already saved' : 'Save for later'}
            title={saved ? 'Already saved' : 'Save for later'}
          >
            <Bookmark size={14} className={saved ? 'fill-fit-green text-fit-green' : ''} />
          </button>
        </div>
      </div>
    </article>
  );
}
