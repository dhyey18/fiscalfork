"use client";

import { Hover, Icon } from "../lib/ui";
import { Logo } from "./SiteHeader";

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
  color: "#0F1E1A",
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
            style={{ display: "flex", alignItems: "center", gap: 10, color: "#0F1E1A" }}
          >
            <Logo />
          </a>
          <p
            style={{
              margin: "18px 0 0",
              fontSize: 15,
              lineHeight: 1.6,
              color: "#55625D",
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
              style={{ color: "#55625D" }}
              hoverStyle={{ color: "#0F1E1A" }}
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
              style={{ color: "#55625D" }}
              hoverStyle={{ color: "#0F1E1A" }}
            >
              {label}
            </Hover>
          ))}
        </nav>

        <address style={{ fontStyle: "normal", ...col }}>
          <div style={colHead}>Contact</div>
          <Hover
            href="mailto:hello@fiscalfork.com"
            style={{ color: "#55625D", display: "flex", alignItems: "center", gap: 10 }}
            hoverStyle={{ color: "#0F1E1A" }}
          >
            <Icon name="icon-mail" />
            hello@fiscalfork.com
          </Hover>
          <Hover
            href="tel:+10000000000"
            style={{ color: "#55625D", display: "flex", alignItems: "center", gap: 10 }}
            hoverStyle={{ color: "#0F1E1A" }}
          >
            <Icon name="icon-phone" />
            +1 (000) 000-0000
          </Hover>
          <span
            style={{ color: "#55625D", display: "flex", alignItems: "center", gap: 10 }}
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
          borderTop: "1px solid rgba(15,30,26,0.12)",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "12px 24px",
          fontSize: 14,
          color: "#55625D",
        }}
      >
        <span>© 2026 Fiscal Fork. All rights reserved.</span>
        <div style={{ display: "flex", gap: 24 }}>
          <Hover href="#" style={{ color: "#55625D" }} hoverStyle={{ color: "#0F1E1A" }}>
            Privacy Policy
          </Hover>
          <Hover href="#" style={{ color: "#55625D" }} hoverStyle={{ color: "#0F1E1A" }}>
            Terms of Service
          </Hover>
        </div>
      </div>
    </footer>
  );
}
