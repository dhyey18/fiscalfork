"use client";

import { useState, type CSSProperties, type FormEvent } from "react";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { Hover, Icon, Photo } from "../lib/ui";

// One photo per article, in the order the articles are declared below.
const ARTICLE_PHOTOS = [
  "article-1",
  "article-2",
  "article-3",
  "article-4",
  "article-5",
  "article-6",
] as const;

const ALL_ARTICLES = (
  [
    [
      "Tax",
      "6 min read",
      "Quarterly estimated taxes: a simple calendar for owners",
      "When to pay, how much to set aside, and how to avoid underpayment penalties.",
    ],
    [
      "Bookkeeping",
      "5 min read",
      "The monthly close checklist we use for every client",
      "Twelve steps that turn a pile of transactions into numbers you can trust.",
    ],
    [
      "Cash flow",
      "7 min read",
      "Why profitable businesses still run out of cash",
      "The four most common causes, and what to change in each case.",
    ],
    [
      "Startups",
      "8 min read",
      "Burn, runway and the metrics investors ask about first",
      "How to calculate them correctly and present them in a board update.",
    ],
    [
      "Bookkeeping",
      "4 min read",
      "Catching up on months of late books: where to start",
      "A realistic order of operations for getting current without losing a quarter.",
    ],
    [
      "Tax",
      "6 min read",
      "Choosing a business entity: what changes for your taxes",
      "A plain comparison of the common structures and when switching makes sense.",
    ],
  ] as const
).map(([cat, time, title, desc], i) => ({
  cat,
  time,
  title,
  desc,
  slot: "article-" + (i + 1),
  photo: ARTICLE_PHOTOS[i],
}));

const CATS = ["All", "Bookkeeping", "Tax", "Cash flow", "Startups"];

const FAQS = [
  [
    "How much do your services cost?",
    "We charge a fixed monthly fee based on the scope of work and the volume of transactions. You’ll get a clear proposal after your consultation, with no hourly billing.",
  ],
  [
    "Do I need to switch accounting software?",
    "Usually not. We work with the major cloud accounting platforms. If your current setup is holding you back, we’ll recommend a change and handle the migration.",
  ],
  [
    "How long does onboarding take?",
    "Most businesses are fully onboarded within two to four weeks, depending on the state of the existing books and how many accounts need connecting.",
  ],
  [
    "Can you catch up books that are months behind?",
    "Yes. Clean-up and catch-up work is quoted separately and completed before your regular monthly service begins.",
  ],
  [
    "Who will I work with day to day?",
    "A dedicated accountant who knows your business, supported by the founding team for tax and advisory work.",
  ],
] as const;

const serif: CSSProperties = {
  fontFamily: "'Newsreader',serif",
  fontStyle: "italic",
  fontWeight: 400,
};

const eyebrow: CSSProperties = {
  fontSize: 13,
  fontWeight: 600,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "#1B2A4A",
};

export default function Content() {
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState(0);
  const [subscribed, setSubscribed] = useState(false);

  const articles = ALL_ARTICLES.filter((a) => cat === "All" || a.cat === cat);

  const subscribe = (e: FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F5F6F8", overflowX: "clip" }}>
      <SiteHeader current="Resources" />

      <main>
        {/* RESOURCES HERO */}
        <section
          data-screen-label="Resources Hero"
          aria-labelledby="r-h"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding:
              "clamp(56px,9vw,112px) clamp(20px,4vw,48px) clamp(40px,5vw,56px)",
          }}
        >
          <div style={{ ...eyebrow, marginBottom: 24 }}>Resources</div>
          <h1
            id="r-h"
            style={{
              margin: 0,
              fontWeight: 500,
              fontSize: "clamp(44px,6.4vw,84px)",
              lineHeight: 0.98,
              letterSpacing: "-0.045em",
              maxWidth: 920,
              textWrap: "balance",
            }}
          >
            {/* One text node, as in the original: a JSX `{" "}` would split the
                run and shift the following span by a subpixel. */}
            {"Practical finance guides for "}
            <span style={{ ...serif, letterSpacing: "-0.02em", color: "#1B2A4A" }}>
              business owners.
            </span>
          </h1>
          <p
            style={{
              margin: "28px 0 0",
              fontSize: "clamp(17px,1.5vw,20px)",
              lineHeight: 1.55,
              color: "#5B6472",
              maxWidth: 560,
            }}
          >
            Short, plain-language articles and checklists from our team on bookkeeping,
            tax, cash flow and growth.
          </p>
        </section>

        {/* FEATURED */}
        <section
          data-screen-label="Featured"
          aria-label="Featured guide"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 clamp(20px,4vw,48px)",
          }}
        >
          <Hover
            href="#"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,420px),1fr))",
              background: "#1B2A4A",
              color: "#F5F6F8",
              borderRadius: "clamp(24px,3vw,32px)",
              overflow: "hidden",
            }}
            hoverStyle={{ color: "#F5F6F8" }}
          >
            <div
              style={{
                position: "relative",
                minHeight: "clamp(260px,30vw,400px)",
                background:
                  "repeating-linear-gradient(135deg,#16233D 0 12px,#182742 12px 24px)",
              }}
            >
              <Photo
                name="resource-featured"
                sizes="(max-width: 900px) 100vw, 50vw"
                priority
              />
            </div>
            <div
              style={{
                padding: "clamp(32px,5vw,56px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                gap: 18,
              }}
            >
              <span style={{ ...eyebrow, color: "#E8B74B" }}>
                Featured guide · Cash flow
              </span>
              <h2
                style={{
                  margin: 0,
                  fontWeight: 500,
                  fontSize: "clamp(30px,3.4vw,44px)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.035em",
                  textWrap: "balance",
                }}
              >
                How to build a 13-week cash forecast in an afternoon
              </h2>
              <p
                style={{
                  margin: 0,
                  fontSize: 17,
                  lineHeight: 1.6,
                  color: "#C3CBDA",
                  maxWidth: 460,
                }}
              >
                A step-by-step method to see cash shortfalls weeks before they happen,
                with a free template.
              </p>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 15,
                  fontWeight: 500,
                  color: "#E8B74B",
                  marginTop: 8,
                }}
              >
                Read the guide <Icon name="icon-arrow-right" />
              </span>
            </div>
          </Hover>
        </section>

        {/* ARTICLES */}
        <section
          data-screen-label="Articles"
          aria-labelledby="art-h"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "clamp(64px,8vw,104px) clamp(20px,4vw,48px) 0",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 20,
              marginBottom: 32,
            }}
          >
            <h2
              id="art-h"
              style={{
                margin: 0,
                fontWeight: 500,
                fontSize: "clamp(28px,3vw,38px)",
                letterSpacing: "-0.03em",
              }}
            >
              Latest articles
            </h2>
            <div
              role="group"
              aria-label="Filter by topic"
              style={{ display: "flex", flexWrap: "wrap", gap: 8 }}
            >
              {CATS.map((name) => {
                const on = cat === name;
                return (
                  <button
                    key={name}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setCat(name)}
                    style={{
                      minHeight: 44,
                      padding: "0 16px",
                      borderRadius: 999,
                      border: `1px solid ${on ? "#1B2A4A" : "rgba(11,21,38,0.14)"}`,
                      background: on ? "#1B2A4A" : "#FBFCFE",
                      color: on ? "#F5F6F8" : "#0B1526",
                      fontSize: 14,
                      fontWeight: 500,
                      cursor: "pointer",
                    }}
                  >
                    {name}
                  </button>
                );
              })}
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,340px),1fr))",
              gap: 20,
            }}
          >
            {articles.map((a) => (
              <Hover
                key={a.slot}
                href="#"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  background: "#FBFCFE",
                  border: "1px solid rgba(11,21,38,0.08)",
                  borderRadius: 22,
                  overflow: "hidden",
                  color: "#0B1526",
                  transition: "box-shadow 260ms,transform 260ms",
                }}
                hoverStyle={{
                  boxShadow: "0 18px 40px -18px rgba(11,21,38,0.22)",
                  transform: "translateY(-2px)",
                  color: "#0B1526",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    aspectRatio: "16/10",
                    background:
                      "repeating-linear-gradient(135deg,#ECEEF3 0 12px,#E6E9EF 12px 24px)",
                  }}
                >
                  <Photo
                    name={a.photo}
                    sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  />
                </div>
                <div
                  style={{
                    padding: 24,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    flex: 1,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 12,
                      fontSize: 13,
                      color: "#5B6472",
                    }}
                  >
                    <span style={{ fontWeight: 600, color: "#1B2A4A" }}>{a.cat}</span>
                    <span>{a.time}</span>
                  </div>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: 20,
                      fontWeight: 600,
                      letterSpacing: "-0.02em",
                      lineHeight: 1.25,
                      textWrap: "balance",
                    }}
                  >
                    {a.title}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 15,
                      lineHeight: 1.55,
                      color: "#5B6472",
                      flex: 1,
                    }}
                  >
                    {a.desc}
                  </p>
                  <span
                    style={{
                      marginTop: 10,
                      fontSize: 15,
                      fontWeight: 500,
                      color: "#1B2A4A",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    Read article <Icon name="icon-arrow-right" />
                  </span>
                </div>
              </Hover>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section
          data-screen-label="FAQ"
          aria-labelledby="faq-h"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "clamp(80px,10vw,128px) clamp(20px,4vw,48px) 0",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,380px),1fr))",
            gap: "32px 64px",
            alignItems: "start",
          }}
        >
          <div>
            <div style={{ ...eyebrow, marginBottom: 20 }}>FAQ</div>
            <h2
              id="faq-h"
              style={{
                margin: 0,
                fontWeight: 500,
                fontSize: "clamp(34px,4.4vw,52px)",
                lineHeight: 1.04,
                letterSpacing: "-0.04em",
              }}
            >
              Common <span style={serif}>questions</span>
            </h2>
            <p
              style={{
                margin: "20px 0 0",
                fontSize: 17,
                lineHeight: 1.6,
                color: "#5B6472",
                maxWidth: 360,
              }}
            >
              {"Can't find your answer? "}
              <a href="/contact" style={{ textDecoration: "underline" }}>
                Send us a message
              </a>
              .
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {FAQS.map(([q, a], i) => {
              const isOpen = open === i;
              return (
                <div key={q} style={{ borderTop: "1px solid rgba(11,21,38,0.12)" }}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 20,
                      padding: "22px 0",
                      background: "transparent",
                      border: 0,
                      textAlign: "left",
                      fontSize: 18,
                      fontWeight: 500,
                      letterSpacing: "-0.01em",
                      color: "#0B1526",
                      cursor: "pointer",
                      minHeight: 44,
                    }}
                  >
                    {q}
                    <Icon
                      name={isOpen ? "icon-minus" : "icon-plus"}
                      style={{ fontSize: 20, color: "#1B2A4A", flex: "none" }}
                    />
                  </button>
                  {isOpen ? (
                    <p
                      style={{
                        margin: "0 0 24px",
                        fontSize: 16,
                        lineHeight: 1.65,
                        color: "#5B6472",
                        maxWidth: 620,
                      }}
                    >
                      {a}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </section>

        {/* NEWSLETTER */}
        <section
          data-screen-label="Newsletter"
          aria-labelledby="nl-h"
          style={{ padding: "clamp(80px,10vw,128px) clamp(12px,2vw,24px) 0" }}
        >
          <div
            style={{
              maxWidth: 1376,
              margin: "0 auto",
              background: "#0B1526",
              color: "#F5F6F8",
              borderRadius: "clamp(24px,3vw,36px)",
              padding: "clamp(48px,7vw,88px) clamp(24px,5vw,72px)",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,420px),1fr))",
              gap: "32px 48px",
              alignItems: "center",
            }}
          >
            <div>
              <h2
                id="nl-h"
                style={{
                  margin: 0,
                  fontWeight: 500,
                  fontSize: "clamp(30px,3.6vw,46px)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.035em",
                }}
              >
                {"One useful finance note, "}
                <span style={{ ...serif, color: "#E8B74B" }}>once a month.</span>
              </h2>
              <p
                style={{
                  margin: "16px 0 0",
                  fontSize: 17,
                  lineHeight: 1.55,
                  color: "#C3CBDA",
                }}
              >
                Tax deadlines, cash flow tips and new guides. No spam.
              </p>
            </div>
            {!subscribed ? (
              <form
                onSubmit={subscribe}
                style={{ display: "flex", flexWrap: "wrap", gap: 10 }}
                // See the longer note on the contact form: a password-manager /
                // form-filler extension can stamp an attribute onto any <form>
                // before hydration, which is real but inert markup.
                suppressHydrationWarning
              >
                <label
                  htmlFor="nl-email"
                  style={{
                    position: "absolute",
                    width: 1,
                    height: 1,
                    overflow: "hidden",
                    clip: "rect(0 0 0 0)",
                  }}
                >
                  Email address
                </label>
                <input
                  id="nl-email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  style={{
                    flex: "1 1 240px",
                    height: 56,
                    padding: "0 20px",
                    borderRadius: 999,
                    border: "1px solid rgba(245,246,248,0.2)",
                    background: "rgba(245,246,248,0.06)",
                    color: "#F5F6F8",
                    fontSize: 16,
                  }}
                />
                <Hover
                  as="button"
                  type="submit"
                  style={{
                    height: 56,
                    padding: "0 26px",
                    borderRadius: 999,
                    border: 0,
                    background: "#E8B74B",
                    color: "#0B1526",
                    fontSize: 16,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                  hoverStyle={{ background: "#F0C96E" }}
                >
                  Subscribe
                </Hover>
              </form>
            ) : (
              <div
                role="status"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  fontSize: 17,
                }}
              >
                <Icon
                  name="icon-circle-check"
                  style={{ color: "#E8B74B", fontSize: 22 }}
                />
                You&apos;re subscribed. The next note arrives early next month.
              </div>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
