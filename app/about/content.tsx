"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { Hover, Icon, ImageSlot, useViewportWidth } from "../lib/ui";

/* ── Page options, exposed as editable props on the original page ────────── */
const layout: "Alternating" | "Stacked" = "Alternating";

/* Real people. Names and titles are exactly as supplied; `bio` and `creds`
   describe the scope of each role rather than anyone's history, and `quote` is
   left bracketed — putting invented words or invented credentials against a
   named person is not ours to do. Replace the bracketed fields with their own
   words before this goes live. `photo` is optional — founders without a
   supplied photo fall back to the empty-state image slot. */
type Founder = {
  name: string;
  role: string;
  creds: string;
  quote: string;
  bio: string;
  focus: string[];
  photo?: string;
  /** The photo's own width/height ratio, e.g. "2 / 3" — sizes the frame to
   *  match so `object-fit: contain` shows the full photo with no letterboxing. */
  photoAspect?: string;
  linkedin?: string;
};

const FOUNDERS: Founder[] = [
  {
    name: "Shubham Brahmbhatt",
    role: "Founder & CEO",
    creds: " ",
    quote: "[Quote to be supplied]",
    bio: "Leads the firm and its client relationships, and sets how engagements are scoped, staffed and delivered across the firm's international practice.",
    focus: ["Client strategy", "Firm direction", "Hospitality"],
    photo: "/shubham-brahmbhatt.jpg",
    photoAspect: "1000 / 1205",
    linkedin:
      "https://in.linkedin.com/in/shubham-brahmbhatt-728a63303?utm_source=share&utm_medium=member_mweb&utm_campaign=share_via&utm_content=profile",
  },
  {
    name: "CA Shreyansh Shah",
    role: "Co-Founder & COM",
    creds: " ",
    quote: "[Quote to be supplied]",
    bio: "Runs delivery across the team — the close calendar, reporting cadence and the review process that each client's books pass through every month.",
    focus: ["Operations", "Monthly close", "Reporting cadence"],
    photo: "/shreyansh-shah.jpg",
    photoAspect: "2 / 3",
    linkedin: "https://in.linkedin.com/in/ca-shreyansh-shah-39695210a",
  },
  {
    name: "CA Rushabh Shah",
    role: "Co-Founder & CFM",
    creds: " ",
    quote: "[Quote to be supplied]",
    bio: "Oversees the financial side of client work: management reporting, cash flow, job and location level costing, and the CFO advisory engagements.",
    focus: ["Management reporting", "Cash flow", "CFO advisory"],
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
  border: "1px solid rgba(11,15,20,0.16)",
  fontSize: 14,
  fontWeight: 500,
  color: "#0B0F14",
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
    mail: "mailto:hello@fiscalfork.com",
    photoOrder: alternate && i % 2 === 1 && isDesktop ? 2 : 0,
  }));

  return (
    <div style={{ minHeight: "100vh", background: "#F6F3EE", overflowX: "clip" }}>
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
                color: "#16202B",
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
              <span style={{ ...serif, color: "#16202B" }}>your numbers.</span>
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
          {founders.map((f) => (
            <article
              key={f.hid}
              aria-labelledby={f.hid}
              style={{
                background: "#FFFFFF",
                border: "1px solid rgba(11,15,20,0.08)",
                borderRadius: "clamp(24px,3vw,32px)",
                overflow: "hidden",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,380px),1fr))",
                boxShadow: "0 1px 2px rgba(11,15,20,0.03)",
              }}
            >
              <div
                style={{
                  position: "relative",
                  // A real photo sizes the frame to its own aspect ratio, so
                  // it fills the frame exactly with no letterboxing; the
                  // empty-state placeholder keeps the old fixed-height box.
                  ...(f.photo
                    ? { aspectRatio: f.photoAspect ?? "4 / 5" }
                    : { minHeight: "clamp(380px,40vw,520px)" }),
                  background:
                    "repeating-linear-gradient(135deg,#EDE8DF 0 12px,#E6E0D6 12px 24px)",
                  order: f.photoOrder,
                }}
              >
                {f.photo ? (
                  <Image
                    src={f.photo}
                    alt={`Portrait of ${f.name}`}
                    fill
                    sizes="(max-width: 760px) 100vw, 50vw"
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <ImageSlot shape="rect" placeholder={`Headshot — ${f.name}`} />
                )}
                <span
                  style={{
                    position: "absolute",
                    top: 20,
                    left: 20,
                    fontFamily: "'JetBrains Mono',monospace",
                    fontSize: 12,
                    color: "#0B0F14",
                    background: "rgba(255,255,255,0.92)",
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
                    color: "#16202B",
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
                <div style={{ marginTop: 12, fontSize: 15, color: "#656A73" }}>
                  {f.creds}
                </div>
                {/* <p
                  style={{
                    margin: "28px 0 0",
                    fontFamily: "'Newsreader',serif",
                    fontStyle: "italic",
                    fontSize: "clamp(21px,2vw,25px)",
                    lineHeight: 1.35,
                    color: "#16202B",
                    textWrap: "pretty",
                  }}
                >
                  “{f.quote}”
                </p> */}
                <p
                  style={{
                    margin: "24px 0 0",
                    fontSize: 16,
                    lineHeight: 1.65,
                    color: "#656A73",
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
                        background: "#EBE6DD",
                        color: "#16202B",
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
                    borderTop: "1px solid rgba(11,15,20,0.08)",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 12,
                  }}
                >
                  <Hover
                    href={f.mail}
                    style={pillLink}
                    hoverStyle={{ background: "#F6F3EE", color: "#0B0F14" }}
                  >
                    <Icon name="icon-mail" />
                    Email
                  </Hover>
                  <Hover
                    href={f.linkedin ?? "#"}
                    target={f.linkedin ? "_blank" : undefined}
                    rel={f.linkedin ? "noopener noreferrer" : undefined}
                    style={pillLink}
                    hoverStyle={{ background: "#F6F3EE", color: "#0B0F14" }}
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
              <span style={{ ...serif, color: "#B98A4B" }}>not a call centre.</span>
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
                Your first consultation is with one of the three of us. We&apos;ll look
                at where your finances are today and what would help most.
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
