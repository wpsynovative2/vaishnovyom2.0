import { ArrowUpRight, MapPin } from "lucide-react";
import { everyday, ringLabels, ringPoints, transit, type Place } from "../../_content/connectivity";
import { site } from "../../_content/site";
import { stagger } from "../../_lib/cn";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { EnquireButton } from "../ui/EnquireButton";
import { buttonClass } from "../ui/button";

const CENTER = 240;
const RADII = [62, 112, 156, 215];

/** Travel-time rings around the tower. A diagram of minutes, not a geographic map. */
function TravelRings() {
  return (
    <div className="relative mx-auto aspect-[600/480] w-full max-w-[40rem]">
      <svg viewBox="-60 0 600 480" className="h-full w-full" role="img" aria-label="Diagram of travel times from Vaishno Sky">
        {RADII.map((radius, index) => (
          <g key={radius}>
            <circle
              cx={CENTER}
              cy={CENTER}
              r={radius}
              fill="none"
              stroke="#cda454"
              strokeOpacity={0.5 - index * 0.09}
              strokeDasharray={index % 2 === 0 ? undefined : "3 7"}
            />
            <text
              x={CENTER}
              y={CENTER + radius - 7}
              textAnchor="middle"
              fill="#cda454"
              fillOpacity="0.75"
              fontSize="10"
              letterSpacing="2"
              className="font-sans font-semibold uppercase"
            >
              {ringLabels[index]}
            </text>
          </g>
        ))}

        {ringPoints.map((point) => {
          const radians = (point.angle * Math.PI) / 180;
          const x = Math.round(CENTER + RADII[point.ring] * Math.cos(radians));
          const y = Math.round(CENTER + RADII[point.ring] * Math.sin(radians));
          const right = Math.cos(radians) >= 0;
          return (
            <g key={point.name}>
              <circle cx={x} cy={y} r="9" fill="#cda454" fillOpacity="0.18" />
              <circle cx={x} cy={y} r="4" fill="#e9cf86" />
              <text
                x={x + (right ? 14 : -14)}
                y={y + 4}
                textAnchor={right ? "start" : "end"}
                fill="#fff3e1"
                fontSize="12.5"
                className="font-sans font-medium"
              >
                {point.name}
              </text>
            </g>
          );
        })}
      </svg>

      {/* The tower, pulsing at the centre */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <span className="animate-pulse-ring absolute inset-0 rounded-full bg-gold/50" aria-hidden />
        <span className="animate-pulse-ring absolute inset-0 rounded-full bg-gold/40 [animation-delay:1.4s]" aria-hidden />
        <span className="bg-gold-gradient relative flex size-11 items-center justify-center rounded-full text-brown shadow-[0_0_30px_rgba(205,164,84,0.8)]">
          <MapPin className="size-5" />
        </span>
      </div>
    </div>
  );
}

function PlaceList({ title, places }: { title: string; places: Place[] }) {
  return (
    <div>
      <h3 data-reveal className="eyebrow text-gold">
        {title}
      </h3>
      <ul className="mt-4">
        {places.map((place, index) => (
          <li
            key={place.name}
            data-reveal
            style={stagger(index, 70)}
            className="flex items-center gap-4 border-b border-gold/15 py-3.5"
          >
            <place.icon className="size-[1.15rem] shrink-0 text-gold" strokeWidth={1.5} />
            <span className="flex-1 text-sm text-cream/85">{place.name}</span>
            <span className="whitespace-nowrap font-serif text-2xl text-gold">
              {place.minutes}
              <span className="ml-1.5 font-sans text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-cream/55">min</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Connectivity() {
  return (
    <Section id="connectivity" tone="aubergine">
      <div className="shell">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading eyebrow="Connectivity" title="Close To Life. Connected To More." onDark>
              <p>
                Metro, highway and railway within minutes; schools, hospitals and worship closer still. Malad East has
                rarely been this easy to live in.
              </p>
            </SectionHeading>
            <address data-reveal style={stagger(4)} className="mt-8 flex gap-3 text-sm not-italic leading-relaxed text-cream/70">
              <MapPin className="mt-1 size-4 shrink-0 text-gold" />
              <span>{site.addressLines.join(" ")}</span>
            </address>
          </div>
          <div data-reveal="zoom" className="max-sm:hidden">
            <TravelRings />
          </div>
        </div>

        <div className="mt-14 grid gap-12 md:grid-cols-2 md:gap-16">
          <PlaceList title="Transit" places={transit} />
          <PlaceList title="Everyday" places={everyday} />
        </div>

        <div data-reveal className="mt-12 flex flex-wrap gap-4">
          <EnquireButton source="connectivity" heading="Plan My Site Visit">
            Plan My Site Visit
          </EnquireButton>
          <a href={site.mapsHref} target="_blank" rel="noopener noreferrer" className={buttonClass("outline-light")}>
            Open In Google Maps
            <ArrowUpRight className="size-4" />
          </a>
        </div>
        <p className="mt-6 text-xs text-cream/40">Travel times are approximate and depend on traffic.</p>
      </div>
    </Section>
  );
}
