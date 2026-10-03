"use client";

import { Fragment, useState, type CSSProperties } from "react";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import HeroVideo from "./components/HeroVideo";
import { Hover, Icon, Photo, useReveal, useViewportWidth } from "./lib/ui";

/* ── Page options, exposed as editable props on the original page ────────── */
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
  bg: i === 0 ? "#17304A" : "#FFFFFF",
  fg: i === 0 ? "#C9A35C" : "#17304A",
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
  color: "#17304A",
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
  const bars = BAR_HEIGHTS.map((h, i) => {
    const isFinal = i === BAR_HEIGHTS.length - 1;
    const isRecent = i >= 6;
    return {
      h: h + "%",
      c: isFinal
        ? "linear-gradient(180deg,#1F3C5C 0%,#17304A 100%)"
        : isRecent
          ? "linear-gradient(180deg,#318A63 0%,#276B4C 100%)"
          : "#DCD7CE",
    };
  });
  const current = PROBLEMS[active];

  // `w` drives the nav breakpoint inside SiteHeader; referenced here so the
  // home page re-renders with it, exactly as the original single component did.
  void w;

  return (
    <div style={{ minHeight: "100vh", background: "#F7F5F1", overflowX: "clip" }}>
      <SiteHeader current="Home" homeHref="#top" />

      <main id="top">
        {/* HERO */}
        <section
          className="ff-hero"
          data-screen-label="Hero"
          aria-labelledby="hero-h"
        >
          <style>{`
            /* The hero is one of two layouts.
               Below 960px the footage sits behind the copy and a vertical scrim
               does the work of keeping text readable.
               From 960px it splits: the copy moves onto a solid ink panel, so
               the footage no longer has to be dimmed to ~90% to stay legible
               behind text — it plays at close to full strength in its own half,
               and the panel gives every text colour a fixed, known background. */
            .ff-hero {
              position: relative; overflow: hidden; background: #0D1726;
              display: grid; grid-template-columns: 1fr;
              min-height: clamp(620px,90vh,980px);
            }
            .ff-hero-media { position: absolute; inset: 0; }
            .ff-hero-scrim {
              position: absolute; inset: 0; pointer-events: none;
              background: linear-gradient(180deg,
                rgba(13,23,38,0.88) 0%, rgba(13,23,38,0.92) 55%,
                rgba(13,23,38,0.95) 100%);
            }
            .ff-hero-blend { display: none; }
            .ff-hero-panel {
              position: relative; z-index: 2;
              display: flex; flex-direction: column; justify-content: center;
              padding: clamp(84px,11vw,120px) clamp(20px,5vw,48px) clamp(40px,5vw,56px);
            }
            .ff-hero-card {
              position: relative; z-index: 3;
              padding: 0 clamp(20px,5vw,48px) clamp(72px,9vw,96px);
            }

            @media (min-width: 960px) {
              .ff-hero { grid-template-columns: 58% 42%; }
              .ff-hero-media { position: relative; inset: auto; grid-column: 2; grid-row: 1; }
              .ff-hero-scrim { display: none; }
              /* Softens the cut where footage meets panel and keeps a light tint
                 across it, so the two halves read as one composition. */
              .ff-hero-blend {
                display: block; position: absolute; inset: 0; pointer-events: none;
                background: linear-gradient(90deg,
                  rgba(13,23,38,0.96) 0%, rgba(13,23,38,0.45) 14%,
                  rgba(13,23,38,0.10) 38%, rgba(13,23,38,0.24) 100%);
              }
              .ff-hero-panel {
                grid-column: 1; grid-row: 1;
                border-right: 1px solid rgba(201,163,92,0.35);
                /* Right padding has to clear the card, which hangs ~16% of its
                   own width back over the seam; at 960-1024px a smaller gutter
                   let the headline collide with it. */
                padding: clamp(96px,10vw,140px) clamp(88px,10vw,120px) clamp(96px,10vw,140px) 0;
                /* Lines the copy up with the 1280 container the rest of the page
                   uses, instead of drifting to the edge on wide monitors. */
                margin-left: max(clamp(20px,5vw,48px), calc((100vw - 1280px) / 2 + 48px));
              }
              .ff-hero-card {
                position: absolute; z-index: 3; padding: 0;
                left: 58%; top: 50%; transform: translate(-16%,-50%);
                width: min(372px,36vw);
              }
            }
          `}</style>

          <div className="ff-hero-media">
            <HeroVideo
              src="/7735854-hd_1920_1080_25fps.mp4"
              posterName="hero"
              sizes="(max-width: 960px) 100vw, 46vw"
            />
            <div className="ff-hero-blend" aria-hidden="true" />
          </div>
          <div className="ff-hero-scrim" aria-hidden="true" />

          <div className="ff-hero-panel">
            <div style={{ maxWidth: "min(620px,100%)" }}>
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
                  background: "rgba(201,163,92,0.85)",
                }}
              />
              <span
                style={{
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: 11,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#C9A35C",
                }}
              >
                Chartered Accountants
              </span>
            </div>

            <h1
              id="hero-h"
              style={{
                margin: 0,
                fontWeight: 500,
                fontSize: "clamp(38px,4.2vw,60px)",
                lineHeight: 1.04,
                letterSpacing: "-0.035em",
                color: "#FFFFFF",
              }}
            >
              Rigorous audit.
              <br />
              Assured compliance.
              <br />
              <span
                style={{
                  fontFamily: "'Newsreader',serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  letterSpacing: "-0.02em",
                  color: "#C9A35C",
                }}
              >
                Trusted counsel.
              </span>
            </h1>

            <div
              aria-hidden="true"
              style={{
                width: 76,
                height: 1,
                background: "rgba(201,163,92,0.5)",
                margin: "clamp(30px,3.4vw,40px) 0",
              }}
            />

            <p
              style={{
                margin: 0,
                fontSize: "clamp(16px,1.2vw,18px)",
                lineHeight: 1.65,
                color: "#C8CFD9",
                maxWidth: 470,
                textWrap: "pretty",
              }}
            >
              A firm of Chartered Accountants providing statutory audit and
              assurance, taxation, regulatory compliance and business advisory to
              companies, promoters and growing enterprises.
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
                  background: "#C9A35C",
                  color: "#0D1726",
                  padding: "17px 28px",
                  borderRadius: 999,
                  fontSize: 16,
                  fontWeight: 600,
                  boxShadow: "0 12px 28px -10px rgba(0,0,0,0.55)",
                  transition: "background 200ms,transform 200ms,box-shadow 200ms",
                }}
                hoverStyle={{
                  background: "#DBB87A",
                  color: "#0D1726",
                  transform: "translateY(-2px)",
                  boxShadow: "0 18px 36px -10px rgba(0,0,0,0.6)",
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

            {/* Practice areas, set like a letterhead rule rather than as feature
                bullets — the credibility numbers live in the stats band below. */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "10px 16px",
                marginTop: "clamp(44px,5vw,64px)",
                paddingTop: "clamp(24px,3vw,32px)",
                borderTop: "1px solid rgba(255,255,255,0.14)",
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 11,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#A8B2BF",
              }}
            >
              {["Audit & Assurance", "Taxation", "Compliance", "Advisory"].map(
                (t, i) => (
                  <Fragment key={t}>
                    {i > 0 ? (
                      <span
                        aria-hidden="true"
                        style={{
                          width: 3,
                          height: 3,
                          borderRadius: "50%",
                          background: "#C9A35C",
                        }}
                      />
                    ) : null}
                    <span>{t}</span>
                  </Fragment>
                ),
              )}
            </div>
            </div>
          </div>

          <div className="ff-hero-card">
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                background: "#FFFFFF",
                borderRadius: 20,
                border: "1px solid rgba(13,23,38,0.08)",
                boxShadow:
                  "0 40px 80px -28px rgba(0,0,0,0.55),0 10px 24px -8px rgba(0,0,0,0.3)",
                padding: 24,
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: "linear-gradient(90deg,#17304A,#C9A35C)",
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: 16,
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono',monospace",
                      fontSize: 11,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "#676E78",
                    }}
                  >
                    Compliance calendar · Q3
                  </div>
                  <div
                    style={{
                      fontSize: 34,
                      fontWeight: 500,
                      letterSpacing: "-0.03em",
                      marginTop: 8,
                    }}
                  >
                    18 / 18
                  </div>
                </div>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: "#1F5C41",
                    background: "#E4EDE7",
                    padding: "6px 10px",
                    borderRadius: 999,
                    whiteSpace: "nowrap",
                  }}
                >
                  All on time
                </span>
              </div>
              <div
                aria-hidden="true"
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: 8,
                  height: 92,
                  marginTop: 22,
                  paddingBottom: 10,
                  borderBottom: "1px solid rgba(13,23,38,0.08)",
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
                    [
                      "icon-circle-check",
                      "#276B4C",
                      "Statutory audit signed off",
                      "Sep 30",
                    ],
                    [
                      "icon-circle-check",
                      "#276B4C",
                      "Quarterly return filed",
                      "Oct 1",
                    ],
                    [
                      "icon-clock",
                      "#676E78",
                      "Next statutory deadline",
                      "Oct 15",
                    ],
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
                    <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Icon name={icon} style={{ color, fontSize: 17 }} />
                      {label}
                    </span>
                    <span style={{ color: "#676E78" }}>{date}</span>
                  </div>
                ))}
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
              borderTop: "1px solid rgba(13,23,38,0.12)",
              borderBottom: "1px solid rgba(13,23,38,0.12)",
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
                <div style={{ fontSize: 15, color: "#676E78", marginTop: 12 }}>
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
                color: "#676E78",
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
                  background: "#FFFFFF",
                  border: "1px solid rgba(13,23,38,0.08)",
                  borderRadius: 22,
                  padding: 28,
                  minHeight: 280,
                  color: "#0D1726",
                  boxShadow: "0 1px 2px rgba(13,23,38,0.03)",
                  transition: "box-shadow 260ms,border-color 260ms,transform 260ms",
                }}
                hoverStyle={{
                  boxShadow: "0 18px 40px -18px rgba(13,23,38,0.22)",
                  borderColor: "rgba(13,23,38,0.16)",
                  transform: "translateY(-2px)",
                  color: "#0D1726",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: "#EDE9E2",
                    color: "#17304A",
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
                    color: "#676E78",
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
                    color: "#17304A",
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
              background: "#17304A",
              color: "#F7F5F1",
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
                <div style={{ ...eyebrow, color: "#C9A35C" }}>Why Fiscal Fork</div>
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
                  <span style={{ ...serif, color: "#C9A35C" }}>
                    A financial partner.
                  </span>
                </h2>
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: 18,
                  lineHeight: 1.6,
                  color: "#C8CFD9",
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
                    borderTop: "1px solid rgba(247,245,241,0.18)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono',monospace",
                      fontSize: 13,
                      color: "#C9A35C",
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
                      color: "#C8CFD9",
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
                        border: `1px solid ${on ? "rgba(13,23,38,0.14)" : "transparent"}`,
                        background: on ? "#FFFFFF" : "transparent",
                        color: "#0D1726",
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
                          color: "#676E78",
                          width: 22,
                        }}
                      >
                        {p.n}
                      </span>
                      <span style={{ flex: 1 }}>“{p.problem}”</span>
                      <Icon
                        name="icon-arrow-right"
                        style={{
                          color: on ? "#17304A" : "rgba(13,23,38,0.25)",
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
                  border: "1px solid rgba(13,23,38,0.08)",
                  borderRadius: 28,
                  padding: "clamp(28px,4vw,48px)",
                  boxShadow: "0 24px 60px -32px rgba(13,23,38,0.25)",
                }}
              >
                <div style={{ fontSize: 14, color: "#676E78" }}>The problem</div>
                <div
                  style={{
                    fontFamily: "'Newsreader',serif",
                    fontStyle: "italic",
                    fontSize: "clamp(26px,2.6vw,34px)",
                    lineHeight: 1.2,
                    marginTop: 8,
                    color: "#0D1726",
                  }}
                >
                  “{current.problem}”
                </div>
                <div
                  style={{
                    height: 1,
                    background: "rgba(13,23,38,0.1)",
                    margin: "32px 0",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    fontSize: 14,
                    color: "#17304A",
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
                    color: "#0D1726",
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
                      background: "#EDE9E2",
                      color: "#17304A",
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
                    border: "1px solid rgba(13,23,38,0.08)",
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
                  <div style={{ height: 1, background: "rgba(13,23,38,0.1)" }} />
                  <p
                    style={{
                      margin: 0,
                      fontSize: 15,
                      lineHeight: 1.6,
                      color: "#676E78",
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
                      background: "#EDE9E2",
                      color: "#17304A",
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
                color: "#676E78",
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
                  color: "#0D1726",
                  background: "#FFFFFF",
                  border: "1px solid rgba(13,23,38,0.08)",
                  borderRadius: 24,
                  overflow: "hidden",
                  transition: "box-shadow 260ms,transform 260ms",
                }}
                hoverStyle={{
                  boxShadow: "0 18px 40px -18px rgba(13,23,38,0.22)",
                  transform: "translateY(-2px)",
                  color: "#0D1726",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    aspectRatio: "4/3",
                    background:
                      "repeating-linear-gradient(135deg,#EFEBE4 0 12px,#E8E4DC 12px 24px)",
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
                        color: "#676E78",
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
                      border: "1px solid rgba(13,23,38,0.14)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#17304A",
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
                      border: "1px solid rgba(13,23,38,0.14)",
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
                      background: "rgba(13,23,38,0.14)",
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
                    color: "#676E78",
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
                  border: "1px solid rgba(13,23,38,0.08)",
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
                    color: "#17304A",
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
                    borderTop: "1px solid rgba(13,23,38,0.08)",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      background: "#EDE9E2",
                      color: "#17304A",
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
                    <span style={{ fontSize: 14, color: "#676E78" }}>{t.role}</span>
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
              background: "#0D1726",
              color: "#F7F5F1",
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
                <span style={{ ...serif, color: "#C9A35C" }}>
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
                  color: "#C8CFD9",
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
                  background: "#C9A35C",
                  color: "#0D1726",
                  padding: "19px 30px",
                  borderRadius: 999,
                  fontSize: 17,
                  fontWeight: 600,
                  transition: "background 200ms",
                }}
                hoverStyle={{ background: "#DBB87A", color: "#0D1726" }}
              >
                {"Book a Consultation "}
                <Icon name="icon-arrow-right" style={{ fontSize: 18 }} />
              </Hover>
              <span style={{ fontSize: 14, color: "#8E97A3" }}>
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
