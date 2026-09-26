'use client';

import Link from 'next/link';
import { ArrowRight, Bookmark, Check, Clock3, Flame, Menu, Plus, Search, SlidersHorizontal, Star, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useFitlog } from '@/context/FitlogContext';
import type { SortType, Workout } from '@/lib/types';

function HomeNavbar() {
  const { planCount, savedCount } = useFitlog();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-fit-line bg-fit-bg/95 backdrop-blur-xl">
      <div className="page-shell flex h-16 items-center justify-between gap-4 sm:h-[72px]">
        <Link href="/" className="inline-flex items-center gap-2" aria-label="FitLog home">
          <span className="grid h-9 w-9 place-items-center rounded-sm bg-fit-green text-black">
            <span className="text-lg font-black">F</span>
          </span>
          <span className="text-sm font-black tracking-[0.18em] text-white">FITLOG</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          <Link href="/" className="rounded-full bg-fit-green px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-black">
            Workout
          </Link>
          <Link href="/my-plan" className="rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-slate-500 transition hover:text-white">
            My Plan
          </Link>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link href="/my-plan" className="rounded-full bg-fit-green px-3.5 py-2 text-[10px] font-black uppercase tracking-wider text-black">
            Plan <span className="ml-1">{planCount}</span>
          </Link>
          <Link href="/my-plan?tab=saved" className="rounded-full border border-fit-green/60 px-3.5 py-2 text-[10px] font-black uppercase tracking-wider text-slate-200 transition hover:bg-fit-green/10">
            Saved <span className="ml-1 text-fit-green">{savedCount}</span>
          </Link>
        </div>

        <button type="button" onClick={() => setOpen((value) => !value)} className="grid h-9 w-9 place-items-center rounded-full border border-fit-line text-white md:hidden" aria-label={open ? 'Close menu' : 'Open menu'}>
          {open ? <X size={17} /> : <Menu size={17} />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-fit-line bg-fit-bg px-4 py-4 md:hidden">
          <div className="page-shell grid gap-2">
            <Link href="/" onClick={() => setOpen(false)} className="rounded-full border border-fit-green bg-fit-green px-4 py-3 text-[10px] font-black uppercase tracking-wider text-black">Workout</Link>
            <Link href="/my-plan" onClick={() => setOpen(false)} className="rounded-full border border-fit-line px-4 py-3 text-[10px] font-black uppercase tracking-wider text-slate-300">My Plan</Link>
            <div className="mt-1 flex gap-2">
              <Link href="/my-plan" onClick={() => setOpen(false)} className="flex-1 rounded-full bg-fit-green px-3 py-2.5 text-center text-[10px] font-black uppercase text-black">Plan {planCount}</Link>
              <Link href="/my-plan?tab=saved" onClick={() => setOpen(false)} className="flex-1 rounded-full border border-fit-green/60 px-3 py-2.5 text-center text-[10px] font-black uppercase text-slate-200">Saved {savedCount}</Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function HomeHero() {
  const { workouts, planCount, savedCount } = useFitlog();
  const heroWorkout = workouts[0];

  return (
    <section className="border-b border-fit-line">
      <div className="page-shell py-7 sm:py-9">
        <div className="overflow-hidden rounded-sm border border-fit-line bg-fit-panel">
          <div className="grid min-h-[330px] md:grid-cols-[1.05fr_.95fr]">
            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
              <span className="eyebrow">Workout library</span>
              <h1 className="mt-4 max-w-xl text-4xl font-black uppercase leading-[0.96] tracking-[-0.055em] sm:text-5xl lg:text-6xl">
                Train with intent.<br />Log every set.
              </h1>
              <p className="mt-5 max-w-xl text-xs leading-6 text-slate-400 sm:text-sm">
                FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-2">
                <a href="#library" className="green-button">Browse workouts <ArrowRight size={14} /></a>
                <Link href="/my-plan" className="green-button !px-3.5">Plan {planCount}</Link>
                <Link href="/my-plan?tab=saved" className="outline-button">Saved {savedCount}</Link>
              </div>
            </div>

            <div className="relative min-h-[250px] overflow-hidden bg-fit-panel2 md:min-h-full">
              {heroWorkout?.image ? (
                <img src={heroWorkout.image} alt={heroWorkout.name} className="absolute inset-0 h-full w-full object-cover" />
              ) : (
                <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_50%_45%,rgba(34,197,94,.22),transparent_58%)]">
                  <span className="text-7xl font-black uppercase text-fit-green/20">FIT</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-fit-panel via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-white/10 bg-black/30 px-5 py-3 text-[9px] font-black uppercase tracking-[0.18em] text-white/60 backdrop-blur-sm">
                <span>Train with intent</span>
                <span className="text-fit-green">FITLOG / 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomeStat({ kind, value }: { kind: 'duration' | 'calories' | 'rating'; value: number }) {
  const Icon = kind === 'duration' ? Clock3 : kind === 'calories' ? Flame : Star;
  const label = kind === 'duration' ? `${value} min` : kind === 'calories' ? `${value} kcal` : value.toFixed(1);
  return <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-slate-400"><Icon size={12} className={kind === 'rating' ? 'text-fit-green' : ''} />{label}</span>;
}

function HomeWorkoutCard({ workout }: { workout: Workout }) {
  const { addToPlan, addToSaved, isInPlan, isSaved } = useFitlog();
  const inPlan = isInPlan(workout.id);
  const saved = isSaved(workout.id);

  return (
    <article className="group overflow-hidden rounded-sm border border-fit-line bg-fit-panel transition duration-300 hover:-translate-y-1 hover:border-fit-green/40">
      <Link href={`/workout/${workout.id}`} className="relative block aspect-[16/10] overflow-hidden bg-fit-panel2">
        {workout.image ? <img src={workout.image} alt={workout.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /> : <div className="grid h-full place-items-center text-5xl font-black uppercase text-fit-green/30">{workout.name.slice(0, 2)}</div>}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
      </Link>

      <div className="p-4 sm:p-5">
        <div className="mb-2 flex min-h-5 flex-wrap gap-1.5">
          {workout.muscleGroups.slice(0, 3).map((muscle) => <span key={muscle} className="rounded-full bg-fit-green px-2 py-1 text-[8px] font-black uppercase tracking-wider text-black">{muscle}</span>)}
        </div>
        <Link href={`/workout/${workout.id}`} className="block text-base font-black uppercase leading-tight tracking-tight text-white hover:text-fit-green">{workout.name}</Link>
        <p className="mt-1 truncate text-[10px] font-semibold text-slate-500">{workout.equipment}</p>
        <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-fit-line pt-4">
          <HomeStat kind="duration" value={workout.duration} />
          <HomeStat kind="calories" value={workout.caloriesBurned} />
          <HomeStat kind="rating" value={workout.rating} />
        </div>
        <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
          <button type="button" onClick={() => addToPlan(workout)} disabled={inPlan} className="green-button !py-2.5 disabled:cursor-default disabled:opacity-70">
            {inPlan ? <><Check size={13} /> In plan</> : <><Plus size={13} /> Add to plan</>}
          </button>
          <button type="button" onClick={() => addToSaved(workout)} className="outline-button !px-3 !py-2.5" aria-label="Save workout">
            <Bookmark size={14} className={saved ? 'fill-fit-green text-fit-green' : ''} />
          </button>
        </div>
      </div>
    </article>
  );
}

function HomeFooter() {
  return (
    <footer className="mt-16 border-t border-fit-line bg-fit-bg py-7">
      <div className="page-shell flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2 text-xs font-black tracking-[0.16em] text-white"><span className="grid h-7 w-7 place-items-center rounded-sm bg-fit-green text-black">F</span>FITLOG</div>
        <p className="m-0 text-[10px] leading-5 text-slate-600">© 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </div>
    </footer>
  );
}

export default function HomePage() {
  const { workouts, loading, error, reload } = useFitlog();
  const [sort, setSort] = useState<SortType>('duration');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    const matches = workouts.filter((workout) => {
      if (!term) return true;
      return [workout.name, workout.equipment, ...workout.muscleGroups].join(' ').toLowerCase().includes(term);
    });
    return [...matches].sort((a, b) => {
      if (sort === 'duration') return a.duration - b.duration;
      if (sort === 'calories') return a.caloriesBurned - b.caloriesBurned;
      return a.rating - b.rating;
    });
  }, [workouts, query, sort]);

  return (
    <>
      <HomeNavbar />
      <HomeHero />

      <main id="library" className="page-shell py-12 sm:py-14">
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="eyebrow">The library</span>
            <h2 className="mb-0 mt-2 text-3xl font-black uppercase tracking-[-0.04em] text-white">The library</h2>
            <p className="mb-0 mt-2 max-w-xl text-sm text-slate-400">Twelve lifts covering every major muscle group.</p>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Pick a lift. Build the day.</span>
        </div>

        <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="relative block flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Search workouts, muscles, equipment…" className="w-full rounded-full border border-fit-line bg-fit-panel py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-fit-green/60" />
          </label>
          <div className="inline-flex items-center justify-between gap-4 px-2 sm:justify-end">
            <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500"><SlidersHorizontal size={13} className="text-fit-green" />{filtered.length} workouts</div>
            <label className="flex items-center gap-3 text-[10px] font-black uppercase tracking-wider text-slate-500">
              Sort By
              <span className="relative">
                <select value={sort} onChange={(event) => setSort(event.target.value as SortType)} className="appearance-none rounded-full border border-fit-line bg-fit-panel py-2.5 pl-4 pr-9 text-[10px] font-black text-white outline-none focus:border-fit-green">
                  <option value="duration">Duration</option><option value="calories">Calories</option><option value="rating">Rating</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-fit-green">⌄</span>
              </span>
            </label>
          </div>
        </div>

        {loading ? (
          <div className="flex min-h-64 flex-col items-center justify-center gap-4"><span className="h-8 w-8 animate-spin rounded-full border-2 border-fit-line border-t-fit-green" /><span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">Loading workouts…</span></div>
        ) : error ? (
          <div className="panel flex flex-col items-center rounded-sm p-10 text-center"><span className="eyebrow">Connection interrupted</span><p className="mb-4 mt-3 text-sm text-slate-400">{error}</p><button className="green-button" type="button" onClick={() => void reload()}>Try again</button></div>
        ) : filtered.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{filtered.map((workout) => <HomeWorkoutCard key={workout.id} workout={workout} />)}</div>
        ) : (
          <div className="panel flex min-h-64 flex-col items-center justify-center rounded-sm p-8 text-center"><span className="eyebrow">Nothing here yet</span><h3 className="mb-0 mt-2 text-xl font-black uppercase">No matches found</h3><p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">Try another exercise, muscle group, or equipment.</p></div>
        )}
      </main>
      <HomeFooter />
    </>
  );
}
