import Image from "next/image";
import { assetPath } from "@/utils/assetPath";

export default function NoSessionsToday() {
  return (
    <div className="absolute inset-0 m-auto flex flex-col gap-8 items-center justify-center text-neutral-200 max-w-full max-h-full">
      <Image
        src={assetPath("ehfg-white.svg")}
        alt="EHFG Logo"
        width={120}
        height={120}
        className="animate-spin [animation-duration:4s] mb-4 w-30 h-30"
        draggable={false}
        priority
      />
      <p className="text-6xl tracking-wide">
        No more sessions scheduled for today.
      </p>
      <p className="text-6xl tracking-wide">Thank you for participating!</p>
    </div>
  );
}
