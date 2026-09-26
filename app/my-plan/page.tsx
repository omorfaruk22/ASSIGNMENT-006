'use client';

import Link from 'next/link';
import { Bookmark, Check, CheckCircle2, ChevronDown, Clock3, Flame, Menu, Star, Timer, Trash2, Trophy, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useFitlog } from '@/context/FitlogContext';
import type { PlanTab, SortType, Workout } from '@/lib/types';

function PlanNavbar() {
  const { planCount, savedCount } = useFitlog();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-fit-line bg-fit-bg/95 backdrop-blur-xl">
      <div className="page-shell flex h-16 items-center justify-between gap-4 sm:h-[72px]">
        <Link href="/" className="inline-flex items-center gap-2"><span className="grid h-9 w-9 place-items-center rounded-sm bg-fit-green text-black">F</span><span className="text-sm font-black tracking-[0.18em] text-white">FITLOG</span></Link>
        <nav className="hidden items-center gap-1 md:flex"><Link href="/" className="rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-slate-500 hover:text-white">Workout</Link><Link href="/my-plan" className="rounded-full bg-fit-green px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-black">My Plan</Link></nav>
        <div className="hidden items-center gap-2 md:flex"><Link href="/my-plan" className="rounded-full bg-fit-green px-3.5 py-2 text-[10px] font-black uppercase tracking-wider text-black">Plan <span className="ml-1">{planCount}</span></Link><Link href="/my-plan?tab=saved" className="rounded-full border border-fit-green/60 px-3.5 py-2 text-[10px] font-black uppercase tracking-wider text-slate-200">Saved <span className="ml-1 text-fit-green">{savedCount}</span></Link></div>
        <button type="button" onClick={() => setOpen((value) => !value)} className="grid h-9 w-9 place-items-center rounded-full border border-fit-line text-white md:hidden">{open ? <X size={17} /> : <Menu size={17} />}</button>
      </div>
      {open ? <div className="border-t border-fit-line bg-fit-bg px-4 py-4 md:hidden"><div className="page-shell grid gap-2"><Link href="/" onClick={() => setOpen(false)} className="rounded-full border border-fit-line px-4 py-3 text-[10px] font-black uppercase tracking-wider text-slate-300">Workout</Link><Link href="/my-plan" onClick={() => setOpen(false)} className="rounded-full border border-fit-green bg-fit-green px-4 py-3 text-[10px] font-black uppercase tracking-wider text-black">My Plan</Link><div className="mt-1 flex gap-2"><Link href="/my-plan" onClick={() => setOpen(false)} className="flex-1 rounded-full bg-fit-green px-3 py-2.5 text-center text-[10px] font-black uppercase text-black">Plan {planCount}</Link><Link href="/my-plan?tab=saved" onClick={() => setOpen(false)} className="flex-1 rounded-full border border-fit-green/60 px-3 py-2.5 text-center text-[10px] font-black uppercase text-slate-200">Saved {savedCount}</Link></div></div></div> : null}
    </header>
  );
}

function Metric({ label, value, icon: Icon }: { label: string; value: number; icon: typeof Trophy }) {
  return <article className="panel rounded-sm p-5"><div className="flex items-center justify-between"><span className="text-[9px] font-black uppercase tracking-[0.16em] text-slate-500">{label}</span><Icon size={16} className="text-fit-green" /></div><div className="mt-4 text-3xl font-black tracking-tight text-white">{value}</div></article>;
}

function PlanStat({ kind, value }: { kind: 'duration' | 'calories' | 'rating'; value: number }) {
  const Icon = kind === 'duration' ? Clock3 : kind === 'calories' ? Flame : Star;
  const label = kind === 'duration' ? `${value} min` : kind === 'calories' ? `${value} kcal` : value.toFixed(1);
  return <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-slate-400"><Icon size={12} className={kind === 'rating' ? 'text-fit-green' : ''} />{label}</span>;
}

function PlanListItem({ workout, mode, done, onDone, onRemove }: { workout: Workout & { done?: boolean }; mode: PlanTab; done: boolean; onDone?: () => void; onRemove: () => void }) {
  return (
    <article className="panel flex flex-col gap-4 rounded-sm p-4 sm:flex-row sm:items-center sm:p-5">
      <Link href={`/workout/${workout.id}`} className="grid h-20 w-24 shrink-0 place-items-center overflow-hidden rounded-sm bg-fit-panel2 text-lg font-black uppercase text-fit-green/50">{workout.image ? <img src={workout.image} alt={workout.name} className="h-full w-full object-cover" /> : workout.name.slice(0, 2)}</Link>
      <div className="min-w-0 flex-1"><div className="text-[9px] font-bold uppercase tracking-wider text-slate-500">{workout.equipment}{mode === 'plan' && done ? <span className="ml-2 text-fit-green">• Completed</span> : null}</div><Link href={`/workout/${workout.id}`} className={`mt-1 block truncate text-base font-black uppercase hover:text-fit-green ${done ? 'text-slate-500 line-through' : 'text-white'}`}>{workout.name}</Link><div className="mt-2 flex flex-wrap gap-3"><PlanStat kind="duration" value={workout.duration} /><PlanStat kind="calories" value={workout.caloriesBurned} /><PlanStat kind="rating" value={workout.rating} /></div></div>
      <div className="flex flex-wrap items-center gap-2 sm:justify-end"><Link href={`/workout/${workout.id}`} className="outline-button !px-3 !py-2.5">View Details</Link>{mode === 'plan' && onDone ? <button type="button" onClick={onDone} disabled={done} className="green-button !px-3 !py-2.5 disabled:opacity-40">{done ? <CheckCircle2 size={14} /> : <><Check size={14} /><span>Mark as Done</span></>}</button> : null}<button type="button" onClick={onRemove} className="outline-button !px-3 !py-2.5" aria-label="Remove"><Trash2 size={15} /></button></div>
    </article>
  );
}

function PlanFooter() {
  return <footer className="mt-16 border-t border-fit-line bg-fit-bg py-7"><div className="page-shell flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"><div className="flex items-center gap-2 text-xs font-black tracking-[0.16em] text-white"><span className="grid h-7 w-7 place-items-center rounded-sm bg-fit-green text-black">F</span>FITLOG</div><p className="m-0 text-[10px] leading-5 text-slate-600">© 2026 FitLog — Workout Library. Train hard, log honest.</p></div></footer>;
}

export default function MyPlanPage() {
  const { plan, saved, hydrated, removeFromPlan, markDone, removeFromSaved } = useFitlog();
  const [tab, setTab] = useState<PlanTab>('plan');
  const [sort, setSort] = useState<SortType>('duration');

  useEffect(() => {
    const requestedTab = new URLSearchParams(window.location.search).get('tab');
    if (requestedTab === 'saved') setTab('saved');
  }, []);

  const current = tab === 'plan' ? plan : saved;
  const completed = useMemo(() => plan.filter((item) => item.done).length, [plan]);
  const totals = useMemo(() => ({ exercises: current.length, minutes: current.reduce((sum, item) => sum + Number(item.duration || 0), 0), calories: current.reduce((sum, item) => sum + Number(item.caloriesBurned || 0), 0) }), [current]);
  const sorted = useMemo(() => [...current].sort((a, b) => {
    if (sort === 'duration') return Number(a.duration || 0) - Number(b.duration || 0);
    if (sort === 'calories') return Number(a.caloriesBurned || 0) - Number(b.caloriesBurned || 0);
    return Number(a.rating || 0) - Number(b.rating || 0);
  }), [current, sort]);

  function changeTab(next: PlanTab) {
    setTab(next);
    window.history.replaceState(null, '', next === 'saved' ? '/my-plan?tab=saved' : '/my-plan');
  }

  return (
    <>
      <PlanNavbar />
      <main className="page-shell min-h-[65vh] py-10 sm:py-12">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><span className="eyebrow">Your log</span><h1 className="mb-0 mt-2 text-4xl font-black uppercase tracking-[-0.04em]">My Plan</h1><p className="mb-0 mt-2 max-w-xl text-sm text-slate-400">Cap of five lifts for today. Finish them, then load more.</p></div><Link href="/#library" className="green-button">Browse workouts</Link></div>

        <div className="mb-7 grid gap-3 sm:grid-cols-3"><Metric label="Exercises" value={totals.exercises} icon={Trophy} /><Metric label="Minutes" value={totals.minutes} icon={Timer} /><Metric label="Calories" value={totals.calories} icon={Flame} /></div>

        <div className="mb-6 flex items-center justify-between gap-4 border-b border-fit-line"><div className="flex gap-5"><button type="button" onClick={() => changeTab('plan')} className={`relative pb-4 text-[10px] font-black uppercase tracking-[0.16em] ${tab === 'plan' ? 'text-fit-green' : 'text-slate-500 hover:text-white'}`}>Today&apos;s Plan <span className="ml-1 rounded-full bg-fit-panel2 px-2 py-1 text-[9px]">{plan.length}</span>{tab === 'plan' ? <i className="absolute inset-x-0 bottom-0 h-0.5 bg-fit-green" /> : null}</button><button type="button" onClick={() => changeTab('saved')} className={`relative flex items-center gap-2 pb-4 text-[10px] font-black uppercase tracking-[0.16em] ${tab === 'saved' ? 'text-fit-green' : 'text-slate-500 hover:text-white'}`}><Bookmark size={12} />Saved<span className="rounded-full bg-fit-panel2 px-2 py-1 text-[9px]">{saved.length}</span>{tab === 'saved' ? <i className="absolute inset-x-0 bottom-0 h-0.5 bg-fit-green" /> : null}</button></div>{tab === 'plan' ? <span className="hidden items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-slate-500 sm:flex"><Check size={13} className="text-fit-green" />{completed} done</span> : null}</div>

        {!hydrated ? (
          <div className="panel flex min-h-52 items-center justify-center rounded-sm"><div className="flex flex-col items-center gap-4"><span className="h-8 w-8 animate-spin rounded-full border-2 border-fit-line border-t-fit-green" /><span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">Loading workouts…</span></div></div>
        ) : current.length ? (
          <section>
            <div className="mb-4 flex justify-end"><label className="flex items-center gap-3 text-[10px] font-black uppercase tracking-wider text-slate-500">Sort By<span className="relative"><select value={sort} onChange={(event) => setSort(event.target.value as SortType)} className="appearance-none rounded-full border border-fit-line bg-fit-panel py-2.5 pl-4 pr-9 text-[10px] font-black text-white outline-none focus:border-fit-green"><option value="duration">Duration</option><option value="calories">Calories</option><option value="rating">Rating</option></select><ChevronDown size={13} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-fit-green" /></span></label></div>
            <div className="grid gap-3">{sorted.map((workout) => <PlanListItem key={workout.id} workout={workout} mode={tab} done={tab === 'plan' ? Boolean(workout.done) : false} onDone={tab === 'plan' ? () => markDone(workout.id) : undefined} onRemove={() => tab === 'plan' ? removeFromPlan(workout.id) : removeFromSaved(workout.id)} />)}</div>
          </section>
        ) : (
          <section className="panel flex min-h-64 flex-col items-center justify-center rounded-sm p-8 text-center"><span className="eyebrow">Nothing here yet</span><h2 className="mb-0 mt-2 text-xl font-black uppercase">Nothing here yet</h2><p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">{tab === 'saved' ? 'Save a lift from the library to keep it here for later.' : 'Browse the library and add a lift to get today moving.'}</p><Link href="/#library" className="green-button mt-5">Go to workouts</Link></section>
        )}
      </main>
      <PlanFooter />
    </>
  );
}
