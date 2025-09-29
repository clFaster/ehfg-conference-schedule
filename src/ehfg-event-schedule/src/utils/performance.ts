/**
 * Performance detection and optimization utilities
 */

export interface PerformanceConfig {
  isLowPerformance: boolean;
  disableAnimations: boolean;
  reducedMotion: boolean;
}

/**
 * Detects if the current device/browser likely has low performance capabilities
 */
export function detectLowPerformance(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false;
  }

  const userAgent = navigator.userAgent.toLowerCase();
  const hardwareConcurrency = navigator.hardwareConcurrency || 1;

  // Detect Raspberry Pi or other ARM devices
  const isARM =
    userAgent.includes('arm') ||
    userAgent.includes('raspberry') ||
    userAgent.includes('armv');

  // Check for low core count
  const isLowCore = hardwareConcurrency <= 2;

  // Check for older mobile devices
  const isOldMobile = /android [1-4]|iphone os [1-9]_/.test(userAgent);

  // Check for low pixel density (often correlates with older/slower devices)
  const isLowDensity = window.devicePixelRatio <= 1;

  // Check available memory (if supported)
  interface MemoryInfo {
    usedJSHeapSize?: number;
    totalJSHeapSize?: number;
  }

  const memoryInfo = (performance as unknown as { memory?: MemoryInfo }).memory;
  const isLowMemory = Boolean(
    memoryInfo &&
      typeof memoryInfo.usedJSHeapSize === 'number' &&
      typeof memoryInfo.totalJSHeapSize === 'number' &&
      memoryInfo.usedJSHeapSize > memoryInfo.totalJSHeapSize * 0.8
  );

  return isARM || (isLowCore && isLowDensity) || isOldMobile || isLowMemory;
}

/**
 * Checks if user has requested reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Gets comprehensive performance configuration for the current device
 */
export function getPerformanceConfig(): PerformanceConfig {
  const isLowPerformance = detectLowPerformance();
  const reducedMotion = prefersReducedMotion();

  return {
    isLowPerformance,
    disableAnimations: reducedMotion, // Respect user preference
    reducedMotion,
  };
}

/**
 * Performance monitoring utility - tracks animation frame drops
 */
export class PerformanceMonitor {
  private frameCount = 0;
  private lastTime = 0;
  private fps = 60;
  private isMonitoring = false;

  start() {
    if (this.isMonitoring) return;
    this.isMonitoring = true;
    this.lastTime = performance.now();
    this.frameCount = 0;
    this.tick();
  }

  stop() {
    this.isMonitoring = false;
  }

  getFPS(): number {
    return this.fps;
  }

  isPerformancePoor(): boolean {
    return this.fps < 30; // Consider < 30fps as poor performance
  }

  private tick = () => {
    if (!this.isMonitoring) return;

    const currentTime = performance.now();
    this.frameCount++;

    if (currentTime - this.lastTime >= 1000) {
      this.fps = Math.round(
        (this.frameCount * 1000) / (currentTime - this.lastTime)
      );
      this.frameCount = 0;
      this.lastTime = currentTime;
    }

    requestAnimationFrame(this.tick);
  };
}
