import { site } from "./site";

export const overview = {
  eyebrow: "Overview",
  title: "A New Landmark For Malad East",
  body: [
    "Rising above Rani Sati Road, Vaishno Vyom is a residential high-rise set over a retail podium — a single, confident tower that lifts everyday life well clear of the street.",
    "Homes begin above an elevated amenities deck, so every residence enjoys more light, more air and a wider view of the city it belongs to.",
  ],
  facts: [
    { label: "Project Type", value: "Residential high-rise over a retail podium" },
    { label: "Configuration", value: "1 BHK, 2 BHK & Jodi" },
    { label: "Carpet Area", value: "484 – 1646 sq.ft." },
    { label: "Location", value: "Rani Sati Road, Malad (East)" },
    { label: "Amenity Level", value: "Elevated sky-deck" },
    { label: "MahaRERA", value: site.rera },
    { label: "Launch Pricing", value: "Shared on request" },
  ],
} as const;

export const about = {
  eyebrow: "About The Project",
  title: "A World Of Exceptional Living",
  body: [
    "Vaishno Vyom is planned from the ground up for ease. A retail podium meets the street, a two-way ramp carries cars to organised, well-lit parking, and a grand lobby of marble, fluted wood and brass welcomes you home.",
    "Above it all sits the sky-deck — an entire level given to a pool, gym, spa, banquet hall and green walkways — with Dindoshi Metro just two minutes from your door.",
  ],
  points: [
    "A grand entrance lobby worthy of the address",
    "Separate up and down carriageways on the ramp",
    "A full amenity level, lifted above the city",
  ],
  developerNote: `A ${site.developer} development.`,
} as const;
