"use client";

import { Hover, Icon, useNavState } from "../lib/ui";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

export function Logo({ fontSize = 19 }: { fontSize?: number }) {
  return (
    <>
      <span
        aria-hidden="true"
        style={{
          width: 32,
          height: 32,
          borderRadius: 9,
          background: "#17304A",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: 3,
          padding: "0 0 7px",
        }}
      >
        <span style={{ width: 4, height: 9, background: "#C9A35C", borderRadius: 2 }} />
        <span style={{ width: 4, height: 13, background: "#C9A35C", borderRadius: 2 }} />
        <span style={{ width: 4, height: 17, background: "#C9A35C", borderRadius: 2 }} />
      </span>
      <span style={{ fontSize, fontWeight: 600, letterSpacing: "-0.02em" }}>
        Fiscal Fork
      </span>
    </>
  );
}

export default function SiteHeader({
  current,
  homeHref = "/",
  ctaHref = "/contact",
  contactHref = "/contact",
  mobileCta = true,
}: {
  /** The nav entry marked as the current page. The home page marks "Home". */
  current: "Home" | "About" | "Services" | "Industries" | "Resources" | "Contact";
  /** The home page points its logo and Home link at `#top` instead of `/`. */
  homeHref?: string;
  ctaHref?: string;
  /** The contact page points its own Contact link at the form instead. */
  contactHref?: string;
  /** The contact page drops the duplicate CTA from its mobile menu. */
  mobileCta?: boolean;
}) {
  const { isDesktop, isMobile, menuOpen, toggleMenu, closeMenu } = useNavState();

  const hrefFor = (label: string) =>
    label === "Home"
      ? homeHref
      : label === "Contact"
        ? contactHref
        : NAV_LINKS.find((l) => l.label === label)!.href;

  return (
    <header
      data-screen-label="Nav"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(247,245,241,0.86)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(13,23,38,0.08)",
      }}
    >
      <nav
        aria-label="Primary"
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "16px clamp(20px,4vw,48px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        <a
          href={homeHref}
          aria-label="Fiscal Fork home"
          style={{ display: "flex", alignItems: "center", gap: 10, color: "#0D1726" }}
        >
          <Logo />
        </a>

        {isDesktop ? (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 32, fontSize: 15 }}>
              {NAV_LINKS.map((l) => {
                const href = hrefFor(l.label);
                return l.label === current ? (
                  <a
                    key={l.label}
                    href={href}
                    {...(current === "Home" && homeHref === "#top"
                      ? {}
                      : { "aria-current": "page" as const })}
                    style={{ color: "#0D1726", fontWeight: 500 }}
                  >
                    {l.label}
                  </a>
                ) : (
                  <Hover
                    key={l.label}
                    href={href}
                    style={{ color: "#676E78" }}
                    hoverStyle={{ color: "#0D1726" }}
                  >
                    {l.label}
                  </Hover>
                );
              })}
            </div>
            <Hover
              href={ctaHref}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#17304A",
                color: "#F7F5F1",
                padding: "12px 20px",
                borderRadius: 999,
                fontSize: 15,
                fontWeight: 500,
                transition: "background 200ms",
              }}
              hoverStyle={{ background: "#0D1726", color: "#F7F5F1" }}
            >
              Book a Consultation
            </Hover>
          </>
        ) : null}

        {isMobile ? (
          <button
            onClick={toggleMenu}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              border: "1px solid rgba(13,23,38,0.14)",
              background: "#FFFFFF",
              color: "#0D1726",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <Icon name={menuOpen ? "icon-x" : "icon-menu"} style={{ fontSize: 20 }} />
          </button>
        ) : null}
      </nav>

      {isMobile && menuOpen ? (
        <div
          style={{
            borderTop: "1px solid rgba(13,23,38,0.08)",
            padding: "12px 20px 24px",
            display: "flex",
            flexDirection: "column",
            background: "#F7F5F1",
          }}
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={hrefFor(l.label)}
              onClick={closeMenu}
              style={{
                padding: "14px 4px",
                fontSize: 18,
                color: "#0D1726",
                borderBottom: "1px solid rgba(13,23,38,0.08)",
              }}
            >
              {l.label}
            </a>
          ))}
          {mobileCta ? (
            <a
              href="/contact"
              onClick={closeMenu}
              style={{
                marginTop: 20,
                textAlign: "center",
                background: "#17304A",
                color: "#F7F5F1",
                padding: "16px 20px",
                borderRadius: 999,
                fontSize: 16,
                fontWeight: 500,
              }}
            >
              Book a Consultation
            </a>
          ) : null}
        </div>
      ) : null}
    </header>
  );
}
