"use client";

import type { CSSProperties } from "react";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { Hover, Icon, Photo } from "../lib/ui";

/* One photograph per service, in the order the services are declared. */
const SERVICE_PHOTOS = [
  "svc-bookkeeping",
  "svc-reporting",
  "svc-payroll",
  "svc-ap-ar",
  "svc-financials",
  "svc-tax",
  "svc-cleanup",
  "svc-cfo",
  "svc-cross-border",
] as const;

const SERVICES = (
  [
    [
      "bookkeeping",
      "Restaurant, Hotels & Construction Bookkeeping",
      "bookkeeping",
      "icon-book-open",
      "Daily hospitality bookkeeping covering POS reconciliation, AP/AR, vendor payments, and bank reconciliations, with accurate USAR/USALI-based transaction categorization.",
      [
        "Daily sales reconciliation",
        "POS integration",
        "Bank reconciliation",
        "Vendor management",
        "Accounts payable & receivable",
      ],
      "Operators running covers, rooms or jobs who need the books kept daily, not monthly.",
    ],
    [
      "reporting-cadence",
      "Daily, Weekly & Monthly Reporting",
      "your reporting cadence",
      "icon-calendar",
      "Numbers that arrive while you can still act on them: daily operations, weekly cost control, and a full financial pack once the month is closed.",
      [
        "Daily operational reports",
        "Weekly food & beverage cost reports",
        "Weekly update reports",
        "Payroll reports",
        "Monthly financial reports",
      ],
      "Owners who find out about a bad month after it is already over.",
    ],
    [
      "payroll",
      "Payroll Management & HR Compliance",
      "payroll",
      "icon-wallet",
      "Payroll run across every location, with tips, overtime and year-end filings handled to the rules that apply where your people work.",
      [
        "Multi-location payroll",
        "W-2 / 1099 filing",
        "Tip reporting & pooling",
        "Overtime management",
      ],
      "Teams across several sites, where tips and overtime make payroll its own job.",
    ],
    [
      "ap-ar",
      "Accounts Payable & Receivable",
      "AP & AR",
      "icon-arrow-left-right",
      "Both sides of the cash cycle run on a schedule: bills captured, coded and approved before they are due, and money owed to you actually chased.",
      [
        "Bill capture, coding and approval workflows",
        "Scheduled vendor payment runs",
        "Invoicing and collections follow-up",
        "Aged payables and receivables reporting",
        "Vendor and customer record management",
      ],
      "Businesses paying late fees on one side and carrying unpaid invoices on the other.",
    ],
    [
      "financials",
      "Monthly Financials & Management Reporting",
      "management reporting",
      "icon-file-text",
      "A monthly pack built to be read, not filed: what you earned, where it went, what it means against last month and last year.",
      [
        "Accurate financials",
        "Cash flow management",
        "Cost tracking",
        "Comparison reports with analysis",
      ],
      "Owners who receive reports but cannot tell what changed or why.",
    ],
    [
      "tax",
      "Tax Planning & Compliance",
      "tax",
      "icon-receipt",
      "Tax handled across the year rather than in a scramble at the deadline, with filings prepared ahead of time in every jurisdiction you file in.",
      [
        "Year-round planning, not just filing season",
        "Filings in each jurisdiction you operate in",
        "Sales and indirect tax registration and returns",
        "Quarterly estimates and owner distributions",
        "Coordination with your CPA or tax preparer",
      ],
      "Owners who want the bill predictable and the deadlines uneventful.",
    ],
    [
      "cleanup",
      "Accounting Clean-Up & Reconciliation",
      "a clean-up",
      "icon-wrench",
      "Getting current when the books have slipped — months or years rebuilt, reconciled and brought to a state you can file and borrow against.",
      [
        "Catch-up on unreconciled periods",
        "Historical bank and card reconciliation",
        "Chart of accounts rebuild",
        "Prior-period corrections before filing",
      ],
      "Anyone behind on their books, or inheriting a set they do not trust.",
    ],
    [
      "cfo",
      "CFO Advisory",
      "CFO advisory",
      "icon-briefcase",
      "Senior financial thinking without a full-time hire: what each location or job is really earning, and what the next decision should be.",
      [
        "Budgeting and forecasting",
        "Prime cost and margin analysis",
        "Location-level and project-level P&L",
        "Lender and investor reporting",
      ],
      "Operators opening a second site, bidding larger jobs, or raising finance.",
    ],
    [
      "cross-border",
      "International Accounting Support",
      "international support",
      "icon-globe",
      "One team covering every market you trade in, so a multi-country group is not stitching together a separate bookkeeper per jurisdiction.",
      [
        "Local reporting standards in each market",
        "Multi-entity and multi-currency handling",
        "Cross-border payroll coordination",
        "Support aligned to your business hours",
      ],
      "Groups operating in more than one country under one ownership.",
    ],
  ] as const
).map(([slug, name, short, icon, summary, items, bestFor], i) => ({
  slug,
  photo: SERVICE_PHOTOS[i],
  name,
  short,
  icon,
  summary,
  items,
  bestFor,
  anchor: "#" + slug,
  hid: "svc-" + slug,
  n: String(i + 1).padStart(2, "0"),
}));

const TERMS = (
  [
    [
      "icon-badge-check",
      "Clear pricing",
      "Agreed up front based on scope. No hourly billing.",
    ],
    [
      "icon-user",
      "Dedicated accountant",
      "One named person who knows your business.",
    ],
    [
      "icon-calendar",
      "Set delivery dates",
      "Reports and filings arrive on the same schedule every month.",
    ],
    [
      "icon-shield-check",
      "Secure by default",
      "Bank-level encryption and controlled access to your data.",
    ],
  ] as const
).map(([icon, title, desc]) => ({ icon, title, desc }));

const serif: CSSProperties = {
  fontFamily: "'Newsreader',serif",
  fontStyle: "italic",
  fontWeight: 400,
  letterSpacing: "-0.02em",
};

const mono: CSSProperties = {
  fontFamily: "'JetBrains Mono',monospace",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
};

export default function Content() {
  return (
    <div style={{ minHeight: "100vh", background: "#F6F3EE", overflowX: "clip" }}>
      <SiteHeader current="Services" />

      <style>{`
        /* Blocks alternate side on wide screens and stack image-first on
           narrow ones, so the photograph always introduces its service. */
        .ff-svc {
          display: grid; grid-template-columns: 1fr; gap: clamp(28px,4vw,56px);
          align-items: center;
        }
        .ff-svc-media { position: relative; aspect-ratio: 4/3; }
        @media (min-width: 900px) {
          .ff-svc { grid-template-columns: 1fr 1fr; gap: clamp(48px,5vw,88px); }
          .ff-svc:nth-child(even) .ff-svc-media { order: 2; }
          .ff-svc-media { aspect-ratio: 5/4; }
        }
        /* Five bullets read better in two columns once there is room. */
        .ff-svc-points { columns: 1; }
        @media (min-width: 560px) { .ff-svc-points { columns: 2; column-gap: 28px; } }
        @media (min-width: 900px) { .ff-svc-points { columns: 1; } }
        @media (min-width: 1140px) { .ff-svc-points { columns: 2; column-gap: 28px; } }
      `}</style>

      <main>
        {/* HERO */}
        <section
          data-screen-label="Services Hero"
          aria-labelledby="s-h"
          style={{ background: "#0B0F14", color: "#FFFFFF" }}
        >
          <div
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              padding:
                "clamp(72px,9vw,120px) clamp(20px,4vw,48px) clamp(56px,7vw,88px)",
            }}
          >
            <nav
              aria-label="Breadcrumb"
              style={{ ...mono, fontSize: 11, color: "#8A919B", marginBottom: 34 }}
            >
              <a href="/" style={{ color: "#8A919B" }}>
                Home
              </a>
              <span aria-hidden="true" style={{ margin: "0 10px", color: "#B98A4B" }}>
                /
              </span>
              <span style={{ color: "#C4CBD4" }}>Services</span>
            </nav>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,440px),1fr))",
                gap: "clamp(28px,4vw,64px)",
                alignItems: "end",
              }}
            >
              <h1
                id="s-h"
                style={{
                  margin: 0,
                  fontWeight: 500,
                  fontSize: "clamp(40px,5vw,72px)",
                  lineHeight: 1.02,
                  letterSpacing: "-0.04em",
                  textWrap: "balance",
                }}
              >
                {"Nine services. "}
                <span style={{ ...serif, color: "#B98A4B" }}>One finance function.</span>
              </h1>
              <p
                style={{
                  margin: 0,
                  fontSize: "clamp(16px,1.2vw,18px)",
                  lineHeight: 1.65,
                  color: "#C4CBD4",
                  maxWidth: 460,
                }}
              >
                Take one line or the whole function. Either way it is the same team,
                the same close calendar, and clear pricing — in every market
                you operate.
              </p>
            </div>

            <nav
              aria-label="Jump to a service"
              style={{
                marginTop: "clamp(44px,5vw,64px)",
                paddingTop: "clamp(28px,3vw,36px)",
                borderTop: "1px solid rgba(246,243,238,0.16)",
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              {SERVICES.map((s) => (
                <Hover
                  key={s.slug}
                  href={s.anchor}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 9,
                    minHeight: 40,
                    padding: "0 15px",
                    borderRadius: 999,
                    border: "1px solid rgba(246,243,238,0.22)",
                    fontSize: 13.5,
                    color: "#C4CBD4",
                    transition: "background 180ms,border-color 180ms,color 180ms",
                  }}
                  hoverStyle={{
                    background: "rgba(185,138,75,0.16)",
                    borderColor: "rgba(185,138,75,0.6)",
                    color: "#FFFFFF",
                  }}
                >
                  <span style={{ ...mono, fontSize: 10, color: "#B98A4B" }}>{s.n}</span>
                  {s.short === "bookkeeping" ? "Bookkeeping" : s.name}
                </Hover>
              ))}
            </nav>
          </div>
        </section>

        {/* SERVICE BLOCKS */}
        <section
          data-screen-label="Service Details"
          aria-label="Service details"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "clamp(72px,9vw,120px) clamp(20px,4vw,48px) 0",
            display: "flex",
            flexDirection: "column",
            gap: "clamp(72px,9vw,128px)",
          }}
        >
          {SERVICES.map((s, i) => (
            <article
              key={s.slug}
              id={s.slug}
              aria-labelledby={s.hid}
              className="ff-svc"
              style={{ scrollMarginTop: 96 }}
            >
              <div className="ff-svc-media">
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "clamp(20px,2.4vw,26px)",
                    overflow: "hidden",
                    border: "1px solid rgba(11,15,20,0.08)",
                    boxShadow:
                      "0 34px 64px -30px rgba(11,15,20,0.4),0 8px 20px -10px rgba(11,15,20,0.16)",
                    background:
                      "repeating-linear-gradient(135deg,#EDE8DF 0 12px,#E6E0D6 12px 24px)",
                  }}
                >
                  <Photo
                    name={s.photo}
                    sizes="(max-width: 900px) 100vw, 50vw"
                    priority={i === 0}
                  />
                </div>
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: 18,
                    left: 18,
                    ...mono,
                    fontSize: 11,
                    color: "#0B0F14",
                    background: "rgba(246,243,238,0.94)",
                    padding: "7px 12px",
                    borderRadius: 999,
                  }}
                >
                  {s.n}
                </span>
              </div>

              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 13,
                    marginBottom: 20,
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: 42,
                      height: 42,
                      flex: "none",
                      borderRadius: 12,
                      background: "#EBE6DD",
                      color: "#16202B",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <i className={s.icon} style={{ fontSize: 19 }} />
                  </span>
                  <span
                    aria-hidden="true"
                    style={{ flex: 1, height: 1, background: "rgba(11,15,20,0.14)" }}
                  />
                </div>

                <h2
                  id={s.hid}
                  style={{
                    margin: 0,
                    fontWeight: 500,
                    fontSize: "clamp(28px,3vw,40px)",
                    lineHeight: 1.08,
                    letterSpacing: "-0.035em",
                    textWrap: "balance",
                  }}
                >
                  {s.name}
                </h2>

                <p
                  style={{
                    margin: "16px 0 0",
                    fontSize: 16.5,
                    lineHeight: 1.65,
                    color: "#656A73",
                    textWrap: "pretty",
                  }}
                >
                  {s.summary}
                </p>

                <ul
                  className="ff-svc-points"
                  style={{ listStyle: "none", margin: "26px 0 0", padding: 0 }}
                >
                  {s.items.map((it) => (
                    <li
                      key={it}
                      style={{
                        breakInside: "avoid",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 10,
                        padding: "7px 0",
                        fontSize: 15,
                        lineHeight: 1.5,
                      }}
                    >
                      <Icon
                        name="icon-check"
                        style={{ color: "#B98A4B", fontSize: 14, marginTop: 4 }}
                      />
                      {it}
                    </li>
                  ))}
                </ul>

                <div
                  style={{
                    marginTop: 28,
                    paddingTop: 22,
                    borderTop: "1px solid rgba(11,15,20,0.12)",
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 18,
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontSize: 14.5,
                      lineHeight: 1.55,
                      color: "#656A73",
                      maxWidth: 400,
                    }}
                  >
                    <strong style={{ color: "#0B0F14", fontWeight: 600 }}>
                      Best for:
                    </strong>{" "}
                    {s.bestFor}
                  </p>
                  <Hover
                    href="/contact"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      fontSize: 15,
                      fontWeight: 600,
                      color: "#16202B",
                      whiteSpace: "nowrap",
                    }}
                    hoverStyle={{ color: "#B98A4B" }}
                  >
                    Discuss <span>{s.short}</span>
                    <Icon name="icon-arrow-right" />
                  </Hover>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* ENGAGEMENT */}
        <section
          data-screen-label="Engagement"
          aria-labelledby="eng-h"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "clamp(84px,10vw,132px) clamp(20px,4vw,48px) 0",
          }}
        >
          <h2
            id="eng-h"
            style={{
              margin: "0 0 clamp(32px,4vw,48px)",
              fontWeight: 500,
              fontSize: "clamp(30px,3.6vw,46px)",
              lineHeight: 1.05,
              letterSpacing: "-0.035em",
              maxWidth: 640,
            }}
          >
            {"How every engagement "}
            <span style={serif}>works</span>
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,240px),1fr))",
              gap: 0,
            }}
          >
            {TERMS.map((t) => (
              <div
                key={t.title}
                style={{
                  padding: "28px 28px 8px 0",
                  borderTop: "1px solid rgba(11,15,20,0.16)",
                }}
              >
                <Icon name={t.icon} style={{ fontSize: 22, color: "#B98A4B" }} />
                <h3
                  style={{
                    margin: "18px 0 0",
                    fontSize: 19,
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {t.title}
                </h3>
                <p
                  style={{
                    margin: "8px 0 0",
                    fontSize: 15,
                    lineHeight: 1.55,
                    color: "#656A73",
                  }}
                >
                  {t.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section
          data-screen-label="CTA"
          aria-labelledby="cta-h"
          style={{ padding: "clamp(84px,10vw,132px) clamp(12px,2vw,24px) 0" }}
        >
          <div
            style={{
              maxWidth: 1376,
              margin: "0 auto",
              background: "#0B0F14",
              color: "#F6F3EE",
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
              {"Not sure where to start? "}
              <span style={{ ...serif, color: "#B98A4B" }}>
                We&apos;ll help you decide.
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
                  color: "#C4CBD4",
                  maxWidth: 420,
                }}
              >
                In a 30-minute consultation we&apos;ll review how your books are kept
                today and recommend the lines that will make the biggest difference.
              </p>
              <Hover
                href="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "#B98A4B",
                  color: "#0B0F14",
                  padding: "18px 28px",
                  borderRadius: 999,
                  fontSize: 16,
                  fontWeight: 600,
                  transition: "background 200ms,transform 200ms",
                }}
                hoverStyle={{
                  background: "#D2A563",
                  color: "#0B0F14",
                  transform: "translateY(-2px)",
                }}
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
