import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Toaster } from 'sonner';
import { FitlogProvider } from '@/context/FitlogContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'FitLog — Workout Library',
  description: 'Pick a lift, lock it into today’s plan, and watch the work add up.'
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="en"><body><FitlogProvider>{children}<Toaster theme="dark" position="bottom-right" richColors /></FitlogProvider></body></html>;
}
