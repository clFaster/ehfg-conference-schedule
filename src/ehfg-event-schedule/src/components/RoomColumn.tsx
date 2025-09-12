import { RoomColumnData } from "@/types/roomColumnData";
import SessionBlock from './SessionBlock';
import EmptySessionBlock from './EmptySessionBlock';

interface RoomColumnProps {
  data: RoomColumnData;
  now: Date;
}

export default function RoomColumn({ data, now }: RoomColumnProps) {
  return (
    <div className="flex flex-col gap-7 min-w-[440px] max-w-[520px] w-full">
      <div className="sticky top-0 z-20 py-1 backdrop-blur-sm">
        <h2 className="text-4xl font-black tracking-tight text-center bg-gradient-to-r from-emerald-200 via-cyan-200 to-sky-300 text-transparent bg-clip-text drop-shadow-lg uppercase shadow-[0_4px_12px_rgba(0,0,0,0.9),0_2px_6px_rgba(0,0,0,0.8)] sm:shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
          {data.location}
        </h2>
      </div>
      
      {data.current ? (
        <SessionBlock session={data.current} variant="current" now={now} />
      ) : (
        <EmptySessionBlock variant="current" />
      )}
      
      {data.upcoming ? (
        <SessionBlock session={data.upcoming} variant="upcoming" now={now} />
      ) : (
        <EmptySessionBlock variant="upcoming" />
      )}
    </div>
  );
}
