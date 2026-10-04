"use client";

import { useEffect, useRef, useState } from "react";
import { Icon, Photo } from "../lib/ui";
import type { PhotoKey } from "../lib/images";

/**
 * The hero's moving backdrop.
 *
 * The still photo renders on the server and on the first client pass; the
 * video is only mounted afterwards, and only when motion is allowed. That
 * ordering matters for three reasons:
 *
 *  - `prefers-reduced-motion` users never download the clip at all, rather
 *    than downloading it and then having it paused.
 *  - The poster is a real next/image, so first paint is an optimised,
 *    correctly-sized image instead of a blank frame while the video buffers.
 *  - With JavaScript off, the photo is what remains, which is a reasonable
 *    page rather than a hole.
 *
 * WCAG 2.2.2 wants a way to stop motion that auto-starts and runs past five
 * seconds, so the clip also carries its own pause control.
 */
export default function HeroVideo({
  src,
  posterName,
  sizes,
  controlBottom = 14,
}: {
  src: string;
  posterName: PhotoKey;
  sizes?: string;
  /** Lift the pause control clear of anything overlaying the foot of the
   *  frame. It has to stay clickable: it is the stop mechanism. */
  controlBottom?: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setShowVideo(!mq.matches);
      if (mq.matches) setReady(false);
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <Photo name={posterName} sizes={sizes} priority />

      {showVideo ? (
        <>
          <video
            ref={videoRef}
            src={src}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            tabIndex={-1}
            onPlaying={() => setReady(true)}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              // Held back until the first frame is actually painted, so the
              // poster is never replaced by a flash of empty video element.
              opacity: ready ? 1 : 0,
              transition: "opacity 600ms ease",
            }}
          />
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? "Pause background video" : "Play background video"}
            style={{
              position: "absolute",
              zIndex: 4,
              right: 14,
              bottom: controlBottom,
              width: 34,
              height: 34,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.35)",
              background: "rgba(11,15,20,0.45)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              color: "#FFFFFF",
              cursor: "pointer",
              opacity: ready ? 1 : 0,
              transition: "opacity 600ms ease,background 200ms",
            }}
          >
            <Icon
              name={playing ? "icon-pause" : "icon-play"}
              style={{ fontSize: 14 }}
            />
          </button>
        </>
      ) : null}
    </>
  );
}
