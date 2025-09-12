interface EmptySessionBlockProps {
  variant: 'current' | 'upcoming';
}

export default function EmptySessionBlock({ variant }: EmptySessionBlockProps) {
  const isCurrent = variant === 'current';
  
  if (isCurrent) {
    return (
      <div className="rounded-2xl p-10 backdrop-blur-[20px] md:backdrop-blur-[16px] sm:backdrop-blur-[12px] saturate-[180%] md:saturate-[130%] sm:saturate-[120%] brightness-[120%] bg-gradient-to-br from-white/25 to-white/15 shadow-[0_16px_40px_rgba(0,0,0,0.6),0_4px_12px_rgba(0,0,0,0.4)] text-neutral-200 h-[320px] flex items-center justify-center text-center text-2xl font-semibold">
        No session in progress
      </div>
    );
  }
  
  return (
    <div className="rounded-2xl p-8 backdrop-blur-[20px] md:backdrop-blur-[16px] sm:backdrop-blur-[12px] saturate-[180%] md:saturate-[130%] sm:saturate-[120%] brightness-[120%] bg-gradient-to-br from-white/25 to-white/15 shadow-[0_16px_40px_rgba(0,0,0,0.6),0_4px_12px_rgba(0,0,0,0.4)] text-neutral-300 h-[280px] flex items-center justify-center text-center font-medium">
      No later session today
    </div>
  );
}
