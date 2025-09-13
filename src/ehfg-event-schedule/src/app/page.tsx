"use client";

import { useSessions } from "../hooks";
import {
  Header,
  RoomColumn,
  LoadingScreen,
  NoSessions,
  TimeDebugger,
} from "../components";

export default function Home() {
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

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <div className="min-h-screen w-full overflow-hidden bg-opacity-20 bg-black backdrop-blur text-neutral-100 font-sans">
      <Header activeDate={activeDate} now={now} />

      {/* Time Debugger for testing */}
      <TimeDebugger
        now={now}
        timeOffset={timeOffset}
        addHours={addHours}
        addMinutes={addMinutes}
        addDays={addDays}
        resetTime={resetTime}
        setTimeOffsetTo={setTimeOffsetTo}
      />

      {/* Main content - room columns */}
      <main className="w-full px-20 pb-20">
        <div className="flex flex-wrap justify-center gap-12 2xl:gap-16">
          {roomColumns.length > 0 ? (
            roomColumns.map((rc) => (
              <RoomColumn key={rc.location} data={rc} now={now} />
            ))
          ) : (
            <NoSessions />
          )}
        </div>
      </main>
    </div>
  );
}
