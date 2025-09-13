import { formatDateLong, formatClock } from "../utils/session-utils";

interface HeaderProps {
  activeDate: string;
  now: Date;
}

export default function Header({ activeDate, now }: HeaderProps) {
  return (
    <header className="w-full px-20 pt-12 pb-8 flex flex-col xl:flex-row items-center xl:items-end justify-between gap-10">
      <div className="flex flex-col items-center xl:items-start">
        <h1 className="text-6xl 2xl:text-[4.5rem] font-black tracking-tight bg-gradient-to-br from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent bg-200 animate-gradientShift drop-shadow-md text-center xl:text-left uppercase">
          Live Schedule
        </h1>
        <p className="mt-4 text-2xl 2xl:text-3xl font-medium text-neutral-200 tracking-wide">
          European Health Forum Gastein 2025
        </p>
        <p className="mt-2 text-xl text-neutral-300">
          {activeDate ? formatDateLong(activeDate) : ""}
        </p>
      </div>
      <div className="flex flex-col items-center xl:items-end">
        <div className="font-mono font-black tracking-tight text-[9.5rem] leading-none 2xl:text-[12rem] bg-gradient-to-br from-white to-neutral-400 bg-clip-text text-transparent drop-shadow-lg">
          {formatClock(now)}
        </div>
        <p className="text-lg text-neutral-300 tracking-wide">Local Time</p>
      </div>
    </header>
  );
}
