'use client';

import { Bookmark, Check } from 'lucide-react';
import type { PlanTab } from '@/lib/types';

interface PlanTabsProps {
  active: PlanTab;
  planCount: number;
  savedCount: number;
  completed: number;
  onChange: (tab: PlanTab) => void;
}

export default function PlanTabs({ active, planCount, savedCount, completed, onChange }: PlanTabsProps) {
  return (
    <div className="mb-6 flex items-center justify-between gap-4 border-b border-fit-line">
      <div className="flex gap-5">
        <button
          type="button"
          onClick={() => onChange('plan')}
          className={`relative pb-4 text-[10px] font-black uppercase tracking-[0.16em] ${active === 'plan' ? 'text-fit-green' : 'text-slate-500 hover:text-white'}`}
        >
          Today&apos;s Plan
          <span className="ml-1 rounded-full bg-fit-panel2 px-2 py-1 text-[9px]">{planCount}</span>
          {active === 'plan' ? <i className="absolute inset-x-0 bottom-0 h-0.5 bg-fit-green" /> : null}
        </button>

        <button
          type="button"
          onClick={() => onChange('saved')}
          className={`relative flex items-center gap-2 pb-4 text-[10px] font-black uppercase tracking-[0.16em] ${active === 'saved' ? 'text-fit-green' : 'text-slate-500 hover:text-white'}`}
        >
          <Bookmark size={12} aria-hidden="true" />
          Saved
          <span className="rounded-full bg-fit-panel2 px-2 py-1 text-[9px]">{savedCount}</span>
          {active === 'saved' ? <i className="absolute inset-x-0 bottom-0 h-0.5 bg-fit-green" /> : null}
        </button>
      </div>

      {active === 'plan' ? (
        <span className="hidden items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-slate-500 sm:flex">
          <Check size={13} className="text-fit-green" aria-hidden="true" />
          {completed} done
        </span>
      ) : null}
    </div>
  );
}
