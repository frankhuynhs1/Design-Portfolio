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
  const [resumeClosing, setResumeClosing] = useState(false);
  const [resumeOrigin, setResumeOrigin] = useState("top center");
  const lastY = useRef(0);

  const closeResume = useCallback(() => {
    setResumeClosing(true);
    setTimeout(() => {
      setResumeOpen(false);
      setResumeClosing(false);
    }, 350);
  }, []);

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
    if (e.key === "Escape") closeResume();
  }, [closeResume]);

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
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = rect.left + rect.width / 2;
                    const y = rect.top + rect.height / 2;
                    setResumeOrigin(`${x}px ${y}px`);
                    setResumeOpen(true);
                  }}
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
          className={`fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm ${resumeClosing ? "animate-[fadeOut_0.3s_ease-in_forwards]" : "animate-[fadeIn_0.2s_ease-out]"}`}
          onClick={closeResume}
        >
          <div
            className={`relative flex h-[100dvh] w-[100vw] flex-col overflow-hidden bg-[#222] shadow-2xl sm:h-[95vh] sm:w-[700px] sm:max-w-[95vw] sm:rounded-2xl ${resumeClosing ? "animate-[modalSlideOut_0.35s_cubic-bezier(0.4,0,1,1)_forwards]" : "animate-[modalSlideIn_0.35s_cubic-bezier(0,0,0.2,1)]"}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeResume}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#222]/80 text-zinc-400 backdrop-blur-sm transition-colors duration-200 hover:bg-zinc-700 hover:text-white sm:static sm:ml-auto sm:mr-4 sm:mt-3 sm:mb-1 sm:h-8 sm:w-8 sm:bg-transparent sm:backdrop-blur-none"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:h-[18px] sm:w-[18px]">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            {/* Resume Content */}
            <div className="flex-1 overflow-y-auto px-5 pb-8 pt-16 sm:px-8 sm:pt-2 sm:pb-10">
              {/* Header */}
              <div className="border-b border-zinc-700/50 pb-5">
                <h2 className="text-2xl font-bold text-[#f5f5f5] sm:text-3xl">Franklin Huynh</h2>
                <p className="mt-1 text-base text-zinc-400">Product Designer</p>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-zinc-500">
                  <a href="mailto:frankhuynhs@gmail.com" className="hover:text-zinc-300 transition-colors">frankhuynhs@gmail.com</a>
                  <a href="https://www.linkedin.com/in/huynhfranklin/" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-300 transition-colors">/in/huynhfranklin</a>
                </div>
                <p className="mt-3 text-base leading-relaxed text-zinc-400">
                  5+ years designing in consumer facing roles across e-commerce and retail experiences for web and app.
                </p>
              </div>

              {/* Work Experience */}
              <div className="mt-5">
                <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500">Work Experience</h3>

                <div className="mt-4 space-y-5">
                  <div>
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="text-base font-bold text-[#f5f5f5]">Chewy</p>
                      <span className="shrink-0 text-sm text-zinc-500">Jan 2025 – Present</span>
                    </div>
                    <p className="text-sm font-medium text-zinc-400">Product Designer, Pet Health</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-zinc-500">
                      Leading design strategy for Chewy Vet Care&apos;s suite of products and crafting platforms that integrate e-commerce with healthcare (running prescriptions, appointment scheduling, and pet health records).
                    </p>
                  </div>

                  <div>
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="text-base font-bold text-[#f5f5f5]">Walmart</p>
                      <span className="shrink-0 text-sm text-zinc-500">Jun 2023 – Dec 2024</span>
                    </div>
                    <p className="text-sm font-medium text-zinc-400">UX Designer III, Search &amp; Discovery</p>
                    <ul className="mt-1.5 space-y-1.5 text-sm leading-relaxed text-zinc-500">
                      <li>Led design for 1 of 5 generative AI design investments using LLMs that launched in 4 months from concept to production, resulting in +2.62% lift in add to carts and +1.1% lift in conversion.</li>
                      <li>Collaborated closely with product to support the launch and onboarding UX of E2E strategy for our GenAI experiences on app featured in CES 2024.</li>
                      <li>Responsible for typeahead roadmap and experiences on Walmart e-commerce and contributed to core search, item tile, and fashion roadmaps.</li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="text-base font-bold text-[#f5f5f5]">Nordstrom</p>
                      <span className="shrink-0 text-sm text-zinc-500">Nov 2020 – Dec 2022</span>
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center gap-4">
                        <div className="h-2.5 w-2.5 shrink-0 rounded-full border-2 border-zinc-500" />
                        <div className="flex flex-1 items-baseline justify-between gap-2">
                          <p className="text-sm font-medium text-zinc-400">UX Designer II, Fulfillment CX</p>
                          <span className="shrink-0 text-xs text-zinc-600">May 2022 – Dec 2022</span>
                        </div>
                      </div>
                      <div className="ml-[4.5px] border-l border-zinc-700 py-2 pl-[19.5px]">
                        <ul className="space-y-1.5 text-sm leading-relaxed text-zinc-500">
                          <li>Led mid-large scaled fulfillment solutions, including the launch of the Stores tab on app that brought +24k new and unique customers using our services across Nordstrom and Nordstrom Rack in first month of launch.</li>
                          <li>Defined and owned the short and long-term roadmap for omni-channel cx, working strategically and thoughtfully with product, engineering and other cross-functional teams.</li>
                        </ul>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="h-2.5 w-2.5 shrink-0 rounded-full border-2 border-zinc-500" />
                        <div className="flex flex-1 items-baseline justify-between gap-2">
                          <p className="text-sm font-medium text-zinc-400">UX Designer, Fulfillment &amp; Returns</p>
                          <span className="shrink-0 text-xs text-zinc-600">Nov 2020 – May 2022</span>
                        </div>
                      </div>
                      <ul className="mt-1.5 space-y-1.5 pl-[26px] text-sm leading-relaxed text-zinc-500">
                        <li>Designed comprehensive solutions and influenced fulfillment and return initiatives that guided our customers across the purchase and post-purchase fulfillment funnel for Web, iOS, and Android app.</li>
                        <li>Expanded customer control options for pickup order deadlines, resulting in +11.1M top line revenue for store pickups.</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="text-base font-bold text-[#f5f5f5]">Best Buy</p>
                      <span className="shrink-0 text-sm text-zinc-500">Jun 2019 – Sep 2019</span>
                    </div>
                    <p className="text-sm font-medium text-zinc-400">UX Design Intern, Mobile Apps</p>
                    <ul className="mt-1.5 space-y-1.5 text-sm leading-relaxed text-zinc-500">
                      <li>Led several projects across the Support and Browse portfolio of the Best Buy app, resulting in +8% appointments booked, 60% less negative reviews around tech support awareness, and improving way-finding for browse journeys that led to +4% conversion on app.</li>
                      <li>Conducted research including usability testing, heat mapping, behavioral mapping and other forms of research discovery to inform design directions with product, QA, research, content design, and engineers.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="mt-6 border-t border-zinc-700/50 pt-5">
                <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500">Skills &amp; Processes</h3>
                <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm font-bold text-zinc-400">Strengths</p>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-500">iOS, Web, and Android, Product thinking, Interaction and Visual design, Strategy, Research, E-commerce and Retail</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-zinc-400">Tools</p>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-500">Figma/Make, Claude, ChatGPT, Cursor, Magic Patterns, FigJam, Protopie, Usertesting.com, Dscout, Jira, Confluence, Pen and Paper</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-zinc-400">Design artifacts</p>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-500">Design charrettes, Sketches, User and task flows, Service blueprints, Journey maps, Personas, Wireframes, Information architecture, Prototypes, High fidelity mock-ups, Design systems, Documentation and guidelines, Accessibility, UX roadmaps, Product vision and strategy</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-zinc-400">Research artifacts</p>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-500">Interviews, Heuristic evaluations, User research, Task analysis, Usability studies, Contextual inquiries, Behavioral mapping, Surveys, Literature reviews</p>
                  </div>
                </div>
              </div>

              {/* Education */}
              <div className="mt-6 border-t border-zinc-700/50 pt-5">
                <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500">Education</h3>
                <div className="mt-3">
                  <p className="text-base font-bold text-[#f5f5f5]">University of Washington</p>
                  <p className="mt-0.5 text-sm text-zinc-400">(B.S.) Human-Centered Design &amp; Engineering</p>
                  <p className="text-sm text-zinc-500">Focus: Human-Computer Interaction</p>
                </div>
              </div>

              {/* Download */}
              <div className="mt-6 flex items-center justify-center pt-2">
                <a
                  href="/resume.pdf"
                  download="Franklin Huynh Resume.pdf"
                  className="flex items-center gap-2 rounded-full border border-zinc-600 px-5 py-2 text-sm font-medium text-zinc-300 transition-all duration-200 hover:border-zinc-400 hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download PDF
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
