"use client";

import { useState, type CSSProperties } from "react";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import HeroVideo from "./components/HeroVideo";
import Marquee from "./components/Marquee";
import { Hover, Icon, Photo, useReveal, useViewportWidth } from "./lib/ui";

/* ── Page options, exposed as editable props on the original page ────────── */
const problemsLayout: "Interactive list" | "Grid" = "Interactive list";
const animations = true;

/* ── Content ─────────────────────────────────────────────────────────────── */


const STATS = [
  { n: "15+", label: "Years of experience" },
  { n: "300+", label: "Businesses supported" },
  { n: "9", label: "Service lines" },
  { n: "98%", label: "Client satisfaction" },
];

/* Nine services, each with a tint so the grid reads as something designed
   rather than nine identical grey tiles. Tints are muted and print-like so the
   colour does not fight the bronze/graphite palette; each icon clears contrast
   on its own chip. */
const SERVICES = (
  [
    [
      "bookkeeping",
      "Restaurant, Hotels & Construction Bookkeeping",
      "Sales reconciled daily, vendors current, accounts tied out before close.",
      "icon-book-open",
      "#F0E7D9",
      "#825C2E",
      ["Daily sales reconciliation", "POS integration", "Bank reconciliation"],
    ],
    [
      "reporting-cadence",
      "Daily, Weekly & Monthly Reporting",
      "Numbers that arrive while you can still do something about them.",
      "icon-calendar",
      "#E4E9F0",
      "#39506E",
      ["Daily operational reports", "Weekly F&B cost reports", "Monthly financials"],
    ],
    [
      "payroll",
      "Payroll Management & HR Compliance",
      "Every location, with tips, overtime and year-end filings handled.",
      "icon-wallet",
      "#E3EDE4",
      "#3B6245",
      ["Multi-location payroll", "W-2 / 1099 filing", "Tip reporting & pooling"],
    ],
    [
      "ap-ar",
      "Accounts Payable & Receivable",
      "Bills paid before they are due, and money owed to you actually chased.",
      "icon-arrow-left-right",
      "#F4E6E0",
      "#8C4A33",
      ["Approval workflows", "Scheduled payment runs", "Collections follow-up"],
    ],
    [
      "financials",
      "Monthly Financials & Management Reporting",
      "A monthly pack built to be read, not filed.",
      "icon-file-text",
      "#DFEBEB",
      "#2C5D5E",
      ["Accurate financials", "Cash flow management", "Comparison and analysis"],
    ],
    [
      "tax",
      "Tax Planning & Compliance",
      "Handled across the year, not in a scramble each spring.",
      "icon-receipt",
      "#EEE4EC",
      "#6B3B61",
      ["Year-round planning", "Local filings in every market", "Sales and indirect tax"],
    ],
    [
      "cleanup",
      "Accounting Clean-Up & Reconciliation",
      "Months or years rebuilt into books you can file and borrow against.",
      "icon-wrench",
      "#F5EADB",
      "#8A5A1E",
      ["Catch-up on unreconciled periods", "Chart of accounts rebuild"],
    ],
    [
      "cfo",
      "CFO Advisory",
      "What each location or job is really earning, and what to do next.",
      "icon-briefcase",
      "#E5E5F1",
      "#413F77",
      ["Budgeting and forecasting", "Prime cost and margin analysis"],
    ],
    [
      "cross-border",
      "International Accounting Support",
      "One team across every market you trade in, not a bookkeeper per country.",
      "icon-globe",
      "#E2EBE2",
      "#2F5A38",
      ["Local reporting standards", "Multi-entity and multi-currency"],
    ],
  ] as const
).map(([slug, name, desc, icon, tintBg, tintFg, points]) => ({
  name,
  desc,
  icon,
  tintBg,
  tintFg,
  points,
  href: "/services#" + slug,
}));

const BENEFITS = [
  [
    "01",
    "We know your industry",
    "Prime cost, tip pooling, progress billing, retainage. We are not learning your business on your time.",
  ],
  [
    "02",
    "You hear from us first",
    "Food cost drifting, a job running over, cash tightening in six weeks — you find out from us, not from the year-end.",
  ],
  [
    "03",
    "Closed on a fixed calendar",
    "Reconciled, reviewed and delivered on the same date every month. No chasing, no surprises.",
  ],
  [
    "04",
    "One team, every market",
    "Entities in different countries handled together, by people who answer during your working hours.",
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

const INDUSTRIES = (
  [
    ["Fine Dining Restaurants", "Wine inventory, tasting menu costing and private event P&L.", "fine-dining"],
    ["Hotels & Resorts", "USALI reporting, RevPAR tracking and departmental P&L.", "hotels"],
    ["Fast Casual & QSR", "High-volume POS reconciliation across every location.", "fast-casual"],
    ["Bars, Pubs & Nightclubs", "Pour cost variance and control in a cash-heavy room.", "bars"],
    ["Cafes & Coffee Shops", "Loyalty revenue, retail inventory and delivery platforms.", "cafes"],
    ["Catering & Events", "Event-level job costing before you price the next contract.", "catering"],
    ["Food Trucks & Pop-Ups", "Daily sales by site, commissary costs and permits.", "food-trucks"],
    ["Ghost Kitchens", "Brand-level P&L and delivery platform reconciliation.", "ghost-kitchens"],
  ] as const
).map(([name, desc, slug]) => ({
  name,
  desc,
  photo: slug,
  href: "/industries#" + slug,
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
  bg: i === 0 ? "#16202B" : "#FFFFFF",
  fg: i === 0 ? "#B98A4B" : "#16202B",
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
  color: "#16202B",
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

  const interactive = problemsLayout === "Interactive list";
  const current = PROBLEMS[active];

  // `w` drives the nav breakpoint inside SiteHeader; referenced here so the
  // home page re-renders with it, exactly as the original single component did.
  void w;

  return (
    <div style={{ minHeight: "100vh", background: "#F6F3EE", overflowX: "clip" }}>
      <SiteHeader current="Home" homeHref="#top" />

      <main id="top">
        {/* HERO */}
        <section
          className="ff-hero"
          data-screen-label="Hero"
          aria-labelledby="hero-h"
        >
          <style>{`
            /* One full-bleed frame rather than a split. The veil is solid ink
               under the copy and dissolves to the right, so the text sits on a
               known background while the footage stays visible — no seam, and
               no need to dim the whole frame to ~90% to keep text readable. */
            .ff-hero {
              position:relative; overflow:hidden; background:#0B0F14;
              min-height:clamp(640px,92vh,1000px);
              display:flex; flex-direction:column;
            }
            .ff-hero-media { position:absolute; inset:0; }
            .ff-hero-veil {
              position:absolute; inset:0; pointer-events:none;
              background:linear-gradient(100deg,
                #0B0F14 0%, #0B0F14 48%,
                rgba(11,15,20,0.84) 63%, rgba(11,15,20,0.44) 83%,
                rgba(11,15,20,0.24) 100%);
            }
            /* One column below 960px: the copy spans the width, so the veil
               turns vertical and stays heavy throughout. */
            @media (max-width: 960px) {
              .ff-hero-veil {
                background:linear-gradient(180deg,
                  rgba(11,15,20,0.90) 0%, rgba(11,15,20,0.93) 58%,
                  rgba(11,15,20,0.96) 100%);
              }
            }

            .ff-hero-inner {
              position:relative; z-index:1; flex:1; width:100%;
              max-width:1280px; margin:0 auto;
              padding:clamp(104px,12vw,148px) clamp(20px,4vw,48px) clamp(48px,6vw,72px);
              display:flex; flex-direction:column; justify-content:center;
            }
            /* Held inside the solid part of the veil. */
            .ff-hero-copy { max-width:min(560px,100%); }

            .ff-hero-strip {
              position:relative; z-index:1;
              border-top:1px solid rgba(246,243,238,0.16);
              background:rgba(11,15,20,0.4);
              backdrop-filter:blur(8px); -webkit-backdrop-filter:blur(8px);
            }
            .ff-hero-strip-inner {
              width:100%; max-width:1280px; margin:0 auto;
              padding:clamp(20px,2.4vw,30px) clamp(20px,4vw,48px);
              display:grid; gap:clamp(18px,3vw,44px);
              grid-template-columns:1fr;
            }
            @media (min-width: 700px) {
              .ff-hero-strip-inner { grid-template-columns:repeat(3,minmax(0,1fr)); }
            }
          `}</style>

          <div className="ff-hero-media">
            <HeroVideo
              src="/7735854-hd_1920_1080_25fps.mp4"
              posterName="hero"
              sizes="100vw"
              controlBottom={128}
            />
          </div>
          <div className="ff-hero-veil" aria-hidden="true" />

          <div className="ff-hero-inner">
            <div className="ff-hero-copy">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  marginBottom: "clamp(26px,3vw,36px)",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: 46,
                    height: 1,
                    flex: "none",
                    background: "rgba(185,138,75,0.85)",
                  }}
                />
                <span
                  style={{
                    fontFamily: "'JetBrains Mono',monospace",
                    fontSize: 11,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "#B98A4B",
                  }}
                >
                  Outsourced Accounting for Hospitality
                </span>
              </div>

              <h1
                id="hero-h"
                style={{
                  margin: 0,
                  fontWeight: 500,
                  fontSize: "clamp(40px,4.4vw,64px)",
                  lineHeight: 1.04,
                  letterSpacing: "-0.035em",
                  color: "#FFFFFF",
                }}
              >
                Your numbers
                <br />
                have a story.
                <br />
                <span
                  style={{
                    fontFamily: "'Newsreader',serif",
                    fontStyle: "italic",
                    fontWeight: 400,
                    letterSpacing: "-0.02em",
                    color: "#B98A4B",
                  }}
                >
                  We help you read it.
                </span>
              </h1>

              <div
                aria-hidden="true"
                style={{
                  width: 76,
                  height: 1,
                  background: "rgba(185,138,75,0.5)",
                  margin: "clamp(30px,3.4vw,40px) 0",
                }}
              />

              <p
                style={{
                  margin: 0,
                  fontSize: "clamp(16px,1.2vw,18px)",
                  lineHeight: 1.65,
                  color: "#C4CBD4",
                  maxWidth: 480,
                  textWrap: "pretty",
                }}
              >
                Your business is moving fast. Your finances should keep up —
                bookkeeping, payroll, reporting and CFO advisory, delivered on the
                calendar your operation actually runs on, wherever you trade.
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 12,
                  marginTop: "clamp(34px,4vw,44px)",
                }}
              >
                <Hover
                  href="#consult"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    background: "#B98A4B",
                    color: "#0B0F14",
                    padding: "17px 28px",
                    borderRadius: 999,
                    fontSize: 16,
                    fontWeight: 600,
                    boxShadow: "0 12px 28px -10px rgba(0,0,0,0.6)",
                    transition: "background 200ms,transform 200ms,box-shadow 200ms",
                  }}
                  hoverStyle={{
                    background: "#D2A563",
                    color: "#0B0F14",
                    transform: "translateY(-2px)",
                    boxShadow: "0 18px 36px -10px rgba(0,0,0,0.65)",
                  }}
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
                    color: "#FFFFFF",
                    padding: "17px 28px",
                    borderRadius: 999,
                    fontSize: 16,
                    fontWeight: 500,
                    border: "1px solid rgba(255,255,255,0.4)",
                    transition: "background 200ms,transform 200ms,border-color 200ms",
                  }}
                  hoverStyle={{
                    background: "rgba(255,255,255,0.12)",
                    color: "#FFFFFF",
                    borderColor: "rgba(255,255,255,0.7)",
                    transform: "translateY(-2px)",
                  }}
                >
                  Explore Services
                </Hover>
              </div>
            </div>
          </div>

          {/* The sectors actually served, with the work each one implies. This
              replaces a mocked-up dashboard: the firm sells a service, not
              software, so inventing a product UI said nothing true about it. */}
          <div className="ff-hero-strip">
            <div className="ff-hero-strip-inner">
              {(
                [
                  [
                    "icon-utensils",
                    "Restaurants",
                    "Daily covers, prime cost and tip pooling",
                  ],
                  [
                    "icon-hotel",
                    "Hotels",
                    "Rooms, F&B and multi-property reporting",
                  ],
                  [
                    "icon-hard-hat",
                    "Construction",
                    "Job costing, progress billing and retainage",
                  ],
                ] as const
              ).map(([icon, name, detail]) => (
                <div
                  key={name}
                  style={{ display: "flex", alignItems: "flex-start", gap: 14 }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      flex: "none",
                      width: 38,
                      height: 38,
                      borderRadius: 11,
                      background: "rgba(185,138,75,0.16)",
                      border: "1px solid rgba(185,138,75,0.4)",
                      color: "#D2A563",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon name={icon} style={{ fontSize: 17 }} />
                  </span>
                  <div>
                    <div
                      style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF" }}
                    >
                      {name}
                    </div>
                    <div
                      style={{
                        fontSize: 13.5,
                        lineHeight: 1.5,
                        color: "#A5ACB5",
                        marginTop: 3,
                      }}
                    >
                      {detail}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RUNNING HEADLINE */}
        <Marquee
          items={[
            "Tax Planning & Compliance",
            "Profitability & Performance Optimization"
            , "Payroll Management & Processing"
            , "POS & Accounting System Integration"
            , "Cost Reduction & Control Strategies"
            , "CFO Advisory & Financial Consulting",
            "Restaurant Bookkeeping & Accounting"
            , "Hotel Finance & Financial Management"
          ]}
        />

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
              borderTop: "1px solid rgba(11,15,20,0.12)",
              borderBottom: "1px solid rgba(11,15,20,0.12)",
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
                <div style={{ fontSize: 15, color: "#656A73", marginTop: 12 }}>
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
                color: "#656A73",
              }}
            >
              Pick a single service or combine them into one managed finance function.
              Same team, one monthly fee.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,300px),1fr))",
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
                  background: "#FFFFFF",
                  border: "1px solid rgba(11,15,20,0.08)",
                  borderRadius: 22,
                  padding: 28,
                  minHeight: 280,
                  color: "#0B0F14",
                  boxShadow: "0 1px 2px rgba(11,15,20,0.03)",
                  transition: "box-shadow 260ms,border-color 260ms,transform 260ms",
                }}
                hoverStyle={{
                  boxShadow: "0 18px 40px -18px rgba(11,15,20,0.22)",
                  borderColor: "rgba(11,15,20,0.16)",
                  transform: "translateY(-2px)",
                  color: "#0B0F14",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: s.tintBg,
                    color: s.tintFg,
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
                    color: "#656A73",
                  }}
                >
                  {s.desc}
                </p>
                <ul
                  style={{
                    listStyle: "none",
                    margin: "16px 0 0",
                    padding: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 7,
                    flex: 1,
                  }}
                >
                  {s.points.map((pt) => (
                    <li
                      key={pt}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 8,
                        fontSize: 13.5,
                        lineHeight: 1.45,
                        color: "#656A73",
                      }}
                    >
                      <span
                        aria-hidden="true"
                        style={{
                          flex: "none",
                          width: 5,
                          height: 5,
                          marginTop: 7,
                          borderRadius: "50%",
                          background: s.tintFg,
                        }}
                      />
                      {pt}
                    </li>
                  ))}
                </ul>
                <span
                  style={{
                    marginTop: 24,
                    fontSize: 15,
                    fontWeight: 500,
                    color: "#16202B",
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
              background: "#16202B",
              color: "#F6F3EE",
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
                <h2
                  id="why-h"
                  style={{
                    margin: 0,
                    fontWeight: 500,
                    fontSize: "clamp(42px,5.4vw,76px)",
                    lineHeight: 1.0,
                    letterSpacing: "-0.04em",
                    textWrap: "balance",
                  }}
                >
                  {"Why "}
                  <span style={{ ...serif, color: "#B98A4B" }}>Fiscal Fork</span>
                  {"?"}
                </h2>
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: 18,
                  lineHeight: 1.6,
                  color: "#C4CBD4",
                  maxWidth: 460,
                }}
              >
                Most firms hand you a set of books once the month is long gone. We
                work to the pace your business actually runs at — daily sales,
                weekly costs, monthly financials — and we tell you what the numbers
                mean while you can still act on them.
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
                    borderTop: "1px solid rgba(246,243,238,0.18)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono',monospace",
                      fontSize: 13,
                      color: "#B98A4B",
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
                      color: "#C4CBD4",
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
                        border: `1px solid ${on ? "rgba(11,15,20,0.14)" : "transparent"}`,
                        background: on ? "#FFFFFF" : "transparent",
                        color: "#0B0F14",
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
                          color: "#656A73",
                          width: 22,
                        }}
                      >
                        {p.n}
                      </span>
                      <span style={{ flex: 1 }}>“{p.problem}”</span>
                      <Icon
                        name="icon-arrow-right"
                        style={{
                          color: on ? "#16202B" : "rgba(11,15,20,0.25)",
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
                  background: "#FFFFFF",
                  border: "1px solid rgba(11,15,20,0.08)",
                  borderRadius: 28,
                  padding: "clamp(28px,4vw,48px)",
                  boxShadow: "0 24px 60px -32px rgba(11,15,20,0.25)",
                }}
              >
                <div style={{ fontSize: 14, color: "#656A73" }}>The problem</div>
                <div
                  style={{
                    fontFamily: "'Newsreader',serif",
                    fontStyle: "italic",
                    fontSize: "clamp(26px,2.6vw,34px)",
                    lineHeight: 1.2,
                    marginTop: 8,
                    color: "#0B0F14",
                  }}
                >
                  “{current.problem}”
                </div>
                <div
                  style={{
                    height: 1,
                    background: "rgba(11,15,20,0.1)",
                    margin: "32px 0",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    fontSize: 14,
                    color: "#16202B",
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
                    color: "#0B0F14",
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
                      background: "#EBE6DD",
                      color: "#16202B",
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
                    background: "#FFFFFF",
                    border: "1px solid rgba(11,15,20,0.08)",
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
                  <div style={{ height: 1, background: "rgba(11,15,20,0.1)" }} />
                  <p
                    style={{
                      margin: 0,
                      fontSize: 15,
                      lineHeight: 1.6,
                      color: "#656A73",
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
                      background: "#EBE6DD",
                      color: "#16202B",
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
                color: "#656A73",
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
                  color: "#0B0F14",
                  background: "#FFFFFF",
                  border: "1px solid rgba(11,15,20,0.08)",
                  borderRadius: 24,
                  overflow: "hidden",
                  transition: "box-shadow 260ms,transform 260ms",
                }}
                hoverStyle={{
                  boxShadow: "0 18px 40px -18px rgba(11,15,20,0.22)",
                  transform: "translateY(-2px)",
                  color: "#0B0F14",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    aspectRatio: "4/3",
                    background:
                      "repeating-linear-gradient(135deg,#EDE8DF 0 12px,#E6E0D6 12px 24px)",
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
                        color: "#656A73",
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
                      border: "1px solid rgba(11,15,20,0.14)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#16202B",
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
                      border: "1px solid rgba(11,15,20,0.14)",
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
                      background: "rgba(11,15,20,0.14)",
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
                    color: "#656A73",
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
                  background: "#FFFFFF",
                  border: "1px solid rgba(11,15,20,0.08)",
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
                    color: "#16202B",
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
                    borderTop: "1px solid rgba(11,15,20,0.08)",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      background: "#EBE6DD",
                      color: "#16202B",
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
                    <span style={{ fontSize: 14, color: "#656A73" }}>{t.role}</span>
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
              background: "#0B0F14",
              color: "#F6F3EE",
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
                <span style={{ ...serif, color: "#B98A4B" }}>
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
                  color: "#C4CBD4",
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
                  background: "#B98A4B",
                  color: "#0B0F14",
                  padding: "19px 30px",
                  borderRadius: 999,
                  fontSize: 17,
                  fontWeight: 600,
                  transition: "background 200ms",
                }}
                hoverStyle={{ background: "#D2A563", color: "#0B0F14" }}
              >
                {"Book a Consultation "}
                <Icon name="icon-arrow-right" style={{ fontSize: 18 }} />
              </Hover>
              <span style={{ fontSize: 14, color: "#8A919B" }}>
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
