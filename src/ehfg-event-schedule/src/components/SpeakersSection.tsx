import React, { useState, useEffect } from 'react';
import { Speaker } from '../types/speaker';
import { SpeakerCard } from '.';

interface SpeakerTickerProps {
  speakers: Speaker[];
  className?: string;
}

export default function SpeakersSection({
  speakers,
  className = '',
}: SpeakerTickerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Group speakers into pairs
  const speakerPairs = React.useMemo(() => {
    const pairs: Speaker[][] = [];
    for (let i = 0; i < speakers.length; i += 2) {
      pairs.push(speakers.slice(i, i + 2));
    }
    return pairs;
  }, [speakers]);

  // Switch between speaker pairs every 5 seconds
  useEffect(() => {
    if (speakerPairs.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % speakerPairs.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [speakerPairs.length]);

  if (!speakers || speakers.length === 0) return null;

  const currentSpeakers = speakerPairs[currentIndex] || [];

  return (
    <div className={`mt-2 ${className}`}>
      <p className="text-sm text-neutral-100 mb-3 3xl:text-2xl 4xl:text-3xl 5xl:text-3xl font-medium">
        Speakers:
      </p>
      <div className="relative overflow-hidden rounded-lg bg-white/10 border border-white/10">
        <div className="flex py-3 px-4 gap-4">
          {currentSpeakers.map((speaker, idx) => (
            <div
              key={`${speaker.speaker}-${currentIndex}-${idx}`}
              className="flex-1 max-w-[calc(50%-0.5rem)]"
            >
              <SpeakerCard speaker={speaker} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
