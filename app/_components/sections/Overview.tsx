import { ArrowUpRight } from "lucide-react";
import { overview } from "../../_content/overview";
import { stagger } from "../../_lib/cn";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { ArchFrame } from "../ui/ArchFrame";
import { EnquireButton } from "../ui/EnquireButton";

export function Overview() {
  return (
    <Section id="overview" tone="cream" className="pt-6 md:pt-10">
      <div className="shell">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading eyebrow={overview.eyebrow} title={overview.title}>
              {overview.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </SectionHeading>
            <div data-reveal style={stagger(4)} className="mt-9">
              <EnquireButton source="overview" heading="Request Price List" variant="dark">
                Request Price List
                <ArrowUpRight className="size-4" />
              </EnquireButton>
            </div>
          </div>

          <div data-reveal="zoom" className="relative mx-auto w-full max-w-[17rem] sm:max-w-[24rem]">
            {/* Offset aubergine arch behind the image, echoing the logo badge */}
            <div className="absolute inset-0 translate-x-4 translate-y-5 rounded-full bg-aubergine md:translate-x-10 md:translate-y-8" aria-hidden />
            <ArchFrame
              src="/images/elevation-day.jpg"
              alt="Artist's impression of Vaishno Vyom seen from Rani Sati Road by day"
              sizes="(min-width: 1024px) 24rem, 80vw"
              className="bg-cream"
            />
          </div>
        </div>

        <dl className="mt-20 grid grid-cols-2 gap-3 md:mt-28 md:gap-5 lg:grid-cols-4">
          {overview.facts.map((fact, index) => (
            <div
              key={fact.label}
              data-reveal
              style={stagger(index % 4)}
              className="rounded-[1.75rem] border border-gold/30 bg-white/60 p-5 transition duration-500 ease-grand hover:-translate-y-1 hover:border-gold hover:bg-white md:p-7"
            >
              <dt className="eyebrow text-[0.6rem] text-gold-deep">{fact.label}</dt>
              <dd className="mt-3 font-serif text-lg leading-snug text-brown md:text-[1.35rem]">{fact.value}</dd>
            </div>
          ))}
          <div
            data-reveal
            style={stagger(3)}
            className="flex flex-col justify-between rounded-[1.75rem] bg-aubergine p-5 text-cream md:p-7"
          >
            <dt className="font-serif text-lg leading-snug md:text-[1.35rem]">Launch inventory moves quickly.</dt>
            <dd className="mt-4">
              <EnquireButton
                source="overview-facts"
                heading="Check Availability"
                variant="link"
                className="text-gold! hover:text-gold-light!"
              >
                Check availability
                <ArrowUpRight className="size-3.5" />
              </EnquireButton>
            </dd>
          </div>
        </dl>
      </div>
    </Section>
  );
}
