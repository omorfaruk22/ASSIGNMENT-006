import type { Workout } from '@/lib/types';

interface InstructionsProps {
  workout: Workout;
}

export default function Instructions({ workout }: InstructionsProps) {
  return (
    <section className="mt-12">
      <span className="eyebrow">Instructions</span>
      <h2 className="mb-5 mt-2 text-2xl font-black uppercase">How to perform</h2>

      {workout.instructions.length ? (
        <ol className="grid gap-3 md:grid-cols-2">
          {workout.instructions.slice(0, 4).map((step, index) => (
            <li key={`${index}-${step}`} className="panel flex gap-4 rounded-sm p-5">
              <span className="font-black text-fit-green">{String(index + 1).padStart(2, '0')}</span>
              <p className="m-0 text-sm leading-6 text-slate-300">{step}</p>
            </li>
          ))}
        </ol>
      ) : (
        <p className="text-sm text-slate-400">
          Follow a controlled range of motion and choose a load you can manage with good form.
        </p>
      )}
    </section>
  );
}
