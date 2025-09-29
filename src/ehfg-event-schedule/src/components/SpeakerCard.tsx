import React from 'react';
import Image from 'next/image';
import { Speaker } from '../types/speaker';

interface SpeakerCardProps {
  speaker: Speaker;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function Avatar({ speaker }: { speaker: Speaker }) {
  const initials = getInitials(speaker.speaker);

  if (!speaker.image) {
    return (
      <div className="w-10 h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm lg:text-base font-bold flex-shrink-0">
        {initials}
      </div>
    );
  }

  return (
    <div className="w-10 h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 rounded-full overflow-hidden bg-neutral-600 flex-shrink-0">
      <Image
        src={speaker.image}
        alt={speaker.speaker}
        width={56}
        height={56}
        className="w-full h-full object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          const parent = target.parentElement;
          if (parent) {
            parent.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm lg:text-base font-bold">${initials}</div>`;
          }
        }}
      />
    </div>
  );
}

export default function SpeakerCard({ speaker }: SpeakerCardProps) {
  return (
    <div className="flex items-center gap-3 w-full bg-white/5 rounded-lg py-4 px-4 border border-white/10">
      <Avatar speaker={speaker} />
      <div className="flex-1 min-w-0">
        <p className="text-sm lg:text-base xl:text-lg 3xl:text-2xl 4xl:text-2xl 5xl:text-2xl font-medium text-white truncate">
          {speaker.speaker}
        </p>
        {speaker.organisation && (
          <p className="text-xs lg:text-sm 3xl:text-2xl 4xl:text-2xl 5xl:text-2xl text-neutral-300 truncate">
            {speaker.organisation}
          </p>
        )}
      </div>
    </div>
  );
}
