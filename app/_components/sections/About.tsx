import { Check, Download } from "lucide-react";
import { about } from "../../_content/overview";
import { stagger } from "../../_lib/cn";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { ArchFrame } from "../ui/ArchFrame";
import { EnquireButton } from "../ui/EnquireButton";
import { buttonClass } from "../ui/button";

export function About() {
  return (
    <Section id="about" tone="white">
      <div className="shell grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
        <div className="relative order-2 mx-auto w-full max-w-[30rem] pb-16 pr-[18%] lg:order-1">
          <div data-reveal="zoom">
            <ArchFrame
              src="/images/balcony.jpg"
              alt="Representative image of a private deck opening to a city view at sunset"
              sizes="(min-width: 1024px) 24rem, 70vw"
              position="62% 50%"
            />
          </div>
          <div data-reveal="zoom" style={stagger(2)} className="absolute bottom-0 right-0 w-[52%]">
            <ArchFrame
              src="/images/residence-living.jpg"
              alt="Representative image of a sunlit living room"
              sizes="(min-width: 1024px) 15rem, 40vw"
              variant="aubergine"
            />
          </div>
        </div>

        <div className="lg:order-2">
          <SectionHeading eyebrow={about.eyebrow} title={about.title}>
            {about.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </SectionHeading>

          <ul className="mt-8 space-y-4">
            {about.points.map((point, index) => (
              <li key={point} data-reveal style={stagger(index + 3)} className="flex items-start gap-4 text-[0.95rem] text-brown/85">
                <span className="bg-gold-gradient mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full text-brown">
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                {point}
              </li>
            ))}
          </ul>

          <p data-reveal className="eyebrow mt-8 text-gold-deep">
            {about.developerNote}
          </p>

          <div data-reveal className="mt-8 flex flex-wrap gap-4">
            <EnquireButton source="about-brochure" heading="Download Brochure">
              <Download className="size-4" />
              Download Brochure
            </EnquireButton>
            <a href="#amenities" className={buttonClass("outline-dark")}>
              See Amenities
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
