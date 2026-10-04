"use client";

import { Fragment } from "react";

/**
 * The continuously running headline band under the hero.
 *
 * The track holds the items twice and translates by exactly -50%, so the
 * second copy lands where the first began and the loop is seamless with no
 * JavaScript and no measuring. Only the first copy is exposed to assistive
 * technology; the duplicate is `aria-hidden` so the phrases aren't announced
 * twice.
 *
 * Auto-starting motion that runs longer than five seconds has to be stoppable
 * (WCAG 2.2.2), and this has no natural stopping point, so the animation is
 * removed outright under `prefers-reduced-motion` — the band stays, it simply
 * sits still. It also pauses on hover, which helps anyone trying to read a
 * phrase as it goes past.
 */
export default function Marquee({
  items,
  speed = 46,
}: {
  items: string[];
  /** Seconds for one full pass. Longer = slower. */
  speed?: number;
}) {
  const run = (hidden: boolean) => (
    <div className="ff-marquee-run" aria-hidden={hidden || undefined}>
      {items.map((t, i) => (
        <Fragment key={`${t}-${i}`}>
          <span className="ff-marquee-item">{t}</span>
          <span className="ff-marquee-dot" aria-hidden="true" />
        </Fragment>
      ))}
    </div>
  );

  return (
    <div className="ff-marquee" data-screen-label="Running headline">
      <style>{`
        .ff-marquee {
          position:relative; overflow:hidden;
          background:#0B0F14; color:#F6F3EE;
          border-top:1px solid rgba(185,138,75,0.3);
          border-bottom:1px solid rgba(185,138,75,0.3);
          padding:clamp(18px,2.2vw,26px) 0;
        }
        /* Fades the phrases in and out at the edges instead of letting them
           cut off hard against the viewport. */
        .ff-marquee::before, .ff-marquee::after {
          content:""; position:absolute; top:0; bottom:0; width:clamp(48px,10vw,160px);
          z-index:2; pointer-events:none;
        }
        .ff-marquee::before { left:0;  background:linear-gradient(90deg,#0B0F14,rgba(11,15,20,0)); }
        .ff-marquee::after  { right:0; background:linear-gradient(270deg,#0B0F14,rgba(11,15,20,0)); }

        .ff-marquee-track {
          display:flex; width:max-content;
          animation:ffMarquee ${speed}s linear infinite;
        }
        .ff-marquee:hover .ff-marquee-track { animation-play-state:paused; }
        .ff-marquee-run { display:flex; align-items:center; }

        .ff-marquee-item {
          font-family:'Newsreader',serif; font-style:italic; font-weight:400;
          font-size:clamp(20px,2.6vw,34px); letter-spacing:-0.01em;
          white-space:nowrap;
        }
        .ff-marquee-dot {
          width:6px; height:6px; border-radius:50%; flex:none;
          background:#B98A4B; margin:0 clamp(22px,3vw,44px);
        }

        /* -50% is exactly one copy of the items, so the loop is seamless. */
        @keyframes ffMarquee { from { transform:translateX(0) } to { transform:translateX(-50%) } }

        @media (prefers-reduced-motion: reduce) {
          .ff-marquee-track { animation:none; }
        }
      `}</style>

      <div className="ff-marquee-track">
        {run(false)}
        {run(true)}
      </div>
    </div>
  );
}
