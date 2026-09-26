'use client';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Brand from './Brand';
import { useFitlog } from '@/context/FitlogContext';

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { planCount, savedCount } = useFitlog();

  const workoutActive = pathname === '/' || pathname.startsWith('/workout/');
  const planActive = pathname.startsWith('/my-plan');

  const closeMenu = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-fit-line bg-fit-bg/95 backdrop-blur-xl">
      <div className="page-shell flex h-16 items-center justify-between gap-4 sm:h-[72px]">
        <Brand />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          <Link
            href="/"
            className={`rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] transition ${
              workoutActive ? 'bg-fit-green text-black' : 'text-slate-500 hover:text-white'
            }`}
          >
            Workout
          </Link>
          <Link
            href="/my-plan"
            className={`rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] transition ${
              planActive ? 'bg-fit-green text-black' : 'text-slate-500 hover:text-white'
            }`}
          >
            My Plan
          </Link>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/my-plan"
            className="rounded-full bg-fit-green px-3.5 py-2 text-[10px] font-black uppercase tracking-wider text-black transition hover:bg-green-400"
          >
            Plan <span className="ml-1">{planCount}</span>
          </Link>
          <Link
            href="/my-plan?tab=saved"
            className="rounded-full border border-fit-green/60 px-3.5 py-2 text-[10px] font-black uppercase tracking-wider text-slate-200 transition hover:bg-fit-green/10"
          >
            Saved <span className="ml-1 text-fit-green">{savedCount}</span>
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-fit-line text-white md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={17} /> : <Menu size={17} />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-fit-line bg-fit-bg px-4 py-4 md:hidden">
          <nav className="page-shell grid gap-2" aria-label="Mobile navigation">
            <Link
              href="/"
              onClick={closeMenu}
              className={`rounded-full border px-4 py-3 text-[10px] font-black uppercase tracking-wider ${
                workoutActive ? 'border-fit-green bg-fit-green text-black' : 'border-fit-line text-slate-300'
              }`}
            >
              Workout
            </Link>
            <Link
              href="/my-plan"
              onClick={closeMenu}
              className={`rounded-full border px-4 py-3 text-[10px] font-black uppercase tracking-wider ${
                planActive ? 'border-fit-green bg-fit-green text-black' : 'border-fit-line text-slate-300'
              }`}
            >
              My Plan
            </Link>
            <div className="mt-1 flex gap-2">
              <Link href="/my-plan" onClick={closeMenu} className="green-button flex-1 !py-2.5">
                Plan {planCount}
              </Link>
              <Link href="/my-plan?tab=saved" onClick={closeMenu} className="outline-button flex-1 !py-2.5">
                Saved {savedCount}
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
