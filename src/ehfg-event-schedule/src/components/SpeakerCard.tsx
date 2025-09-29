import React from 'react';
import Image from 'next/image';
import { Speaker } from '../types/speaker';

interface SpeakerCardProps {
  speaker: Speaker;
}

export default function SpeakerCard({ speaker }: SpeakerCardProps) {
  return (
    <div className="flex items-center space-x-2 sm:space-x-3 w-40 sm:w-44 md:w-48 lg:w-52 xl:w-56 2xl:w-64 3xl:w-72 4xl:w-80 5xl:w-96 bg-white/5 rounded-md sm:rounded-lg p-1.5 sm:p-2 md:p-3 lg:p-4 xl:p-5 2xl:p-6 3xl:p-7 4xl:p-8 5xl:p-10 border border-white/10 flex-shrink-0">
      {speaker.image ? (
        <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 xl:w-12 xl:h-12 2xl:w-14 2xl:h-14 3xl:w-16 3xl:h-16 4xl:w-20 4xl:h-20 5xl:w-24 5xl:h-24 rounded-full overflow-hidden bg-neutral-600 flex-shrink-0">
          <Image
            src={speaker.image}
            alt={speaker.speaker}
            width={44}
            height={44}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to initials if image fails to load
              const target = e.target as HTMLElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs sm:text-sm font-bold">${speaker.speaker
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)}</div>`;
              }
            }}
          />
        </div>
      ) : (
        <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 xl:w-12 xl:h-12 2xl:w-14 2xl:h-14 3xl:w-16 3xl:h-16 4xl:w-20 4xl:h-20 5xl:w-24 5xl:h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-3xl 5xl:text-4xl font-bold flex-shrink-0">
          {speaker.speaker
            .split(' ')
            .map((n) => n[0])
            .join('')
            .slice(0, 2)}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-3xl 5xl:text-4xl font-medium text-neutral-200 truncate">
          {speaker.speaker}
        </p>
        {speaker.organisation && (
          <p className="text-[10px] sm:text-xs md:text-xs lg:text-sm xl:text-base 2xl:text-lg 3xl:text-xl 4xl:text-2xl 5xl:text-3xl text-neutral-400 truncate">
            {speaker.organisation}
          </p>
        )}
      </div>
    </div>
  );
}
