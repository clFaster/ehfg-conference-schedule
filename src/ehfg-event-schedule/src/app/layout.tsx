import type { Metadata } from "next";
import "./globals.css";
import { sailec } from "./fonts";

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
  <html lang="en" className={`h-full ${sailec.variable}`}>
      <body
        // We build the background image URL dynamically so that it respects the
        // basePath on GitHub Pages. The env var is optional; the value is also
        // injected by Next.js via basePath for assets referenced with leading slash
        // in components, but not inside arbitrary Tailwind CSS url() values.
        style={{
          backgroundImage:
            "url(" +
            `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/background.png` +
            "),radial-gradient(circle at 50% 50%,#4f9bd3,transparent 90%)",
        }}
        className="antialiased min-h-screen h-full bg-background-dark bg-cover bg-center bg-no-repeat relative overflow-hidden"
      >
        {children}
      </body>
    </html>
  );
}
