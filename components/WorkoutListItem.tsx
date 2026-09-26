'use client';

import Link from 'next/link';
import { Check, CheckCircle2, Trash2 } from 'lucide-react';
import type { Workout } from '@/lib/types';
import StatPill from './StatPill';

interface WorkoutListItemProps {
  workout: Workout;
  mode: 'plan' | 'saved';
  done?: boolean;
  onDone?: () => void;
  onRemove: () => void;
}

export default function WorkoutListItem({ workout, mode, done = false, onDone, onRemove }: WorkoutListItemProps) {
  return (
    <article className="panel flex flex-col gap-4 rounded-sm p-4 sm:flex-row sm:items-center sm:p-5">
      <Link
        href={`/workout/${workout.id}`}
        className="grid h-20 w-24 shrink-0 place-items-center overflow-hidden rounded-sm bg-fit-panel2 text-lg font-black uppercase text-fit-green/50"
        aria-label={`View ${workout.name} details`}
      >
        {workout.image ? <img src={workout.image} alt={workout.name} className="h-full w-full object-cover" /> : workout.name.slice(0, 2)}
      </Link>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap gap-2 text-[9px] font-bold uppercase tracking-wider text-slate-500">
          <span>{workout.equipment}</span>
          {mode === 'plan' && done ? <span className="text-fit-green">• Completed</span> : null}
        </div>

        <Link
          href={`/workout/${workout.id}`}
          className={`mt-1 block truncate text-base font-black uppercase hover:text-fit-green ${done ? 'text-slate-500 line-through' : 'text-white'}`}
        >
          {workout.name}
        </Link>

        <div className="mt-2 flex flex-wrap gap-3">
          <StatPill kind="duration" value={workout.duration} />
          <StatPill kind="calories" value={workout.caloriesBurned} />
          <StatPill kind="rating" value={workout.rating} />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:justify-end">
        <Link href={`/workout/${workout.id}`} className="outline-button !px-3 !py-2.5">
          View Details
        </Link>

        {mode === 'plan' && onDone ? (
          <button
            type="button"
            onClick={onDone}
            disabled={done}
            className="green-button !px-3 !py-2.5 disabled:opacity-40"
            aria-label={done ? 'Completed' : 'Mark as done'}
          >
            {done ? <CheckCircle2 size={14} /> : <><Check size={14} /> <span>Mark as Done</span></>}
          </button>
        ) : null}

        <button
          type="button"
          onClick={onRemove}
          className="outline-button !px-3 !py-2.5"
          aria-label={mode === 'plan' ? 'Remove from plan' : 'Remove from saved'}
          title={mode === 'plan' ? 'Remove from plan' : 'Remove from saved'}
        >
          <Trash2 size={15} />
        </button>
      </div>
    </article>
  );
}
