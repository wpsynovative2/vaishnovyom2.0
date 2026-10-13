import { featuredAmenities, moreAmenities } from "../../_content/amenities";
import { cn, stagger } from "../../_lib/cn";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { ArchFrame } from "../ui/ArchFrame";
import { EnquireButton } from "../ui/EnquireButton";

export function Amenities() {
  return (
    <Section id="amenities" tone="cream">
      <div className="shell">
        <SectionHeading eyebrow="Amenities" title="An Entire Deck, Given To Living" align="center">
          <p>
            One whole level, lifted above the podium and handed over to leisure. Swim, train, unwind and celebrate —
            without ever leaving home.
          </p>
        </SectionHeading>
      </div>

      {/* Swipe row on phones, five-across on desktop */}
      <ul className="no-scrollbar mx-auto mt-14 flex max-w-[1320px] snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 md:mt-20 md:px-10 lg:grid lg:grid-cols-5 lg:gap-6 lg:overflow-visible">
        {featuredAmenities.map((amenity, index) => (
          <li
            key={amenity.name}
            data-reveal
            style={stagger(index)}
            className={cn("w-[62vw] shrink-0 snap-center sm:w-[38vw] lg:w-auto", index % 2 === 1 && "lg:mt-14")}
          >
            <ArchFrame
              src={amenity.image}
              alt={`Representative image: ${amenity.name}`}
              sizes="(min-width: 1024px) 15rem, (min-width: 640px) 38vw, 62vw"
              variant={index % 2 === 0 ? "gold" : "aubergine"}
              position={amenity.position}
            />
            <h3 className="mt-6 text-center font-serif text-xl text-brown">{amenity.name}</h3>
            <p className="mt-1.5 text-center text-sm text-brown/60">{amenity.caption}</p>
          </li>
        ))}
      </ul>

      <div className="shell mt-16 md:mt-24">
        <p data-reveal className="eyebrow text-center text-gold-deep">
          Also On The Sky-Deck
        </p>
        <ul className="mt-8 flex flex-wrap justify-center gap-3 md:gap-4">
          {moreAmenities.map((amenity, index) => (
            <li
              key={amenity.name}
              data-reveal
              style={stagger(index, 60)}
              className="flex items-center gap-3 rounded-full border border-gold/40 bg-white/60 py-2 pl-2 pr-6 text-sm font-medium text-brown transition duration-500 ease-grand hover:-translate-y-1 hover:border-gold hover:bg-white"
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-aubergine text-gold">
                <amenity.icon className="size-[1.1rem]" strokeWidth={1.5} />
              </span>
              {amenity.name}
            </li>
          ))}
        </ul>

        <div data-reveal className="mt-12 flex flex-col items-center gap-4">
          <EnquireButton source="amenities" heading="Get The Full Amenity List" variant="dark">
            Get The Full Amenity List
          </EnquireButton>
          <p className="text-xs text-brown/50">Images are representative.</p>
        </div>
      </div>
    </Section>
  );
}
