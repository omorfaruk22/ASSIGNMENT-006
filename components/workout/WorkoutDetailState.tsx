import Link from 'next/link';

interface WorkoutDetailStateProps {
  type: 'error' | 'missing';
}

export default function WorkoutDetailState({ type }: WorkoutDetailStateProps) {
  if (type === 'missing') {
    return (
      <div className="panel rounded-sm p-10 text-center">
        <span className="eyebrow">404 / workout not found</span>
        <h1 className="mt-3 text-3xl font-black uppercase">This lift isn&apos;t here.</h1>
        <Link href="/" className="green-button mt-5">Back to library</Link>
      </div>
    );
  }

  return (
    <div className="panel rounded-sm p-10 text-center">
      <span className="eyebrow">Connection interrupted</span>
      <h1 className="mt-3 text-3xl font-black uppercase">Workout details unavailable.</h1>
      <p className="my-3 text-sm text-slate-400">The workout service could not load this movement. Please try again later.</p>
      <Link href="/" className="green-button mt-2">Back to library</Link>
    </div>
  );
}
