'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useFitlog } from '@/context/FitlogContext';

export default function Hero() {
  const { workouts, planCount, savedCount } = useFitlog();
  const heroWorkout = workouts[0];

  return (
    <section className="border-b border-fit-line">
      <div className="page-shell py-7 sm:py-9">
        <div className="overflow-hidden rounded-sm border border-fit-line bg-fit-panel">
          <div className="grid min-h-[330px] md:grid-cols-[1.05fr_.95fr]">
            <div className="relative flex flex-col justify-center p-7 sm:p-10 lg:p-12">
              <span className="eyebrow">Workout library</span>
              <h1 className="mt-4 max-w-xl text-4xl font-black uppercase leading-[0.96] tracking-[-0.055em] sm:text-5xl lg:text-6xl">
                Train with intent.
                <br />
                Log every set.
              </h1>
              <p className="mt-5 max-w-xl text-xs leading-6 text-slate-400 sm:text-sm">
                FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-2">
                <Link href="#library" className="green-button">
                  Browse workouts
                  <ArrowRight size={14} />
                </Link>
                <Link href="/my-plan" className="outline-button">
                  Plan {planCount}
                </Link>
                <Link href="/my-plan?tab=saved" className="outline-button">
                  Saved {savedCount}
                </Link>
              </div>
            </div>

            <div className="relative min-h-[250px] overflow-hidden bg-fit-panel2 md:min-h-full">
              {heroWorkout?.image ? (
                <img
                  src={heroWorkout.image}
                  alt={`${heroWorkout.name} workout`}
                  className="absolute inset-0 h-full w-full object-cover"
                />
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
