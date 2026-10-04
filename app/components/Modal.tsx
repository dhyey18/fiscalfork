"use client";

import { useCallback, useEffect, useRef } from "react";
import { Icon } from "../lib/ui";

const FOCUSABLE =
  'a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])';

/**
 * A dialog that behaves like one.
 *
 * The visual part of a modal is the easy half; the half that gets skipped is
 * what keyboard and screen-reader users need, so it is all here:
 *
 *  - `role="dialog"` + `aria-modal` + `aria-labelledby`, so it is announced as
 *    a dialog and named by its own heading.
 *  - Focus moves in on open and is restored to whatever opened it on close,
 *    so the keyboard does not get dumped back at the top of the document.
 *  - Tab is trapped: past the last control it wraps to the first, and
 *    Shift+Tab wraps backwards.
 *  - Escape closes, and so does a click on the backdrop — but not a click that
 *    merely *ends* on the backdrop after starting inside the panel, which is
 *    how a careless implementation closes itself mid-text-selection.
 *  - The page behind is locked, with the scrollbar's width replaced as padding
 *    so the layout does not jump sideways as it disappears.
 */
export default function Modal({
  open,
  onClose,
  labelledBy,
  children,
}: {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  children: React.ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreTo = useRef<HTMLElement | null>(null);
  const pressedInside = useRef(false);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const nodes = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!nodes || nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;
    restoreTo.current = document.activeElement as HTMLElement | null;

    const { body } = document;
    const prevOverflow = body.style.overflow;
    const prevPad = body.style.paddingRight;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (gap > 0) body.style.paddingRight = `${gap}px`;

    // Focus the panel itself rather than its first control, so the dialog's
    // heading is what gets read on open.
    panelRef.current?.focus();

    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPad;
      restoreTo.current?.focus?.();
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      onMouseDown={(e) => {
        pressedInside.current = e.target !== e.currentTarget;
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget && !pressedInside.current) onClose();
        pressedInside.current = false;
      }}
      onKeyDown={onKeyDown}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(11,15,20,0.72)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(12px,3vw,40px)",
        overflowY: "auto",
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        style={{
          position: "relative",
          width: "min(1020px,100%)",
          maxHeight: "calc(100vh - clamp(24px,6vw,80px))",
          overflowY: "auto",
          background: "#FFFFFF",
          borderRadius: "clamp(18px,2.2vw,26px)",
          boxShadow: "0 50px 100px -30px rgba(0,0,0,0.6)",
          outline: "none",
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            zIndex: 2,
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.3)",
            background: "rgba(11,15,20,0.55)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            color: "#FFFFFF",
            cursor: "pointer",
          }}
        >
          <Icon name="icon-x" style={{ fontSize: 17 }} />
        </button>
        {children}
      </div>
    </div>
  );
}
