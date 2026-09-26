import { Check, Clock3, Dumbbell, Flame, Star } from 'lucide-react';
import type { Workout } from '@/lib/types';

interface WorkoutSpecsProps {
  workout: Workout;
}

export default function WorkoutSpecs({ workout }: WorkoutSpecsProps) {
  const specs = [
    { label: 'Equipment', value: workout.equipment, icon: Dumbbell },
    { label: 'Difficulty', value: workout.difficulty, icon: Check },
    { label: 'Sets', value: String(workout.sets), icon: Dumbbell },
    { label: 'Reps', value: workout.reps, icon: Check },
    { label: 'Duration', value: `${workout.duration} min`, icon: Clock3 },
    { label: 'Calories', value: `${workout.caloriesBurned} kcal`, icon: Flame },
    { label: 'Rating', value: workout.rating.toFixed(1), icon: Star },
  ];

  return (
    <section className="mt-6 overflow-hidden rounded-sm border border-fit-line bg-fit-panel">
      <div className="border-b border-fit-line px-4 py-3 text-[10px] font-black uppercase tracking-[0.18em] text-fit-green">
        Key Specs
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3">
        {specs.map(({ label, value, icon: Icon }) => (
          <div key={label} className="border-b border-r border-fit-line p-3">
            <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-500">
              <Icon size={12} className="text-fit-green" aria-hidden="true" />
              {label}
            </div>
            <p className="mb-0 mt-2 text-xs font-bold text-white">{value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
