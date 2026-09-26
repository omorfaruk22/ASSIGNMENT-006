'use client';

import { SlidersHorizontal } from 'lucide-react';
import SearchBox from './SearchBox';
import SortSelect from '../SortSelect';
import type { SortType } from '@/lib/types';

interface LibraryToolbarProps {
  query: string;
  onQueryChange: (value: string) => void;
  sort: SortType;
  onSortChange: (value: SortType) => void;
  count: number;
}

export default function LibraryToolbar({ query, onQueryChange, sort, onSortChange, count }: LibraryToolbarProps) {
  return (
    <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-center">
      <SearchBox value={query} onChange={onQueryChange} />
      <div className="inline-flex items-center justify-between gap-4 px-2 sm:justify-end">
        <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
          <SlidersHorizontal size={13} className="text-fit-green" aria-hidden="true" />
          {count} workouts
        </div>
        <SortSelect value={sort} onChange={onSortChange} />
      </div>
    </div>
  );
}
