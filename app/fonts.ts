import localFont from "next/font/local";

export const baskervville = localFont({
  src: "../public/Fonts/Baskervville-Medium.ttf",
  weight: "500",
  variable: "--font-baskervville",
  display: "swap",
});

export const montserrat = localFont({
  src: [
    { path: "../public/Fonts/Montserrat-Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/Fonts/Montserrat-Medium_0.ttf", weight: "500", style: "normal" },
    { path: "../public/Fonts/Montserrat-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../public/Fonts/Montserrat-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-montserrat",
  display: "swap",
});
