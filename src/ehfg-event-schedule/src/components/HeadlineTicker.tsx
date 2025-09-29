import React from 'react';
import { useTickerAnimation } from '../hooks';

interface HeadlineTickerProps {
  headline: string;
  className?: string;
}

export default function HeadlineTicker({
  headline,
  className = '',
}: HeadlineTickerProps) {
  const { containerRef, contentRef, shouldAnimate, animationStyle } =
    useTickerAnimation({
      content: headline,
      durationFactor: 3,
      minDuration: 15,
    });

  if (!headline) return null;

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
}
