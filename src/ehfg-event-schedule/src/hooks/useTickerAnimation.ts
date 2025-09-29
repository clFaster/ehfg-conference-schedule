import { useRef, useEffect, useState, useMemo, useCallback } from 'react';

interface UseTickerAnimationOptions {
  /** The content that determines if animation should play (e.g., headline text or speakers array) */
  content: string | unknown[];
  /** Base duration calculation factor */
  durationFactor?: number;
  /** Minimum animation duration in seconds */
  minDuration?: number;
}

interface AnimationState {
  shouldAnimate: boolean;
  moveDistance: number;
}

// Debounce utility for resize events
function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function useTickerAnimation({
  content,
  durationFactor = 3,
  minDuration = 15,
}: UseTickerAnimationOptions) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  // Combine related state to reduce re-renders
  const [animationState, setAnimationState] = useState<AnimationState>({
    shouldAnimate: false,
    moveDistance: 0,
  });

  // Memoize the overflow check function
  const checkOverflow = useCallback(() => {
    if (!containerRef.current || !contentRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const contentWidth = contentRef.current.offsetWidth;
    const shouldAnimateNow = contentWidth > containerWidth;

    // Only update state if values actually changed
    setAnimationState((prevState) => {
      const newMoveDistance = shouldAnimateNow
        ? contentWidth + (Array.isArray(content) ? 16 : 0)
        : 0;

      if (
        prevState.shouldAnimate === shouldAnimateNow &&
        prevState.moveDistance === newMoveDistance
      ) {
        return prevState; // No change, avoid re-render
      }

      return {
        shouldAnimate: shouldAnimateNow,
        moveDistance: newMoveDistance,
      };
    });
  }, [content]);

  // Debounced version for resize events
  const debouncedCheckOverflow = useMemo(
    () => debounce(checkOverflow, 150),
    [checkOverflow]
  );

  useEffect(() => {
    // Initial check
    checkOverflow();

    // Use ResizeObserver for better performance than window resize
    if (containerRef.current) {
      resizeObserverRef.current = new ResizeObserver(debouncedCheckOverflow);
      resizeObserverRef.current.observe(containerRef.current);
    }

    // Fallback to window resize for older browsers
    const handleResize = debouncedCheckOverflow;
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      resizeObserverRef.current?.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [checkOverflow, debouncedCheckOverflow]);

  // Calculate animation duration based on content (memoized for performance)
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

  // Memoize animation style to prevent unnecessary recalculations
  const animationStyle = useMemo(() => {
    if (!animationState.shouldAnimate) {
      return {
        animation: 'none',
        '--move-distance': '0px',
      } as React.CSSProperties & { '--move-distance': string };
    }

    return {
      animation: `headline-scroll ${animationDuration}s linear infinite`,
      '--move-distance': `-${animationState.moveDistance}px`,
    } as React.CSSProperties & { '--move-distance': string };
  }, [
    animationState.shouldAnimate,
    animationDuration,
    animationState.moveDistance,
  ]);

  return {
    containerRef,
    contentRef,
    shouldAnimate: animationState.shouldAnimate,
    animationStyle,
  };
}
