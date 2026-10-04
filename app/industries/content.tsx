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

const SEGMENTS: readonly Segment[] = [
  {
    slug: "fine-dining",
    tag: "Fine Dining",
    name: "Fine Dining Restaurants",
    blurb:
      "Fine dining operations require sophisticated financial management — from high-end wine cellar valuations and tasting menu costing to private event P&L and complex tip structures for large service teams.",
    handles: [
      "Wine cellar inventory & valuation",
      "Tasting menu & prix fixe costing",
      "Private event accounting & billing",
      "Complex tip pool management",
    ],
    reports: [
      "Daily sales and cover counts",
      "Weekly prime cost against target",
      "Wine inventory valuation schedule",
      "Monthly P&L with private events separated",
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
    slug: "fast-casual",
    tag: "Fast Casual",
    name: "Fast Casual & QSR",
    blurb:
      "High transaction volumes, tight labor budgets, and multi-location complexity are hallmarks of fast casual. We build efficient financial systems that scale with your growth and give real-time visibility at every location.",
    handles: [
      "High-volume POS reconciliation",
      "Multi-location consolidated reporting",
      "Labor % optimization",
      "Franchise accounting support",
    ],
    reports: [
      "Daily sales by location",
      "Weekly labor percentage by shift",
      "Consolidated multi-unit P&L",
      "Franchise royalty and fee reconciliation",
    ],
    photo: "fast-casual",
    detail: "fast-casual-detail",
  },
  {
    slug: "bars",
    tag: "Bars & Nightclubs",
    name: "Bars, Pubs & Nightclubs",
    blurb:
      "Beverage operations demand specialized controls. We track pour cost, monitor variance between theoretical and actual beverage cost, manage cash-heavy environments, and handle entertainment and licensing expenses.",
    handles: [
      "Pour cost & beverage variance analysis",
      "Cash management & theft prevention",
      "Entertainment expense tracking",
      "Liquor license cost amortization",
    ],
    reports: [
      "Daily cash and card reconciliation",
      "Weekly pour cost, theoretical against actual",
      "Entertainment and promoter spend against budget",
      "Monthly P&L with licence costs amortised",
    ],
    photo: "bars",
    detail: "bars-detail",
  },
  {
    slug: "cafes",
    tag: "Cafes & Coffee",
    name: "Cafes & Coffee Shops",
    blurb:
      "From single-location independent cafes to regional coffee chains, we manage daily bookkeeping, loyalty program revenue tracking, merchandise inventory, and subscription coffee sales accounting.",
    handles: [
      "Loyalty program revenue recognition",
      "Merchandise & retail inventory",
      "Third-party delivery reconciliation",
      "Multi-location rollup reporting",
    ],
    reports: [
      "Daily sales split by channel",
      "Weekly cost of goods and waste",
      "Loyalty and gift card liability schedule",
      "Monthly rollup across every site",
    ],
    photo: "cafes",
    detail: "cafes-detail",
  },
  {
    slug: "catering",
    tag: "Catering & Events",
    name: "Catering & Event Companies",
    blurb:
      "Catering businesses face unique challenges: seasonal cash flow, job costing by event, contract billing, and fluctuating staff costs. We build financial systems that give you event-level profitability before you price the next contract.",
    handles: [
      "Event-level job costing",
      "Seasonal cash flow management",
      "Contract billing & deposits",
      "Temporary staff payroll",
    ],
    reports: [
      "Profitability by event, closed within the week",
      "Deposit and contract billing schedule",
      "Rolling seasonal cash forecast",
      "Monthly P&L by event type",
    ],
    photo: "catering",
    detail: "catering-detail",
  },
  {
    slug: "food-trucks",
    tag: "Food Trucks",
    name: "Food Trucks & Pop-Ups",
    blurb:
      "Mobile food businesses have unique compliance and cash management needs. We help food truck operators track daily sales across multiple locations, manage commissary kitchen costs, and stay compliant with mobile vending regulations.",
    handles: [
      "Multi-location daily sales tracking",
      "Commissary kitchen cost allocation",
      "Mobile vendor permit & compliance",
      "Cash & card reconciliation",
    ],
    reports: [
      "Daily sales by location and event",
      "Commissary cost allocated per truck",
      "Permit and compliance calendar",
      "Monthly P&L per truck and combined",
    ],
    photo: "food-trucks",
    detail: "food-trucks-detail",
  },
  {
    slug: "ghost-kitchens",
    tag: "Ghost Kitchens",
    name: "Ghost Kitchens & Virtual Brands",
    blurb:
      "Virtual restaurant brands operating from ghost kitchens need precise delivery platform reconciliation, multi-brand cost allocation, and digital marketing spend tracking — all areas where we provide specialized expertise.",
    handles: [
      "Multi-brand P&L separation",
      "Delivery platform fee reconciliation",
      "Shared kitchen cost allocation",
      "Digital marketing ROI tracking",
    ],
    reports: [
      "P&L per virtual brand",
      "Platform fees and payouts reconciled to sales",
      "Shared kitchen costs allocated by brand",
      "Marketing spend against revenue by brand",
    ],
    photo: "ghost-kitchens",
    detail: "ghost-kitchens-detail",
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
              Specialized accounting expertise for every segment of the restaurant
              and hospitality industry.
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
                {"Deep expertise across all "}
                <span style={serif}>hospitality segments.</span>
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
              No two hospitality businesses are the same. A fine-dining restaurant
              has vastly different financial needs than a food truck or a boutique
              hotel. That&apos;s why we&apos;ve developed specialized expertise
              across every segment.
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
                We work across hospitality and construction. Tell us how your
                operation runs and we&apos;ll tell you how we&apos;d set the books up.
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
