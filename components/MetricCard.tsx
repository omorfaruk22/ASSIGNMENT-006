import type { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: number;
  unit?: string;
  icon: LucideIcon;
}

export default function MetricCard({ label, value, unit, icon: Icon }: MetricCardProps) {
  return (
    <article className="panel rounded-sm p-5">
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-black uppercase tracking-[0.16em] text-slate-500">{label}</span>
        <Icon size={16} className="text-fit-green" aria-hidden="true" />
      </div>
      <div className="mt-4 text-3xl font-black tracking-tight text-white">
        {value}
        {unit ? <span className="ml-2 text-xs font-bold uppercase tracking-wider text-slate-500">{unit}</span> : null}
      </div>
    </article>
  );
}
