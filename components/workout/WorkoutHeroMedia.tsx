import type { Workout } from '@/lib/types';

interface WorkoutHeroMediaProps {
  workout: Workout;
}

export default function WorkoutHeroMedia({ workout }: WorkoutHeroMediaProps) {
  return (
    <div className="relative min-h-[360px] overflow-hidden rounded-sm border border-fit-line bg-fit-panel2 sm:min-h-[540px]">
      {workout.image ? (
        <img src={workout.image} alt={workout.name} className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_50%_40%,rgba(34,197,94,.2),transparent_55%)] text-8xl font-black uppercase text-fit-green/30">
          {workout.name.slice(0, 2)}
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
    </div>
  );
}
