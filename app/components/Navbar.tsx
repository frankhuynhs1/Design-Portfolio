"use client";

import { useEffect, useRef, useState, useCallback, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
);
const AboutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M20 21a8 8 0 0 0-16 0" /></svg>
);
const ResumeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
);

const navLinks: { href: string; label: string; modal?: boolean; icon: ReactNode }[] = [
  { href: "/", label: "Home", icon: <HomeIcon /> },
  { href: "/about", label: "About", icon: <AboutIcon /> },
  { href: "#resume", label: "Resume", modal: true, icon: <ResumeIcon /> },
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
                  className="flex items-center gap-2.5 whitespace-nowrap pl-3 pr-3 py-3 text-[15px] font-medium text-white transition-all duration-300 hover:scale-105 hover:text-zinc-300"
                >
                  {link.icon}
                  {link.label}
                </button>
              ) : pathname === link.href ? (
                <Link
                  key={link.label}
                  href={link.href}
                  className="liquid-glass flex items-center justify-center gap-2.5 rounded-full px-6 py-3 text-[15px] font-medium text-white transition-all duration-300 hover:scale-105"
                >
                  {link.icon}
                  {link.label}
                </Link>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-2.5 whitespace-nowrap pl-3 pr-3 py-3 text-[15px] font-medium text-white transition-all duration-300 hover:scale-105 hover:text-zinc-300"
                >
                  {link.icon}
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
            className={`relative flex h-[95dvh] w-[95vw] flex-col overflow-hidden rounded-2xl bg-[#222] shadow-2xl sm:h-[95vh] sm:w-[700px] sm:max-w-[95vw] ${resumeClosing ? "animate-[modalSlideOut_0.35s_cubic-bezier(0.4,0,1,1)_forwards]" : "animate-[modalSlideIn_0.35s_cubic-bezier(0,0,0.2,1)]"}`}
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
                  <a href="https://www.franklinhuynh.com" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-300 transition-colors">
                    franklinhuynh.com
                  </a>
                  <a href="mailto:frankhuynhs@gmail.com" className="hover:text-zinc-300 transition-colors">frankhuynhs@gmail.com</a>
                  <a href="https://www.linkedin.com/in/huynhfranklin/" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-300 transition-colors">/in/huynhfranklin</a>
                  <a href="tel:+12533553311" className="hover:text-zinc-300 transition-colors">(253) 355-3311</a>
                </div>
                <p className="mt-3 text-base leading-relaxed text-zinc-400">
                  6+ years shaping consumer experiences across e-commerce and retail with a focus on driving acquisition, activation, retention, and product growth across web and app.
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
                    <div className="mt-3 space-y-5">
                      <div>
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <p className="text-sm font-medium text-zinc-400">Senior Product Designer, Storefront Pharmacy</p>
                          <span className="shrink-0 text-xs text-zinc-600">Apr 2026 – Present</span>
                        </div>
                        <ul className="mt-1.5 list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-zinc-500">
                          <li>
                            Leading strategy and execution of experiences that shape how customers discover, evaluate, and commit to prescription and vet diet subscriptions while evolving the promotional systems that drive activation, retention, and long-term value. Key surfaces include: home, browse, PDP, cart, checkout, post-order, pet portal, and lifecycle touch-points (email, push, in-app).
                          </li>
                        </ul>
                      </div>
                      <div>
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <p className="text-sm font-medium text-zinc-400">Product Designer, Chewy Vet Care</p>
                          <span className="shrink-0 text-xs text-zinc-600">Jan 2025 – Mar 2026</span>
                        </div>
                        <ul className="mt-1.5 list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-zinc-500">
                          <li>
                            Owned end-to-end design strategy for acquisition, activation, and retention for Chewy Vet Care. Key surfaces include pet portal, scheduling, landing pages, post-appointment, and lifecycle touch-points (marketing campaigns, SEO, email, push, in-app).
                          </li>
                          <li>
                            Launched drop-off appointments, patient records, lab results, and marketing landing pages to drive activation, conversion, and retention across Chewy Vet Care.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="text-base font-bold text-[#f5f5f5]">Walmart</p>
                      <span className="shrink-0 text-sm text-zinc-500">Jun 2023 – Dec 2024</span>
                    </div>
                    <p className="text-sm font-medium text-zinc-400">UX Designer III, Search &amp; Discovery</p>
                    <ul className="mt-1.5 list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-zinc-500">
                      <li>Owned all design strategy for typeahead and filters roadmap for Walmart e-commerce and contributed to core search, item tile, and fashion priorities.</li>
                      <li>Launched a GenAI/LLM-powered comparison feature on Search within 4 months from concept to production, delivering +2.62% add-to-cart lift and +1.1% conversion lift.</li>
                      <li>Shaped our end-to-end GenAI onboarding UX for Walmart&apos;s app experience, which was featured in CES 2024.</li>
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
                        <ul className="list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-zinc-500">
                          <li>Defined and owned design strategy for omni-channel CX, designing across high visibility touch-points such as home page, browse, PDP, checkout, and accounts that drove retention, conversion, and customer lifetime value.</li>
                          <li>Launched Stores tab on the Nordstrom app, acquiring +24K new customers using our alterations service across Nordstrom and Nordstrom Rack within the first month.</li>
                        </ul>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="h-2.5 w-2.5 shrink-0 rounded-full border-2 border-zinc-500" />
                        <div className="flex flex-1 items-baseline justify-between gap-2">
                          <p className="text-sm font-medium text-zinc-400">UX Designer, Fulfillment &amp; Returns</p>
                          <span className="shrink-0 text-xs text-zinc-600">Nov 2020 – May 2022</span>
                        </div>
                      </div>
                      <ul className="mt-1.5 list-disc space-y-1.5 pl-[40px] text-sm leading-relaxed text-zinc-500">
                        <li>Drove end-to-end fulfillment and returns UX across Web, iOS, and Android, covering the full purchase and post-purchase funnel.</li>
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
                    <ul className="mt-1.5 list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-zinc-500">
                      <li>Designed and launched several features across Support and Browse portfolios of the Best Buy app, driving +8% appointments booked, 60% fewer negative tech support reviews, and +4% browse conversion.</li>
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
                    <p className="mt-1 text-sm leading-relaxed text-zinc-500">iOS, Android, Web – Mobile, Tablet, Desktop, E-commerce, Retail, Fashion, Acquisition, Activation, Retention, Growth, A/B testing, GenAI and Agentic AI workflows</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-zinc-400">Tools</p>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-500">Figma/Make, Claude (Cowork, Code), ChatGPT &amp; Codex, Cursor, FigJam, Protopie, Usertesting.com, Dscout, Jira, Confluence, Pen and Paper</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-zinc-400">Design artifacts</p>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-500">Design charrettes, Sketches, User and task flows, Service blueprints, Journey maps, Personas, Wireframes, Information architecture, Prototypes, High fidelity mock-ups, Design systems, Documentation and guidelines, Accessibility, UX roadmaps, Product vision and strategy</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-zinc-400">Research artifacts</p>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-500">Interviews, Heuristic evaluations, User research, Task analysis, Usability studies, Contextual inquiries, Behavioral mapping, Surveys, Literature review</p>
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
