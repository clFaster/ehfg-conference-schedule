interface SessionMetricsProps {
  progress?: number; // 0-100
  progressValueClass?: string; // color for progress value
  countdownLabel?: string; // e.g. 12m or 1h 20m
  countdownClass?: string; // color for countdown value (usually cfg.label)
}

export function SessionMetrics({
  progress,
  progressValueClass = '',
  countdownLabel,
  countdownClass = '',
}: SessionMetricsProps) {
  if (typeof progress === 'number') {
    return (
      <div className="flex flex-col items-end">
        <span className="text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-3xl 5xl:text-4xl uppercase tracking-wide text-neutral-300">
          Progress
        </span>
        <span className={`text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl 4xl:text-5xl 5xl:text-6xl font-bold ${progressValueClass}`}>
          {progress.toFixed(0)}%
        </span>
      </div>
    );
  }
  if (countdownLabel) {
    return (
      <div className="flex flex-col items-end">
        <span className="text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-3xl 5xl:text-4xl uppercase tracking-wide text-neutral-300">
          Starts in
        </span>
        <span
          className={`text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl 3xl:text-5xl 4xl:text-6xl 5xl:text-7xl font-bold ${countdownClass}`}
        >
          {countdownLabel}
        </span>
      </div>
    );
  }
  return null;
}
