import localFont from "next/font/local";

// Define Sailec font family via next/font so assetPrefix/basePath are handled automatically.
export const sailec = localFont({
  variable: "--font-sailec",
  display: "swap",
  src: [
    {
      path: "../../public/Fonts/Sailec Thin/Sailec Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/Fonts/Sailec Light/Sailec Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/Fonts/Sailec Medium/Sailec Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/Fonts/Sailec Bold/Sailec Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/Fonts/Sailec Regular Italic/Sailec Regular Italic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
});
