import { Session } from '../types/session';
import { getSessionProgress, getCountdown, parseStart, parseEnd } from '../utils/session-utils';
import { COLOR_CFG } from '../utils/colors';
import SpeakerTicker from './SpeakerTicker';

interface SessionBlockProps {
  session: Session;
  variant: 'current' | 'upcoming';
  now: Date;
}

export default function SessionBlock({ session, variant, now }: SessionBlockProps) {
  const isCurrent = variant === 'current';
  const isNetworking = session.eventcategory.toLowerCase().includes('networking');
  const cfg = isNetworking ? COLOR_CFG.networking : (isCurrent ? COLOR_CFG.current : COLOR_CFG.next);

  const progress = isCurrent ? getSessionProgress(session, now) : 0;
  const countdown = !isCurrent ? getCountdown(session, now) : null;

  return (
    <div className={`relative rounded-2xl p-6 overflow-hidden border ${cfg.border} flex flex-col backdrop-blur-[20px] md:backdrop-blur-[16px] sm:backdrop-blur-[12px] saturate-[180%] md:saturate-[130%] sm:saturate-[120%] brightness-[120%] bg-gradient-to-br from-white/25 to-white/15 shadow-[0_16px_40px_rgba(0,0,0,0.6),0_4px_12px_rgba(0,0,0,0.4)] animate-fadeInUp`}>
      <div className={`absolute inset-0 opacity-15 pointer-events-none bg-gradient-to-br ${cfg.accentFrom} via-transparent ${cfg.accentTo}`} />
        <div className="flex items-start justify-between relative z-10">
        <div className="flex flex-col">
          <span className={`text-[0.7rem] tracking-widest font-semibold uppercase ${cfg.label}`}>
            {isNetworking ? 'Networking' : (isCurrent ? 'Now' : 'Next')}
          </span>
          <span className="text-xs text-neutral-300 mt-1">
            {parseStart(session).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })} - {parseEnd(session).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })}
          </span>
          <span className="text-xs text-neutral-400 mt-0.5 italic">
            {session.location}
          </span>
        </div>
        {isCurrent && (
          <div className="flex flex-col items-end">
            <span className="text-xs uppercase tracking-wide text-neutral-300">Progress</span>
            <span className={`text-lg font-bold ${cfg.value}`}>{progress.toFixed(0)}%</span>
          </div>
        )}
        {countdown && (
          <div className="flex flex-col items-end">
            <span className="text-xs uppercase tracking-wide text-neutral-300">Starts in</span>
            <span className={`text-xl font-bold ${cfg.label} animate-countdownPulse`}>{countdown.label}</span>
          </div>
        )}
      </div>      <div className="mt-6 relative z-10">
        <div className="mb-3">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${cfg.label} bg-black/20 backdrop-blur-sm border border-white/10`}>
            {session.eventshortid}
          </span>
        </div>
        <h3 className="text-2xl leading-relaxed font-bold mb-2 text-white relative z-10 rounded-lg px-2 py-1 bg-black/10 backdrop-blur-sm line-clamp-3 shadow-lg">
          {session.eventname}
        </h3>
        {session.subtitle && (
          <p className={`text-lg font-medium mb-3 line-clamp-2 relative z-10 ${cfg.subtitle}`}>
            {session.subtitle}
          </p>        )}
        
        {session.speakers && session.speakers.length > 0 && (
          <SpeakerTicker speakers={session.speakers} />
        )}

        {isCurrent && (
          <div className="mt-4 w-full bg-neutral-700/50 rounded-full h-2 overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${cfg.accentFrom} ${cfg.accentTo} transition-all duration-300`} 
              style={{ width: `${progress}%` }} 
            />
          </div>
        )}
      </div>
    </div>
  );
}
