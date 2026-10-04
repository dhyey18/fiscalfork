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

  /* Industries — shared by the home page cards and the industries page ---- */
  restaurants: {
    id: "photo-1517248135467-4c7edcad34c4",
    alt: "Interior of a restaurant dining room",
  },
  healthcare: {
    id: "photo-1519494026892-80bbd2d6fd0d",
    alt: "Reception desk of a modern medical practice",
  },
  "professional-services": {
    id: "photo-1552664730-d307ca884978",
    alt: "Consultants working through ideas at a whiteboard",
  },
  ecommerce: {
    id: "photo-1556742049-0cfed4f6a45d",
    alt: "Packing orders at an e-commerce workspace",
  },
  construction: {
    id: "photo-1504307651254-35680f356dfd",
    alt: "Crew working on a construction site",
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
