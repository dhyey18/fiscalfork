"use client";

import Image from "next/image";
import { Hover, Icon } from "../lib/ui";

/** The full lockup (badge + wordmark + tagline) from /logo.svg, 1000×375. The
 *  footer has room for the complete brand mark, unlike the compact nav. */
const LOGO_ASPECT = 1000 / 375;
const FOOTER_LOGO_HEIGHT = 86;
const FOOTER_LOGO_WIDTH = Math.round(FOOTER_LOGO_HEIGHT * LOGO_ASPECT);

const COMPANY = [
  ["About", "/about"],
  ["Services", "/services"],
  ["Industries", "/industries"],
  ["Resources", "/resources"],
  ["Contact", "/contact"],
];

const SERVICES = [
  ["Bookkeeping", "/services#bookkeeping"],
  ["Tax", "/services#tax"],
  ["Payroll", "/services#payroll"],
  ["Financial Reporting", "/services#reporting"],
  ["CFO Advisory", "/services#cfo"],
];

const colHead: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 600,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "#0B0F14",
  marginBottom: 6,
};

const col: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
  fontSize: 15,
};

export default function SiteFooter() {
  return (
    <footer
      data-screen-label="Footer"
      style={{
        maxWidth: 1280,
        margin: "0 auto",
        padding: "clamp(56px,7vw,88px) clamp(20px,4vw,48px) 32px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,200px),1fr))",
          gap: "48px 32px",
        }}
      >
        <div style={{ maxWidth: 300 }}>
          <a
            href="/"
            aria-label="Fiscal Fork home"
            style={{ display: "flex", alignItems: "center", gap: 10, color: "#0B0F14" }}
          >
            <Image
              src="/logo.svg"
              alt=""
              aria-hidden="true"
              width={FOOTER_LOGO_WIDTH}
              height={FOOTER_LOGO_HEIGHT}
              style={{ width: FOOTER_LOGO_WIDTH, height: FOOTER_LOGO_HEIGHT, flex: "none", display: "block" }}
            />
          </a>
          <p
            style={{
              margin: "18px 0 0",
              fontSize: 15,
              lineHeight: 1.6,
              color: "#656A73",
            }}
          >
            Modern accounting, tax and financial advisory for businesses that want
            clear numbers and a partner who explains them.
          </p>
        </div>

        <nav aria-label="Company" style={col}>
          <div style={colHead}>Company</div>
          {COMPANY.map(([label, href]) => (
            <Hover
              key={label}
              href={href}
              style={{ color: "#656A73" }}
              hoverStyle={{ color: "#0B0F14" }}
            >
              {label}
            </Hover>
          ))}
        </nav>

        <nav aria-label="Services" style={col}>
          <div style={colHead}>Services</div>
          {SERVICES.map(([label, href]) => (
            <Hover
              key={label}
              href={href}
              style={{ color: "#656A73" }}
              hoverStyle={{ color: "#0B0F14" }}
            >
              {label}
            </Hover>
          ))}
        </nav>

        <address style={{ fontStyle: "normal", ...col }}>
          <div style={colHead}>Contact</div>
          <Hover
            href="mailto:hello@fiscalfork.com"
            style={{ color: "#656A73", display: "flex", alignItems: "center", gap: 10 }}
            hoverStyle={{ color: "#0B0F14" }}
          >
            <Icon name="icon-mail" />
            hello@fiscalfork.com
          </Hover>
          <Hover
            href="tel:+10000000000"
            style={{ color: "#656A73", display: "flex", alignItems: "center", gap: 10 }}
            hoverStyle={{ color: "#0B0F14" }}
          >
            <Icon name="icon-phone" />
            +1 (000) 000-0000
          </Hover>
          <span
            style={{ color: "#656A73", display: "flex", alignItems: "center", gap: 10 }}
          >
            <Icon name="icon-map-pin" />
            City, Country
          </span>
        </address>
      </div>

      <div
        style={{
          marginTop: 64,
          paddingTop: 24,
          borderTop: "1px solid rgba(11,15,20,0.12)",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "12px 24px",
          fontSize: 14,
          color: "#656A73",
        }}
      >
        <span>© 2026 Fiscal Fork. All rights reserved.</span>
        <div style={{ display: "flex", gap: 24 }}>
          <Hover href="#" style={{ color: "#656A73" }} hoverStyle={{ color: "#0B0F14" }}>
            Privacy Policy
          </Hover>
          <Hover href="#" style={{ color: "#656A73" }} hoverStyle={{ color: "#0B0F14" }}>
            Terms of Service
          </Hover>
        </div>
      </div>
    </footer>
  );
}
