import Image from "next/image";
import { highlights } from "../../_content/highlights";
import { stagger } from "../../_lib/cn";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { EnquireButton } from "../ui/EnquireButton";

export function Highlights() {
  return (
    <Section id="highlights" tone="brown">
      <div className="shell">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading eyebrow="Highlights" title="Everything That Makes It Worth The Climb" onDark>
              <p>Eight reasons this address stands apart — from the first step into the lobby to the last light on the deck.</p>
            </SectionHeading>
            <div data-reveal style={stagger(4)} className="mt-9">
              <EnquireButton source="highlights" heading="Book A Site Visit">
                Book A Site Visit
              </EnquireButton>
            </div>
          </div>
          <div data-reveal="zoom" className="group relative aspect-[16/10] overflow-hidden rounded-[2rem] ring-1 ring-gold/50 md:rounded-[2.5rem]">
            <Image
              src="/images/elevation-reveal.jpg"
              alt="Artist's impression of Vaishno Vyom unveiled at night, draped in red and gold"
              fill
              sizes="(min-width: 1024px) 40rem, 92vw"
              className="object-cover transition-transform duration-[2000ms] ease-grand group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brown/70 to-transparent" />
            <p className="eyebrow absolute bottom-6 left-7 text-gold">The Grand Reveal</p>
          </div>
        </div>

        <ul className="mt-16 grid gap-4 sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
          {highlights.map((item, index) => (
            <li
              key={item.title}
              data-reveal
              style={stagger(index % 4)}
              className="group relative overflow-hidden rounded-[1.75rem] border border-gold/20 bg-white/[0.03] p-7 transition duration-500 ease-grand hover:-translate-y-1.5 hover:border-gold/70 hover:bg-white/[0.07]"
            >
              <span className="absolute right-6 top-5 font-serif text-4xl text-gold/15 transition-colors duration-500 group-hover:text-gold/40" aria-hidden>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="flex size-12 items-center justify-center rounded-full border border-gold/50 text-gold transition duration-500 group-hover:bg-gold group-hover:text-brown">
                <item.icon className="size-5" strokeWidth={1.5} />
              </span>
              <h3 className="mt-6 font-serif text-xl leading-snug text-cream">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-cream/60">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
