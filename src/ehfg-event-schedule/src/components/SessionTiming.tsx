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
        className={`text-[0.6rem] sm:text-[0.7rem] md:text-[0.8rem] lg:text-sm xl:text-base 2xl:text-lg 3xl:text-xl 4xl:text-2xl 5xl:text-2xl tracking-widest font-semibold uppercase ${labelClass}`}
      >
        {label}
      </span>
      <span className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl 5xl:text-4xl text-neutral-100 mt-0.5 sm:mt-1 font-medium">
        {formatClock(start)} - {formatClock(end)}
      </span>
      <span className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl 5xl:text-4xl text-neutral-200 mt-0.5 italic">
        {session.location}
      </span>
    </div>
  );
}
