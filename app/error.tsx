'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return <main className="grid min-h-screen place-items-center px-5"><div className="panel max-w-md rounded-sm p-8 text-center"><span className="eyebrow">Something went off track</span><h1 className="mb-0 mt-3 text-3xl font-black uppercase">Let’s reset the set.</h1><p className="text-sm leading-6 text-slate-400">The page hit an unexpected error. Try loading it again or return to the workout library.</p><div className="mt-5 flex justify-center gap-3"><button type="button" onClick={reset} className="green-button">Try again</button><Link href="/" className="outline-button">Home</Link></div></div></main>;
}
