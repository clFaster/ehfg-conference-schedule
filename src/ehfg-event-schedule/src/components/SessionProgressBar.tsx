interface SessionProgressBarProps {
  progress: number; // 0-100
  accentFrom: string;
  accentTo: string;
  className?: string;
}

export function SessionProgressBar({
  progress,
  accentFrom,
  accentTo,
  className = 'mt-2 sm:mt-3 md:mt-4',
}: SessionProgressBarProps) {
  return (
    <div
      className={`${className} w-full bg-neutral-700/50 rounded-full h-1.5 sm:h-2 md:h-2.5 lg:h-3 xl:h-4 2xl:h-4 3xl:h-4 4xl:h-4 5xl:h-4 overflow-hidden`}
    >
      <div
        className={`h-full bg-gradient-to-r ${accentFrom} ${accentTo} transition-all duration-300`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
