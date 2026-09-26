import type { Workout } from '@/lib/types';
import WorkoutActions from './WorkoutActions';
import WorkoutSpecs from './WorkoutSpecs';

interface WorkoutDetailsContentProps {
  workout: Workout;
}

export default function WorkoutDetailsContent({ workout }: WorkoutDetailsContentProps) {
  return (
    <div className="flex flex-col justify-center">
      <span className="eyebrow">Workout details</span>
      <h1 className="mb-0 mt-3 text-4xl font-black uppercase leading-[0.95] tracking-[-0.05em] sm:text-5xl">
        {workout.name}
      </h1>
      <p className="mt-5 text-sm leading-7 text-slate-400">
        {workout.description || 'A focused movement for building strength and consistent training habits.'}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {workout.muscleGroups.map((muscle) => (
          <span key={muscle} className="rounded-full bg-fit-green px-3 py-1.5 text-[9px] font-black uppercase tracking-wider text-black">
            {muscle}
          </span>
        ))}
      </div>

      <WorkoutSpecs workout={workout} />
      <WorkoutActions workout={workout} />
    </div>
  );
}
