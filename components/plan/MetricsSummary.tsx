import { Flame, Timer, Trophy } from 'lucide-react';
import MetricCard from '../MetricCard';
import type { Totals } from '@/lib/types';

interface MetricsSummaryProps {
  totals: Totals;
}

export default function MetricsSummary({ totals }: MetricsSummaryProps) {
  return (
    <div className="mb-7 grid gap-3 sm:grid-cols-3">
      <MetricCard label="Exercises" value={totals.exercises} icon={Trophy} />
      <MetricCard label="Minutes" value={totals.minutes} icon={Timer} />
      <MetricCard label="Calories" value={totals.calories} icon={Flame} />
    </div>
  );
}
