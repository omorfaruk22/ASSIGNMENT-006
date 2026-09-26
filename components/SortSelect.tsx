'use client';

import { ChevronDown } from 'lucide-react';
import type { SortType } from '@/lib/types';

interface SortSelectProps {
  value: SortType;
  onChange: (value: SortType) => void;
}

export default function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <label className="flex items-center gap-3 text-[10px] font-black uppercase tracking-wider text-slate-500">
      Sort By
      <span className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value as SortType)}
          className="appearance-none rounded-full border border-fit-line bg-fit-panel py-2.5 pl-4 pr-9 text-[10px] font-black text-white outline-none focus:border-fit-green"
        >
          <option value="duration">Duration</option>
          <option value="calories">Calories</option>
          <option value="rating">Rating</option>
        </select>
        <ChevronDown size={13} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-fit-green" aria-hidden="true" />
      </span>
    </label>
  );
}
