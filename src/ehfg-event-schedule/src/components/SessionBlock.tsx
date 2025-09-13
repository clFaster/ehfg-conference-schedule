import { Session } from "../types/session";
import { getSessionProgress, getCountdown } from "../utils/session-utils";
import { COLOR_CFG } from "../utils/colors";
import SpeakersTicker from "./SpeakerTicker";
import OrganizedByTicker from "./HeadlineTicker";
import { SessionTiming } from "./SessionTiming";
import { SessionMetrics } from "./SessionMetrics";
import { SessionTitleSection } from "./SessionTitleSection";
import { SessionProgressBar } from "./SessionProgressBar";

interface SessionBlockProps {
  session: Session;
  variant: "current" | "upcoming";
  now: Date;
}

export default function SessionBlock({
  session,
  variant,
  now,
}: SessionBlockProps) {
  const isCurrent = variant === "current";
  const isNetworking = session.eventcategory
    .toLowerCase()
    .includes("networking");
  const cfg = isNetworking
    ? COLOR_CFG.networking
    : isCurrent
      ? COLOR_CFG.current
      : COLOR_CFG.next;

  const progress = isCurrent ? getSessionProgress(session, now) : undefined;
  const countdown = !isCurrent ? getCountdown(session, now) : null;
  const label = isCurrent ? "Now" : "Next";

  return (
    <div
      className={`relative rounded-2xl p-5 overflow-hidden border ${cfg.border} flex flex-col backdrop-blur-[20px] md:backdrop-blur-[16px] sm:backdrop-blur-[12px] saturate-[180%] md:saturate-[130%] sm:saturate-[120%] brightness-[120%] bg-gradient-to-br from-white/25 to-white/15 shadow-[0_16px_40px_rgba(0,0,0,0.6),0_4px_12px_rgba(0,0,0,0.4)] animate-fadeInUp`}
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
      <div className="mt-6 relative z-10">
        <SessionTitleSection
          shortId={session.eventshortid}
          title={session.eventname}
          badgeClass={cfg.label}
          subtitle={session.subtitle}
          subtitleClass={cfg.subtitle}
        />
        {session.headline && (
          <div className="mb-3 relative z-10">
            <OrganizedByTicker headline={session.headline} />
          </div>
        )}
        {session.speakers && session.speakers.length > 0 && (
          <SpeakersTicker speakers={session.speakers} />
        )}
        {typeof progress === "number" && (
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
