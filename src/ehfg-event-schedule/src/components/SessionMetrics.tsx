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
        <span className="text-xs uppercase tracking-wide text-neutral-300">
          Progress
        </span>
        <span className={`text-lg font-bold ${progressValueClass}`}>
          {progress.toFixed(0)}%
        </span>
      </div>
    );
  }
  if (countdownLabel) {
    return (
      <div className="flex flex-col items-end">
        <span className="text-xs uppercase tracking-wide text-neutral-300">
          Starts in
        </span>
        <span
          className={`text-xl font-bold ${countdownClass}`}
        >
          {countdownLabel}
        </span>
      </div>
    );
  }
  return null;
}
