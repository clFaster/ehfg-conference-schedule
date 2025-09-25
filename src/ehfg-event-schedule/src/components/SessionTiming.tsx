import { formatClock, parseStart, parseEnd } from '../utils/session-utils';
import { Session } from '../types/session';

interface SessionTimingProps {
  session: Session;
  label: string; // e.g. Now | Next | Networking
  labelClass: string;
}

export function SessionTiming({
  session,
  label,
  labelClass,
}: SessionTimingProps) {
  const start = parseStart(session);
  const end = parseEnd(session);

  return (
    <div className="flex flex-col">
      <span
        className={`text-[0.7rem] tracking-widest font-semibold uppercase ${labelClass}`}
      >
        {label}
      </span>
      <span className="text-s text-neutral-300 mt-1">
        {formatClock(start)} - {formatClock(end)}
      </span>
      <span className="text-s text-neutral-400 mt-0.5 italic">
        {session.location}
      </span>
    </div>
  );
}
