interface LoadingSpinnerProps {
  label?: string;
}

export default function LoadingSpinner({ label = 'Loading workouts…' }: LoadingSpinnerProps) {
  return (
    <div className="flex min-h-52 flex-col items-center justify-center gap-4 text-center" role="status" aria-live="polite">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-fit-line border-t-fit-green" aria-hidden="true" />
      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">{label}</span>
    </div>
  );
}
