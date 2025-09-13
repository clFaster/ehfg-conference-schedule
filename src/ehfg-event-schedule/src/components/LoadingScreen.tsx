import Image from 'next/image';

export default function LoadingScreen() {
  return (
    <div className="min-h-screen w-full flex flex-col gap-8 items-center justify-center bg-opacity-20 bg-black backdrop-blur text-neutral-200">
      <Image
        src="/ehfg-white.svg"
        alt="EHFG Logo"
        width={120}
        height={120}
        className="animate-spin [animation-duration:4s] mb-4 w-30 h-30"
        draggable={false}
        priority
      />
      <p className="text-6xl tracking-wide">Loading schedule…</p>
    </div>
  );
}
