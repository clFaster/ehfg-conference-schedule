import React, { useState } from 'react';

interface TimeDebuggerProps {
  now: Date;
  timeOffset: number;
  addHours: (hours: number) => void;
  addMinutes: (minutes: number) => void;
  addDays: (days: number) => void;
  resetTime: () => void;
  setTimeOffsetTo: (milliseconds: number) => void;
}

export function TimeDebugger({
  now,
  timeOffset,
  addHours,
  addMinutes,
  addDays,
  resetTime,
  setTimeOffsetTo,
}: TimeDebuggerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [customOffset, setCustomOffset] = useState('');

  const formatTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };

  const formatOffset = (ms: number) => {
    const totalMinutes = Math.floor(Math.abs(ms) / (1000 * 60));
    const days = Math.floor(totalMinutes / (24 * 60));
    const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
    const minutes = totalMinutes % 60;

    const sign = ms < 0 ? '-' : '+';
    let result = sign;

    if (days > 0) result += `${days}d `;
    if (hours > 0) result += `${hours}h `;
    if (minutes > 0) result += `${minutes}m`;

    return result || '+0m';
  };

  const handleCustomOffset = () => {
    const hours = parseFloat(customOffset);
    if (!isNaN(hours)) {
      setTimeOffsetTo(hours * 60 * 60 * 1000);
      setCustomOffset('');
    }
  };

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed top-4 right-4 z-50 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm font-mono"
        title="Show Time Debugger"
      >
        🕐 Debug Time
      </button>
    );
  }

  return (
    <div className="fixed top-4 right-4 z-50 bg-gray-800 border border-gray-600 rounded-lg p-4 shadow-lg max-w-sm">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-white font-bold text-sm">Time Debugger</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white text-lg leading-none"
        >
          ×
        </button>
      </div>

      <div className="space-y-3 text-sm">
        <div>
          <div className="text-gray-300">Current Time:</div>
          <div className="text-white font-mono text-xs">{formatTime(now)}</div>
        </div>

        <div>
          <div className="text-gray-300">Offset:</div>
          <div className="text-yellow-400 font-mono text-xs">
            {formatOffset(timeOffset)}
          </div>
        </div>

        <div className="border-t border-gray-600 pt-3">
          <div className="text-gray-300 mb-2">Quick Actions:</div>
          <div className="grid grid-cols-2 gap-1">
            <button
              onClick={() => addMinutes(15)}
              className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs"
            >
              +15m
            </button>
            <button
              onClick={() => addMinutes(-15)}
              className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs"
            >
              -15m
            </button>
            <button
              onClick={() => addHours(1)}
              className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs"
            >
              +1h
            </button>
            <button
              onClick={() => addHours(-1)}
              className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs"
            >
              -1h
            </button>
            <button
              onClick={() => addDays(1)}
              className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs"
            >
              +1d
            </button>
            <button
              onClick={() => addDays(-1)}
              className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs"
            >
              -1d
            </button>
          </div>
        </div>

        <div className="border-t border-gray-600 pt-3">
          <div className="text-gray-300 mb-2">Custom Offset (hours):</div>
          <div className="flex gap-1">
            <input
              type="number"
              value={customOffset}
              onChange={(e) => setCustomOffset(e.target.value)}
              placeholder="e.g., 2.5"
              className="bg-gray-700 text-white px-2 py-1 rounded text-xs flex-1"
              step="0.5"
            />
            <button
              onClick={handleCustomOffset}
              className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs"
            >
              Set
            </button>
          </div>
        </div>

        <button
          onClick={resetTime}
          className="w-full bg-gray-600 hover:bg-gray-700 text-white px-2 py-1 rounded text-xs"
        >
          Reset to Real Time
        </button>
      </div>
    </div>
  );
}
