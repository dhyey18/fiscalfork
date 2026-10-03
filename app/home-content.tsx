"use client";

import { useState, type CSSProperties } from "react";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import { Hover, Icon, Photo, useReveal, useViewportWidth } from "./lib/ui";

/* ── Page options, exposed as editable props on the original page ────────── */
const heroVisual: "Photo + dashboard" | "Dashboard only" = "Photo + dashboard";
const problemsLayout: "Interactive list" | "Grid" = "Interactive list";
const animations = true;

/* ── Content ─────────────────────────────────────────────────────────────── */

const BAR_HEIGHTS = [38, 46, 42, 55, 51, 63, 60, 74, 88];

const STATS = [
  { n: "12+", label: "Years of experience" },
  { n: "300+", label: "Businesses supported" },
  { n: "8", label: "Financial services" },
  { n: "98%", label: "Client satisfaction" },
];

const SERVICE_ANCHORS = [
  "bookkeeping",
  "tax",
  "payroll",
  "reporting",
  "cfo",
  "ap-ar",
  "planning",
  "advisory",
];

const SERVICES = (
  [
    [
      "Bookkeeping",
      "Accurate, reconciled books closed on a fixed monthly schedule.",
      "icon-book-open",
    ],
    [
      "Tax Services",
      "Year-round planning, preparation and filing for business and owners.",
      "icon-receipt",
    ],
    [
      "Payroll",
      "On-time payroll runs, filings and compliance for your whole team.",
      "icon-wallet",
    ],
    [
      "Financial Reporting",
      "Monthly P&L, balance sheet and cash flow you can actually read.",
      "icon-file-text",
    ],
    [
      "CFO Advisory",
      "Senior financial leadership for pricing, fundraising and growth plans.",
      "icon-briefcase",
    ],
    [
      "Accounts Payable & Receivable",
      "Bills paid on schedule, invoices chased, cash kept moving.",
      "icon-arrow-left-right",
    ],
    [
      "Financial Planning",
      "Budgets, forecasts and scenarios tied to your business goals.",
      "icon-target",
    ],
    [
      "Business Advisory",
      "Practical guidance on structure, margins and operational decisions.",
      "icon-compass",
    ],
  ] as const
).map(([name, desc, icon], i) => ({
  name,
  desc,
  icon,
  href: "/services#" + SERVICE_ANCHORS[i],
}));

const BENEFITS = [
  [
    "01",
    "Clear Financial Visibility",
    "Know your cash, margins and obligations at any point in the month.",
  ],
  [
    "02",
    "Proactive Financial Strategy",
    "We flag risks and opportunities early, before they show up in the numbers.",
  ],
  [
    "03",
    "Reliable & Accurate Reporting",
    "Reconciled, reviewed reports delivered on the same date every month.",
  ],
  [
    "04",
    "Dedicated Business Support",
    "One named accountant who knows your business and answers your questions.",
  ],
].map(([n, title, desc]) => ({ n, title, desc }));

const PROBLEMS = (
  [
    [
      "Don't know where the money is going",
      "We categorize every transaction and send a monthly spend report broken down by vendor, team and project, so each dollar has a clear destination.",
      "Bookkeeping",
      "icon-book-open",
    ],
    [
      "Cash flow is difficult to manage",
      "A rolling 13-week cash forecast and scheduled payables and receivables show shortfalls weeks before they arrive.",
      "Accounts Payable & Receivable",
      "icon-arrow-left-right",
    ],
    [
      "Books are always behind",
      "A fixed close calendar: your accounts are reconciled and closed by the 10th of every month.",
      "Bookkeeping",
      "icon-book-open",
    ],
    [
      "Tax preparation is stressful",
      "Year-round tax planning, organized records and filings prepared well ahead of every deadline. No year-end scramble.",
      "Tax Services",
      "icon-receipt",
    ],
    [
      "Payroll is complicated",
      "We run payroll, file payroll taxes and keep you compliant, with one person to call when something changes.",
      "Payroll",
      "icon-wallet",
    ],
    [
      "Financial reports are difficult to understand",
      "Plain-language monthly reports built around the handful of numbers that matter, plus a walkthrough call to go through them.",
      "Financial Reporting",
      "icon-file-text",
    ],
    [
      "Business owners don't have enough financial visibility",
      "A live dashboard of cash, margins and runway, and a quarterly CFO-level review of where the business is heading.",
      "CFO Advisory",
      "icon-briefcase",
    ],
  ] as const
).map(([problem, fix, service, icon], i) => ({
  n: String(i + 1).padStart(2, "0"),
  problem,
  fix,
  service,
  icon,
}));

const INDUSTRY_ANCHORS = [
  "restaurants",
  "healthcare",
  "professional-services",
  "ecommerce",
  "real-estate",
  "technology",
] as const;

const INDUSTRIES = (
  [
    [
      "Restaurants & Hospitality",
      "Food and labor cost tracking, tip reporting and multi-location books.",
      "Photo — restaurant interior or kitchen team",
    ],
    [
      "Healthcare",
      "Practice accounting, payer reconciliation and compliant payroll.",
      "Photo — modern clinic or practice office",
    ],
    [
      "Professional Services",
      "Project profitability, utilization and clean client billing.",
      "Photo — consultants in a working session",
    ],
    [
      "E-commerce",
      "Marketplace reconciliation, inventory costing and sales tax.",
      "Photo — packing station or product workspace",
    ],
    [
      "Real Estate",
      "Property-level books, investor reporting and 1031-ready records.",
      "Photo — residential or commercial property",
    ],
    [
      "Technology & Startups",
      "Burn and runway tracking, investor updates and R&D credits.",
      "Photo — startup team at work",
    ],
  ] as const
).map(([name, desc, ph], i) => ({
  name,
  desc,
  ph,
  slot: "industry-" + (i + 1),
  photo: INDUSTRY_ANCHORS[i],
  href: "/industries#" + INDUSTRY_ANCHORS[i],
}));

const STEPS = (
  [
    ["01", "Consultation", "Understand your business and financial needs."],
    ["02", "Strategy", "Create the right financial approach for your business."],
    ["03", "Onboarding", "Organize your accounting systems and processes."],
    [
      "04",
      "Ongoing Support",
      "Provide continuous reporting, guidance, and financial support.",
    ],
  ] as const
).map(([n, title, desc], i) => ({
  n,
  title,
  desc,
  bg: i === 0 ? "#16382F" : "#FDFCF9",
  fg: i === 0 ? "#D2E67C" : "#16382F",
}));

const TESTIMONIALS = [
  {
    quote:
      "[Placeholder] Our books used to run three months behind. Now we close every month on time and I know exactly where we stand.",
    name: "Client Name",
    role: "Founder, Company — Restaurants",
    initials: "CN",
  },
  {
    quote:
      "[Placeholder] Fiscal Fork explained our numbers in a way that finally made sense, and helped us plan our next hire with confidence.",
    name: "Client Name",
    role: "Managing Partner, Company — Professional Services",
    initials: "CN",
  },
  {
    quote:
      "[Placeholder] Tax season used to be a scramble. This year everything was organized and filed weeks before the deadline.",
    name: "Client Name",
    role: "CEO, Company — E-commerce",
    initials: "CN",
  },
];

/* ── Shared style fragments ──────────────────────────────────────────────── */

const serif: CSSProperties = {
  fontFamily: "'Newsreader',serif",
  fontStyle: "italic",
  fontWeight: 400,
  letterSpacing: "-0.02em",
};

const eyebrow: CSSProperties = {
  fontSize: 13,
  fontWeight: 600,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "#16382F",
  marginBottom: 20,
};

const sectionH2: CSSProperties = {
  margin: 0,
  fontWeight: 500,
  fontSize: "clamp(34px,4.4vw,56px)",
  lineHeight: 1.04,
  letterSpacing: "-0.04em",
};

export default function Content() {
  const w = useViewportWidth();
  const [active, setActive] = useState(0);
  useReveal(animations);

  const showPhoto = heroVisual === "Photo + dashboard";
  const interactive = problemsLayout === "Interactive list";
  const card = showPhoto
    ? { left: "0", top: "100%", tf: "translateY(-100%)", w: "min(360px,88%)" }
    : { left: "50%", top: "50%", tf: "translate(-50%,-50%)", w: "min(440px,100%)" };
  const bars = BAR_HEIGHTS.map((h, i) => ({
    h: h + "%",
    c: i === BAR_HEIGHTS.length - 1 ? "#16382F" : i >= 6 ? "#7FA33A" : "#DCE3CF",
  }));
  const current = PROBLEMS[active];

  // `w` drives the nav breakpoint inside SiteHeader; referenced here so the
  // home page re-renders with it, exactly as the original single component did.
  void w;

  return (
    <div style={{ minHeight: "100vh", background: "#F6F5F0", overflowX: "clip" }}>
      <SiteHeader current="Home" homeHref="#top" />

      <main id="top">
        {/* HERO */}
        <section
          data-screen-label="Hero"
          aria-labelledby="hero-h"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding:
              "clamp(48px,8vw,104px) clamp(20px,4vw,48px) clamp(56px,8vw,96px)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,460px),1fr))",
            gap: "clamp(48px,6vw,80px)",
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "7px 14px 7px 8px",
                borderRadius: 999,
                background: "#FDFCF9",
                border: "1px solid rgba(15,30,26,0.1)",
                fontSize: 13,
                color: "#55625D",
                marginBottom: 28,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#7FA33A",
                  marginLeft: 4,
                }}
              />
              Accounting, tax &amp; advisory for growing businesses
            </div>
            <h1
              id="hero-h"
              style={{
                margin: 0,
                fontWeight: 500,
                fontSize: "clamp(44px,6.4vw,84px)",
                lineHeight: 0.98,
                letterSpacing: "-0.045em",
                textWrap: "balance",
              }}
            >
              {"Clear Numbers. Smarter Decisions. "}
              <span style={{ ...serif, color: "#16382F" }}>Stronger Business.</span>
            </h1>
            <p
              style={{
                margin: "28px 0 0",
                fontSize: "clamp(17px,1.5vw,20px)",
                lineHeight: 1.55,
                color: "#55625D",
                maxWidth: 520,
                textWrap: "pretty",
              }}
            >
              Fiscal Fork provides modern accounting and financial services that give
              businesses clarity, control, and confidence to grow.
            </p>
            <div
              style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 40 }}
            >
              <Hover
                href="#consult"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "#16382F",
                  color: "#F6F5F0",
                  padding: "17px 26px",
                  borderRadius: 999,
                  fontSize: 16,
                  fontWeight: 500,
                  transition: "background 200ms",
                }}
                hoverStyle={{ background: "#0F1E1A", color: "#F6F5F0" }}
              >
                {"Book a Consultation "}
                <Icon name="icon-arrow-right" style={{ fontSize: 18 }} />
              </Hover>
              <Hover
                href="#services"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "transparent",
                  color: "#0F1E1A",
                  padding: "17px 26px",
                  borderRadius: 999,
                  fontSize: 16,
                  fontWeight: 500,
                  border: "1px solid rgba(15,30,26,0.18)",
                  transition: "background 200ms",
                }}
                hoverStyle={{ background: "#FDFCF9", color: "#0F1E1A" }}
              >
                Explore Services
              </Hover>
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px 28px",
                marginTop: 44,
                fontSize: 14,
                color: "#55625D",
              }}
            >
              {[
                "Fixed monthly pricing",
                "Dedicated accountant",
                "Books closed monthly",
              ].map((t) => (
                <span
                  key={t}
                  style={{ display: "flex", alignItems: "center", gap: 8 }}
                >
                  <Icon name="icon-check" style={{ color: "#16382F" }} />
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div style={{ position: "relative", minHeight: "clamp(440px,48vw,600px)" }}>
            {showPhoto ? (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  bottom: 56,
                  left: "clamp(0px,8%,64px)",
                  borderRadius: 28,
                  overflow: "hidden",
                  background:
                    "repeating-linear-gradient(135deg,#E7E6DF 0 12px,#EEEDE7 12px 24px)",
                }}
              >
                <Photo
                  name="hero"
                  sizes="(max-width: 960px) 100vw, 50vw"
                  priority
                />
              </div>
            ) : null}
            <div
              style={{
                position: "absolute",
                zIndex: 2,
                left: card.left,
                top: card.top,
                transform: card.tf,
                width: card.w,
              }}
            >
              <div
                style={{
                  background: "#FDFCF9",
                  borderRadius: 22,
                  border: "1px solid rgba(15,30,26,0.08)",
                  boxShadow:
                    "0 24px 60px -20px rgba(15,30,26,0.25),0 2px 6px rgba(15,30,26,0.05)",
                  padding: 24,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 16,
                  }}
                >
                  <div>
                    <div style={{ fontSize: 13, color: "#55625D" }}>
                      Cash position · September
                    </div>
                    <div
                      style={{
                        fontSize: 34,
                        fontWeight: 500,
                        letterSpacing: "-0.03em",
                        marginTop: 6,
                      }}
                    >
                      $248,610
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: "#2E5A12",
                      background: "#E8F0C8",
                      padding: "6px 10px",
                      borderRadius: 999,
                      whiteSpace: "nowrap",
                    }}
                  >
                    +12.4% QoQ
                  </span>
                </div>
                <div
                  aria-hidden="true"
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: 8,
                    height: 96,
                    marginTop: 22,
                    paddingBottom: 10,
                    borderBottom: "1px solid rgba(15,30,26,0.08)",
                  }}
                >
                  {bars.map((b, i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        borderRadius: "6px 6px 2px 2px",
                        height: b.h,
                        background: b.c,
                      }}
                    />
                  ))}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                    marginTop: 18,
                    fontSize: 14,
                  }}
                >
                  {(
                    [
                      ["icon-circle-check", "#7FA33A", "Books reconciled", "Sep 30"],
                      [
                        "icon-circle-check",
                        "#7FA33A",
                        "Q3 tax estimate filed",
                        "Oct 1",
                      ],
                      ["icon-clock", "#55625D", "Next payroll run", "Oct 15"],
                    ] as const
                  ).map(([icon, color, label, date]) => (
                    <div
                      key={label}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 12,
                      }}
                    >
                      <span
                        style={{ display: "flex", alignItems: "center", gap: 10 }}
                      >
                        <Icon name={icon} style={{ color, fontSize: 17 }} />
                        {label}
                      </span>
                      <span style={{ color: "#55625D" }}>{date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section
          data-screen-label="Stats"
          aria-label="Fiscal Fork at a glance"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 clamp(20px,4vw,48px)",
          }}
        >
          <div
            data-reveal=""
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,220px),1fr))",
              borderTop: "1px solid rgba(15,30,26,0.12)",
              borderBottom: "1px solid rgba(15,30,26,0.12)",
            }}
          >
            {STATS.map((s) => (
              <div
                key={s.label}
                style={{ padding: "clamp(28px,4vw,44px) clamp(4px,2vw,28px)" }}
              >
                <div
                  style={{
                    fontSize: "clamp(44px,5vw,64px)",
                    fontWeight: 500,
                    letterSpacing: "-0.045em",
                    lineHeight: 1,
                  }}
                >
                  {s.n}
                </div>
                <div style={{ fontSize: 15, color: "#55625D", marginTop: 12 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SERVICES */}
        <section
          id="services"
          data-screen-label="Services"
          aria-labelledby="svc-h"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "clamp(80px,10vw,136px) clamp(20px,4vw,48px) 0",
            scrollMarginTop: 72,
          }}
        >
          <div
            data-reveal=""
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: "24px 48px",
              marginBottom: 56,
            }}
          >
            <div style={{ maxWidth: 720 }}>
              <div style={eyebrow}>Services</div>
              <h2 id="svc-h" style={{ ...sectionH2, textWrap: "balance" }}>
                {"Financial expertise for every stage of your "}
                <span style={serif}>business.</span>
              </h2>
            </div>
            <p
              style={{
                margin: 0,
                maxWidth: 380,
                fontSize: 17,
                lineHeight: 1.6,
                color: "#55625D",
              }}
            >
              Pick a single service or combine them into one managed finance function.
              Same team, one monthly fee.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,270px),1fr))",
              gap: 16,
            }}
          >
            {SERVICES.map((s) => (
              <Hover
                key={s.name}
                href={s.href}
                data-reveal=""
                style={{
                  display: "flex",
                  flexDirection: "column",
                  background: "#FDFCF9",
                  border: "1px solid rgba(15,30,26,0.08)",
                  borderRadius: 22,
                  padding: 28,
                  minHeight: 280,
                  color: "#0F1E1A",
                  boxShadow: "0 1px 2px rgba(15,30,26,0.03)",
                  transition: "box-shadow 260ms,border-color 260ms,transform 260ms",
                }}
                hoverStyle={{
                  boxShadow: "0 18px 40px -18px rgba(15,30,26,0.22)",
                  borderColor: "rgba(15,30,26,0.16)",
                  transform: "translateY(-2px)",
                  color: "#0F1E1A",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: "#EEF1E6",
                    color: "#16382F",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <i className={s.icon} style={{ fontSize: 22 }} />
                </span>
                <h3
                  style={{
                    margin: "28px 0 0",
                    fontSize: 20,
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {s.name}
                </h3>
                <p
                  style={{
                    margin: "10px 0 0",
                    fontSize: 15,
                    lineHeight: 1.55,
                    color: "#55625D",
                    flex: 1,
                  }}
                >
                  {s.desc}
                </p>
                <span
                  style={{
                    marginTop: 24,
                    fontSize: 15,
                    fontWeight: 500,
                    color: "#16382F",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  Learn More <Icon name="icon-arrow-right" />
                </span>
              </Hover>
            ))}
          </div>
        </section>

        {/* WHY */}
        <section
          id="why"
          data-screen-label="Why Fiscal Fork"
          aria-labelledby="why-h"
          style={{
            padding: "clamp(80px,10vw,136px) clamp(12px,2vw,24px) 0",
            scrollMarginTop: 72,
          }}
        >
          <div
            style={{
              maxWidth: 1376,
              margin: "0 auto",
              background: "#16382F",
              color: "#F6F5F0",
              borderRadius: "clamp(24px,3vw,36px)",
              padding: "clamp(48px,7vw,96px) clamp(24px,5vw,72px)",
            }}
          >
            <div
              data-reveal=""
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,420px),1fr))",
                gap: "32px 64px",
                alignItems: "end",
                marginBottom: "clamp(48px,6vw,80px)",
              }}
            >
              <div>
                <div style={{ ...eyebrow, color: "#D2E67C" }}>Why Fiscal Fork</div>
                <h2
                  id="why-h"
                  style={{
                    margin: 0,
                    fontWeight: 500,
                    fontSize: "clamp(36px,4.8vw,64px)",
                    lineHeight: 1.02,
                    letterSpacing: "-0.04em",
                    textWrap: "balance",
                  }}
                >
                  {"More than accounting. "}
                  <span style={{ ...serif, color: "#D2E67C" }}>
                    A financial partner.
                  </span>
                </h2>
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: 18,
                  lineHeight: 1.6,
                  color: "#C9D3CE",
                  maxWidth: 460,
                }}
              >
                We keep your books accurate, and we also tell you what the numbers mean
                and what to do next.
              </p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,250px),1fr))",
                gap: 0,
              }}
            >
              {BENEFITS.map((b) => (
                <div
                  key={b.n}
                  data-reveal=""
                  style={{
                    padding: "32px 28px 8px 0",
                    borderTop: "1px solid rgba(246,245,240,0.18)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono',monospace",
                      fontSize: 13,
                      color: "#D2E67C",
                    }}
                  >
                    {b.n}
                  </div>
                  <h3
                    style={{
                      margin: "22px 0 0",
                      fontSize: 22,
                      fontWeight: 500,
                      letterSpacing: "-0.02em",
                      lineHeight: 1.2,
                    }}
                  >
                    {b.title}
                  </h3>
                  <p
                    style={{
                      margin: "12px 0 0",
                      fontSize: 15,
                      lineHeight: 1.6,
                      color: "#C9D3CE",
                      maxWidth: 280,
                    }}
                  >
                    {b.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROBLEMS */}
        <section
          data-screen-label="Problems We Solve"
          aria-labelledby="prob-h"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "clamp(80px,10vw,136px) clamp(20px,4vw,48px) 0",
          }}
        >
          <div data-reveal="" style={{ maxWidth: 820, marginBottom: 56 }}>
            <div style={eyebrow}>Problems we solve</div>
            <h2 id="prob-h" style={{ ...sectionH2, textWrap: "balance" }}>
              {"We solve the financial problems that slow businesses "}
              <span style={serif}>down.</span>
            </h2>
          </div>

          {interactive ? (
            <div
              data-reveal=""
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,420px),1fr))",
                gap: 24,
                alignItems: "start",
              }}
            >
              <div
                role="tablist"
                aria-label="Common financial problems"
                style={{ display: "flex", flexDirection: "column", gap: 6 }}
              >
                {PROBLEMS.map((p, i) => {
                  const on = i === active;
                  return (
                    <button
                      key={p.n}
                      role="tab"
                      aria-selected={on}
                      onClick={() => active !== i && setActive(i)}
                      onMouseEnter={() => active !== i && setActive(i)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 16,
                        width: "100%",
                        textAlign: "left",
                        padding: "18px 20px",
                        borderRadius: 16,
                        border: `1px solid ${on ? "rgba(15,30,26,0.14)" : "transparent"}`,
                        background: on ? "#FDFCF9" : "transparent",
                        color: "#0F1E1A",
                        fontSize: 17,
                        fontWeight: 500,
                        letterSpacing: "-0.01em",
                        cursor: "pointer",
                        transition: "background 200ms,border-color 200ms",
                        minHeight: 44,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono',monospace",
                          fontSize: 12,
                          color: "#55625D",
                          width: 22,
                        }}
                      >
                        {p.n}
                      </span>
                      <span style={{ flex: 1 }}>“{p.problem}”</span>
                      <Icon
                        name="icon-arrow-right"
                        style={{
                          color: on ? "#16382F" : "rgba(15,30,26,0.25)",
                          fontSize: 18,
                        }}
                      />
                    </button>
                  );
                })}
              </div>
              <div
                role="tabpanel"
                aria-live="polite"
                style={{
                  position: "sticky",
                  top: 96,
                  background: "#FDFCF9",
                  border: "1px solid rgba(15,30,26,0.08)",
                  borderRadius: 28,
                  padding: "clamp(28px,4vw,48px)",
                  boxShadow: "0 24px 60px -32px rgba(15,30,26,0.25)",
                }}
              >
                <div style={{ fontSize: 14, color: "#55625D" }}>The problem</div>
                <div
                  style={{
                    fontFamily: "'Newsreader',serif",
                    fontStyle: "italic",
                    fontSize: "clamp(26px,2.6vw,34px)",
                    lineHeight: 1.2,
                    marginTop: 8,
                    color: "#0F1E1A",
                  }}
                >
                  “{current.problem}”
                </div>
                <div
                  style={{
                    height: 1,
                    background: "rgba(15,30,26,0.1)",
                    margin: "32px 0",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    fontSize: 14,
                    color: "#16382F",
                    fontWeight: 600,
                  }}
                >
                  <Icon name="icon-arrow-down-right" />
                  How Fiscal Fork helps
                </div>
                <p
                  style={{
                    margin: "12px 0 0",
                    fontSize: "clamp(18px,1.6vw,21px)",
                    lineHeight: 1.5,
                    color: "#0F1E1A",
                    textWrap: "pretty",
                  }}
                >
                  {current.fix}
                </p>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
                    marginTop: 36,
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      fontSize: 14,
                      fontWeight: 500,
                      background: "#EEF1E6",
                      color: "#16382F",
                      padding: "8px 14px",
                      borderRadius: 999,
                    }}
                  >
                    <Icon name={current.icon} />
                    {current.service}
                  </span>
                  <a
                    href="#consult"
                    style={{
                      fontSize: 15,
                      fontWeight: 500,
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    Talk to us about this <Icon name="icon-arrow-right" />
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,340px),1fr))",
                gap: 16,
              }}
            >
              {PROBLEMS.map((p) => (
                <div
                  key={p.n}
                  style={{
                    background: "#FDFCF9",
                    border: "1px solid rgba(15,30,26,0.08)",
                    borderRadius: 22,
                    padding: 28,
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Newsreader',serif",
                      fontStyle: "italic",
                      fontSize: 23,
                      lineHeight: 1.25,
                    }}
                  >
                    “{p.problem}”
                  </div>
                  <div style={{ height: 1, background: "rgba(15,30,26,0.1)" }} />
                  <p
                    style={{
                      margin: 0,
                      fontSize: 15,
                      lineHeight: 1.6,
                      color: "#55625D",
                      flex: 1,
                    }}
                  >
                    {p.fix}
                  </p>
                  <span
                    style={{
                      alignSelf: "flex-start",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      fontSize: 13,
                      fontWeight: 500,
                      background: "#EEF1E6",
                      color: "#16382F",
                      padding: "7px 12px",
                      borderRadius: 999,
                    }}
                  >
                    <Icon name={p.icon} />
                    {p.service}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* INDUSTRIES */}
        <section
          id="industries"
          data-screen-label="Industries"
          aria-labelledby="ind-h"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "clamp(80px,10vw,136px) clamp(20px,4vw,48px) 0",
            scrollMarginTop: 72,
          }}
        >
          <div
            data-reveal=""
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: "24px 48px",
              marginBottom: 56,
            }}
          >
            <div style={{ maxWidth: 640 }}>
              <div style={eyebrow}>Industries</div>
              <h2 id="ind-h" style={sectionH2}>
                Built around your <span style={serif}>business.</span>
              </h2>
            </div>
            <p
              style={{
                margin: 0,
                maxWidth: 380,
                fontSize: 17,
                lineHeight: 1.6,
                color: "#55625D",
              }}
            >
              Each sector has its own margins, tax rules and reporting needs. We set up
              your books to match yours.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,340px),1fr))",
              gap: 20,
            }}
          >
            {INDUSTRIES.map((ind) => (
              <Hover
                key={ind.name}
                href={ind.href}
                data-reveal=""
                style={{
                  display: "flex",
                  flexDirection: "column",
                  color: "#0F1E1A",
                  background: "#FDFCF9",
                  border: "1px solid rgba(15,30,26,0.08)",
                  borderRadius: 24,
                  overflow: "hidden",
                  transition: "box-shadow 260ms,transform 260ms",
                }}
                hoverStyle={{
                  boxShadow: "0 18px 40px -18px rgba(15,30,26,0.22)",
                  transform: "translateY(-2px)",
                  color: "#0F1E1A",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    aspectRatio: "4/3",
                    background:
                      "repeating-linear-gradient(135deg,#E7E6DF 0 12px,#EEEDE7 12px 24px)",
                  }}
                >
                  <Photo
                    name={ind.photo}
                    sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  />
                </div>
                <div
                  style={{
                    padding: "24px 24px 26px",
                    display: "flex",
                    gap: 16,
                    alignItems: "flex-start",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <h3
                      style={{
                        margin: 0,
                        fontSize: 20,
                        fontWeight: 600,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {ind.name}
                    </h3>
                    <p
                      style={{
                        margin: "8px 0 0",
                        fontSize: 15,
                        lineHeight: 1.55,
                        color: "#55625D",
                      }}
                    >
                      {ind.desc}
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    style={{
                      flex: "none",
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      border: "1px solid rgba(15,30,26,0.14)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#16382F",
                    }}
                  >
                    <i className="icon-arrow-up-right" style={{ fontSize: 18 }} />
                  </span>
                </div>
              </Hover>
            ))}
          </div>
        </section>

        {/* PROCESS */}
        <section
          data-screen-label="How It Works"
          aria-labelledby="how-h"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "clamp(80px,10vw,136px) clamp(20px,4vw,48px) 0",
          }}
        >
          <div
            data-reveal=""
            style={{
              textAlign: "center",
              maxWidth: 720,
              margin: "0 auto clamp(48px,6vw,72px)",
            }}
          >
            <div style={eyebrow}>How it works</div>
            <h2 id="how-h" style={sectionH2}>
              Four steps to <span style={serif}>clearer finances.</span>
            </h2>
          </div>
          <ol
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,240px),1fr))",
              gap: "40px 24px",
            }}
          >
            {STEPS.map((s) => (
              <li key={s.n} data-reveal="" style={{ position: "relative" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: "50%",
                      background: s.bg,
                      color: s.fg,
                      border: "1px solid rgba(15,30,26,0.14)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'JetBrains Mono',monospace",
                      fontSize: 14,
                      flex: "none",
                    }}
                  >
                    {s.n}
                  </span>
                  <span
                    aria-hidden="true"
                    style={{
                      flex: 1,
                      height: 1,
                      background: "rgba(15,30,26,0.14)",
                    }}
                  />
                </div>
                <h3
                  style={{
                    margin: "28px 0 0",
                    fontSize: 22,
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    margin: "10px 0 0",
                    fontSize: 16,
                    lineHeight: 1.55,
                    color: "#55625D",
                    maxWidth: 260,
                  }}
                >
                  {s.desc}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* TESTIMONIALS */}
        <section
          id="resources"
          data-screen-label="Testimonials"
          aria-labelledby="tst-h"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "clamp(80px,10vw,136px) clamp(20px,4vw,48px) 0",
            scrollMarginTop: 72,
          }}
        >
          <div data-reveal="" style={{ maxWidth: 720, marginBottom: 56 }}>
            <div style={eyebrow}>Client stories</div>
            <h2 id="tst-h" style={{ ...sectionH2, textWrap: "balance" }}>
              Trusted by businesses that want to <span style={serif}>grow.</span>
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,320px),1fr))",
              gap: 20,
            }}
          >
            {TESTIMONIALS.map((t, i) => (
              <figure
                key={i}
                data-reveal=""
                style={{
                  margin: 0,
                  background: "#FDFCF9",
                  border: "1px solid rgba(15,30,26,0.08)",
                  borderRadius: 24,
                  padding: 32,
                  display: "flex",
                  flexDirection: "column",
                  gap: 28,
                }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    fontFamily: "'Newsreader',serif",
                    fontSize: 64,
                    lineHeight: 0.5,
                    height: 24,
                    color: "#16382F",
                  }}
                >
                  “
                </div>
                <blockquote
                  style={{
                    margin: 0,
                    fontSize: 19,
                    lineHeight: 1.5,
                    letterSpacing: "-0.01em",
                    flex: 1,
                    textWrap: "pretty",
                  }}
                >
                  {t.quote}
                </blockquote>
                <figcaption
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    paddingTop: 24,
                    borderTop: "1px solid rgba(15,30,26,0.08)",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      background: "#EEF1E6",
                      color: "#16382F",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 600,
                      fontSize: 15,
                    }}
                  >
                    {t.initials}
                  </span>
                  <span
                    style={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    <span style={{ fontWeight: 600, fontSize: 15 }}>{t.name}</span>
                    <span style={{ fontSize: 14, color: "#55625D" }}>{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section
          id="consult"
          data-screen-label="Final CTA"
          aria-labelledby="cta-h"
          style={{
            padding:
              "clamp(80px,10vw,136px) clamp(12px,2vw,24px) clamp(12px,2vw,24px)",
            scrollMarginTop: 72,
          }}
        >
          <div
            data-reveal=""
            style={{
              maxWidth: 1376,
              margin: "0 auto",
              background: "#0F1E1A",
              color: "#F6F5F0",
              borderRadius: "clamp(24px,3vw,36px)",
              padding: "clamp(64px,9vw,128px) clamp(24px,5vw,72px)",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,440px),1fr))",
              gap: 48,
              alignItems: "end",
            }}
          >
            <div>
              <h2
                id="cta-h"
                style={{
                  margin: 0,
                  fontWeight: 500,
                  fontSize: "clamp(38px,5.4vw,76px)",
                  lineHeight: 1,
                  letterSpacing: "-0.045em",
                  textWrap: "balance",
                }}
              >
                {"Ready to get your finances "}
                <span style={{ ...serif, color: "#D2E67C" }}>
                  working for your business?
                </span>
              </h2>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 32,
                alignItems: "flex-start",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "clamp(17px,1.5vw,20px)",
                  lineHeight: 1.55,
                  color: "#C9D3CE",
                  maxWidth: 420,
                }}
              >
                Let&apos;s build a clearer financial foundation for your next stage of
                growth.
              </p>
              <Hover
                href="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "#D2E67C",
                  color: "#0F1E1A",
                  padding: "19px 30px",
                  borderRadius: 999,
                  fontSize: 17,
                  fontWeight: 600,
                  transition: "background 200ms",
                }}
                hoverStyle={{ background: "#E1EF9E", color: "#0F1E1A" }}
              >
                {"Book a Consultation "}
                <Icon name="icon-arrow-right" style={{ fontSize: 18 }} />
              </Hover>
              <span style={{ fontSize: 14, color: "#9AA8A2" }}>
                30-minute call · No obligation
              </span>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
