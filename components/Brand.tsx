import Link from 'next/link';
import { Activity } from 'lucide-react';

export default function Brand() {
  return (
    <Link href="/" aria-label="FitLog home" className="group inline-flex items-center gap-2">
      <span className="grid h-9 w-9 place-items-center rounded-sm bg-fit-green text-black transition-transform duration-200 group-hover:rotate-3">
        <Activity size={19} strokeWidth={2.5} />
      </span>
      <span className="text-sm font-black tracking-[0.18em] text-white">FITLOG</span>
    </Link>
  );
}
