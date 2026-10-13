import {
  ArrowUpDown,
  DoorOpen,
  Landmark,
  Layers,
  Leaf,
  ShieldCheck,
  Sparkles,
  Sunrise,
  type LucideIcon,
} from "lucide-react";

export type Highlight = { icon: LucideIcon; title: string; text: string };

export const highlights: Highlight[] = [
  {
    icon: Sparkles,
    title: "Amenities Sky-Deck",
    text: "A whole level of leisure, raised above the podium and open to the sky.",
  },
  {
    icon: DoorOpen,
    title: "An Entrance Worth The Address",
    text: "A grand lobby in marble, fluted wood and brass, crowned by a chandelier.",
  },
  {
    icon: ArrowUpDown,
    title: "Two-Way Entry & Exit Ramp",
    text: "Separate carriageways up and down, so arriving and leaving never cross.",
  },
  {
    icon: Layers,
    title: "Jodi Flats Available",
    text: "Combine two homes into one larger residence on select floors.",
  },
  {
    icon: Sunrise,
    title: "Decks In Every Home",
    text: "A private deck with each residence — your own place in the open air.",
  },
  {
    icon: Leaf,
    title: "Vertical Green Facade",
    text: "Planters climb the podium, softening the tower where it meets the street.",
  },
  {
    icon: Landmark,
    title: "Jain Derasar At 0 Min",
    text: "A place of worship right beside you, a few steps from the gate.",
  },
  {
    icon: ShieldCheck,
    title: "MahaRERA Registered",
    text: "Registered with MahaRERA under number P51800076925.",
  },
];
