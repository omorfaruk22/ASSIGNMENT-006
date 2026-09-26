import { Clock3, Flame, Star } from 'lucide-react';

type StatKind = 'duration' | 'calories' | 'rating';

interface StatPillProps {
  kind: StatKind;
  value: number;
}

export default function StatPill({ kind, value }: StatPillProps) {
  const Icon = kind === 'duration' ? Clock3 : kind === 'calories' ? Flame : Star;
  const label = kind === 'duration' ? `${value} min` : kind === 'calories' ? `${value} kcal` : value.toFixed(1);

  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-slate-400">
      <Icon size={12} className={kind === 'rating' ? 'text-fit-green' : ''} aria-hidden="true" />
      {label}
    </span>
  );
}
