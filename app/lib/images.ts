/**
 * Photography, served from the Unsplash CDN.
 *
 * Each entry replaces one of the design's `<image-slot>` placeholders, and the
 * `alt` text is written from the caption that placeholder carried. `id` is the
 * photo's Unsplash CDN identifier; the `Photo` component builds the URL and
 * lets next/image pick the width, so there is no size baked in here.
 *
 * Used under the Unsplash License (free for commercial use, attribution not
 * required). To swap a photo, change its `id` — nothing else needs to move.
 */
export type Photo = { id: string; alt: string };

export const PHOTOS = {
  /* Home ----------------------------------------------------------------- */
  hero: {
    id: "photo-1454165804606-c3d57bc86b40",
    alt: "Two colleagues reviewing financial reports together at a desk",
  },

  /* Industries — eight hospitality segments, a primary and a detail image
     each; the detail one is what the modal adds to the card. -------------- */
  "fine-dining": {
    id: "photo-1414235077428-338989a2e8c0",
    alt: "A plated course in a fine dining restaurant",
  },
  "fine-dining-detail": {
    id: "photo-1517248135467-4c7edcad34c4",
    alt: "The dining room of a fine dining restaurant",
  },
  hotels: {
    id: "photo-1540541338287-41700207dee6",
    alt: "A resort pool overlooking the sea",
  },
  "hotels-detail": {
    id: "photo-1578683010236-d716f9a3f461",
    alt: "A made-up guest room in a hotel",
  },
  "fast-casual": {
    id: "photo-1546069901-ba9599a7e63c",
    alt: "A prepared bowl on a fast casual counter",
  },
  "fast-casual-detail": {
    id: "photo-1555992336-fb0d29498b13",
    alt: "Booth seating in a quick service restaurant",
  },
  bars: {
    id: "photo-1543007630-9710e4a00a20",
    alt: "A bar counter lit for evening service",
  },
  "bars-detail": {
    id: "photo-1566417713940-fe7c737a9ef2",
    alt: "A cocktail being poured in a nightclub",
  },
  cafes: {
    id: "photo-1509042239860-f550ce710b93",
    alt: "A latte with poured art on a cafe table",
  },
  "cafes-detail": {
    id: "photo-1453614512568-c4024d13c247",
    alt: "The counter and menu board of a coffee shop",
  },
  catering: {
    id: "photo-1600891964599-f61ba0e24092",
    alt: "Shared plates laid out for an event",
  },
  "catering-detail": {
    id: "photo-1504674900247-0877df9cc836",
    alt: "Plated dishes prepared for service",
  },
  "food-trucks": {
    id: "photo-1565123409695-7b5ef63a2efb",
    alt: "A food truck parked and serving",
  },
  "food-trucks-detail": {
    id: "photo-1551218808-94e220e084d2",
    alt: "Prep work on a kitchen counter",
  },
  "ghost-kitchens": {
    id: "photo-1556910103-1c02745aae4d",
    alt: "Two cooks working in a shared kitchen",
  },
  "ghost-kitchens-detail": {
    id: "photo-1577219491135-ce391730fb2c",
    alt: "A chef plating under kitchen pass lamps",
  },

  /* Construction, Healthcare, Retail — non-hospitality sectors shown on the
     homepage Industries section alongside Restaurants. -------------------- */
  construction: {
    id: "photo-1541888946425-d81bb19240f5",
    alt: "A crew in hard hats reviewing a large-scale construction site from above",
  },
  "construction-detail": {
    id: "photo-1503387762-592deb58ef4e",
    alt: "An architect marking up blueprints at a job site",
  },
  healthcare: {
    id: "photo-1576091160550-2173dba999ef",
    alt: "A stethoscope resting on a laptop keyboard at a practice",
  },
  "healthcare-detail": {
    id: "photo-1519494026892-80bbd2d6fd0d",
    alt: "The reception desk of a medical clinic",
  },
  retail: {
    id: "photo-1556740758-90de374c12ad",
    alt: "A retailer completing a sale at the checkout counter",
  },
  "retail-detail": {
    id: "photo-1441986300917-64674bd600d8",
    alt: "Shelves and racks of merchandise in a boutique store",
  },
  "professional-services": {
    id: "photo-1521737604893-d14cc237f11d",
    alt: "A small team meeting around a table with laptops open",
  },
  "professional-services-detail": {
    id: "photo-1556761175-5973dc0f32e7",
    alt: "A consultant presenting to a seated team in an office",
  },

  /* Services — one per service block -------------------------------------- */
  "svc-bookkeeping": {
    id: "photo-1520607162513-77705c0f0d4a",
    alt: "Desk with paperwork, phone and laptop during a bookkeeping session",
  },
  "svc-reporting": {
    id: "photo-1559526324-4b87b5e36e44",
    alt: "Reviewing performance figures on a laptop",
  },
  "svc-payroll": {
    id: "photo-1504384308090-c894fdcc538d",
    alt: "Open-plan workplace with staff across many desks",
  },
  "svc-ap-ar": {
    id: "photo-1554224155-8d04cb21cd6c",
    alt: "Calculator resting on a stack of invoices",
  },
  "svc-financials": {
    id: "photo-1591696205602-2f950c417cb9",
    alt: "A performance trend line printed on a report",
  },
  "svc-tax": {
    id: "photo-1586486855514-8c633cc6fd38",
    alt: "An annual tax statement on a desk",
  },
  "svc-cleanup": {
    id: "photo-1554224155-6726b3ff858f",
    alt: "Hands sorting through a pile of financial forms",
  },
  "svc-cfo": {
    id: "photo-1517245386807-bb43f82c33c4",
    alt: "A working session around a laptop in a meeting room",
  },
  "svc-cross-border": {
    id: "photo-1580519542036-c47de6196ba5",
    alt: "Banknotes from several countries laid out together",
  },

  /* Resources ------------------------------------------------------------- */
  "resource-featured": {
    id: "photo-1460925895917-afdab827c52f",
    alt: "Laptop showing financial charts on a desk",
  },
  "article-1": {
    id: "photo-1450101499163-c8848c66ca85",
    alt: "Signing paperwork at a desk",
  },
  "article-2": {
    id: "photo-1587560699334-cc4ff634909a",
    alt: "Laptop and phone on a tidy desk",
  },
  "article-3": {
    id: "photo-1579621970563-ebec7560ff3e",
    alt: "A plant growing out of a pile of coins",
  },
  "article-4": {
    id: "photo-1551288049-bebda4e38f71",
    alt: "Analytics dashboard showing performance charts",
  },
  "article-5": {
    id: "photo-1553877522-43269d4ea984",
    alt: "An empty meeting room, shot in black and white",
  },
  "article-6": {
    id: "photo-1542744173-8e7e53415bb0",
    alt: "A team meeting around a boardroom table",
  },

  /* Contact --------------------------------------------------------------- */
  "office-map": {
    id: "photo-1497366811353-6870744d04b2",
    alt: "The Fiscal Fork office",
  },
} as const satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof PHOTOS;
