export const site = {
  name: "Vaishno Sky",
  locality: "Malad (E)",
  codename: "Go Grand",
  developer: "Vaishno Homes",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  title: "Vaishno Sky, Malad East — 1 & 2 BHK and Jodi Residences",
  description:
    "Vaishno Sky is a residential high-rise at Kathiyawadi Chowk, Malad (East) with 1 & 2 BHK and Jodi residences of 484–1646 sq.ft. above an elevated amenities sky-deck, 2 minutes from Dindoshi Metro.",
  phoneDisplay: "+91 96533 59559",
  phoneHref: "tel:+919653359559",
  whatsappHref:
    "https://wa.me/919653359559?text=" +
    encodeURIComponent("Hello, I would like to know more about Vaishno Sky, Malad (E)."),
  email: "sales@vaishnosky.com",
  addressLines: ["Vaishno Sky, Kathiyawadi Chowk,", "Rani Sati Road, Malad (East),", "Mumbai 400097"],
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Vaishno Sky, Kathiyawadi Chowk, Rani Sati Road, Malad East, Mumbai 400097"),
  rera: "P51800076925",
  reraHref: "https://maharera.maharashtra.gov.in/",
  year: 2026,
} as const;

export const nav = [
  { id: "overview", label: "Overview" },
  { id: "about", label: "About" },
  { id: "highlights", label: "Highlights" },
  { id: "amenities", label: "Amenities" },
  { id: "configuration", label: "Configuration" },
  { id: "floor-plans", label: "Floor Plans" },
  { id: "connectivity", label: "Connectivity" },
  { id: "contact", label: "Contact" },
] as const;

export const heroStats = [
  { value: "1 & 2 BHK", label: "+ Jodi residences" },
  { value: "484–1646", label: "sq.ft. carpet area" },
  { value: "11+", label: "Sky-deck amenities" },
  { value: "2 min", label: "to Dindoshi Metro" },
] as const;

export const marqueeWords = [
  "1 & 2 BHK Residences",
  "Jodi Homes",
  "Amenities Sky-Deck",
  "Decks In Every Home",
  "2 Minutes To Metro",
  "MahaRERA Registered",
] as const;
