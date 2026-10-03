"use client";

import type { CSSProperties } from "react";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { Hover, Icon } from "../lib/ui";

const SERVICES = (
  [
    [
      "bookkeeping",
      "Bookkeeping",
      "bookkeeping",
      "icon-book-open",
      "Accurate, reconciled books closed on a fixed schedule every month, so your numbers are always current and ready for decisions.",
      [
        "Transaction categorization and bank reconciliation",
        "Monthly close by the 10th",
        "Receipt and document management",
        "Clean-up of past periods if books are behind",
      ],
      "Businesses whose books are behind, or owners still doing it themselves.",
    ],
    [
      "tax",
      "Tax Services",
      "tax",
      "icon-receipt",
      "Year-round tax planning and preparation for the business and its owners, with filings completed well ahead of every deadline.",
      [
        "Business and owner tax returns",
        "Quarterly estimated tax payments",
        "Sales tax registration and filing",
        "Tax planning reviews before year-end",
      ],
      "Owners who want fewer surprises and a lower, predictable tax bill.",
    ],
    [
      "payroll",
      "Payroll",
      "payroll",
      "icon-wallet",
      "Reliable payroll for your whole team, including payroll tax filings, benefits deductions and year-end forms.",
      [
        "Scheduled payroll runs",
        "Payroll tax filings and payments",
        "New hire onboarding and contractor payments",
        "Year-end employee and contractor forms",
      ],
      "Teams from 2 to 200 that want payroll off the owner’s desk.",
    ],
    [
      "reporting",
      "Financial Reporting",
      "reporting",
      "icon-file-text",
      "Monthly reports in plain language: profit and loss, balance sheet and cash flow, with the key numbers highlighted and explained.",
      [
        "Monthly P&L, balance sheet and cash flow",
        "KPI summary tailored to your business",
        "Monthly walkthrough call",
        "Lender and investor-ready packages",
      ],
      "Owners who get reports but don’t find them useful.",
    ],
    [
      "cfo",
      "CFO Advisory",
      "CFO advisory",
      "icon-briefcase",
      "Senior financial leadership without a full-time hire, for pricing, fundraising, budgeting and major decisions.",
      [
        "Quarterly strategy and performance reviews",
        "Budgeting and board reporting",
        "Fundraising and lender preparation",
        "Pricing and margin analysis",
      ],
      "Growing companies that need CFO thinking but not a CFO salary.",
    ],
    [
      "ap-ar",
      "Accounts Payable & Receivable",
      "AP & AR",
      "icon-arrow-left-right",
      "Bills paid on time and invoices collected, so cash keeps moving and supplier and client relationships stay healthy.",
      [
        "Bill approval workflows and payment runs",
        "Invoicing and collections follow-up",
        "Aged payables and receivables reporting",
        "Vendor and customer record management",
      ],
      "Businesses with cash tied up in late invoices or messy bill payments.",
    ],
    [
      "planning",
      "Financial Planning",
      "financial planning",
      "icon-target",
      "Budgets, forecasts and scenarios connected to your goals, so you can plan hires, investments and growth with confidence.",
      [
        "Annual budget and monthly variance tracking",
        "Rolling 13-week cash forecast",
        "Scenario and hiring models",
        "Owner compensation planning",
      ],
      "Owners planning a hire, expansion, or major purchase.",
    ],
    [
      "advisory",
      "Business Advisory",
      "business advisory",
      "icon-compass",
      "Practical guidance on structure, operations and growth decisions, grounded in your actual numbers.",
      [
        "Entity structure and setup",
        "Profitability by product, service or location",
        "Systems and software selection",
        "Exit and succession readiness",
      ],
      "Owners facing a big decision who want a clear second opinion.",
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
  color: "#16382F",
};

export default function Content() {
  return (
    <div style={{ minHeight: "100vh", background: "#F6F5F0", overflowX: "clip" }}>
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
                <span style={{ ...serif, color: "#16382F" }}>
                  entire finance function.
                </span>
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
                  border: "1px solid rgba(15,30,26,0.14)",
                  background: "#FDFCF9",
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#0F1E1A",
                }}
                hoverStyle={{ borderColor: "#16382F", color: "#0F1E1A" }}
              >
                <Icon name={s.icon} style={{ color: "#16382F" }} />
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
                background: "#FDFCF9",
                border: "1px solid rgba(15,30,26,0.08)",
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
                      background: "#EEF1E6",
                      color: "#16382F",
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
                      color: "#55625D",
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
                    color: "#55625D",
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
                          borderTop: "1px solid rgba(15,30,26,0.08)",
                          fontSize: 16,
                          lineHeight: 1.45,
                        }}
                      >
                        <Icon
                          name="icon-check"
                          style={{ color: "#7FA33A", marginTop: 3 }}
                        />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  style={{
                    background: "#F6F5F0",
                    borderRadius: 16,
                    padding: "16px 18px",
                    fontSize: 15,
                    lineHeight: 1.5,
                    color: "#55625D",
                  }}
                >
                  <strong style={{ color: "#0F1E1A", fontWeight: 600 }}>
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
                  borderTop: "1px solid rgba(15,30,26,0.14)",
                }}
              >
                <Icon name={t.icon} style={{ fontSize: 22, color: "#16382F" }} />
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
                    color: "#55625D",
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
              background: "#0F1E1A",
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
              {"Not sure where to start? "}
              <span style={{ ...serif, color: "#D2E67C" }}>
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
                  color: "#C9D3CE",
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
