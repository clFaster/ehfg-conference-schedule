import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EHFG Live Schedule",
  description: "Live multi-room conference schedule with real-time updates",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" className="h-full">
      <body className="antialiased">
        <div className="pointer-events-none fixed inset-0 -z-50">
          <div className="absolute inset-0 opacity-[0.07] mix-blend-overlay bg-[linear-gradient(0deg,transparent_24%,rgba(255,255,255,0.15)_25%,rgba(255,255,255,0.15)_26%,transparent_27%,transparent_74%,rgba(255,255,255,0.15)_75%,rgba(255,255,255,0.15)_76%,transparent_77%),linear-gradient(90deg,transparent_24%,rgba(255,255,255,0.15)_25%,rgba(255,255,255,0.15)_26%,transparent_27%,transparent_74%,rgba(255,255,255,0.15)_75%,rgba(255,255,255,0.15)_76%,transparent_77%)] bg-[length:60px_60px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(0,200,160,0.25),transparent_60%)]" />
        </div>
        {children}
      </body>
    </html>
  );
}




