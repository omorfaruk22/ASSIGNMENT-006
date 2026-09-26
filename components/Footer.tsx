import { Activity } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-fit-line bg-fit-bg py-7">
      <div className="page-shell flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2 text-xs font-black tracking-[0.16em] text-white">
          <Activity size={15} className="text-fit-green" />
          FITLOG
        </div>
        <p className="m-0 text-[10px] leading-5 text-slate-600">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
