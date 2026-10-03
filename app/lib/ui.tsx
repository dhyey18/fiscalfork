"use client";

import Image from "next/image";
import {
  createElement,
  useEffect,
  useInsertionEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
import { PHOTOS, type PhotoKey } from "./images";

/* ── `style-hover` / `style-focus` ────────────────────────────────────────
 *
 * The source template carries these as extra style objects on an element. Its
 * runtime turns each distinct one into a deduplicated stylesheet rule —
 * `.scp3:hover { transform: translateY(-2px) !important; … }` — rather than
 * swapping inline styles from JS. We do the same: `!important` is what lets a
 * generated rule win over the element's own inline base style, and keeping the
 * state in CSS (not React) matches the original's text rasterisation while a
 * hover transform is animating.
 */

// Properties React would not append "px" to.
const UNITLESS = new Set([
  "animationIterationCount", "aspectRatio", "borderImageOutset", "borderImageSlice",
  "borderImageWidth", "boxFlex", "boxFlexGroup", "boxOrdinalGroup", "columnCount",
  "columns", "flex", "flexGrow", "flexPositive", "flexShrink", "flexNegative",
  "flexOrder", "gridArea", "gridRow", "gridRowEnd", "gridRowSpan", "gridRowStart",
  "gridColumn", "gridColumnEnd", "gridColumnSpan", "gridColumnStart", "fontWeight",
  "lineClamp", "lineHeight", "opacity", "order", "orphans", "tabSize", "widows",
  "zIndex", "zoom", "scale",
]);

const kebab = (k: string) =>
  k.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase()).replace(/^(webkit|moz|ms)-/, "-$1-");

function declarations(style: CSSProperties) {
  return Object.entries(style)
    .filter(([, v]) => v != null && v !== "")
    .map(([k, v]) => {
      const val = typeof v === "number" && !UNITLESS.has(k) ? `${v}px` : v;
      return `${kebab(k)}:${val} !important`;
    })
    .join(";");
}

// Stable across server and client, so the rendered class name matches.
function hash(s: string) {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h * 33) ^ s.charCodeAt(i)) >>> 0;
  return h.toString(36);
}

const injected = new Set<string>();

/** Registers `.<class>:<pseudo> { … }` once per distinct style and returns the class. */
function useStateRule(pseudo: "hover" | "focus", style?: CSSProperties) {
  const decls = style ? declarations(style) : "";
  const cls = decls ? `scp-${pseudo}-${hash(decls)}` : undefined;

  useInsertionEffect(() => {
    if (!cls || injected.has(cls)) return;
    injected.add(cls);
    let sheet = document.getElementById("scp-rules");
    if (!sheet) {
      sheet = document.createElement("style");
      sheet.id = "scp-rules";
      document.head.appendChild(sheet);
    }
    sheet.appendChild(document.createTextNode(`.${cls}:${pseudo}{${decls}}`));
  }, [cls, decls, pseudo]);

  return cls;
}

export function Hover<T extends ElementType = "a">({
  as,
  style,
  hoverStyle,
  className,
  children,
  ...rest
}: {
  as?: T;
  style?: CSSProperties;
  hoverStyle?: CSSProperties;
  className?: string;
  children?: ReactNode;
} & Omit<
  React.ComponentPropsWithoutRef<T>,
  "as" | "style" | "className" | "children"
>) {
  const cls = useStateRule("hover", hoverStyle);
  return createElement(
    (as ?? "a") as ElementType,
    {
      ...rest,
      className: [className, cls].filter(Boolean).join(" ") || undefined,
      style,
    },
    children,
  );
}

/** `<i class="icon-*">` — the bundled Lucide icon font. */
export function Icon({
  name,
  style,
  ...rest
}: { name: string; style?: CSSProperties } & React.HTMLAttributes<HTMLElement>) {
  return <i className={name} aria-hidden="true" style={style} {...rest} />;
}

/**
 * A photograph filling its container, in place of the design's `<image-slot>`
 * placeholder. Every call site already establishes a height (an inset wrapper,
 * a `min-height`, or its own `aspect-ratio`), so `fill` is safe and the parent
 * keeps deciding the shape of the frame.
 *
 * `sizes` tells next/image how wide the image will actually render, so it can
 * request a sensibly sized file instead of a full-width one.
 */
export function Photo({
  name,
  sizes = "100vw",
  priority,
}: {
  name: PhotoKey;
  sizes?: string;
  priority?: boolean;
}) {
  const { id, alt } = PHOTOS[name];
  return (
    <Image
      src={`https://images.unsplash.com/${id}`}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      style={{ objectFit: "cover" }}
    />
  );
}

/**
 * `<image-slot>` — the authoring tool's drop-an-image placeholder, kept for any
 * frame that has no photograph yet. It renders the empty state: a tinted frame,
 * a dashed ring and the caption.
 *
 * These styles mirror the custom element's `:host` rules and must not be
 * overridden at the call site. The slot stays in normal flow, so where its
 * parent's height is indefinite (a wrapper sized only by `aspect-ratio`) the
 * slot's own 3/2 ratio can stretch that parent taller.
 */
export function ImageSlot({
  placeholder,
  shape = "rect",
  radius,
  style,
}: {
  placeholder?: string;
  shape?: "rect" | "rounded" | "circle" | "pill";
  radius?: number;
  style?: CSSProperties;
}) {
  const r =
    shape === "circle"
      ? "50%"
      : shape === "pill"
        ? "999px"
        : shape === "rounded"
          ? `${radius ?? 12}px`
          : undefined;
  return (
    <div
      style={{
        display: "block",
        position: "relative",
        font: "13px/1.3 system-ui,-apple-system,sans-serif",
        width: "100%",
        height: "100%",
        aspectRatio: "3/2",
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          background: "rgba(127,127,127,.08)",
          borderRadius: r,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          textAlign: "center",
          padding: 12,
          boxSizing: "border-box",
          userSelect: "none",
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ opacity: 0.45 }}
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="m21 15-5-5L5 21" />
        </svg>
        {placeholder ? (
          <div
            style={{
              maxWidth: "90%",
              fontWeight: 500,
              letterSpacing: ".01em",
              opacity: 0.75,
            }}
          >
            {placeholder}
          </div>
        ) : null}
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          border: "1.5px dashed currentColor",
          opacity: 0.35,
          borderRadius: r,
        }}
      />
    </div>
  );
}

/**
 * Fades `[data-reveal]` elements in as they scroll into view, the same way the
 * original page's `setupReveal` did. Honours `prefers-reduced-motion` and the
 * page's `animations` prop.
 */
export function useReveal(animations: boolean = true) {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    const reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (animations === false || reduce || !("IntersectionObserver" in window)) {
      els.forEach((el) => {
        delete el.dataset.revealed;
        el.style.opacity = "";
        el.style.translate = "";
      });
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const t = e.target as HTMLElement;
            t.dataset.revealed = "done";
            t.style.opacity = "1";
            t.style.translate = "0 0";
            io.unobserve(t);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    // Hide each element that has not been revealed yet. The browser decides
    // whether to transition by comparing computed styles at the *next* style
    // recalculation, so arming the transition in the same pass would make the
    // element fade 1 -> 0 instead of starting hidden. Suppress transitions
    // first, commit the hidden state with one forced reflow, then arm them.
    const pending: { el: HTMLElement; base: string }[] = [];
    els.forEach((el) => {
      // Already faded in: leave it alone, so a re-run never replays the animation.
      if (el.dataset.revealed === "done") return;
      if (el.dataset.revealed !== "pending") {
        pending.push({ el, base: el.style.transition });
        el.dataset.revealed = "pending";
        el.style.transition = "none";
        el.style.opacity = "0";
        el.style.translate = "0 18px";
      }
    });

    if (pending.length) {
      void document.body.offsetHeight; // one flush for the whole batch
      pending.forEach(({ el, base }) => {
        el.style.transition =
          (base ? base + "," : "") +
          "opacity 700ms cubic-bezier(.2,.7,.2,1), translate 700ms cubic-bezier(.2,.7,.2,1)";
      });
    }

    // Observe on every run: the cleanup below drops the previous observer, so
    // anything still pending has to be picked up again or it stays invisible.
    // React re-runs effects on remount, and twice under StrictMode in dev.
    els.forEach((el) => {
      if (el.dataset.revealed !== "done") io.observe(el);
    });

    return () => io.disconnect();
  }, [animations]);
}

/**
 * Viewport width, as the original component tracked it in state. Starts at the
 * page's 1280 default so the server and first client render agree, then
 * corrects on mount.
 */
export function useViewportWidth() {
  const [w, setW] = useState(1280);
  useEffect(() => {
    const onResize = () => setW(window.innerWidth);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return w;
}

/** Mirrors the nav's `w >= 960` desktop breakpoint plus its menu state. */
export function useNavState() {
  const w = useViewportWidth();
  const [menuOpen, setMenuOpen] = useState(false);
  const prev = useRef(w);
  useEffect(() => {
    if (prev.current !== w && w >= 960) setMenuOpen(false);
    prev.current = w;
  }, [w]);
  return {
    w,
    isDesktop: w >= 960,
    isMobile: w < 960,
    menuOpen,
    toggleMenu: () => setMenuOpen((v) => !v),
    closeMenu: () => setMenuOpen(false),
  };
}

/**
 * `style-focus` in the source template: the contact form's fields swap border
 * and background while focused. Spread onto the input or textarea.
 */
export function useFocusStyle(base: CSSProperties, focusStyle: CSSProperties) {
  return { style: base, className: useStateRule("focus", focusStyle) };
}
