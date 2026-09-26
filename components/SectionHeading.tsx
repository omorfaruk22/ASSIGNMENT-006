import type { ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

export default function SectionHeading({ eyebrow, title, description, action }: SectionHeadingProps) {
  return (
    <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="mb-0 mt-2 text-3xl font-black uppercase tracking-[-0.04em] text-white">{title}</h2>
        {description ? <p className="mb-0 mt-2 max-w-xl text-sm text-slate-400">{description}</p> : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}
