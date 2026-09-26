import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return <main className="grid min-h-screen place-items-center px-5"><div className="max-w-md text-center"><span className="eyebrow">404 / page not found</span><h1 className="mb-0 mt-4 text-5xl font-black uppercase tracking-tighter">Wrong turn.</h1><p className="my-4 text-sm leading-6 text-slate-400">This page isn’t part of the FitLog training plan. Head back to the library and choose another movement.</p><Link href="/" className="green-button"><ArrowLeft size={14} /> Back to library</Link></div></main>;
}
