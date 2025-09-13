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
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <body
        className="antialiased 
    min-h-screen 
    h-full 
    bg-background-dark 
    bg-[url('/background.png'),radial-gradient(circle_at_50%_50%,#4f9bd3,transparent_90%)] 
    bg-cover 
    bg-center 
    bg-no-repeat 
    relative
    overflow-hidden"
      >
        {children}
      </body>
    </html>
  );
}
