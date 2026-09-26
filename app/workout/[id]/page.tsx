'use client';

import Link from 'next/link';
import { ArrowLeft, Bookmark, Check, CheckCircle2, Clock3, Dumbbell, Flame, Menu, Plus, Star, X } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFitlog } from '@/context/FitlogContext';
import type { Workout } from '@/lib/types';

function DetailsNavbar() {
  const { planCount, savedCount } = useFitlog();
  const [open, setOpen] = useState(false);
  return <header className="sticky top-0 z-50 border-b border-fit-line bg-fit-bg/95 backdrop-blur-xl"><div className="page-shell flex h-16 items-center justify-between gap-4 sm:h-[72px]"><Link href="/" className="inline-flex items-center gap-2"><span className="grid h-9 w-9 place-items-center rounded-sm bg-fit-green text-black">F</span><span className="text-sm font-black tracking-[0.18em] text-white">FITLOG</span></Link><nav className="hidden items-center gap-1 md:flex"><Link href="/" className="rounded-full bg-fit-green px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-black">Workout</Link><Link href="/my-plan" className="rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-slate-500 hover:text-white">My Plan</Link></nav><div className="hidden items-center gap-2 md:flex"><Link href="/my-plan" className="rounded-full bg-fit-green px-3.5 py-2 text-[10px] font-black uppercase tracking-wider text-black">Plan {planCount}</Link><Link href="/my-plan?tab=saved" className="rounded-full border border-fit-green/60 px-3.5 py-2 text-[10px] font-black uppercase tracking-wider text-slate-200">Saved {savedCount}</Link></div><button type="button" onClick={() => setOpen((value) => !value)} className="grid h-9 w-9 place-items-center rounded-full border border-fit-line text-white md:hidden">{open ? <X size={17} /> : <Menu size={17} />}</button></div>{open ? <div className="border-t border-fit-line bg-fit-bg px-4 py-4 md:hidden"><div className="page-shell grid gap-2"><Link href="/" onClick={() => setOpen(false)} className="rounded-full border border-fit-green bg-fit-green px-4 py-3 text-[10px] font-black uppercase tracking-wider text-black">Workout</Link><Link href="/my-plan" onClick={() => setOpen(false)} className="rounded-full border border-fit-line px-4 py-3 text-[10px] font-black uppercase tracking-wider text-slate-300">My Plan</Link></div></div> : null}</header>;
}

function DetailsFooter() {
  return <footer className="mt-16 border-t border-fit-line bg-fit-bg py-7"><div className="page-shell flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"><div className="flex items-center gap-2 text-xs font-black tracking-[0.16em] text-white"><span className="grid h-7 w-7 place-items-center rounded-sm bg-fit-green text-black">F</span>FITLOG</div><p className="m-0 text-[10px] leading-5 text-slate-600">© 2026 FitLog — Workout Library. Train hard, log honest.</p></div></footer>;
}

function parseWorkout(result: unknown, fallbackId: string): Workout {
  const payload = result as { workout?: unknown; data?: unknown };
  const value = ((payload?.workout ?? payload?.data ?? result) ?? {}) as Record<string, unknown>;
  return {
    id: Number(value.id ?? fallbackId) || Number(fallbackId),
    name: String(value.name ?? value.title ?? 'Workout'),
    image: String(value.image ?? value.imageUrl ?? value.thumbnail ?? value.photo ?? ''),
    muscleGroups: Array.isArray(value.muscleGroups) ? value.muscleGroups.map(String) : Array.isArray(value.muscles) ? value.muscles.map(String) : [],
    equipment: String(value.equipment ?? 'Bodyweight'),
    difficulty: String(value.difficulty ?? 'All levels'),
    sets: Number(value.sets ?? 3),
    reps: String(value.reps ?? '8–12'),
    duration: Number(value.duration ?? value.durationMinutes ?? 0),
    caloriesBurned: Number(value.caloriesBurned ?? value.calories ?? 0),
    rating: Number(value.rating ?? 0),
    description: String(value.description ?? ''),
    instructions: Array.isArray(value.instructions) ? value.instructions.map(String) : [],
  };
}

export default function WorkoutDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { workouts, addToPlan, addToSaved, isInPlan, isSaved } = useFitlog();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [missing, setMissing] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true); setMissing(false); setFailed(false);
      const local = workouts.find((item) => String(item.id) === id);
      if (local) { setWorkout(local); setLoading(false); return; }
      try {
        const response = await fetch(`/api/fitlog/${encodeURIComponent(id)}`, { cache: 'no-store' });
        if (response.status === 404) { if (!cancelled) setMissing(true); return; }
        if (!response.ok) throw new Error('failed');
        const parsed = parseWorkout(await response.json(), id);
        if (!cancelled) setWorkout(parsed);
      } catch { if (!cancelled) setFailed(true); }
      finally { if (!cancelled) setLoading(false); }
    }
    void load();
    return () => { cancelled = true; };
  }, [id, workouts]);

  const inPlan = workout ? isInPlan(workout.id) : false;
  const saved = workout ? isSaved(workout.id) : false;

  return <><DetailsNavbar /><main className="page-shell min-h-[65vh] py-8 sm:py-10">
    {loading ? <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4"><span className="h-8 w-8 animate-spin rounded-full border-2 border-fit-line border-t-fit-green" /><span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">Loading workout details</span></div> : failed ? <div className="panel rounded-sm p-10 text-center"><span className="eyebrow">Connection interrupted</span><h1 className="mt-3 text-3xl font-black uppercase">Workout details unavailable.</h1><p className="my-3 text-sm text-slate-400">The workout service could not load this movement. Please try again later.</p><Link href="/" className="green-button mt-2">Back to library</Link></div> : missing || !workout ? <div className="panel rounded-sm p-10 text-center"><span className="eyebrow">404 / workout not found</span><h1 className="mt-3 text-3xl font-black uppercase">This lift isn&apos;t here.</h1><Link href="/" className="green-button mt-5">Back to library</Link></div> : <>
      <Link href="/#library" className="mb-7 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-fit-green"><ArrowLeft size={14} /> Workout library</Link>
      <div className="grid gap-7 lg:grid-cols-2">
        <div className="relative min-h-[360px] overflow-hidden rounded-sm border border-fit-line bg-fit-panel2 sm:min-h-[540px]">{workout.image ? <img src={workout.image} alt={workout.name} className="absolute inset-0 h-full w-full object-cover" /> : <div className="absolute inset-0 grid place-items-center text-8xl font-black uppercase text-fit-green/30">{workout.name.slice(0, 2)}</div>}<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" /></div>
        <div className="flex flex-col justify-center"><span className="eyebrow">Workout details</span><h1 className="mb-0 mt-3 text-4xl font-black uppercase leading-[0.95] tracking-[-0.05em] sm:text-5xl">{workout.name}</h1><p className="mt-5 text-sm leading-7 text-slate-400">{workout.description || 'A focused movement for building strength and consistent training habits.'}</p><div className="mt-5 flex flex-wrap gap-2">{workout.muscleGroups.map((muscle) => <span key={muscle} className="rounded-full bg-fit-green px-3 py-1.5 text-[9px] font-black uppercase tracking-wider text-black">{muscle}</span>)}</div>
          <section className="mt-6 overflow-hidden rounded-sm border border-fit-line bg-fit-panel"><div className="border-b border-fit-line px-4 py-3 text-[10px] font-black uppercase tracking-[0.18em] text-fit-green">Key Specs</div><div className="grid grid-cols-2 sm:grid-cols-3">
            {[['Equipment', workout.equipment, Dumbbell], ['Difficulty', workout.difficulty, CheckCircle2], ['Sets', String(workout.sets), Dumbbell], ['Reps', workout.reps, Check], ['Duration', `${workout.duration} min`, Clock3], ['Calories', `${workout.caloriesBurned} kcal`, Flame], ['Rating', workout.rating.toFixed(1), Star]].map(([label, value, Icon]) => { const IconComponent = Icon as typeof Dumbbell; return <div key={String(label)} className="border-b border-r border-fit-line p-3"><div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-500"><IconComponent size={12} className="text-fit-green" />{label}</div><p className="mb-0 mt-2 text-xs font-bold text-white">{value as string}</p></div>; })}
          </div></section>
          <div className="mt-6 flex flex-wrap gap-3"><button type="button" onClick={() => workout && addToPlan(workout)} disabled={inPlan} className="green-button disabled:cursor-default disabled:opacity-70">{inPlan ? <><Check size={14} /> In today&apos;s plan</> : <><Plus size={14} /> Add to today&apos;s plan</>}</button><button type="button" onClick={() => workout && addToSaved(workout)} className="outline-button"><Bookmark size={14} className={saved ? 'fill-fit-green text-fit-green' : ''} />{saved ? 'Saved' : 'Save for later'}</button></div>
        </div>
      </div>

      <section className="mt-12"><span className="eyebrow">Instructions</span><h2 className="mb-5 mt-2 text-2xl font-black uppercase">How to perform</h2>{workout.instructions.length ? <ol className="grid gap-3 md:grid-cols-2">{workout.instructions.slice(0, 4).map((step, index) => <li key={`${index}-${step}`} className="panel flex gap-4 rounded-sm p-5"><span className="font-black text-fit-green">{String(index + 1).padStart(2, '0')}</span><p className="m-0 text-sm leading-6 text-slate-300">{step}</p></li>)}</ol> : <p className="text-sm text-slate-400">Follow a controlled range of motion and choose a load you can manage with good form.</p>}</section>
    </>}
  </main><DetailsFooter /></>;
}
