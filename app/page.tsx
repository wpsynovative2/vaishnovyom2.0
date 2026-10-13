import { site } from "./_content/site";
import { Header } from "./_components/layout/Header";
import { Footer } from "./_components/layout/Footer";
import { Marquee } from "./_components/layout/Marquee";
import { MobileActionBar } from "./_components/layout/MobileActionBar";
import { Preloader } from "./_components/ui/Preloader";
import { RevealObserver } from "./_components/ui/RevealObserver";
import { EnquiryDialog } from "./_components/ui/EnquiryDialog";
import { Hero } from "./_components/sections/Hero";
import { Overview } from "./_components/sections/Overview";
import { About } from "./_components/sections/About";
import { Highlights } from "./_components/sections/Highlights";
import { Amenities } from "./_components/sections/Amenities";
import { Configuration } from "./_components/sections/Configuration";
import { FloorPlans } from "./_components/sections/FloorPlans";
import { Connectivity } from "./_components/sections/Connectivity";
import { Contact } from "./_components/sections/Contact";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ApartmentComplex",
  name: site.name,
  description: site.description,
  url: site.url,
  image: `${site.url}/images/elevation-day.jpg`,
  telephone: site.phoneDisplay,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Kathiyawadi Chowk, Rani Sati Road, Malad (East)",
    addressLocality: "Mumbai",
    addressRegion: "Maharashtra",
    postalCode: "400097",
    addressCountry: "IN",
  },
  brand: { "@type": "Organization", name: site.developer },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Preloader />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Overview />
        <About />
        <Highlights />
        <Amenities />
        <Configuration />
        <FloorPlans />
        <Connectivity />
        <Contact />
      </main>
      <Footer />
      <MobileActionBar />
      <EnquiryDialog />
      <RevealObserver />
    </>
  );
}
