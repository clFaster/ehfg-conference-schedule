import { Speaker } from '../types/speaker';
import Image from 'next/image';

interface SpeakerTickerProps {
  speakers: Speaker[];
  className?: string;
}

export default function SpeakerTicker({ speakers, className = '' }: SpeakerTickerProps) {
  if (!speakers || speakers.length === 0) return null;
  // Always duplicate speakers for seamless infinite scrolling
  const duplicatedSpeakers = [...speakers, ...speakers];
  
  // Calculate animation duration based on number of speakers (more speakers = slower scroll)
  const animationDuration = speakers.length * 3;
  
  // Calculate the exact width to move - each speaker card is 192px + 16px spacing
  const speakerWidth = 208; // w-48 (192px) + space-x-4 (16px)
  const moveDistance = speakers.length * speakerWidth;
  return (
    <div className={`mt-4 ${className}`}>
      <p className="text-sm text-neutral-300 mb-3">Speakers:</p>
      <div className="relative overflow-hidden rounded-lg bg-black/10 backdrop-blur-sm border border-white/10">        <div 
          className="flex space-x-4 py-3 px-4"
          style={{
            animation: `speaker-scroll ${animationDuration}s linear infinite`,
            '--move-distance': `-${moveDistance}px`,
          } as React.CSSProperties & { '--move-distance': string }}
        >
          {duplicatedSpeakers.map((speaker, idx) => (
            <div 
              key={`${speaker.speaker}-${idx}`}
              className="flex items-center space-x-3 w-48 bg-white/5 rounded-lg p-2 border border-white/10 flex-shrink-0"
            >
              {speaker.image ? (
                <div className="w-10 h-10 rounded-full overflow-hidden bg-neutral-600 flex-shrink-0">
                  <Image
                    src={speaker.image}
                    alt={speaker.speaker}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to initials if image fails to load
                      const target = e.target as HTMLElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">${speaker.speaker.split(' ').map(n => n[0]).join('').slice(0, 2)}</div>`;
                      }
                    }}
                  />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {speaker.speaker.split(' ').map(n => n[0]).join('').slice(0, 2)}                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-neutral-200 truncate">
                  {speaker.speaker}
                </p>
                {speaker.organisation && (
                  <p className="text-xs text-neutral-400 truncate">
                    {speaker.organisation}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
