"use client";

import type { CSSProperties } from "react";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { Hover, Icon, Photo, useViewportWidth } from "../lib/ui";

const DATA = [
  [
    "restaurants",
    "Restaurants & Hospitality",
    "Photo — restaurant interior or kitchen team",
    "Thin margins and high transaction volume mean small cost changes matter. We give you weekly visibility on food, labor and location performance.",
    [
      "Food and labor costs drifting unnoticed",
      "Tip reporting and payroll complexity",
      "Multi-location books that don’t compare",
    ],
    [
      "Prime cost tracking by location",
      "POS and delivery platform reconciliation",
      "Tip-compliant payroll",
    ],
    ["Bookkeeping", "Payroll", "Financial Reporting"],
  ],
  [
    "healthcare",
    "Healthcare",
    "Photo — modern clinic or practice office",
    "Practices juggle payer timing, compliance and staffing. We keep the books clean so you can focus on patients.",
    [
      "Insurance payments hard to reconcile",
      "Uneven cash flow from payer delays",
      "Provider compensation calculations",
    ],
    [
      "Payer and patient revenue reconciliation",
      "Cash flow forecasting around reimbursement cycles",
      "Provider compensation reporting",
    ],
    ["Bookkeeping", "AP & AR", "Financial Planning"],
  ],
  [
    "professional-services",
    "Professional Services",
    "Photo — consultants in a working session",
    "Agencies, firms and consultancies live on utilization and billing. We show which clients and projects are actually profitable.",
    [
      "Unclear project profitability",
      "Slow invoicing and late payments",
      "Partner draws and distributions",
    ],
    [
      "Project and client profitability reporting",
      "Invoicing and collections workflows",
      "Partner compensation planning",
    ],
    ["Financial Reporting", "AP & AR", "Tax Services"],
  ],
  [
    "ecommerce",
    "E-commerce",
    "Photo — packing station or product workspace",
    "Multiple sales channels, payouts and inventory make e-commerce books hard to trust. We reconcile every channel to the cent.",
    [
      "Marketplace payouts that don’t match sales",
      "Inventory and landed cost tracking",
      "Sales tax across many states",
    ],
    [
      "Channel-by-channel reconciliation",
      "Inventory costing and margin by SKU",
      "Sales tax registration and filing",
    ],
    ["Bookkeeping", "Tax Services", "Financial Planning"],
  ],
  [
    "real-estate",
    "Real Estate",
    "Photo — residential or commercial property",
    "Investors, developers and property managers need property-level clarity. We keep every entity and property separate and reportable.",
    [
      "Many entities with shared expenses",
      "Investor reporting takes too long",
      "Depreciation and exchange tracking",
    ],
    [
      "Property and entity-level books",
      "Quarterly investor reporting packages",
      "Tax planning for depreciation and exchanges",
    ],
    ["Bookkeeping", "Tax Services", "Business Advisory"],
  ],
  [
    "technology",
    "Technology & Startups",
    "Photo — startup team at work",
    "Founders need to know burn, runway and what investors will ask next. We build the finance function that grows with each round.",
    [
      "Unclear burn and runway",
      "Investor and board reporting",
      "Missed R&D credits and equity complexity",
    ],
    [
      "Monthly burn, runway and SaaS metrics",
      "Board and investor update packages",
      "R&D credit and equity-related tax support",
    ],
    ["CFO Advisory", "Financial Reporting", "Tax Services"],
  ],
] as const;

const serif: CSSProperties = {
  fontFamily: "'Newsreader',serif",
  fontStyle: "italic",
  fontWeight: 400,
  letterSpacing: "-0.02em",
};

const listHead: CSSProperties = {
  fontSize: 13,
  fontWeight: 600,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  marginBottom: 10,
};

const listItem: CSSProperties = {
  display: "flex",
  gap: 10,
  fontSize: 15,
  lineHeight: 1.45,
  color: "#0F1E1A",
};

const bareList: CSSProperties = {
  listStyle: "none",
  margin: 0,
  padding: 0,
  display: "flex",
  flexDirection: "column",
  gap: 10,
};

export default function Content() {
  const w = useViewportWidth();
  const isDesktop = w >= 960;

  const industries = DATA.map(
    ([slug, name, ph, intro, pains, helps, svc], i) => ({
      slug,
      name,
      ph,
      intro,
      pains,
      helps,
      svc,
      anchor: "#" + slug,
      hid: "ind-" + slug,
      slot: "industry-" + (i + 1),
      n: String(i + 1).padStart(2, "0"),
      order: isDesktop && i % 2 === 1 ? 2 : 0,
    }),
  );

  return (
    <div style={{ minHeight: "100vh", background: "#F6F5F0", overflowX: "clip" }}>
      <SiteHeader current="Industries" />

      <main>
        {/* INDUSTRIES HERO */}
        <section
          data-screen-label="Industries Hero"
          aria-labelledby="i-h"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding:
              "clamp(56px,9vw,112px) clamp(20px,4vw,48px) clamp(40px,5vw,56px)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,460px),1fr))",
              gap: "32px 64px",
              alignItems: "end",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#16382F",
                  marginBottom: 24,
                }}
              >
                Industries
              </div>
              <h1
                id="i-h"
                style={{
                  margin: 0,
                  fontWeight: 500,
                  fontSize: "clamp(44px,6.4vw,84px)",
                  lineHeight: 0.98,
                  letterSpacing: "-0.045em",
                  textWrap: "balance",
                }}
              >
                {"Accounting that speaks "}
                <span style={{ ...serif, color: "#16382F" }}>your industry.</span>
              </h1>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: "clamp(17px,1.5vw,20px)",
                lineHeight: 1.55,
                color: "#55625D",
                maxWidth: 480,
                textWrap: "pretty",
              }}
            >
              Every sector has different margins, cost structures and tax rules. We set
              up your books, reports and KPIs around how your business actually makes
              money.
            </p>
          </div>
          <nav
            aria-label="Jump to industry"
            style={{ marginTop: 48, display: "flex", flexWrap: "wrap", gap: 8 }}
          >
            {industries.map((d) => (
              <Hover
                key={d.slug}
                href={d.anchor}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  minHeight: 44,
                  padding: "0 16px",
                  borderRadius: 999,
                  border: "1px solid rgba(15,30,26,0.14)",
                  background: "#FDFCF9",
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#0F1E1A",
                }}
                hoverStyle={{ borderColor: "#16382F", color: "#0F1E1A" }}
              >
                {d.name}
              </Hover>
            ))}
          </nav>
        </section>

        {/* INDUSTRY DETAILS */}
        <section
          data-screen-label="Industry Details"
          aria-label="Industry details"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 clamp(20px,4vw,48px)",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {industries.map((d, i) => (
            <article
              key={d.slug}
              id={d.slug}
              aria-labelledby={d.hid}
              style={{
                scrollMarginTop: 96,
                background: "#FDFCF9",
                border: "1px solid rgba(15,30,26,0.08)",
                borderRadius: "clamp(22px,3vw,28px)",
                overflow: "hidden",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,380px),1fr))",
              }}
            >
              <div
                style={{
                  position: "relative",
                  minHeight: "clamp(260px,30vw,420px)",
                  background:
                    "repeating-linear-gradient(135deg,#E7E6DF 0 12px,#EEEDE7 12px 24px)",
                  order: d.order,
                }}
              >
                <Photo
                  name={d.slug}
                  sizes="(max-width: 860px) 100vw, 50vw"
                  priority={i === 0}
                />
              </div>
              <div
                style={{
                  padding: "clamp(28px,4vw,48px)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span
                  style={{
                    fontFamily: "'JetBrains Mono',monospace",
                    fontSize: 13,
                    color: "#55625D",
                  }}
                >
                  {d.n}
                </span>
                <h2
                  id={d.hid}
                  style={{
                    margin: "14px 0 0",
                    fontWeight: 500,
                    fontSize: "clamp(30px,3.4vw,42px)",
                    lineHeight: 1.05,
                    letterSpacing: "-0.035em",
                  }}
                >
                  {d.name}
                </h2>
                <p
                  style={{
                    margin: "14px 0 0",
                    fontSize: 17,
                    lineHeight: 1.6,
                    color: "#55625D",
                    textWrap: "pretty",
                  }}
                >
                  {d.intro}
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit,minmax(min(100%,200px),1fr))",
                    gap: 24,
                    marginTop: 28,
                  }}
                >
                  <div>
                    <div style={{ ...listHead, color: "#55625D" }}>
                      Common challenges
                    </div>
                    <ul style={bareList}>
                      {d.pains.map((p) => (
                        <li key={p} style={listItem}>
                          <Icon
                            name="icon-minus"
                            style={{ color: "#9AA8A2", marginTop: 3 }}
                          />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div style={{ ...listHead, color: "#16382F" }}>How we help</div>
                    <ul style={bareList}>
                      {d.helps.map((h) => (
                        <li key={h} style={listItem}>
                          <Icon
                            name="icon-check"
                            style={{ color: "#7FA33A", marginTop: 3 }}
                          />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div
                  style={{
                    marginTop: "auto",
                    paddingTop: 28,
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
                  }}
                >
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {d.svc.map((c) => (
                      <span
                        key={c}
                        style={{
                          fontSize: 13,
                          fontWeight: 500,
                          background: "#EEF1E6",
                          color: "#16382F",
                          padding: "6px 12px",
                          borderRadius: 999,
                        }}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                  <a
                    href="/contact"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      fontSize: 15,
                      fontWeight: 500,
                    }}
                  >
                    Talk to an advisor <Icon name="icon-arrow-right" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* CTA */}
        <section
          data-screen-label="CTA"
          aria-labelledby="cta-h"
          style={{ padding: "clamp(80px,10vw,128px) clamp(12px,2vw,24px) 0" }}
        >
          <div
            style={{
              maxWidth: 1376,
              margin: "0 auto",
              background: "#16382F",
              color: "#F6F5F0",
              borderRadius: "clamp(24px,3vw,36px)",
              padding: "clamp(56px,8vw,104px) clamp(24px,5vw,72px)",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,420px),1fr))",
              gap: 40,
              alignItems: "end",
            }}
          >
            <h2
              id="cta-h"
              style={{
                margin: 0,
                fontWeight: 500,
                fontSize: "clamp(36px,4.8vw,64px)",
                lineHeight: 1.02,
                letterSpacing: "-0.04em",
                textWrap: "balance",
              }}
            >
              {"Don't see your industry? "}
              <span style={{ ...serif, color: "#D2E67C" }}>
                Let&apos;s talk anyway.
              </span>
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 28,
                alignItems: "flex-start",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: 18,
                  lineHeight: 1.55,
                  color: "#C9D3CE",
                  maxWidth: 420,
                }}
              >
                We work with owner-led businesses across many sectors. Tell us how yours
                works and we&apos;ll tell you how we&apos;d approach it.
              </p>
              <Hover
                href="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "#D2E67C",
                  color: "#0F1E1A",
                  padding: "18px 28px",
                  borderRadius: 999,
                  fontSize: 16,
                  fontWeight: 600,
                }}
                hoverStyle={{ background: "#E1EF9E", color: "#0F1E1A" }}
              >
                Book a Consultation <Icon name="icon-arrow-right" />
              </Hover>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
