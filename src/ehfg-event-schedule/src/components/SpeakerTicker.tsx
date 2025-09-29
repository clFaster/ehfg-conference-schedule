import React from 'react';
import { Speaker } from '../types/speaker';
import { useTickerAnimation } from '../hooks';
import { SpeakerCard } from './';

interface SpeakerTickerProps {
  speakers: Speaker[];
  className?: string;
}

export default function SpeakerTicker({
  speakers,
  className = '',
}: SpeakerTickerProps) {
  const { containerRef, contentRef, shouldAnimate, animationStyle } =
    useTickerAnimation({
      content: speakers,
      durationFactor: 5,
      minDuration: 15,
    });

  if (!speakers || speakers.length === 0) return null;
  return (
    <div className={`mt-2 ${className}`}>
      <p className="text-sm text-neutral-300 mb-3 3xl:text-2xl 4xl:text-3xl 5xl:text-3xl">
        Speakers:
      </p>
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-lg bg-black/10 backdrop-blur-sm border border-white/10"
      >
        <div className="flex py-3 px-4" style={animationStyle}>
          <div ref={contentRef} className="flex space-x-4 flex-shrink-0">
            {speakers.map((speaker, idx) => (
              <SpeakerCard
                key={`${speaker.speaker}-${idx}`}
                speaker={speaker}
              />
            ))}
          </div>

          {/* Gap between copies */}
          {shouldAnimate && <div className="w-4 flex-shrink-0" />}

          {/* Second copy for seamless loop - only render if animating */}
          {shouldAnimate && (
            <div className="flex space-x-4 flex-shrink-0">
              {speakers.map((speaker, idx) => (
                <SpeakerCard
                  key={`${speaker.speaker}-duplicate-${idx}`}
                  speaker={speaker}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
