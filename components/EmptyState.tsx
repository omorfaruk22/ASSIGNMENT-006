import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description: string;
  action?: boolean;
}

export default function EmptyState({
  title = 'Nothing here yet',
  description,
  action = true,
}: EmptyStateProps) {
  return (
    <section className="panel flex min-h-64 flex-col items-center justify-center rounded-sm p-8 text-center">
      <span className="eyebrow">Nothing here yet</span>
      <h3 className="mb-0 mt-2 text-xl font-black uppercase">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">{description}</p>
      {action ? (
        <Link href="/#library" className="green-button mt-5">
          Go to workouts
          <ArrowRight size={13} />
        </Link>
      ) : null}
    </section>
  );
}
