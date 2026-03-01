"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";

export default function HighlightsCarousel({ children }: { children: ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  function updateArrows() {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, []);

  function scroll(direction: "left" | "right") {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.6;
    el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  }

  return (
    <div className="relative mt-6">
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="liquid-glass absolute left-6 top-1/2 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full transition-opacity hover:opacity-90"
          aria-label="Scroll left"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
      )}

      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="liquid-glass absolute right-6 top-1/2 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full transition-opacity hover:opacity-90"
          aria-label="Scroll right"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      )}

      <div
        ref={scrollRef}
        className="relative z-10 overflow-x-auto px-5 py-6 scrollbar-none sm:px-6 lg:px-[max(2rem,calc((100vw-72rem)/2+2rem))]"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="group/carousel flex gap-4">
          {children}
          <div className="shrink-0 w-[20vw]" aria-hidden />
        </div>
      </div>
    </div>
  );
}
