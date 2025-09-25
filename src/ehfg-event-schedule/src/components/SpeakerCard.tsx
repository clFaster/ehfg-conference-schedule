import React from 'react';
import Image from 'next/image';
import { Speaker } from '../types/speaker';

interface SpeakerCardProps {
  speaker: Speaker;
}

export default function SpeakerCard({ speaker }: SpeakerCardProps) {
  return (
    <div className="flex items-center space-x-3 w-48 bg-white/5 rounded-lg p-2 border border-white/10 flex-shrink-0">
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
                parent.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">${speaker.speaker
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)}</div>`;
              }
            }}
          />
        </div>
      ) : (
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
          {speaker.speaker
            .split(' ')
            .map((n) => n[0])
            .join('')
            .slice(0, 2)}
        </div>
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
  );
}
