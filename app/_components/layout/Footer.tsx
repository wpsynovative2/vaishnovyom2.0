import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { nav, site } from "../../_content/site";
import { summaries } from "../../_content/configurations";
import { EnquireButton } from "../ui/EnquireButton";

export function Footer() {
  const heading = "eyebrow text-gold";
  const link = "text-sm text-cream/70 transition hover:text-gold";
  return (
    <footer className="px-3 pb-24 pt-3 md:px-5 md:pb-5">
      <div className="pattern-dark overflow-hidden rounded-[2rem] bg-brown text-cream md:rounded-[3rem]">
        <div className="chevron" aria-hidden />
        <div className="shell py-16 md:py-20">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1fr_1.2fr]">
            <div>
              <Image src="/images/logo-full.png" alt={`${site.name}, ${site.locality}`} width={600} height={644} className="h-auto w-36" />
              <p className="mt-6 max-w-xs text-sm leading-relaxed text-cream/65">
                A higher place in the city. 1 &amp; 2 BHK and Jodi residences above an amenities sky-deck in Malad (East).
              </p>
              <p className="eyebrow mt-6 text-cream/50">
                Codename: <span className="text-gold">{site.codename}</span>
              </p>
            </div>

            <div>
              <h2 className={heading}>Explore</h2>
              <ul className="mt-5 space-y-3">
                {nav.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className={link}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className={heading}>Residences</h2>
              <ul className="mt-5 space-y-4">
                {summaries.map((item) => (
                  <li key={item.type}>
                    <p className="font-serif text-xl text-cream">{item.type}</p>
                    <p className="text-xs text-cream/55">{item.range} sq.ft. carpet</p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className={heading}>Visit Us</h2>
              <ul className="mt-5 space-y-4">
                <li className="flex gap-3 text-sm leading-relaxed text-cream/70">
                  <MapPin className="mt-1 size-4 shrink-0 text-gold" />
                  <address className="not-italic">
                    {site.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </li>
                <li>
                  <a href={site.phoneHref} className={`${link} flex items-center gap-3`}>
                    <Phone className="size-4 text-gold" />
                    {site.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${site.email}`} className={`${link} flex items-center gap-3`}>
                    <Mail className="size-4 text-gold" />
                    {site.email}
                  </a>
                </li>
              </ul>
              <EnquireButton source="footer" heading="Schedule A Site Visit" className="mt-7">
                Schedule A Site Visit
              </EnquireButton>
            </div>
          </div>

          <div className="mt-14 border-t border-gold/20 pt-8">
            <p className="text-sm text-cream/75">
              MahaRERA Registration No.{" "}
              <a href={site.reraHref} target="_blank" rel="noopener noreferrer" className="text-gold underline underline-offset-4">
                {site.rera}
              </a>{" "}
              · available at maharera.maharashtra.gov.in
            </p>
            <p className="mt-4 text-xs leading-relaxed text-cream/60">
              Disclaimer: The details, areas, plans, specifications and amenities shown on this website are indicative
              and subject to approval by the relevant authorities. Images are artist&rsquo;s impressions or representative
              photographs and are for illustration only. Nothing here constitutes an offer or a contract. Please refer to
              the agreement for sale for final terms.
            </p>
            <p className="mt-6 text-xs text-cream/60">
              © {site.year} {site.developer}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
