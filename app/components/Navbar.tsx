"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "#resume", label: "Resume", modal: true },
];

export default function Navbar() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    if (pathname !== "/") {
      sessionStorage.setItem("introPlayed", "1");
    }
  }, [pathname]);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      setHidden(y > 80 && y > lastY.current);
      setScrolled(y > 20);
      lastY.current = y;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (resumeOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [resumeOpen]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setResumeOpen(false);
  }, []);

  useEffect(() => {
    if (resumeOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [resumeOpen, handleKeyDown]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-transform duration-300 ${
          hidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className={`transition-colors duration-300 ${scrolled ? "bg-[#191919]" : "bg-transparent"}`}>
          <nav className={`mx-auto flex max-w-6xl items-center justify-center gap-6 px-5 transition-[padding] duration-300 sm:px-6 lg:px-8 ${
            scrolled ? "py-3 sm:py-4" : "py-8 sm:py-10"
          }`}>
          <div className="hidden flex-1 items-center sm:flex">
            <Link href="/" aria-label="Home" className="transition-transform duration-300 hover:scale-125">
              <Image
                src="/logo.svg"
                alt="FH"
                width={36}
                height={40}
                className="opacity-80 transition-opacity hover:opacity-100"
              />
            </Link>
          </div>
          <div className="flex w-full items-center justify-center gap-4 sm:w-auto sm:gap-5">
            {navLinks.map((link) =>
              "modal" in link && link.modal ? (
                <button
                  key={link.label}
                  onClick={() => setResumeOpen(true)}
                  className="flex items-center gap-1.5 whitespace-nowrap pl-3 pr-3 py-3 text-[15px] font-medium text-white transition-all duration-300 hover:scale-105 hover:text-zinc-300"
                >
                  {link.label}
                </button>
              ) : pathname === link.href ? (
                <Link
                  key={link.label}
                  href={link.href}
                  className="relative flex items-center justify-center overflow-hidden rounded-full px-6 py-3 text-[15px] font-medium text-white transition-all duration-300 hover:scale-105"
                >
                  <div aria-hidden className="pointer-events-none absolute inset-0 rounded-full">
                    <div className="absolute inset-0 rounded-full bg-[#1d1d1d] mix-blend-plus-lighter" />
                    <div className="absolute inset-0 rounded-full bg-[rgba(29,29,29,0.2)] mix-blend-color-burn" />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[rgba(102,102,102,0)] from-50% to-[rgba(102,102,102,0.4)] mix-blend-plus-lighter opacity-40 sm:opacity-100" />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[rgba(102,102,102,0.2)] to-[rgba(102,102,102,0)] to-[33%] mix-blend-plus-lighter backdrop-blur-[6px] sm:backdrop-blur-[12px]" />
                  </div>
                  <span className="relative z-10">{link.label}</span>
                  <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_16px_16px_9px_-18px_rgba(255,255,255,0.5),inset_-12px_-12px_6px_-14px_#b3b3b3,inset_2px_2px_1px_-2px_#b3b3b3,inset_0px_0px_22px_0px_rgba(242,242,242,0.5)]" />
                </Link>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-1.5 whitespace-nowrap pl-3 pr-3 py-3 text-[15px] font-medium text-white transition-all duration-300 hover:scale-105 hover:text-zinc-300"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>
          <div className="hidden flex-1 sm:block" />
        </nav>
        </div>
        <div
          className={`pointer-events-none h-16 transition-opacity duration-300 ${scrolled ? "opacity-100" : "opacity-0"}`}
          style={{
            background: "linear-gradient(to bottom, #191919, transparent)",
          }}
        />
      </header>

      {/* Resume Modal */}
      {resumeOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setResumeOpen(false)}
        >
          <div
            className="relative flex h-[100dvh] w-[100vw] flex-col overflow-hidden bg-[#222] shadow-2xl sm:h-[95vh] sm:w-auto sm:max-w-[95vw] sm:rounded-2xl sm:[aspect-ratio:8.5/11.5]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button — absolute on mobile so it doesn't shift the PDF */}
            <button
              onClick={() => setResumeOpen(false)}
              className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#222]/80 text-zinc-400 backdrop-blur-sm transition-colors duration-200 hover:bg-zinc-700 hover:text-white sm:static sm:ml-auto sm:mr-4 sm:mt-3 sm:mb-1 sm:bg-transparent sm:backdrop-blur-none"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            {/* PDF Embed + Download */}
            <div className="flex flex-1 flex-col items-center justify-center overflow-hidden px-1 sm:px-4">
              <iframe
                src="/resume.pdf#toolbar=0&navpanes=0&scrollbar=0&view=Fit"
                className="w-full sm:h-full"
                style={{ aspectRatio: "8.5 / 11" }}
                title="Resume"
              />
              <div className="shrink-0 flex items-center justify-center px-6 py-3">
                <a
                  href="/resume.pdf"
                  download
                  className="flex items-center gap-2 rounded-full border border-zinc-600 px-5 py-2 text-sm font-medium text-zinc-300 transition-all duration-200 hover:border-zinc-400 hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
