/**
 * Performance configuration for the application
 * Modify these settings to optimize for your specific hardware
 */

export interface AppPerformanceSettings {
  /** Force low performance mode globally (useful for Raspberry Pi) */
  forceLowPerformanceMode: boolean;
  /** Completely disable all animations */
  disableAllAnimations: boolean;
  /** Use hardware acceleration hints */
  useHardwareAcceleration: boolean;
  /** Increase animation durations for smoother playback on slow devices */
  slowAnimationMultiplier: number;
}

/**
 * Default performance settings
 * For Raspberry Pi or low-end devices, consider:
 * - Set forceLowPerformanceMode: true
 * - Set disableAllAnimations: true for extremely poor performance
 * - Increase slowAnimationMultiplier to 2.0 or higher
 */
export const defaultPerformanceSettings: AppPerformanceSettings = {
  forceLowPerformanceMode: false, // Set to true for Raspberry Pi
  disableAllAnimations: false, // Set to true for extreme performance issues
  useHardwareAcceleration: true, // Usually helps, but can be disabled if causing issues
  slowAnimationMultiplier: 1.0, // Set to 1.5-2.0 for slower devices
};

/**
 * Raspberry Pi optimized settings
 */
export const raspberryPiSettings: AppPerformanceSettings = {
  forceLowPerformanceMode: true,
  disableAllAnimations: false,
  useHardwareAcceleration: true,
  slowAnimationMultiplier: 2.0,
};

/**
 * Extreme performance mode (for very slow devices)
 */
export const extremePerformanceSettings: AppPerformanceSettings = {
  forceLowPerformanceMode: true,
  disableAllAnimations: true,
  useHardwareAcceleration: false,
  slowAnimationMultiplier: 1.0,
};

/**
 * Get current performance settings
 * You can modify this function to load settings from environment variables,
 * local storage, or other configuration sources
 */
export function getPerformanceSettings(): AppPerformanceSettings {
  // Check for environment-based configuration
  if (typeof process !== 'undefined' && process.env) {
    const envMode = process.env.NEXT_PUBLIC_PERFORMANCE_MODE;

    switch (envMode) {
      case 'raspberry-pi':
        return raspberryPiSettings;
      case 'extreme':
        return extremePerformanceSettings;
      default:
        return defaultPerformanceSettings;
    }
  }

  // Check for URL parameters (useful for testing)
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const performanceMode = urlParams.get('performance');

    switch (performanceMode) {
      case 'raspberry-pi':
        return raspberryPiSettings;
      case 'extreme':
        return extremePerformanceSettings;
      case 'low':
        return { ...defaultPerformanceSettings, forceLowPerformanceMode: true };
      default:
        break;
    }
  }

  return defaultPerformanceSettings;
}
