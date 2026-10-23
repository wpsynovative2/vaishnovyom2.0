import type { Metadata, Viewport } from "next";
import { baskervville, montserrat } from "./fonts";
import { site } from "./_content/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.description,
    images: [{ url: "/images/elevation-boulevard.jpg", width: 1672, height: 940, alt: "Vaishno Vyom, Malad (East)" }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/images/elevation-boulevard.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#280f24",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${baskervville.variable} ${montserrat.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
