import {
  Baby,
  BedDouble,
  CloudFog,
  Flower2,
  Gamepad2,
  PartyPopper,
  Presentation,
  type LucideIcon,
} from "lucide-react";

export type FeaturedAmenity = { name: string; caption: string; image: string; position?: string };

/** Amenities that have a photo — shown inside the brand's arch shape. */
export const featuredAmenities: FeaturedAmenity[] = [
  {
    name: "Infinity Swimming Pool",
    caption: "Laps with the skyline for company",
    image: "/images/amenity-pool.jpg",
    position: "60% 50%",
  },
  {
    name: "Gym & Cardio",
    caption: "A full floor of strength and stamina",
    image: "/images/amenity-gym.jpg",
    position: "70% 50%",
  },
  {
    name: "Spa",
    caption: "Slow hours, quietly restored",
    image: "/images/amenity-spa.jpg",
  },
  {
    name: "Green Walkways",
    caption: "Shaded paths for unhurried evenings",
    image: "/images/amenity-garden.jpg",
  },
  {
    name: "Party Lawn",
    caption: "Celebrations under an open sky",
    image: "/images/amenity-clubhouse.jpg",
    position: "40% 50%",
  },
];

export type MoreAmenity = { icon: LucideIcon; name: string };

/** Amenities still waiting for photography — listed with icons. */
export const moreAmenities: MoreAmenity[] = [
  { icon: CloudFog, name: "Steam Room" },
  { icon: Flower2, name: "Meditation Area" },
  { icon: Baby, name: "Kids' Play Area" },
  { icon: PartyPopper, name: "Banquet Hall" },
  { icon: Gamepad2, name: "Indoor Games" },
  { icon: Presentation, name: "Conference Room" },
  { icon: BedDouble, name: "Guest Room" },
];
