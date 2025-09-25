import { useRef, useEffect, useState, useMemo } from 'react';

interface UseTickerAnimationOptions {
  /** The content that determines if animation should play (e.g., headline text or speakers array) */
  content: string | unknown[];
  /** Base duration calculation factor */
  durationFactor?: number;
  /** Minimum animation duration in seconds */
  minDuration?: number;
}

export function useTickerAnimation({
  content,
  durationFactor = 3,
  minDuration = 15,
}: UseTickerAnimationOptions) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [moveDistance, setMoveDistance] = useState(0);

  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current && contentRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const contentWidth = contentRef.current.offsetWidth;
        const shouldAnimateNow = contentWidth > containerWidth;
        setShouldAnimate(shouldAnimateNow);

        if (shouldAnimateNow) {
          // Add 16px (w-4) for the gap between copies in SpeakerTicker
          const gap = Array.isArray(content) ? 16 : 0;
          setMoveDistance(contentWidth + gap);
        }
      }
    };

    checkOverflow();

    // Recheck on window resize
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [content]);

  // Calculate animation duration based on content
  const animationDuration = useMemo(() => {
    if (typeof content === 'string') {
      return Math.max(
        minDuration,
        Math.ceil(content.length / 8) * durationFactor
      );
    } else if (Array.isArray(content)) {
      return Math.max(minDuration, content.length * durationFactor);
    }
    return minDuration;
  }, [content, durationFactor, minDuration]);

  const animationStyle = useMemo(
    () =>
      ({
        animation: shouldAnimate
          ? `headline-scroll ${animationDuration}s linear infinite`
          : 'none',
        '--move-distance': shouldAnimate ? `-${moveDistance}px` : '0px',
      }) as React.CSSProperties & { '--move-distance': string },
    [shouldAnimate, animationDuration, moveDistance]
  );

  return {
    containerRef,
    contentRef,
    shouldAnimate,
    animationStyle,
  };
}
