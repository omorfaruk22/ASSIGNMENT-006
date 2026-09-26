'use client';

import { Search } from 'lucide-react';

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBox({ value, onChange }: SearchBoxProps) {
  return (
    <label className="relative block flex-1">
      <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" aria-hidden="true" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        type="search"
        placeholder="Search workouts, muscles, equipment…"
        className="w-full rounded-full border border-fit-line bg-fit-panel py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-fit-green/60"
        aria-label="Search workouts"
      />
    </label>
  );
}
