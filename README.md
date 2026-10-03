# fiscalfork

The Fiscal Fork marketing site — a Next.js (App Router) port of the original
static build, matched to it pixel for pixel.

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
```

`npm run build && npm start` for a production build. All six routes prerender as
static pages.

## Layout

```
app/
  page.tsx + home-content.tsx     /
  about|services|industries|resources|contact/
      page.tsx                    route metadata (server component)
      content.tsx                 the page itself (client component)
  components/SiteHeader.tsx       sticky nav, 960px mobile breakpoint
  components/SiteFooter.tsx
  lib/ui.tsx                      shared primitives (see below)
  globals.css                     fonts + Lucide icon font, no utility framework
public/fonts/                     Hanken Grotesk, Newsreader, JetBrains Mono, Lucide
```

Each route is split into a server `page.tsx` that only exports `metadata` and a
client `content.tsx` holding the markup and state.

## Conventions

These are deliberate and load-bearing — the port was verified against the original
by screenshot diffing at 390/768/1024/1280/1440px, so changing them will show up as
visual drift.

- **Styling is inline `style={{}}`.** There is no Tailwind. `globals.css` is the
  original stylesheet (25 `@font-face` rules, ~1540 icon glyph rules) with font URLs
  rewritten to `/fonts/`.
- **`Hover` and `useFocusStyle`** (in `lib/ui.tsx`) generate real
  `.scp-*:hover { … !important }` stylesheet rules rather than swapping inline
  styles from JS. `!important` is what lets them beat an element's own inline style.
- **`ImageSlot`** (the unfilled placeholder, kept for frames with no photo yet)
  stays in normal flow with `aspect-ratio: 3/2` and may stretch a parent whose own
  aspect ratio is flatter. Do not make it `position: absolute`.
- **`useReveal`** drives the home page's scroll fade-in. It re-observes every
  still-pending element on each effect run (React StrictMode runs effects twice in
  dev), and commits the hidden state with `transition: none` plus a forced reflow
  before arming the transition, so elements already on screen start hidden instead
  of fading out first.
- **Text before an inline `<span>`** is written as one string literal
  (`{"Some text "}`), never `Some text{" "}` — the latter splits the text node and
  shifts the span by a subpixel.
- **Internal links are plain `<a>`**, so navigation is a full page load as on the
  original site. `@next/next/no-html-link-for-pages` is off in `eslint.config.mjs`
  for that reason; switch to `next/link` if you want client-side routing.

## Photography

Every photo is listed once in `app/lib/images.ts`, keyed by the slot it fills
(`hero`, `healthcare`, `founder-2`, `article-4`, …) with its Unsplash CDN id and
its alt text. The `Photo` component builds the URL and renders it through
`next/image` with `fill`, so each frame's shape comes from its container.

To change a picture, edit that one `id` — nothing else moves. Pass a `sizes` hint
at the call site that reflects how wide the image really renders, so next/image
requests a sensibly sized file. `images.unsplash.com` is allow-listed in
`next.config.ts`.

Photos are used under the [Unsplash License](https://unsplash.com/license): free
for commercial use, attribution not required. Nothing is vendored into the repo —
the images are served from Unsplash's CDN, so the site needs network access to
them at runtime.

## Known issue

Inside the contact form's two native `<select>` elements the button text sits 1px
higher than the original at some viewport widths. Computed styles, fonts and box
geometry are identical; it is a Chrome rendering artifact in the native widget.
