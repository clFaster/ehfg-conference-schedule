# HeadlineTicker Performance Optimizations

The HeadlineTicker component has been optimized for better performance on low-end devices like Raspberry Pi. Here are the improvements and configuration options available:

## Optimizations Implemented

### 1. Hardware Acceleration
- Uses `translate3d()` instead of `translateX()` for better GPU utilization
- Added `will-change: transform` to hint browsers about upcoming transforms
- Added `backfaceVisibility: hidden` and `perspective: 1000px` for better rendering

### 2. Reduced Frame Rate Animation
- Low performance devices use a stepped animation with fewer keyframes
- Animation duration is automatically extended on slow devices for smoother appearance

### 3. Automatic Performance Detection
- Detects Raspberry Pi and ARM-based devices automatically
- Monitors CPU cores, pixel density, and memory usage
- Respects user's `prefers-reduced-motion` accessibility setting

### 4. Configurable Performance Modes
Three performance profiles are available:
- **Default**: Standard performance with all optimizations
- **Raspberry Pi**: Optimized for Raspberry Pi with slower animations
- **Extreme**: Disables all animations for very slow devices

## Usage Options

### 1. Component Level Configuration

```tsx
import { HeadlineTicker } from './components';

// Force low performance mode
<HeadlineTicker 
  headline="Your headline text"
  lowPerformanceMode={true} 
/>

// Completely disable animations
<HeadlineTicker 
  headline="Your headline text"
  disableAnimation={true} 
/>
```

### 2. Environment Variables

Set the performance mode via environment variable in `.env.local`:

```bash
# For Raspberry Pi
NEXT_PUBLIC_PERFORMANCE_MODE=raspberry-pi

# For extreme performance issues
NEXT_PUBLIC_PERFORMANCE_MODE=extreme
```

### 3. URL Parameters (for testing)

You can test different performance modes by adding URL parameters:

```
# Low performance mode
?performance=low

# Raspberry Pi mode  
?performance=raspberry-pi

# Extreme mode (no animations)
?performance=extreme
```

### 4. Manual Configuration

Edit `src/utils/performance-config.ts` to customize the default settings:

```typescript
export const defaultPerformanceSettings: AppPerformanceSettings = {
  forceLowPerformanceMode: true,  // Enable for Raspberry Pi
  disableAllAnimations: false,     // Set true for extreme cases
  useHardwareAcceleration: true,   // Usually helps performance
  slowAnimationMultiplier: 2.0,    // Slower animations for smoother playback
};
```

## CSS Animations

The component now uses two animation variants:

### Standard Animation
```css
@keyframes headline-scroll {
  0% { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(var(--move-distance), 0, 0); }
}
```

### Low Performance Animation (fewer keyframes)
```css
@keyframes headline-scroll-low-perf {
  0% { transform: translate3d(0, 0, 0); }
  25% { transform: translate3d(calc(var(--move-distance) * 0.25), 0, 0); }
  50% { transform: translate3d(calc(var(--move-distance) * 0.5), 0, 0); }
  75% { transform: translate3d(calc(var(--move-distance) * 0.75), 0, 0); }
  100% { transform: translate3d(var(--move-distance), 0, 0); }
}
```

## Performance Monitoring

The codebase includes a `PerformanceMonitor` class for runtime performance tracking:

```typescript
import { PerformanceMonitor } from './utils/performance';

const monitor = new PerformanceMonitor();
monitor.start();

// Check FPS after a few seconds
setTimeout(() => {
  console.log('Current FPS:', monitor.getFPS());
  console.log('Poor performance:', monitor.isPerformancePoor());
}, 5000);
```

## Raspberry Pi Specific Recommendations

For optimal performance on Raspberry Pi:

1. **Use the Raspberry Pi performance profile**:
   ```bash
   NEXT_PUBLIC_PERFORMANCE_MODE=raspberry-pi
   ```

2. **Ensure hardware acceleration is enabled** in your browser/Chromium installation

3. **Consider disabling animations entirely** if performance is still poor:
   ```bash
   NEXT_PUBLIC_PERFORMANCE_MODE=extreme
   ```

4. **Monitor GPU memory** - ensure sufficient GPU memory split (use `sudo raspi-config`)

5. **Use a fast SD card** (Class 10 or better) or USB 3.0 storage

## Troubleshooting

### Still experiencing lag?
1. Try the extreme performance mode (`?performance=extreme`)
2. Check if hardware acceleration is working in your browser
3. Monitor system resources (`htop`, `vcgencmd get_mem gpu`)
4. Consider reducing screen resolution or browser zoom level

### Animations not working?
1. Check if `prefers-reduced-motion` is enabled in your system
2. Verify the content is actually overflowing the container
3. Check browser console for any JavaScript errors

### Want to add more performance optimizations?
The performance detection system is extensible. You can add more device-specific optimizations in `src/utils/performance.ts`.