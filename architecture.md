# Vaishno Vyom — Website Architecture

Single-page marketing and lead-generation website for **Vaishno Vyom, Malad (E)** — codename **Go Grand**.

This document is the build plan: what the site contains, how it should look, how the code is organised, and what is still missing. Read it top to bottom before writing code.

| | |
|---|---|
| Structure reference | https://vaisnosky.vercel.app/ |
| Brand kit | `public/ui_design.pdf` (logo, fonts, colours, shape, borders, pattern) |
| Layout mood reference | `public/images/referceimg.jpg` |
| Stack | Next.js 16.4 (App Router), React 19.3, Tailwind CSS v4, TypeScript |

---

## 1. Goals

1. **Look grand.** The page should feel like the brochure of a premium tower: warm, gold, generous, calm.
2. **Capture leads.** Every section ends in one clear action that opens the same enquiry form.
3. **Load fast on a phone.** Most visitors arrive from ads on mobile data.

One route (`/`), eight content sections, one form. No CMS, no database, no login.

---

## 2. Page map

The order and anchors match the reference site.

| # | Section | Anchor | In nav | Background |
|---|---|---|---|---|
| — | Header (sticky) | — | — | transparent over hero, then aubergine |
| — | Hero | `#top` | no | elevation image with dark overlay |
| 1 | Overview | `#overview` | yes | cream |
| 2 | About | `#about` | yes | white + pattern |
| 3 | Highlights | `#highlights` | yes | dark brown |
| 4 | Amenities | `#amenities` | yes | cream |
| 5 | Configuration | `#configuration` | yes | white + pattern |
| 6 | Floor Plans | `#floor-plans` | yes | cream |
| 7 | Connectivity | `#connectivity` | yes | aubergine |
| 8 | Contact Us | `#contact` | yes | white + pattern |
| — | Footer | — | — | dark brown |
| — | Mobile action bar (Call / WhatsApp / Enquire) | — | — | aubergine, fixed bottom |

Light and dark sections alternate on purpose. Each change of background is marked with the gold chevron border (`border.png`).

**Left out of the first build** (the reference site has them; add later if wanted): "The Journey Up" story block, FAQ accordion, second closing form, preloader.

---

## 3. Design system

### 3.1 Where the look comes from

- **Brand kit (`ui_design.pdf`)** fixes the logo, fonts, colours, the arch shape, the chevron border and the kolam pattern. These are not negotiable.
- **Reference image (`referceimg.jpg`)** fixes the *layout feeling*: large rounded colour panels inset from the page edge, rows of arch-shaped image tiles with a caption below, a decorative edge between sections, a small ornament under each heading, and lots of air. Take the composition from it, not its colours or florals.

### 3.2 Colour tokens

| Token | Hex | Source | Use |
|---|---|---|---|
| `gold` | `#CDA454` | brand kit | headings on dark, hairlines, buttons, icons |
| `brown` | `#351500` | brand kit "background" | dark sections, footer, body text on light |
| `aubergine` | `#280F24` | sampled from logo badge | header, arch panels, connectivity section |
| `aubergine-soft` | `#37102F` | sampled from brand kit shape | hover and raised surfaces on aubergine |
| `cream` | `#FFF3E1` | brand kit "background" | light sections |
| `white` | `#FFFFFF` | brand kit "background" | light sections, always with the pattern |
| `gold-deep` | `#8A6A24` | **derived, not in kit** | gold-coloured text on cream or white |

Rules:

- `gold` on cream or white is too faint for text (about 2.3:1). On light backgrounds use `brown` for body text and `gold-deep` for accents. Keep `gold` for lines, icons and fills.
- No pure black anywhere. The darkest colour is `brown`.
- Gold gradient for large display words and primary buttons: `#B88A3A → #E9CF86 → #CDA454`.

### 3.3 Typography

Fonts are supplied in `public/Fonts/`. Load them with `next/font/local`.

| Role | Font | File | Notes |
|---|---|---|---|
| Headings | Baskervville Medium | `Baskervville-Medium.ttf` | Title Case, tight leading, never bold |
| Eyebrows, labels, buttons | Montserrat Bold / SemiBold | `Montserrat-Bold.ttf`, `Montserrat-SemiBold.ttf` | uppercase, letter-spacing 0.2em, small |
| Body | Montserrat Regular / Medium | `Montserrat-Regular.ttf`, `Montserrat-Medium_0.ttf` | 16px minimum, line-height 1.7 |

The other files in the folder (Avenir, Bebas, Mont, Myriad Pro) belong to the brand sheet itself. Do not load them.

Type scale (fluid, `clamp`): display 44–88px, h2 32–56px, h3 22–28px, body 16–18px, label 12–13px.

Every section heading follows one pattern: small gold eyebrow → Baskervville title → short ornament rule → one or two lines of body.

### 3.4 Signature elements

| Element | What it is | Where it is used |
|---|---|---|
| **Arch frame** | The brand's rounded-rectangle with fully round ends (portrait, about 3:4.3), with a gold hairline 8–12px outside or inside it | amenity images, highlight tiles, logo badge, floor-plan frame |
| **Pill button** | The same shape laid on its side | every button |
| **Chevron border** | `border.png`, repeated horizontally, 20–28px high | top and bottom edge of every dark section |
| **Kolam pattern** | `pattern.png`, tiled at 4–6% visible strength | white sections, and very faint on aubergine |
| **Inset panel** | A coloured block with 28–40px corner radius, inset 16–24px from the viewport edge | hero, highlights, connectivity, contact |
| **Go Grand lockup** | `go-grand.png` | hero and footer only |

### 3.5 Motion

Quiet and slow. Motion should feel like a door opening, not a slideshow.

- Sections fade up 24px over 700ms as they enter the viewport, children staggered by 80ms.
- Arch images scale from 1.06 to 1.0 on reveal and to 1.04 on hover.
- Hero: tower image drifts slowly (subtle parallax); headline reveals line by line.
- Header shrinks and gains its aubergine background after 80px of scroll.
- Everything is switched off under `prefers-reduced-motion`.

Build this with CSS and one small `IntersectionObserver` component. No animation library.

### 3.6 Layout

- Content width 1240px max; side gutter 20px mobile, 40px tablet, 64px desktop.
- Section padding 72px mobile, 128px desktop.
- Design mobile first at 375px. Check 768px, 1024px, 1440px.

---

## 4. Sections

Content below is taken from the reference site. **Treat every fact as a draft until the client confirms it** (see section 10).

### Header

Logo (`vaishno-vyom-mark.png` + wordmark) left, eight anchor links centre, phone number and **Enquire Now** pill right. Below 1360px the links collapse into a full-screen aubergine menu with the links numbered 01–08. The link for the section in view is underlined in gold.

### Hero

Full-height aubergine inset panel. Text on the left; on the right, `elevation-clouds.jpg` inside a large arch frame with two floating chips (metro time, MahaRERA number). The tower renders are square, so an arch shows the whole tower where a full-bleed image would crop it.

- Eyebrow: *Codename Go Grand* with the `go-grand.png` lockup
- Headline: **Own A Higher Place In The City**
- Line: 1 & 2 BHK and Jodi residences above an elevated amenities deck at Kathiyawadi Chowk, Malad (East)
- Buttons: **Get Price & Floor Plans** (gold, opens form) · **Explore Floor Plans** (outline, scrolls)
- A CSS-only preloader (logo, wordmark, gold progress line) lifts like a curtain as the hero text rises in
- Stat strip along the bottom edge, four items: *1 & 2 BHK + Jodi* · *484–1646 sq.ft. carpet* · *11+ sky-deck amenities* · *2 min to Dindoshi Metro*

### 1. Overview — "A New Landmark For Malad East"

Two columns. Left: heading and a short paragraph. Right: `elevation-day.jpg` in a tall arch frame. Under both, a grid of key-fact cards:

| Fact | Value |
|---|---|
| Project type | Residential high-rise over a retail podium |
| Configuration | 1 BHK, 2 BHK, Jodi |
| Carpet area | 484–1646 sq.ft. |
| Location | Rani Sati Road, Malad (East) |
| Amenity level | Elevated sky-deck |
| MahaRERA | P51800076925 |
| Pricing | On request |

CTA: **Request Price List**

### 2. About — "A World Of Exceptional Living"

Image-led split, mirrored from Overview so the page zig-zags. Left: two overlapping arch frames (`residence-living.jpg`, `balcony.jpg`). Right: heading, two paragraphs about the podium, parking, sky-deck and metro access, and a short line about the developer (Vaishno Homes).

CTAs: **Download Brochure** (opens form, then delivers the file) · **See Amenities** (scrolls)

### 3. Highlights — "Everything That Makes It Worth The Climb"

Dark brown inset panel, chevron border top and bottom. Eight cards in a 4×2 grid (2×4 on mobile). Each card: gold line icon, title, one sentence.

1. Amenities Sky-Deck
2. An Entrance Worth The Address
3. Two-Way Entry & Exit Ramp
4. Jodi Flats Available
5. Decks In Every Home
6. Vertical Green Facade
7. Jain Derasar At 0 Min
8. MahaRERA Registered

CTA: **Book A Site Visit**

### 4. Amenities — "An Entire Deck, Given To Living"

The showpiece section, and the one the brand kit speaks about directly: *"use this same shape and place amenity images inside it."*

A row of arch frames, each holding one amenity photo, with the name and a one-line caption underneath — exactly the four-tile row in the reference image. Horizontal scroll with snap on mobile, 4-up grid on desktop. Frames alternate gold-outline and aubergine-outline styles.

Amenities: Infinity Swimming Pool, Gym & Cardio, Spa, Steam Room, Meditation Area, Kids' Play Area, Green Walkways, Banquet Hall, Indoor Games, Conference Room, Guest Room, Party Lawn.

Amenities without a photo yet (see section 9) appear in a second, compact list with icons rather than empty frames.

CTA: **Get The Full Amenity List**

### 5. Configuration — "Nine Layouts. One Address."

Three summary cards on top, then the full table.

| Card | Carpet area |
|---|---|
| 1 BHK | 484 sq.ft. |
| 2 BHK | 628–839 sq.ft. |
| Jodi | 1112–1646 sq.ft. |

| Configuration | Series | RERA carpet area | Price |
|---|---|---|---|
| 1 BHK | 5 | 484 sq.ft. | On request |
| 2 BHK | 6 | 628 sq.ft. | On request |
| 2 BHK | 4 | 796 sq.ft. | On request |
| 2 BHK | 2 | 807 sq.ft. | On request |
| 2 BHK | 3 | 819 sq.ft. | On request |
| 2 BHK | 1 | 839 sq.ft. | On request |
| Jodi 2+1 BHK | 5 & 6 | 1112 sq.ft. | On request |
| Jodi 2+2 BHK | 3 & 4 | 1615 sq.ft. | On request |
| Jodi 2+2 BHK | 1 & 2 | 1646 sq.ft. | On request |

On mobile the table becomes a stack of cards — no sideways scrolling. Each "On request" is a link that opens the form with that configuration already selected. Note under the table: Jodi homes are on select floors only.

CTA: **Check Availability**

### 6. Floor Plans — "Walk Through Every Layout"

Filter tabs: **All · 1 BHK · 2 BHK · Jodi**. Left: list of plans for the active tab. Right: the selected plan, large, in a white card with a gold hairline. Clicking the plan opens a full-screen view.

Until plan drawings are supplied, the viewer shows a placeholder card with the layout name, series and carpet area, and a **Request This Plan** button that opens the form with that configuration selected. Add an `image` to a layout in `_content/configurations.ts` and the drawing appears in its place.

Disclaimer line: plans and areas are indicative and subject to approval.

CTA: **Request Full Plan Set**

### 7. Connectivity — "Close To Life. Connected To More."

Aubergine inset panel. Top: heading beside a travel-time ring diagram (minutes, not a geographic map; hidden on phones). Below: two lists with travel time in large gold numerals.

| Transit | | Everyday | |
|---|---|---|---|
| Dindoshi Metro | 2 min | Jain Derasar | 0 min |
| Western Express Highway | 2 min | Schools | 2 min |
| Malad Railway Station | 5 min | Hospitals | 2 min |
| S. V. Road | 7 min | Vaishno Business Centre | 3 min |
| International Airport | 20 min | Oberoi Mall | 5 min |

Address: Vaishno Vyom, Kathiyawadi Chowk, Rani Sati Road, Malad (East), Mumbai 400097.

CTAs: **Open In Google Maps** · **Plan My Site Visit**

### 8. Contact Us — "Answer The Golden Call"

Two columns. Left: `vaishno-vyom-badge.png`, address, phone (+91 96533 59559), email (sales@vaishnosky.com), WhatsApp link, MahaRERA number linked to the state portal. Right: the enquiry form in a cream card.

Form fields:

| Field | Required | Notes |
|---|---|---|
| Full name | yes | |
| Mobile number | yes | fixed +91 prefix, 10 digits |
| Email | no | |
| Configuration | no | 1 BHK / 2 BHK / Jodi (2+1) / Jodi (2+2) / Not sure yet |
| Message | no | |
| Consent | yes | checkbox authorising calls, SMS, email and WhatsApp |

Submit: **Request A Call Back**. On success the form is replaced by a thank-you message; on failure the message tells the visitor to call instead and shows the number.

### Footer

Dark brown. Logo and Go Grand lockup, section links, residence types, address and contacts, MahaRERA number, legal disclaimer (details indicative, images are artist's impressions, not an offer or contract), © 2026 Vaishno Homes.

---

## 5. Code structure

```
app/
  layout.tsx              fonts, metadata, <html>/<body>
  page.tsx                assembles the sections in order + JSON-LD
  globals.css             Tailwind import, @theme tokens, base styles
  fonts.ts                next/font/local definitions
  icon.png                favicon (from vaishno-vyom-mark)
  robots.ts
  sitemap.ts
  actions/
    enquiry.ts            'use server' — validate and forward a lead
  _components/
    layout/               Header, Footer, Marquee, MobileActionBar
    sections/             Hero, Overview, About, Highlights, Amenities,
                          Configuration, FloorPlans, Connectivity, Contact
    ui/                   Section, SectionHeading, ArchFrame, button, EnquireButton,
                          EnquiryForm, EnquiryDialog, RevealObserver, Preloader
  _content/               all copy and data as typed objects
    site.ts               name, contacts, RERA, nav items
    overview.ts  highlights.ts  amenities.ts
    configurations.ts  connectivity.ts
  _lib/
    validation.ts         shared form validation
    cn.ts                 class and stagger helpers
google-apps-script/
  Code.gs                 paste into the Sheet (Extensions > Apps Script)
public/
  images/                 photos, logos, pattern, border
  floor-plans/            (to be supplied)
design/                   ui_design.pdf, referceimg.jpg — moved out of public/
```

Rules that keep this tidy:

- **Copy lives in `_content/`, never inside components.** A text change is a data change.
- **Sections are server components.** Only these need `'use client'`: `Header`, `FloorPlans`, `EnquireButton`, `EnquiryForm`, `EnquiryDialog`, `RevealObserver`.
- **One form component, one dialog.** Every CTA is an `EnquireButton` that opens `EnquiryDialog` and passes a `source` string (for example `floor-plans`) so the sales team knows what the visitor was looking at.
- **One `Section` wrapper** sets the anchor id, background variant, padding and chevron borders. No section styles its own outer spacing.

### Next.js 16 points to respect

Checked against the docs bundled in `node_modules/next/dist/docs/`:

- Images: use the `preload` prop for the hero image. `priority` is deprecated.
- `images.qualities` defaults to `[75]`. Add other values in `next.config.ts` before using them.
- Local fonts: `next/font/local`, with `src` relative to the file that calls it. Expose each font as a CSS variable and map it in `@theme`.
- Tailwind v4 is configured in CSS (`@theme` in `globals.css`). There is no `tailwind.config.js`.
- Forms: Server Action + React `useActionState` for pending and error states.
- Layout props use the generated `LayoutProps<'/'>` type, as the starter already does.
- No `proxy.ts` (the new name for middleware) is needed.

---

## 6. Lead capture

```
EnquiryForm (client)
   └─ useActionState → submitEnquiry (server action)
         ├─ validate (name, 10-digit mobile, consent)
         ├─ drop silently if the hidden honeypot field is filled
         ├─ POST JSON to the Google Apps Script web app (env: GOOGLE_SCRIPT_URL)
         │     └─ google-apps-script/Code.gs: append a row to the Sheet, email the sales team
         └─ return { ok } or { ok: false, errors }
```

- Leads go to a Google Sheet and to email through Google Apps Script. Setup steps are in the README. If `GOOGLE_SCRIPT_URL` is missing or the script fails, the visitor is told to call instead — a lead is never reported as sent when it was not.
- Each lead carries: form fields, `source`, page URL (including UTM parameters), timestamp.
- Secrets stay in environment variables. Nothing sensitive reaches the browser.

---

## 7. Performance, accessibility, SEO

**Performance** — target Lighthouse mobile 90+.

- The page is fully static.
- All photos go through `next/image` with correct `sizes`. Only the hero image is preloaded.
- `pattern.png` is 1.8 MB and `go-grand.png` 1.7 MB. Cut the pattern down to one repeating tile and export both as WebP before use.
- No third-party scripts on first load. Analytics and pixels load after the page is interactive.

**Accessibility**

- One `h1` (hero), one `h2` per section, real `<nav>`, `<main>`, `<footer>`.
- Text contrast 4.5:1 or better (see the gold rule in 3.2).
- Menu, dialog and tabs work by keyboard, trap focus correctly and close on Escape.
- Every form field has a visible label. Errors are written next to the field.
- Renders are labelled as artist's impressions in alt text or captions.

**SEO**

- `metadata` in `layout.tsx`: title, description, canonical, Open Graph, Twitter card.
- JSON-LD in `page.tsx`: `ApartmentComplex` plus `Organization` for the developer.
- `robots.ts`, `sitemap.ts`, proper favicon set.

---

## 8. Build order

1. **Foundation** — tokens, fonts, `Section`, `SectionHeading`, `ArchFrame`, `PillButton`, `ChevronBorder`, `Reveal`.
2. **Frame** — header, mobile menu, footer, mobile action bar.
3. **Sections** — hero → overview → about → highlights → amenities → configuration → floor plans → connectivity → contact.
4. **Leads** — form, dialog, server action, success and failure states.
5. **Polish** — motion, responsive pass at four widths, image optimisation, metadata, accessibility check.

---

## 9. Assets

**Available now** (`public/images/`)

| Group | Files |
|---|---|
| Logos | `vaishno-vyom-full.png`, `vaishno-vyom-mark.png`, `vaishno-vyom-badge.png`, `go-grand.png` |
| Decoration | `pattern.png`, `border.png` |
| Elevations (7) | `elevation-day`, `-dusk`, `-clouds`, `-street` (2000×2000), `-boulevard`, `-reveal`, `-alt` |
| Amenities (5) | `amenity-pool`, `-gym`, `-spa`, `-garden`, `-clubhouse` |
| Residences (5) | `residence-living`, `-lounge`, `-suite`, `-bath`, `balcony` |

**Missing**

| Needed | For |
|---|---|
| Floor plan images, one per layout (8–9) | Floor Plans — the section cannot be built without them |
| Photos for up to 8 more amenities (steam, meditation, kids' play, banquet, indoor games, conference, guest room, party lawn) | Amenities |
| Location map artwork | Connectivity |
| Brochure PDF | About → Download Brochure |
| Greek-key border as a separate file (appears in the brand kit, not exported) | optional second divider |
| SVG versions of the logo | sharper header and favicon |

**Housekeeping**

- Move `ui_design.pdf` (27 MB) and `referceimg.jpg` out of `public/` into `design/`. Everything in `public/` is published with the site.
- Rename `public/Fonts/` files to have no spaces, or move the four used fonts to `app/fonts/`.

---

## 10. Open questions

| # | Question | Assumed until answered |
|---|---|---|
| 1 | The project folder is named **Vaishno Vyom**, but the logo, brand kit and reference site all say **Vaishno Sky**. Which name goes on the site? | Vaishno Vyom (the Vaishno Sky logo was replaced with the Vaishno Vyom logo) |
| 2 | The brand kit labels the light background `#FFF3E1` (cream) but paints that swatch bright yellow (`#FED14B`). Which is intended? | Cream `#FFF3E1` as written |
| 3 | Are the facts from the reference site final — areas, series, travel times, phone, email, RERA number? | Used as drafts |
| 4 | Should floor plan drawings be locked behind the form once they are supplied? | No — shown openly |
| 5 | Which analytics and ad pixels are required (GA4, Meta, Google Ads)? | None until specified |
| 6 | Final domain, for canonical URL and sitemap? | Placeholder in `_content/site.ts` |
