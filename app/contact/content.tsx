"use client";

import { useState, type CSSProperties, type FormEvent } from "react";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { Hover, Icon, Photo, useFocusStyle } from "../lib/ui";

const SERVICES = [
  ["Bookkeeping", "icon-book-open"],
  ["Tax Services", "icon-receipt"],
  ["Payroll", "icon-wallet"],
  ["Financial Reporting", "icon-file-text"],
  ["CFO Advisory", "icon-briefcase"],
  ["AP & AR", "icon-arrow-left-right"],
  ["Financial Planning", "icon-target"],
  ["Business Advisory", "icon-compass"],
] as const;

const INDUSTRY_OPTIONS = [
  "Select an industry",
  "Restaurants & Hospitality",
  "Healthcare",
  "Professional Services",
  "E-commerce",
  "Real Estate",
  "Technology & Startups",
  "Other",
];

const REVENUE_OPTIONS = [
  "Prefer not to say",
  "Under $500k",
  "$500k – $2M",
  "$2M – $10M",
  "$10M+",
];

const NEXT_STEPS = [
  ["01", "We reply within a day", " with a few times that suit you."],
  [
    "02",
    "30-minute consultation",
    " with a founder to understand your business.",
  ],
  ["03", "A clear proposal", " with scope and fixed monthly pricing."],
] as const;

const labelStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
  fontSize: 14,
  fontWeight: 500,
};

const inputBase: CSSProperties = {
  height: 52,
  padding: "0 16px",
  borderRadius: 14,
  border: "1px solid rgba(13,23,38,0.16)",
  background: "#F7F5F1",
  fontSize: 16,
  color: "#0D1726",
};

const inputFocus: CSSProperties = {
  borderColor: "#17304A",
  background: "#FFFFFF",
  outline: "none",
};

const selectStyle: CSSProperties = {
  height: 52,
  padding: "0 14px",
  borderRadius: 14,
  border: "1px solid rgba(13,23,38,0.16)",
  background: "#F7F5F1",
  fontSize: 16,
  color: "#0D1726",
};

/** A text input carrying the template's `style-focus` behaviour. */
function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  const focus = useFocusStyle(inputBase, inputFocus);
  return (
    <label style={labelStyle}>
      {label}
      <input {...props} {...focus} />
    </label>
  );
}

export default function Content() {
  const [picked, setPicked] = useState<string[]>([]);
  const [sent, setSent] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");

  const message = useFocusStyle(
    {
      padding: "14px 16px",
      borderRadius: 14,
      border: "1px solid rgba(13,23,38,0.16)",
      background: "#F7F5F1",
      fontSize: 16,
      lineHeight: 1.5,
      color: "#0D1726",
      resize: "vertical",
    },
    inputFocus,
  );

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    setSent(true);
    setFirstName(String(d.get("name") || "").trim().split(" ")[0]);
    setEmail(String(d.get("email") || ""));
  };

  const reset = () => {
    setSent(false);
    setPicked([]);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F7F5F1", overflowX: "clip" }}>
      <SiteHeader
        current="Contact"
        ctaHref="#form"
        contactHref="#form"
        mobileCta={false}
      />

      <main>
        {/* CONTACT HERO */}
        <section
          data-screen-label="Contact Hero"
          aria-labelledby="c-h"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding:
              "clamp(56px,9vw,112px) clamp(20px,4vw,48px) clamp(40px,5vw,64px)",
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#17304A",
              marginBottom: 24,
            }}
          >
            Contact
          </div>
          <h1
            id="c-h"
            style={{
              margin: 0,
              fontWeight: 500,
              fontSize: "clamp(44px,6.4vw,84px)",
              lineHeight: 0.98,
              letterSpacing: "-0.045em",
              maxWidth: 900,
              textWrap: "balance",
            }}
          >
            {"Let's talk about "}
            <span
              style={{
                fontFamily: "'Newsreader',serif",
                fontStyle: "italic",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                color: "#17304A",
              }}
            >
              your finances.
            </span>
          </h1>
          <p
            style={{
              margin: "28px 0 0",
              fontSize: "clamp(17px,1.5vw,20px)",
              lineHeight: 1.55,
              color: "#676E78",
              maxWidth: 560,
              textWrap: "pretty",
            }}
          >
            Tell us a little about your business. A founder will reply within one
            business day to schedule a free 30-minute consultation.
          </p>
        </section>

        {/* CONTACT FORM */}
        <section
          id="form"
          data-screen-label="Contact Form"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 clamp(20px,4vw,48px)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,420px),1fr))",
            gap: 24,
            alignItems: "start",
            scrollMarginTop: 88,
          }}
        >
          <div
            style={{
              background: "#FFFFFF",
              border: "1px solid rgba(13,23,38,0.08)",
              borderRadius: "clamp(24px,3vw,32px)",
              padding: "clamp(28px,4vw,48px)",
              boxShadow: "0 24px 60px -36px rgba(13,23,38,0.25)",
            }}
          >
            {!sent ? (
              <form
                onSubmit={submit}
                aria-labelledby="form-h"
                style={{ display: "flex", flexDirection: "column", gap: 22 }}
                // Form-filler / password-manager extensions (e.g. a "dv"-prefixed
                // one) stamp attributes like data-dv-attached onto <form> before
                // React hydrates. That's a real DOM difference, so React warns —
                // but it's inert, extension-added markup, not app state, so we
                // tell React not to flag it rather than silence hydration errors
                // generally.
                suppressHydrationWarning
              >
                <h2
                  id="form-h"
                  style={{
                    margin: 0,
                    fontSize: 26,
                    fontWeight: 500,
                    letterSpacing: "-0.03em",
                  }}
                >
                  Book a consultation
                </h2>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit,minmax(min(100%,220px),1fr))",
                    gap: 18,
                  }}
                >
                  <Field label="Full name *" name="name" required autoComplete="name" />
                  <Field
                    label="Work email *"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                  />
                  <Field
                    label="Company"
                    name="company"
                    autoComplete="organization"
                  />
                  <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
                  <label style={labelStyle}>
                    Industry
                    <select name="industry" style={selectStyle}>
                      {INDUSTRY_OPTIONS.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </label>
                  <label style={labelStyle}>
                    Annual revenue
                    <select name="revenue" style={selectStyle}>
                      {REVENUE_OPTIONS.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </label>
                </div>

                <fieldset
                  style={{
                    border: 0,
                    margin: 0,
                    padding: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                  }}
                >
                  <legend
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      padding: 0,
                      marginBottom: 12,
                    }}
                  >
                    What can we help with?
                  </legend>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {SERVICES.map(([name, icon]) => {
                      const on = picked.includes(name);
                      return (
                        <button
                          key={name}
                          type="button"
                          aria-pressed={on}
                          onClick={() =>
                            setPicked((p) =>
                              on ? p.filter((x) => x !== name) : [...p, name],
                            )
                          }
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                            minHeight: 44,
                            padding: "0 16px",
                            borderRadius: 999,
                            border: `1px solid ${on ? "#17304A" : "rgba(13,23,38,0.14)"}`,
                            background: on ? "#17304A" : "#F7F5F1",
                            color: on ? "#F7F5F1" : "#0D1726",
                            fontSize: 14,
                            fontWeight: 500,
                            cursor: "pointer",
                            transition: "background 160ms",
                          }}
                        >
                          <Icon name={icon} />
                          {name}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <label style={labelStyle}>
                  Tell us about your business
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Where are your finances today, and what would you like to change?"
                    {...message}
                  />
                </label>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
                    marginTop: 4,
                  }}
                >
                  <span
                    style={{ fontSize: 13, color: "#676E78", maxWidth: 320 }}
                  >
                    {"We only use your details to respond to this enquiry. See our "}
                    <a href="#" style={{ textDecoration: "underline" }}>
                      Privacy Policy
                    </a>
                    .
                  </span>
                  <Hover
                    as="button"
                    type="submit"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 10,
                      background: "#17304A",
                      color: "#F7F5F1",
                      border: 0,
                      padding: "17px 28px",
                      borderRadius: 999,
                      fontSize: 16,
                      fontWeight: 500,
                      cursor: "pointer",
                      transition: "background 200ms",
                    }}
                    hoverStyle={{ background: "#0D1726" }}
                  >
                    Send request <Icon name="icon-arrow-right" />
                  </Hover>
                </div>
              </form>
            ) : (
              <div
                role="status"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 20,
                  padding: "24px 0",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: "#E4EDE7",
                    color: "#17304A",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <i className="icon-check" style={{ fontSize: 26 }} />
                </span>
                <h2
                  style={{
                    margin: 0,
                    fontSize: "clamp(28px,3vw,36px)",
                    fontWeight: 500,
                    letterSpacing: "-0.03em",
                  }}
                >
                  Thanks, {firstName}. We&apos;ve got your request.
                </h2>
                <p
                  style={{
                    margin: 0,
                    fontSize: 17,
                    lineHeight: 1.6,
                    color: "#676E78",
                    maxWidth: 460,
                  }}
                >
                  A founder will reply to {email} within one business day with times
                  for your consultation.
                </p>
                <button
                  type="button"
                  onClick={reset}
                  style={{
                    marginTop: 8,
                    minHeight: 44,
                    padding: "0 18px",
                    borderRadius: 999,
                    border: "1px solid rgba(13,23,38,0.16)",
                    background: "transparent",
                    fontSize: 14,
                    fontWeight: 500,
                    color: "#0D1726",
                    cursor: "pointer",
                  }}
                >
                  Send another request
                </button>
              </div>
            )}
          </div>

          <aside
            aria-label="Contact details"
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
          >
            <div
              style={{
                background: "#17304A",
                color: "#F7F5F1",
                borderRadius: "clamp(24px,3vw,32px)",
                padding: "clamp(28px,4vw,40px)",
                display: "flex",
                flexDirection: "column",
                gap: 24,
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: 22,
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                }}
              >
                Reach us directly
              </h2>
              <Hover
                href="mailto:hello@fiscalfork.com"
                style={{
                  display: "flex",
                  gap: 14,
                  alignItems: "flex-start",
                  color: "#F7F5F1",
                }}
                hoverStyle={{ color: "#C9A35C" }}
              >
                <Icon
                  name="icon-mail"
                  style={{ fontSize: 20, color: "#C9A35C", marginTop: 2 }}
                />
                <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <span style={{ fontSize: 13, color: "#C8CFD9" }}>Email</span>
                  <span style={{ fontSize: 17 }}>hello@fiscalfork.com</span>
                </span>
              </Hover>
              <Hover
                href="tel:+10000000000"
                style={{
                  display: "flex",
                  gap: 14,
                  alignItems: "flex-start",
                  color: "#F7F5F1",
                }}
                hoverStyle={{ color: "#C9A35C" }}
              >
                <Icon
                  name="icon-phone"
                  style={{ fontSize: 20, color: "#C9A35C", marginTop: 2 }}
                />
                <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <span style={{ fontSize: 13, color: "#C8CFD9" }}>Phone</span>
                  <span style={{ fontSize: 17 }}>+1 (000) 000-0000</span>
                </span>
              </Hover>
              <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <Icon
                  name="icon-map-pin"
                  style={{ fontSize: 20, color: "#C9A35C", marginTop: 2 }}
                />
                <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <span style={{ fontSize: 13, color: "#C8CFD9" }}>Office</span>
                  <span style={{ fontSize: 17, lineHeight: 1.45 }}>
                    Street address
                    <br />
                    City, Country
                  </span>
                </span>
              </div>
              <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <Icon
                  name="icon-clock"
                  style={{ fontSize: 20, color: "#C9A35C", marginTop: 2 }}
                />
                <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <span style={{ fontSize: 13, color: "#C8CFD9" }}>Hours</span>
                  <span style={{ fontSize: 17 }}>Mon – Fri, 9:00 – 18:00</span>
                </span>
              </div>
            </div>

            <div
              style={{
                background: "#FFFFFF",
                border: "1px solid rgba(13,23,38,0.08)",
                borderRadius: "clamp(24px,3vw,32px)",
                padding: "clamp(28px,4vw,40px)",
              }}
            >
              <h2
                style={{
                  margin: "0 0 20px",
                  fontSize: 22,
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                }}
              >
                What happens next
              </h2>
              <ol
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 18,
                }}
              >
                {NEXT_STEPS.map(([n, strong, rest]) => (
                  <li key={n} style={{ display: "flex", gap: 16 }}>
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono',monospace",
                        fontSize: 13,
                        color: "#17304A",
                        paddingTop: 3,
                      }}
                    >
                      {n}
                    </span>
                    <span
                      style={{ fontSize: 16, lineHeight: 1.5, color: "#676E78" }}
                    >
                      <strong style={{ color: "#0D1726", fontWeight: 600 }}>
                        {strong}
                      </strong>
                      {rest}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </section>

        {/* MAP */}
        <section
          data-screen-label="Map"
          aria-label="Office location"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "24px clamp(20px,4vw,48px) 0",
          }}
        >
          <div
            style={{
              position: "relative",
              height: "clamp(260px,32vw,400px)",
              borderRadius: "clamp(24px,3vw,32px)",
              overflow: "hidden",
              background:
                "repeating-linear-gradient(135deg,#EFEBE4 0 12px,#E8E4DC 12px 24px)",
            }}
          >
            <Photo
              name="office-map"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
