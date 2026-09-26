import Link from 'next/link';
import { Activity } from 'lucide-react';
import SectionHeading from '../SectionHeading';

export default function PlanHeader() {
  return (
    <SectionHeading
      eyebrow="Your log"
      title="My Plan"
      description="Cap of five lifts for today. Finish them, then load more."
      action={
        <Link href="/#library" className="green-button">
          Browse workouts
          <Activity size={14} aria-hidden="true" />
        </Link>
      }
    />
  );
}
