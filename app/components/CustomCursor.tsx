"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    function onMove(e: MouseEvent) {
      if (!visible) setVisible(true);
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }

      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [role='button'], input, textarea, select, [data-cursor-hover]");
      setHovering(!!interactive);
    }

    function onEnter() { setVisible(true); }
    function onLeave() { setVisible(false); }

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [visible]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed z-[9999] -translate-x-1/2 -translate-y-1/2 transition-[width,height,opacity,border-color,background] duration-200"
      style={{
        width: hovering ? 44 : 28,
        height: hovering ? 44 : 28,
        opacity: visible ? 1 : 0,
        borderRadius: "50%",
        border: hovering
          ? "1.5px solid rgba(255,255,255,0.35)"
          : "1.5px solid rgba(255,255,255,0.25)",
        background: hovering
          ? "transparent"
          : "rgba(255,255,255,0.06)",
        backdropFilter: hovering ? "none" : "blur(6px)",
        WebkitBackdropFilter: hovering ? "none" : "blur(6px)",
        boxShadow: hovering
          ? "0 0 10px 0 rgba(255,255,255,0.1)"
          : "inset 0 1px 2px 0 rgba(255,255,255,0.12), 0 0 8px 0 rgba(255,255,255,0.05)",
      }}
    />
  );
}
