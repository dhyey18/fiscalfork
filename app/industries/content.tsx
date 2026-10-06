"use client";

import { useState, type CSSProperties } from "react";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import Modal from "../components/Modal";
import { Hover, Icon, Photo } from "../lib/ui";
import type { PhotoKey } from "../lib/images";

type Segment = {
  slug: string;
  tag: string;
  name: string;
  blurb: string;
  handles: readonly string[];
  /** What the client actually receives. Written against the service lines the
   *  firm already offers, so the modal adds substance rather than filler. */
  reports: readonly string[];
  photo: PhotoKey;
  detail: PhotoKey;
};

/* Six real sectors — not sub-niches of one vertical. Restaurants and
   Hotels & Resorts keep their original slugs ("fine-dining" / "hotels") so
   the homepage's existing anchor links keep pointing at the right card. */
const SEGMENTS: readonly Segment[] = [
  {
    slug: "fine-dining",
    tag: "Restaurants",
    name: "Restaurants",
    blurb:
      "From fine dining to fast casual, every restaurant runs on the same pressure points: food and labor cost, tip handling, and sales that need to be reconciled every single day. We build the bookkeeping rhythm around your service style, not a generic template.",
    handles: [
      "Daily sales & POS reconciliation",
      "Prime cost tracking (food + labor)",
      "Tip pooling & reporting",
      "Multi-location consolidated P&L",
    ],
    reports: [
      "Daily sales and cover counts",
      "Weekly prime cost against target",
      "Tip pool and payroll reconciliation",
      "Monthly P&L by location",
    ],
    photo: "fine-dining",
    detail: "fine-dining-detail",
  },
  {
    slug: "hotels",
    tag: "Hotels & Resorts",
    name: "Hotels & Resorts",
    blurb:
      "From boutique inns to large resort properties, we deliver full-service hospitality accounting using the Uniform System of Accounts for the Lodging Industry (USALI) — including RevPAR analysis and department-level P&L.",
    handles: [
      "RevPAR & GOPPAR tracking",
      "Departmental P&L (Rooms, F&B, Spa)",
      "OTA commission reconciliation",
      "Occupancy tax compliance",
    ],
    reports: [
      "Daily flash report on rooms and F&B",
      "RevPAR and GOPPAR against prior year",
      "Departmental P&L by revenue centre",
      "Monthly USALI-format financials",
    ],
    photo: "hotels",
    detail: "hotels-detail",
  },
  {
    slug: "construction",
    tag: "Construction",
    name: "Construction",
    blurb:
      "Job costing, progress billing and retainage make construction accounting a different discipline from most small-business bookkeeping. We track profitability by job, keep work-in-progress schedules current, and get draws billed and collected on schedule.",
    handles: [
      "Job costing by phase & cost code",
      "Progress billing & draw requests",
      "Retainage tracking & release",
      "Certified payroll & prevailing wage",
    ],
    reports: [
      "Job cost report against budget, by project",
      "Work-in-progress (WIP) schedule",
      "Progress billing and retainage ledger",
      "Monthly P&L by job and combined",
    ],
    photo: "construction",
    detail: "construction-detail",
  },
  {
    slug: "healthcare",
    tag: "Healthcare",
    name: "Healthcare Practices",
    blurb:
      "Medical and dental practices deal with a billing cycle most businesses don't: care delivered today, insurance paid months later. We reconcile patient and payer receivables, track collections by provider, and keep the books audit-ready.",
    handles: [
      "Patient & insurance receivables reconciliation",
      "Provider-level revenue reporting",
      "Payer mix & collections tracking",
      "Multi-provider practice consolidation",
    ],
    reports: [
      "Weekly collections against billed charges",
      "Accounts receivable aging by payer",
      "Provider-level production and revenue report",
      "Monthly P&L by location or provider group",
    ],
    photo: "healthcare",
    detail: "healthcare-detail",
  },
  {
    slug: "retail",
    tag: "Retail",
    name: "Retail",
    blurb:
      "Retail profitability lives in the details: what sells, what sits on a shelf, and what each channel actually costs to serve. We reconcile POS systems daily, track inventory and cost of goods, and roll up reporting across every location you operate.",
    handles: [
      "Daily POS & multi-channel reconciliation",
      "Inventory & cost of goods tracking",
      "Multi-location consolidated reporting",
      "Sales tax compliance by jurisdiction",
    ],
    reports: [
      "Daily sales by channel and location",
      "Weekly cost of goods and shrink report",
      "Inventory valuation schedule",
      "Monthly P&L with location rollup",
    ],
    photo: "retail",
    detail: "retail-detail",
  },
  {
    slug: "professional-services",
    tag: "Professional Services",
    name: "Professional Services Firms",
    blurb:
      "Law firms, agencies and consultancies bill for time, not inventory. We reconcile trust and retainer accounts, track work-in-progress against what's actually billed, and give partners a clear monthly read on utilization and profitability.",
    handles: [
      "Time & billing reconciliation",
      "Trust / retainer accounting",
      "Work-in-progress (WIP) tracking",
      "Partner draws & profit distributions",
    ],
    reports: [
      "Weekly utilization and realization report",
      "WIP and unbilled time schedule",
      "Trust account reconciliation",
      "Monthly P&L with partner distributions",
    ],
    photo: "professional-services",
    detail: "professional-services-detail",
  },
];

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
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const active = SEGMENTS.find((s) => s.slug === openSlug) ?? null;

  return (
    <div style={{ minHeight: "100vh", background: "#F6F3EE", overflowX: "clip" }}>
      <SiteHeader current="Industries" />

      <style>{`
        .ff-seg-grid { display:grid; grid-template-columns:1fr; gap:clamp(20px,2.4vw,28px); }
        @media (min-width: 760px) { .ff-seg-grid { grid-template-columns:repeat(2,minmax(0,1fr)); } }

        /* The whole card is the control, so the image reacts with it rather
           than only a button buried inside. */
        .ff-seg { all:unset; display:block; cursor:pointer; height:100%; }
        .ff-seg:focus-visible { outline:2px solid #B98A4B; outline-offset:4px; border-radius:22px; }
        .ff-seg-card {
          height:100%; display:flex; flex-direction:column; overflow:hidden;
          background:#FFFFFF; border:1px solid rgba(11,15,20,0.1);
          border-radius:22px; box-shadow:0 1px 2px rgba(11,15,20,0.04);
          transition:box-shadow 280ms, transform 280ms, border-color 280ms;
        }
        .ff-seg:hover .ff-seg-card, .ff-seg:focus-visible .ff-seg-card {
          box-shadow:0 26px 54px -24px rgba(11,15,20,0.3);
          border-color:rgba(11,15,20,0.18); transform:translateY(-3px);
        }
        .ff-seg-img { position:relative; aspect-ratio:16/10; overflow:hidden; }
        .ff-seg-img img { transition:transform 600ms cubic-bezier(.2,.7,.2,1); }
        .ff-seg:hover .ff-seg-img img { transform:scale(1.05); }

        .ff-modal-split { display:grid; grid-template-columns:1fr; }
        @media (min-width: 820px) { .ff-modal-split { grid-template-columns:1.12fr 0.88fr; } }

        @media (prefers-reduced-motion: reduce) {
          .ff-seg-card, .ff-seg-img img { transition:none; }
          .ff-seg:hover .ff-seg-card { transform:none; }
          .ff-seg:hover .ff-seg-img img { transform:none; }
        }
      `}</style>

      <main>
        {/* HERO */}
        <section
          data-screen-label="Industries Hero"
          aria-labelledby="i-h"
          style={{ background: "#0B0F14", color: "#FFFFFF" }}
        >
          <div
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              padding:
                "clamp(72px,9vw,120px) clamp(20px,4vw,48px) clamp(64px,8vw,96px)",
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
              <span style={{ color: "#C4CBD4" }}>Industries</span>
            </nav>

            <h1
              id="i-h"
              style={{
                margin: 0,
                fontWeight: 500,
                fontSize: "clamp(40px,5vw,72px)",
                lineHeight: 1.02,
                letterSpacing: "-0.04em",
                maxWidth: 900,
                textWrap: "balance",
              }}
            >
              {"Industries "}
              <span style={{ ...serif, color: "#B98A4B" }}>we serve.</span>
            </h1>
            <p
              style={{
                margin: "26px 0 0",
                fontSize: "clamp(17px,1.4vw,20px)",
                lineHeight: 1.6,
                color: "#C4CBD4",
                maxWidth: 620,
              }}
            >
              Specialized accounting expertise across every industry we serve —
              from hospitality to construction, healthcare and beyond.
            </p>
          </div>
        </section>

        {/* SEGMENTS */}
        <section
          data-screen-label="Our Expertise"
          aria-labelledby="exp-h"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "clamp(72px,9vw,120px) clamp(20px,4vw,48px) 0",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,440px),1fr))",
              gap: "clamp(24px,4vw,64px)",
              alignItems: "end",
              marginBottom: "clamp(44px,5vw,64px)",
            }}
          >
            <div>
              <div style={{ ...mono, fontSize: 11, color: "#B98A4B", marginBottom: 18 }}>
                Our Expertise
              </div>
              <h2
                id="exp-h"
                style={{
                  margin: 0,
                  fontWeight: 500,
                  fontSize: "clamp(30px,3.6vw,50px)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.035em",
                  textWrap: "balance",
                }}
              >
                {"Deep expertise across every "}
                <span style={serif}>sector we serve.</span>
              </h2>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: 16.5,
                lineHeight: 1.65,
                color: "#656A73",
                maxWidth: 480,
              }}
            >
              No two businesses run the same way. A restaurant has vastly
              different financial needs than a construction firm or a medical
              practice. That&apos;s why we&apos;ve built specialized expertise
              across every industry we serve.
            </p>
          </div>

          <div className="ff-seg-grid">
            {SEGMENTS.map((s) => (
              <button
                key={s.slug}
                id={s.slug}
                type="button"
                className="ff-seg"
                style={{ scrollMarginTop: 96 }}
                onClick={() => setOpenSlug(s.slug)}
                aria-haspopup="dialog"
                aria-label={`${s.name} — view details`}
              >
                <div className="ff-seg-card">
                  <div className="ff-seg-img">
                    <Photo name={s.photo} sizes="(max-width: 760px) 100vw, 50vw" />
                    <span
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        top: 14,
                        left: 14,
                        ...mono,
                        fontSize: 10,
                        color: "#0B0F14",
                        background: "rgba(246,243,238,0.94)",
                        padding: "7px 12px",
                        borderRadius: 999,
                      }}
                    >
                      {s.tag}
                    </span>
                  </div>

                  <div
                    style={{
                      padding: "clamp(22px,2.4vw,28px)",
                      display: "flex",
                      flexDirection: "column",
                      flex: 1,
                    }}
                  >
                    <h3
                      style={{
                        margin: 0,
                        fontSize: 22,
                        fontWeight: 600,
                        letterSpacing: "-0.025em",
                      }}
                    >
                      {s.name}
                    </h3>
                    <p
                      style={{
                        margin: "12px 0 0",
                        fontSize: 15,
                        lineHeight: 1.6,
                        color: "#656A73",
                      }}
                    >
                      {s.blurb}
                    </p>

                    <ul
                      style={{
                        listStyle: "none",
                        margin: "20px 0 0",
                        padding: 0,
                        display: "flex",
                        flexDirection: "column",
                        gap: 9,
                        flex: 1,
                      }}
                    >
                      {s.handles.map((h) => (
                        <li
                          key={h}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 10,
                            fontSize: 14,
                            lineHeight: 1.45,
                            color: "#16202B",
                          }}
                        >
                          <Icon
                            name="icon-check"
                            style={{ color: "#B98A4B", fontSize: 13, marginTop: 3 }}
                          />
                          {h}
                        </li>
                      ))}
                    </ul>

                    <span
                      style={{
                        marginTop: 24,
                        paddingTop: 18,
                        borderTop: "1px solid rgba(11,15,20,0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 12,
                        fontSize: 14.5,
                        fontWeight: 600,
                        color: "#16202B",
                      }}
                    >
                      View details
                      <Icon name="icon-arrow-right" style={{ color: "#B98A4B" }} />
                    </span>
                  </div>
                </div>
              </button>
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
              background: "#16202B",
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
              {"Don't see your segment? "}
              <span style={{ ...serif, color: "#B98A4B" }}>
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
                  color: "#C4CBD4",
                  maxWidth: 420,
                }}
              >
                We work across hospitality, construction, healthcare, retail and
                professional services. Tell us how your operation runs and
                we&apos;ll tell you how we&apos;d set the books up.
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

      {/* DETAIL MODAL */}
      <Modal
        open={active !== null}
        onClose={() => setOpenSlug(null)}
        labelledBy="seg-modal-title"
      >
        {active ? (
          <>
            <div style={{ position: "relative", aspectRatio: "21/9" }}>
              <Photo name={active.photo} sizes="(max-width: 1020px) 100vw, 1020px" />
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg,rgba(11,15,20,0.1) 0%,rgba(11,15,20,0.5) 55%,rgba(11,15,20,0.92) 100%)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  padding: "clamp(22px,3vw,36px)",
                }}
              >
                <div
                  style={{ ...mono, fontSize: 10, color: "#D2A563", marginBottom: 12 }}
                >
                  {active.tag}
                </div>
                <h2
                  id="seg-modal-title"
                  style={{
                    margin: 0,
                    color: "#FFFFFF",
                    fontWeight: 500,
                    fontSize: "clamp(26px,3.4vw,42px)",
                    lineHeight: 1.05,
                    letterSpacing: "-0.035em",
                  }}
                >
                  {active.name}
                </h2>
              </div>
            </div>

            <div className="ff-modal-split">
              <div
                style={{
                  padding: "clamp(24px,3vw,40px)",
                  borderRight: "1px solid rgba(11,15,20,0.08)",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: 16.5,
                    lineHeight: 1.7,
                    color: "#656A73",
                    textWrap: "pretty",
                  }}
                >
                  {active.blurb}
                </p>

                <h3
                  style={{
                    ...mono,
                    fontSize: 11,
                    color: "#16202B",
                    margin: "30px 0 16px",
                    fontWeight: 500,
                  }}
                >
                  What we handle
                </h3>
                <ul
                  style={{
                    listStyle: "none",
                    margin: 0,
                    padding: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                  }}
                >
                  {active.handles.map((h) => (
                    <li
                      key={h}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 11,
                        fontSize: 15.5,
                        lineHeight: 1.5,
                      }}
                    >
                      <Icon
                        name="icon-check"
                        style={{ color: "#B98A4B", fontSize: 14, marginTop: 4 }}
                      />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                style={{
                  padding: "clamp(24px,3vw,40px)",
                  background: "#F6F3EE",
                  display: "flex",
                  flexDirection: "column",
                  gap: 24,
                }}
              >
                <div
                  style={{
                    position: "relative",
                    aspectRatio: "4/3",
                    borderRadius: 16,
                    overflow: "hidden",
                    border: "1px solid rgba(11,15,20,0.08)",
                  }}
                >
                  <Photo
                    name={active.detail}
                    sizes="(max-width: 820px) 100vw, 400px"
                  />
                </div>

                <div>
                  <h3
                    style={{
                      ...mono,
                      fontSize: 11,
                      color: "#16202B",
                      margin: "0 0 14px",
                      fontWeight: 500,
                    }}
                  >
                    What you receive
                  </h3>
                  <ul
                    style={{
                      listStyle: "none",
                      margin: 0,
                      padding: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                    }}
                  >
                    {active.reports.map((r) => (
                      <li
                        key={r}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 10,
                          fontSize: 14.5,
                          lineHeight: 1.5,
                          color: "#656A73",
                        }}
                      >
                        <span
                          aria-hidden="true"
                          style={{
                            flex: "none",
                            width: 5,
                            height: 5,
                            marginTop: 8,
                            borderRadius: "50%",
                            background: "#B98A4B",
                          }}
                        />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                <Hover
                  href="/contact"
                  style={{
                    marginTop: "auto",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    background: "#16202B",
                    color: "#F6F3EE",
                    padding: "15px 24px",
                    borderRadius: 999,
                    fontSize: 15,
                    fontWeight: 600,
                    transition: "background 200ms",
                  }}
                  hoverStyle={{ background: "#0B0F14", color: "#F6F3EE" }}
                >
                  Book a Consultation <Icon name="icon-arrow-right" />
                </Hover>
              </div>
            </div>
          </>
        ) : null}
      </Modal>

      <SiteFooter />
    </div>
  );
}
