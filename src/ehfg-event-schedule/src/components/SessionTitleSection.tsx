interface SessionTitleSectionProps {
  shortId: string;
  title: string;
  badgeClass: string; // color class for text inside badge
  subtitle?: string;
  subtitleClass?: string;
}

export function SessionTitleSection({
  shortId,
  title,
  badgeClass,
  subtitle,
  subtitleClass = '',
}: SessionTitleSectionProps) {
  return (
    <div className="relative z-10">
      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 bg-white/15 line-clamp-3 shadow-lg rounded-md sm:rounded-lg px-2 py-1">
        <span
          className={`flex-shrink-0 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 xl:w-12 xl:h-12 2xl:w-14 2xl:h-14 3xl:w-16 3xl:h-16 4xl:w-16 4xl:h-16 5xl:w-18 5xl:h-18 rounded-full text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-3xl 5xl:text-3xl font-semibold uppercase tracking-wider ${badgeClass} bg-black/20 border border-white/10`}
        >
          {shortId}
        </span>
        <h3 className="flex-1 min-w-0 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl 3xl:text-4xl 4xl:text-5xl 5xl:text-5xl leading-relaxed font-bold mb-1 sm:mb-2 text-white relative z-10 rounded-lg px-1 sm:px-2 py-1 line-clamp-3">
          {title}
        </h3>
      </div>
      {subtitle && (
        <p
          className={`text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl 4xl:text-5xl 5xl:text-5xl font-light mb-1 line-clamp-2 relative z-10 ${subtitleClass}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
