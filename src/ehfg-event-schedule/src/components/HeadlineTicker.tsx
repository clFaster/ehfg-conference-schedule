import React from 'react';
import { useTickerAnimation } from '../hooks';

interface HeadlineTickerProps {
  headline: string;
  className?: string;
  /** Force low performance mode for slower devices */
  lowPerformanceMode?: boolean;
  /** Completely disable animations for extreme performance cases */
  disableAnimation?: boolean;
}

const HeadlineTicker = React.memo(function HeadlineTicker({
  headline,
  className = '',
  lowPerformanceMode,
  disableAnimation = false,
}: HeadlineTickerProps) {
  const { containerRef, contentRef, shouldAnimate, animationStyle } =
    useTickerAnimation({
      content: headline,
      durationFactor: 3,
      minDuration: 15,
      lowPerformanceMode,
    });

  // Early return to avoid unnecessary rendering
  if (!headline?.trim()) return null;

  // If animations are completely disabled, show static text
  if (disableAnimation) {
    return (
      <div
        className={`w-full overflow-hidden rounded-lg border border-white/10 mt-4 ${className}`}
      >
        <div className="px-4 py-2">
          <span className="text-base font-medium 3xl:text-2xl 4xl:text-3xl 5xl:text-2xl">
            {headline}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`w-full overflow-hidden rounded-lg border border-white/10 mt-4 ${className}`}
    >
      <div className="flex whitespace-nowrap" style={animationStyle}>
        {/* First copy */}
        <span
          ref={contentRef}
          className="text-base font-medium px-4 py-2 flex-shrink-0 3xl:text-2xl 4xl:text-3xl 5xl:text-2xl"
        >
          {headline}
        </span>
        {/* Second copy for seamless loop - only render if animating */}
        {shouldAnimate && (
          <span className="text-base font-medium px-4 py-2 flex-shrink-0 3xl:text-2xl 4xl:text-3xl 5xl:text-2xl">
            {headline}
          </span>
        )}
      </div>
    </div>
  );
});

export default HeadlineTicker;
