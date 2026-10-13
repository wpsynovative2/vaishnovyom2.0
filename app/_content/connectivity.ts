import {
  Building2,
  Car,
  GraduationCap,
  Hospital,
  Landmark,
  Plane,
  Route,
  ShoppingBag,
  TrainFront,
  TramFront,
  type LucideIcon,
} from "lucide-react";

export type Place = { icon: LucideIcon; name: string; minutes: number };

export const transit: Place[] = [
  { icon: TramFront, name: "Dindoshi Metro", minutes: 2 },
  { icon: Car, name: "Western Express Highway", minutes: 2 },
  { icon: TrainFront, name: "Malad Railway Station", minutes: 5 },
  { icon: Route, name: "S. V. Road", minutes: 7 },
  { icon: Plane, name: "International Airport", minutes: 20 },
];

export const everyday: Place[] = [
  { icon: Landmark, name: "Jain Derasar", minutes: 0 },
  { icon: GraduationCap, name: "Schools", minutes: 2 },
  { icon: Hospital, name: "Hospitals", minutes: 2 },
  { icon: Building2, name: "Vaishno Business Centre", minutes: 3 },
  { icon: ShoppingBag, name: "Oberoi Mall", minutes: 5 },
];

/** Points drawn on the travel-time rings: ring index (0 = closest) and angle in degrees. */
export const ringLabels = ["2 min", "5 min", "7 min", "20 min"] as const;

export const ringPoints = [
  { name: "Dindoshi Metro", ring: 0, angle: -50 },
  { name: "W. E. Highway", ring: 0, angle: 165 },
  { name: "Oberoi Mall", ring: 1, angle: 25 },
  { name: "Malad Station", ring: 1, angle: 215 },
  { name: "S. V. Road", ring: 2, angle: 120 },
  { name: "Airport", ring: 3, angle: -20 },
] as const;
