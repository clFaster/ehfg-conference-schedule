'use client';

import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSessions } from '../hooks';
import {
  Header,
  RoomColumn,
  LoadingScreen,
  NoSessionsToday,
  TimeDebugger,
} from '../components';

function HomeContent() {
  const searchParams = useSearchParams();
  const showDebugger = searchParams.get('debug') === 'true';
  const hoursParam = searchParams.get('hours');

  const {
    loading,
    now,
    activeDate,
    roomColumns,
    timeOffset,
    addHours,
    addMinutes,
    addDays,
    resetTime,
    setTimeOffsetTo,
  } = useSessions();

  // Apply hour offset from URL parameter
  useEffect(() => {
    if (hoursParam) {
      const hours = parseFloat(hoursParam);
      if (!isNaN(hours)) {
        // Convert hours to milliseconds and set the offset
        const milliseconds = hours * 60 * 60 * 1000;
        setTimeOffsetTo(milliseconds);
      }
    }
  }, [hoursParam, setTimeOffsetTo]);

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <div className="min-h-screen w-full overflow-hidden bg-opacity-20 bg-black backdrop-blur text-neutral-100 font-sans">
      <Header activeDate={activeDate} now={now} />

      {/* Time Debugger for testing - only show when ?debug=true */}
      {showDebugger && (
        <TimeDebugger
          now={now}
          timeOffset={timeOffset}
          addHours={addHours}
          addMinutes={addMinutes}
          addDays={addDays}
          resetTime={resetTime}
          setTimeOffsetTo={setTimeOffsetTo}
        />
      )}

      {/* Main content - room columns */}
      <main className="w-full px-20 pb-20">
        <div className="flex flex-wrap justify-center gap-12 2xl:gap-16">
          {roomColumns.length > 0 ? (
            roomColumns.map((rc) => (
              <RoomColumn key={rc.location} data={rc} now={now} />
            ))
          ) : (
            <NoSessionsToday />
          )}
        </div>
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <HomeContent />
    </Suspense>
  );
}
