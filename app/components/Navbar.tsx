"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "https://drive.google.com/file/d/1o3aoi75Vq-jUWOF2IbnwHKigzYjHEDl3/view?usp=sharing", label: "Resume", external: true },
];

export default function Navbar() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);

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

  return (
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
            pathname === link.href ? (
              <Link
                key={link.label}
                href={link.href}
                className="relative flex items-center justify-center overflow-hidden rounded-full px-6 py-3 text-[15px] font-medium text-white transition-all duration-300 hover:scale-105"
              >
                <div aria-hidden className="pointer-events-none absolute inset-0 rounded-full">
                  <div className="absolute inset-0 rounded-full bg-[#1d1d1d] mix-blend-plus-lighter" />
                  <div className="absolute inset-0 rounded-full bg-[rgba(29,29,29,0.2)] mix-blend-color-burn" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[rgba(102,102,102,0)] from-50% to-[rgba(102,102,102,0.4)] mix-blend-plus-lighter" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[rgba(102,102,102,0.2)] to-[rgba(102,102,102,0)] to-[33%] mix-blend-plus-lighter backdrop-blur-[12px]" />
                </div>
                <span className="relative z-10">{link.label}</span>
                <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_16px_16px_9px_-18px_rgba(255,255,255,0.5),inset_-12px_-12px_6px_-14px_#b3b3b3,inset_2px_2px_1px_-2px_#b3b3b3,inset_0px_0px_22px_0px_rgba(242,242,242,0.5)]" />
              </Link>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                target={"external" in link && link.external ? "_blank" : undefined}
                rel={"external" in link && link.external ? "noopener noreferrer" : undefined}
                className="flex items-center gap-1.5 whitespace-nowrap pl-3 pr-3 py-3 text-[15px] font-medium text-white transition-all duration-300 hover:scale-105 hover:text-zinc-300"
              >
                {link.label}
                {"external" in link && link.external && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                )}
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
  );
}
