import React from "react";

interface HeadlineTickerProps {
  headline: string;
  className?: string;
}

export default function HeadlineTicker({
  headline,
  className = "",
}: HeadlineTickerProps) {
  if (!headline) return null;
  // Duplicate headline for seamless infinite scrolling
  const duplicated = [headline, headline];
  // Animation duration based on length (longer = slower)
  const animationDuration = Math.max(10, Math.ceil(headline.length / 10) * 4);
  // Move distance: estimate 1ch = 8px, so length * 8px
  const moveDistance = headline.length * 8;
  return (
    <div
      className={`w-full overflow-hidden rounded-lg border border-white/10 ${className}`}
    >
      <div
        className="flex whitespace-nowrap"
        style={
          {
            animation: `headline-scroll ${animationDuration}s linear infinite`,
            "--move-distance": `-${moveDistance}px`,
          } as React.CSSProperties & { "--move-distance": string }
        }
      >
        {duplicated.map((text, idx) => (
          <span
            key={idx}
            className="text-base font-medium px-4 py-2 flex-shrink-0"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
