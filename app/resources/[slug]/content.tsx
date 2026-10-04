"use client";

import type { CSSProperties } from "react";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import { Hover, Icon, Photo } from "../../lib/ui";
import type { Article, Block } from "../articles";

const mono: CSSProperties = {
  fontFamily: "'JetBrains Mono',monospace",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
};

const serif: CSSProperties = {
  fontFamily: "'Newsreader',serif",
  fontStyle: "italic",
  fontWeight: 400,
};

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "h2":
      return (
        <h2
          style={{
            margin: "40px 0 18px",
            fontSize: "clamp(22px,2.4vw,28px)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            lineHeight: 1.25,
          }}
        >
          {block.text}
        </h2>
      );
    case "list":
      return (
        <ul
          style={{
            listStyle: "none",
            margin: "20px 0",
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {block.items.map((it) => (
            <li
              key={it}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                fontSize: 16.5,
                lineHeight: 1.6,
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  flex: "none",
                  width: 6,
                  height: 6,
                  marginTop: 9,
                  borderRadius: "50%",
                  background: "#B98A4B",
                }}
              />
              {it}
            </li>
          ))}
        </ul>
      );
    case "callout":
      return (
        <div
          style={{
            margin: "28px 0",
            padding: "20px 24px",
            borderRadius: 14,
            background: "#F2ECDF",
            borderLeft: "3px solid #B98A4B",
            display: "flex",
            gap: 14,
            alignItems: "flex-start",
          }}
        >
          <Icon
            name="icon-lightbulb"
            style={{ color: "#8A6232", fontSize: 18, marginTop: 2, flex: "none" }}
          />
          <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.6, color: "#16202B" }}>
            {block.text}
          </p>
        </div>
      );
    case "p":
    default:
      return (
        <p
          style={{
            margin: "20px 0",
            fontSize: 17,
            lineHeight: 1.75,
            color: "#30353C",
          }}
        >
          {block.text}
        </p>
      );
  }
}

export default function Content({
  article,
  related,
}: {
  article: Article;
  related: Article[];
}) {
  return (
    <div style={{ minHeight: "100vh", background: "#F6F3EE", overflowX: "clip" }}>
      <SiteHeader current="Resources" />

      <main>
        {/* ARTICLE HERO */}
        <article>
          <header
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              padding:
                "clamp(48px,7vw,88px) clamp(20px,4vw,48px) clamp(32px,4vw,44px)",
            }}
          >
            <nav
              aria-label="Breadcrumb"
              style={{ ...mono, fontSize: 11, color: "#8A919B", marginBottom: 24 }}
            >
              <a href="/" style={{ color: "#8A919B" }}>
                Home
              </a>
              <span aria-hidden="true" style={{ margin: "0 10px", color: "#B98A4B" }}>
                /
              </span>
              <a href="/resources" style={{ color: "#8A919B" }}>
                Resources
              </a>
              <span aria-hidden="true" style={{ margin: "0 10px", color: "#B98A4B" }}>
                /
              </span>
              <span style={{ color: "#656A73" }}>{article.cat}</span>
            </nav>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginBottom: 20,
                fontSize: 13,
              }}
            >
              <span
                style={{
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#8A6232",
                  background: "#F2ECDF",
                  padding: "6px 12px",
                  borderRadius: 999,
                }}
              >
                {article.cat}
              </span>
              <span style={{ color: "#656A73" }}>{article.time}</span>
            </div>

            <h1
              id="article-h"
              style={{
                margin: 0,
                fontWeight: 500,
                fontSize: "clamp(32px,4.4vw,56px)",
                lineHeight: 1.06,
                letterSpacing: "-0.035em",
                maxWidth: 820,
                textWrap: "balance",
              }}
            >
              {article.title}
            </h1>
            <p
              style={{
                margin: "22px 0 0",
                fontSize: "clamp(16px,1.3vw,19px)",
                lineHeight: 1.6,
                color: "#656A73",
                maxWidth: 640,
              }}
            >
              {article.desc}
            </p>
          </header>

          {/* COVER IMAGE */}
          <div
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              padding: "0 clamp(20px,4vw,48px)",
            }}
          >
            <div
              style={{
                position: "relative",
                aspectRatio: "21/9",
                borderRadius: "clamp(18px,2.4vw,26px)",
                overflow: "hidden",
                border: "1px solid rgba(11,15,20,0.08)",
                boxShadow:
                  "0 34px 64px -30px rgba(11,15,20,0.3),0 8px 20px -10px rgba(11,15,20,0.12)",
              }}
            >
              <Photo name={article.photo} sizes="(max-width: 1280px) 100vw, 1280px" priority />
            </div>
          </div>

          {/* PROSE */}
          <div
            style={{
              maxWidth: 720,
              margin: "0 auto",
              padding: "clamp(48px,6vw,72px) clamp(20px,4vw,24px) 0",
            }}
          >
            {article.body.map((b, i) => (
              <BlockView key={i} block={b} />
            ))}
          </div>

          {/* CTA */}
          <div
            style={{
              maxWidth: 720,
              margin: "0 auto",
              padding: "clamp(16px,3vw,24px) clamp(20px,4vw,24px) clamp(56px,7vw,80px)",
            }}
          >
            <div
              style={{
                borderTop: "1px solid rgba(11,15,20,0.12)",
                paddingTop: "clamp(32px,4vw,44px)",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 20,
              }}
            >
              <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: "#656A73" }}>
                Have a question this didn&apos;t answer?{" "}
                <a href="/contact" style={{ textDecoration: "underline", color: "#16202B" }}>
                  Send us a message
                </a>
                .
              </p>
              <Hover
                href="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "#16202B",
                  color: "#F6F3EE",
                  padding: "14px 24px",
                  borderRadius: 999,
                  fontSize: 15,
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  transition: "background 200ms",
                }}
                hoverStyle={{ background: "#0B0F14", color: "#F6F3EE" }}
              >
                Book a Consultation <Icon name="icon-arrow-right" />
              </Hover>
            </div>
          </div>
        </article>

        {/* KEEP READING */}
        {related.length ? (
          <section
            aria-labelledby="more-h"
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              padding: "0 clamp(20px,4vw,48px) clamp(80px,10vw,120px)",
            }}
          >
            <h2
              id="more-h"
              style={{
                margin: "0 0 28px",
                fontSize: "clamp(22px,2.6vw,30px)",
                fontWeight: 500,
                letterSpacing: "-0.03em",
              }}
            >
              Keep <span style={serif}>reading</span>
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,280px),1fr))",
                gap: 20,
              }}
            >
              {related.map((a) => (
                <Hover
                  key={a.slug}
                  href={`/resources/${a.slug}`}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    background: "#FFFFFF",
                    border: "1px solid rgba(11,15,20,0.08)",
                    borderRadius: 18,
                    overflow: "hidden",
                    color: "#0B0F14",
                    transition: "box-shadow 220ms,transform 220ms",
                  }}
                  hoverStyle={{
                    boxShadow: "0 18px 40px -18px rgba(11,15,20,0.22)",
                    transform: "translateY(-2px)",
                    color: "#0B0F14",
                  }}
                >
                  <div style={{ position: "relative", aspectRatio: "16/10" }}>
                    <Photo name={a.photo} sizes="(max-width: 700px) 100vw, 33vw" />
                  </div>
                  <div style={{ padding: 18 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 600, color: "#8A6232" }}>
                      {a.cat}
                    </div>
                    <h3
                      style={{
                        margin: "8px 0 0",
                        fontSize: 16.5,
                        fontWeight: 600,
                        lineHeight: 1.3,
                        letterSpacing: "-0.015em",
                      }}
                    >
                      {a.title}
                    </h3>
                  </div>
                </Hover>
              ))}
            </div>
          </section>
        ) : null}
      </main>

      <SiteFooter />
    </div>
  );
}
