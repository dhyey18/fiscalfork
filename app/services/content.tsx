"use client";

import type { CSSProperties } from "react";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { Hover, Icon } from "../lib/ui";

const SERVICES = (
  [
    [
      "bookkeeping",
      "Restaurant, Hotels & Construction Bookkeeping",
      "bookkeeping",
      "icon-book-open",
      "Books kept to the rhythm of an operating business — sales reconciled daily, vendors current, and every account tied out before the month closes.",
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
      "Tax handled across the year rather than in a scramble each spring, with filings prepared ahead of deadline on both sides of the border.",
      [
        "Year-round planning, not just filing season",
        "Federal, state and provincial filings",
        "Sales tax and GST/HST registration and returns",
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
      "US & Canadian Accounting Support",
      "cross-border support",
      "icon-globe",
      "One team covering both countries, so multi-entity groups are not stitching together two bookkeepers who never speak to each other.",
      [
        "US and Canadian reporting standards",
        "Multi-entity and multi-currency handling",
        "Cross-border payroll coordination",
        "Support aligned to US and Canadian business hours",
      ],
      "Groups operating on both sides of the border under one ownership.",
    ],
  ] as const
).map(([slug, name, short, icon, summary, items, bestFor], i) => ({
  slug,
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
      "Fixed monthly fee",
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

const eyebrow: CSSProperties = {
  fontSize: 13,
  fontWeight: 600,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "#16202B",
};

export default function Content() {
  return (
    <div style={{ minHeight: "100vh", background: "#F6F3EE", overflowX: "clip" }}>
      <SiteHeader current="Services" />

      <main>
        {/* SERVICES HERO */}
        <section
          data-screen-label="Services Hero"
          aria-labelledby="s-h"
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
              <div style={{ ...eyebrow, marginBottom: 24 }}>Services</div>
              <h1
                id="s-h"
                style={{
                  margin: 0,
                  fontWeight: 500,
                  fontSize: "clamp(44px,6.4vw,84px)",
                  lineHeight: 0.98,
                  letterSpacing: "-0.045em",
                  textWrap: "balance",
                }}
              >
                {"One team for your "}
                <span style={{ ...serif, color: "#16202B" }}>
                  entire finance function.
                </span>
              </h1>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: "clamp(17px,1.5vw,20px)",
                lineHeight: 1.55,
                color: "#656A73",
                maxWidth: 480,
                textWrap: "pretty",
              }}
            >
              Start with the service you need most. Add more as you grow. Everything is
              delivered by the same dedicated team, on a fixed monthly fee.
            </p>
          </div>
          <nav
            aria-label="Jump to service"
            style={{
              marginTop: 48,
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
                  gap: 8,
                  minHeight: 44,
                  padding: "0 16px",
                  borderRadius: 999,
                  border: "1px solid rgba(11,15,20,0.14)",
                  background: "#FFFFFF",
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#0B0F14",
                }}
                hoverStyle={{ borderColor: "#16202B", color: "#0B0F14" }}
              >
                <Icon name={s.icon} style={{ color: "#16202B" }} />
                {s.name}
              </Hover>
            ))}
          </nav>
        </section>

        {/* SERVICE DETAILS */}
        <section
          data-screen-label="Service Details"
          aria-label="Service details"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 clamp(20px,4vw,48px)",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {SERVICES.map((s) => (
            <article
              key={s.slug}
              id={s.slug}
              aria-labelledby={s.hid}
              style={{
                scrollMarginTop: 96,
                background: "#FFFFFF",
                border: "1px solid rgba(11,15,20,0.08)",
                borderRadius: "clamp(22px,3vw,28px)",
                padding: "clamp(28px,4vw,48px)",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,380px),1fr))",
                gap: "32px clamp(32px,5vw,72px)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span
                    aria-hidden="true"
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 15,
                      background: "#EBE6DD",
                      color: "#16202B",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <i className={s.icon} style={{ fontSize: 24 }} />
                  </span>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono',monospace",
                      fontSize: 13,
                      color: "#656A73",
                    }}
                  >
                    {s.n}
                  </span>
                </div>
                <h2
                  id={s.hid}
                  style={{
                    margin: "28px 0 0",
                    fontWeight: 500,
                    fontSize: "clamp(30px,3.4vw,42px)",
                    lineHeight: 1.05,
                    letterSpacing: "-0.035em",
                  }}
                >
                  {s.name}
                </h2>
                <p
                  style={{
                    margin: "16px 0 0",
                    fontSize: 17,
                    lineHeight: 1.6,
                    color: "#656A73",
                    maxWidth: 460,
                    textWrap: "pretty",
                  }}
                >
                  {s.summary}
                </p>
                <a
                  href="/contact"
                  style={{
                    marginTop: 28,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 15,
                    fontWeight: 500,
                  }}
                >
                  {/* The service name is its own flex item, as in the original. */}
                  Discuss <span>{s.short}</span> <Icon name="icon-arrow-right" />
                </a>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                <div>
                  <div style={{ ...eyebrow, marginBottom: 14 }}>
                    What&apos;s included
                  </div>
                  <ul
                    style={{
                      listStyle: "none",
                      margin: 0,
                      padding: 0,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {s.items.map((it) => (
                      <li
                        key={it}
                        style={{
                          display: "flex",
                          gap: 12,
                          alignItems: "flex-start",
                          padding: "13px 0",
                          borderTop: "1px solid rgba(11,15,20,0.08)",
                          fontSize: 16,
                          lineHeight: 1.45,
                        }}
                      >
                        <Icon
                          name="icon-check"
                          style={{ color: "#2A6B4F", marginTop: 3 }}
                        />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  style={{
                    background: "#F6F3EE",
                    borderRadius: 16,
                    padding: "16px 18px",
                    fontSize: 15,
                    lineHeight: 1.5,
                    color: "#656A73",
                  }}
                >
                  <strong style={{ color: "#0B0F14", fontWeight: 600 }}>
                    Best for:
                  </strong>{" "}
                  {s.bestFor}
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
            padding: "clamp(80px,10vw,128px) clamp(20px,4vw,48px) 0",
          }}
        >
          <h2
            id="eng-h"
            style={{
              margin: "0 0 40px",
              fontWeight: 500,
              fontSize: "clamp(30px,3.6vw,46px)",
              lineHeight: 1.05,
              letterSpacing: "-0.035em",
              maxWidth: 640,
            }}
          >
            {"How every engagement "}
            <span style={{ fontFamily: "'Newsreader',serif", fontStyle: "italic", fontWeight: 400 }}>
              works
            </span>
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
                  borderTop: "1px solid rgba(11,15,20,0.14)",
                }}
              >
                <Icon name={t.icon} style={{ fontSize: 22, color: "#16202B" }} />
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
          style={{ padding: "clamp(80px,10vw,128px) clamp(12px,2vw,24px) 0" }}
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
                In a 30-minute consultation we&apos;ll review your current setup and
                recommend the services that will make the biggest difference.
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
                }}
                hoverStyle={{ background: "#D2A563", color: "#0B0F14" }}
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
