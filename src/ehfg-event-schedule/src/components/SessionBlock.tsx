import { Session } from '../types/session';
import { getSessionProgress, getCountdown } from '../utils/session-utils';
import { COLOR_CFG } from '../utils/colors';
import SpeakersTicker from './SpeakersSection';
import OrganizedByTicker from './HeadlineTicker';
import { SessionTiming } from './SessionTiming';
import { SessionMetrics } from './SessionMetrics';
import { SessionTitleSection } from './SessionTitleSection';
import { SessionProgressBar } from './SessionProgressBar';

interface SessionBlockProps {
  session: Session;
  variant: 'current' | 'upcoming';
  now: Date;
}

export default function SessionBlock({
  session,
  variant,
  now,
}: SessionBlockProps) {
  const isCurrent = variant === 'current';
  const isNetworking = session.eventcategory
    .toLowerCase()
    .includes('networking');
  const cfg = isNetworking
    ? COLOR_CFG.networking
    : isCurrent
      ? COLOR_CFG.current
      : COLOR_CFG.next;

  const progress = isCurrent ? getSessionProgress(session, now) : undefined;
  const countdown = !isCurrent ? getCountdown(session, now) : null;
  const label = isCurrent ? 'Now' : 'Next';

  return (
    <div
      className={`relative rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6 xl:p-7 2xl:p-8 3xl:p-10 4xl:p-12 5xl:p-14 overflow-hidden border ${cfg.border} flex flex-col backdrop-blur-[12px] sm:backdrop-blur-[16px] md:backdrop-blur-[20px] lg:backdrop-blur-[24px] saturate-[120%] sm:saturate-[130%] md:saturate-[150%] lg:saturate-[180%] brightness-[110%] sm:brightness-[115%] md:brightness-[120%] bg-gradient-to-br from-white/20 sm:from-white/25 md:from-white/30 to-white/10 sm:to-white/15 md:to-white/20 shadow-[0_8px_24px_rgba(0,0,0,0.4),0_2px_8px_rgba(0,0,0,0.3)] sm:shadow-[0_12px_32px_rgba(0,0,0,0.5),0_3px_10px_rgba(0,0,0,0.35)] md:shadow-[0_16px_40px_rgba(0,0,0,0.6),0_4px_12px_rgba(0,0,0,0.4)] animate-fadeInUp`}
    >
      <div
        className={`absolute inset-0 opacity-15 pointer-events-none bg-gradient-to-br ${cfg.accentFrom} via-transparent ${cfg.accentTo}`}
      />
      <div className="flex items-start justify-between relative z-10">
        <SessionTiming session={session} label={label} labelClass={cfg.label} />
        <SessionMetrics
          progress={progress}
          progressValueClass={cfg.value}
          countdownLabel={countdown?.label}
          countdownClass={cfg.label}
        />
      </div>
      <div className="mt-3 sm:mt-4 md:mt-5 lg:mt-6 xl:mt-7 2xl:mt-6 3xl:mt-8 4xl:mt-8 5xl:mt-8 relative z-10">
        <SessionTitleSection
          shortId={session.eventshortid}
          title={session.eventname}
          badgeClass={cfg.label}
          subtitle={session.subtitle}
          subtitleClass={cfg.subtitle}
        />
        {session.headline && (
          <div className="mb-2 sm:mb-3 md:mb-3 lg:mb-3 xl:mb-3 2xl:mb-3 3xl:mb-3 4xl:mb-5 5xl:mb-5 relative z-10">
            <OrganizedByTicker headline={session.headline} />
          </div>
        )}
        {session.speakers && session.speakers.length > 0 && (
          <SpeakersTicker speakers={session.speakers} />
        )}
        {typeof progress === 'number' && (
          <SessionProgressBar
            progress={progress}
            accentFrom={cfg.accentFrom}
            accentTo={cfg.accentTo}
          />
        )}
      </div>
    </div>
  );
}
