"use client";

import type { CSSProperties } from "react";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { Hover, Icon, Photo, useViewportWidth } from "../lib/ui";

/* ── Page options, exposed as editable props on the original page ────────── */
const layout: "Alternating" | "Stacked" = "Alternating";

// One portrait per founder, in declaration order.
const FOUNDER_PHOTOS = ["founder-1", "founder-2", "founder-3"] as const;

const FOUNDERS = [
  {
    name: "Founder Name",
    role: "Co-founder & Managing Partner",
    creds: "[Credentials — e.g. CPA · 15 years in practice]",
    quote:
      "Good accounting should make decisions easier, not just keep you compliant.",
    bio: "[Placeholder bio] Leads client relationships and the firm’s overall direction. Previously spent several years in public accounting working with owner-led businesses across hospitality, retail and services.",
    focus: ["Client strategy", "Financial reporting", "Hospitality"],
  },
  {
    name: "Founder Name",
    role: "Co-founder & Head of Tax",
    creds: "[Credentials — e.g. CPA, tax specialist · 12 years]",
    quote:
      "Tax planning works best when it happens all year, not in the last two weeks.",
    bio: "[Placeholder bio] Oversees tax planning, preparation and compliance for clients and their owners. Background in business tax advisory, with a focus on entity structure and multi-state filings.",
    focus: ["Tax planning", "Compliance", "Entity structure"],
  },
  {
    name: "Founder Name",
    role: "Co-founder & Head of Advisory",
    creds: "[Credentials — e.g. former CFO · 10+ years]",
    quote: "Every owner deserves a clear view of cash, margins and runway.",
    bio: "[Placeholder bio] Runs the CFO advisory practice — forecasting, budgeting, pricing and fundraising support. Previously led finance teams at venture-backed technology companies.",
    focus: ["CFO advisory", "Forecasting", "Startups"],
  },
];

const serif: CSSProperties = {
  fontFamily: "'Newsreader',serif",
  fontStyle: "italic",
  fontWeight: 400,
  letterSpacing: "-0.02em",
};

const pillLink: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  minHeight: 44,
  padding: "0 18px",
  borderRadius: 999,
  border: "1px solid rgba(11,21,38,0.16)",
  fontSize: 14,
  fontWeight: 500,
  color: "#0B1526",
};

export default function Content() {
  const w = useViewportWidth();
  const isDesktop = w >= 960;
  const alternate = layout === "Alternating";

  const founders = FOUNDERS.map((f, i) => ({
    ...f,
    n: "0" + (i + 1),
    hid: "founder-" + (i + 1),
    slot: "founder-" + (i + 1),
    ph: "Portrait — founder " + (i + 1) + ", natural light, plain background",
    photo: FOUNDER_PHOTOS[i],
    mail: "mailto:hello@fiscalfork.com",
    photoOrder: alternate && i % 2 === 1 && isDesktop ? 2 : 0,
  }));

  return (
    <div style={{ minHeight: "100vh", background: "#F5F6F8", overflowX: "clip" }}>
      <SiteHeader current="About" />

      <main>
        {/* TEAM HERO */}
        <section
          data-screen-label="Team Hero"
          aria-labelledby="team-h"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding:
              "clamp(56px,9vw,120px) clamp(20px,4vw,48px) clamp(48px,6vw,80px)",
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
                color: "#1B2A4A",
                marginBottom: 24,
              }}
            >
              Our team
            </div>
            <h1
              id="team-h"
              style={{
                margin: 0,
                fontWeight: 500,
                fontSize: "clamp(44px,6.4vw,84px)",
                lineHeight: 0.98,
                letterSpacing: "-0.045em",
                textWrap: "balance",
              }}
            >
              {"The people behind "}
              <span style={{ ...serif, color: "#1B2A4A" }}>your numbers.</span>
            </h1>
          </div>
          <p
            style={{
              margin: 0,
              fontSize: "clamp(17px,1.5vw,20px)",
              lineHeight: 1.55,
              color: "#5B6472",
              maxWidth: 480,
              textWrap: "pretty",
            }}
          >
            Fiscal Fork was founded by three finance professionals who wanted growing
            businesses to have the kind of accounting and advice usually reserved for
            much larger companies. Every client works directly with the founding team.
          </p>
        </section>

        {/* FOUNDERS */}
        <section
          data-screen-label="Founders"
          aria-label="Founders"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 clamp(20px,4vw,48px)",
            display: "flex",
            flexDirection: "column",
            gap: "clamp(20px,3vw,32px)",
          }}
        >
          {founders.map((f, i) => (
            <article
              key={f.hid}
              aria-labelledby={f.hid}
              style={{
                background: "#FBFCFE",
                border: "1px solid rgba(11,21,38,0.08)",
                borderRadius: "clamp(24px,3vw,32px)",
                overflow: "hidden",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,380px),1fr))",
                boxShadow: "0 1px 2px rgba(11,21,38,0.03)",
              }}
            >
              <div
                style={{
                  position: "relative",
                  minHeight: "clamp(380px,40vw,520px)",
                  background:
                    "repeating-linear-gradient(135deg,#ECEEF3 0 12px,#E6E9EF 12px 24px)",
                  order: f.photoOrder,
                }}
              >
                <Photo
                  name={f.photo}
                  sizes="(max-width: 860px) 100vw, 50vw"
                  priority={i === 0}
                />
                <span
                  style={{
                    position: "absolute",
                    top: 20,
                    left: 20,
                    fontFamily: "'JetBrains Mono',monospace",
                    fontSize: 12,
                    color: "#0B1526",
                    background: "rgba(251,252,254,0.92)",
                    padding: "6px 10px",
                    borderRadius: 999,
                    pointerEvents: "none",
                  }}
                >
                  {f.n} / 03
                </span>
              </div>
              <div
                style={{
                  padding: "clamp(32px,5vw,64px)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#1B2A4A",
                  }}
                >
                  {f.role}
                </div>
                <h2
                  id={f.hid}
                  style={{
                    margin: "16px 0 0",
                    fontWeight: 500,
                    fontSize: "clamp(34px,4vw,52px)",
                    lineHeight: 1,
                    letterSpacing: "-0.04em",
                  }}
                >
                  {f.name}
                </h2>
                <div style={{ marginTop: 12, fontSize: 15, color: "#5B6472" }}>
                  {f.creds}
                </div>
                <p
                  style={{
                    margin: "28px 0 0",
                    fontFamily: "'Newsreader',serif",
                    fontStyle: "italic",
                    fontSize: "clamp(21px,2vw,25px)",
                    lineHeight: 1.35,
                    color: "#1B2A4A",
                    textWrap: "pretty",
                  }}
                >
                  “{f.quote}”
                </p>
                <p
                  style={{
                    margin: "24px 0 0",
                    fontSize: 16,
                    lineHeight: 1.65,
                    color: "#5B6472",
                    maxWidth: 520,
                    textWrap: "pretty",
                  }}
                >
                  {f.bio}
                </p>
                <div
                  style={{
                    marginTop: 28,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                  }}
                >
                  {f.focus.map((c) => (
                    <span
                      key={c}
                      style={{
                        fontSize: 13,
                        fontWeight: 500,
                        background: "#E7EAF2",
                        color: "#1B2A4A",
                        padding: "7px 12px",
                        borderRadius: 999,
                      }}
                    >
                      {c}
                    </span>
                  ))}
                </div>
                <div
                  style={{
                    marginTop: 32,
                    paddingTop: 24,
                    borderTop: "1px solid rgba(11,21,38,0.08)",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 12,
                  }}
                >
                  <Hover
                    href={f.mail}
                    style={pillLink}
                    hoverStyle={{ background: "#F5F6F8", color: "#0B1526" }}
                  >
                    <Icon name="icon-mail" />
                    Email
                  </Hover>
                  <Hover
                    href="#"
                    style={pillLink}
                    hoverStyle={{ background: "#F5F6F8", color: "#0B1526" }}
                  >
                    <Icon name="icon-linkedin" />
                    LinkedIn
                  </Hover>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* TEAM CTA */}
        <section
          data-screen-label="Team CTA"
          aria-labelledby="tcta-h"
          style={{
            padding:
              "clamp(80px,10vw,136px) clamp(12px,2vw,24px) clamp(12px,2vw,24px)",
          }}
        >
          <div
            style={{
              maxWidth: 1376,
              margin: "0 auto",
              background: "#1B2A4A",
              color: "#F5F6F8",
              borderRadius: "clamp(24px,3vw,36px)",
              padding: "clamp(56px,8vw,104px) clamp(24px,5vw,72px)",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,420px),1fr))",
              gap: 40,
              alignItems: "end",
            }}
          >
            <h2
              id="tcta-h"
              style={{
                margin: 0,
                fontWeight: 500,
                fontSize: "clamp(36px,4.8vw,64px)",
                lineHeight: 1.02,
                letterSpacing: "-0.04em",
                textWrap: "balance",
              }}
            >
              {"Talk to a founder, "}
              <span style={{ ...serif, color: "#E8B74B" }}>not a call centre.</span>
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
                  color: "#C3CBDA",
                  maxWidth: 420,
                }}
              >
                Your first consultation is with one of the three of us. We&apos;ll look
                at where your finances are today and what would help most.
              </p>
              <Hover
                href="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "#E8B74B",
                  color: "#0B1526",
                  padding: "18px 28px",
                  borderRadius: 999,
                  fontSize: 16,
                  fontWeight: 600,
                }}
                hoverStyle={{ background: "#F0C96E", color: "#0B1526" }}
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
