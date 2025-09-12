import { formatDateLong } from '../utils/session-utils';

interface NoSessionsProps {
  activeDate: string;
}

export default function NoSessions({ activeDate }: NoSessionsProps) {
  return (
    <div className="text-center py-20">
      <p className="text-2xl text-neutral-300">
        No more sessions scheduled for {activeDate ? formatDateLong(activeDate) : 'today'}
      </p>
    </div>
  );
}
