"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import CustomCursor from "../../components/CustomCursor";
import ProjectCard from "../../components/ProjectCard";

const metrics = [
  { prefix: "+", num: 2.62, suffix: "%", label: "Add to carts per visitor, indicating reduced friction in shopping decision" },
  { prefix: "+", num: 1.14, suffix: "%", label: "First-time buyer conversion, indicating easy learning curve" },
  { prefix: "-", num: 1.81, suffix: "%", label: "Session cart removal, indicating higher quality of add to carts" },
  { prefix: "+", num: 12.84, suffix: "%", label: "of customers re-engaging the tool, indicating high value prop" },
];

function AnimatedMetric({ prefix, num, suffix, duration = 1.6 }: { prefix: string; num: number; suffix: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState("0.00");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const decimals = num.toString().split(".")[1]?.length || 0;
    const startTime = performance.now();
    const durationMs = duration * 1000;

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * num;
      setDisplay(current.toFixed(decimals));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [started, num, duration]);

  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

const principles = [
  { title: "Make it discoverable", desc: "Make the tool easily discoverable so customers can start to engage and develop a habit" },
  { title: "Keep it simple", desc: "Reduce cognitive overload by keeping the comparison interface clean and uncluttered" },
  { title: "Demystify terminology", desc: "Use natural, easy to understand language when explaining technical and complex specifications to customers" },
  { title: "Be objective and unbiased", desc: "The tool should not favor any product/brand/supplier and be transparent about its methodology and how it generates results" },
];

const researchTakeaways = [
  { title: "Entrypoint to the comparison tool was moderately discoverable", desc: "Many participants did not mention the compare nudge when evaluating the TVs, though many did quickly see it when asked. Those who didn't see it, said it's because they were focused on evaluating products." },
  { title: "Icons associated with the negative review mentions were confusing", desc: "Many participants looked to the tags to help them make a decision. The tags helped participants think about their needs/lifestyle. Several participants initially interpreted the \"X\" as a \"No...\"" },
  { title: "Natural language titles reduced the comparison tool's effectiveness", desc: "Different titles added more effort: Comparison was quicker when the key differences titles and descriptors were similar amongst items" },
  { title: "The AI-generated use cases were very helpful in narrowing options", desc: "Many participants knew what they'd typical use the TV for (movies, gaming, etc) and where to place it (living room, patio, bedroom, etc) so the highlights sped up the process. However, some participants didn't bother read the supporting sentence underneath." },
];

const teamMembers = [
  "Franklin Huynh (UX Designer)",
  "Anisha Arora (Product Manager)",
  "Yashwant Modi (Program Manager)",
  "Keshav Agrawal (Product Director)",
  "Charlotte Passot (UX Manager)",
  "Shannon Lamb (UX Director)",
  "Colin Mahan (UX Content Design)",
  "Jen Luong (Design Researcher)",
  "Shadab Ahmad (Discovery Engineer)",
  "Vinoth Anandan (FE Engineer)",
  "Vinay Hosamane (FE Engineer)",
  "Shailesh Jain (BE Engineer)",
  "Jason Cho (P13N)",
  "Paul Yan (IDML)",
  "Ronen Aharony (Aspectiva)",
  "Sambhav Gupta (DCA Analytics)",
  "Stephanie Miller (Business)",
  "Himanshu Tanwar (UGC)",
  "Ashish Parikh (Ads)",
  "Priya Ramadoss (DCA Data Eng)",
  "Anoop Saini (Catalog)",
];

const concepts = [
  { title: "Standard chart", desc: "Knowing that a chart is industry standard, we wanted to innovate beyond this concept", img: "/projects/walmart-genai/concept1-v2.png" },
  { title: "Blog post", desc: "Although comprehensive, this design seemed too dense and resembled our item pages too closely", img: "/projects/walmart-genai/concept2.png" },
  { title: "Input driven criteria", desc: "Data quality issues prevent us from leaning into asking for customer preferences", img: "/projects/walmart-genai/concept3.png" },
  { title: "Summarized cards", desc: "Leadership loved the idea of summarizing crucial details for customers in one single viewport", img: "/projects/walmart-genai/concept4.png" },
];

const competitorCards = [
  { src: "/projects/competitors/rei.png", label: "REI" },
  { src: "/projects/competitors/bestbuy.png", label: "Best Buy" },
  { src: "/projects/competitors/staples.png", label: "Staples" },
  { src: "/projects/competitors/target.png", label: "Target" },
  { src: "/projects/competitors/lululemon.png", label: "lululemon" },
  { src: "/projects/competitors/amazon.png", label: "Amazon" },
  { src: "/projects/competitors/flipkart.png", label: "flipkart" },
];

export default function WalmartGenAIComparison() {
  const [activeCard, setActiveCard] = useState(0);
  const [paused, setPaused] = useState(false);
  const compScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollCompLeft, setCanScrollCompLeft] = useState(false);
  const [canScrollCompRight, setCanScrollCompRight] = useState(true);
  const researchScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollResLeft, setCanScrollResLeft] = useState(false);
  const [canScrollResRight, setCanScrollResRight] = useState(true);

  useEffect(() => {
    const el = compScrollRef.current;
    if (!el) return;
    function updateCompArrows() {
      const el = compScrollRef.current;
      if (!el) return;
      setCanScrollCompLeft(el.scrollLeft > 4);
      setCanScrollCompRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
    }
    updateCompArrows();
    el.addEventListener("scroll", updateCompArrows, { passive: true });
    window.addEventListener("resize", updateCompArrows);
    return () => {
      el.removeEventListener("scroll", updateCompArrows);
      window.removeEventListener("resize", updateCompArrows);
    };
  }, []);

  useEffect(() => {
    const el = researchScrollRef.current;
    if (!el) return;
    function updateResArrows() {
      const el = researchScrollRef.current;
      if (!el) return;
      setCanScrollResLeft(el.scrollLeft > 4);
      setCanScrollResRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
    }
    updateResArrows();
    el.addEventListener("scroll", updateResArrows, { passive: true });
    window.addEventListener("resize", updateResArrows);
    return () => {
      el.removeEventListener("scroll", updateResArrows);
      window.removeEventListener("resize", updateResArrows);
    };
  }, []);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % competitorCards.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [paused]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#191919] font-sans text-zinc-100">
      <CustomCursor />
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(161,161,170,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(161,161,170,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "28px 28px",
        }}
      />
      <Navbar />

      <main className="relative z-10 mx-auto max-w-4xl px-5 pt-40 sm:px-6 sm:pt-48 lg:px-8">
        {/* Hero */}
        <section className="pt-12 pb-10 sm:pt-16 sm:pb-10">
          <p className="text-base sm:text-lg text-[#b3b3b3]">Walmart – Generative AI Comparison</p>
          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-[#f5f5f5] sm:text-4xl md:text-5xl">
            Enabling customers to find the right item that meets their needs faster
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-[#b3b3b3] sm:text-lg">
            We know that comparing items on Walmart is difficult, especially products with complex specifications. By curating summarized item information side-by-side, we boosted buyer confidence, saved customer time, and increased conversions.
          </p>
        </section>

        {/* Metrics */}
        <section className="pb-10 sm:pb-10">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {metrics.map((m, i) => (
              <div key={i} className="rounded-2xl bg-[#222222] p-5 sm:p-6">
                <p className="text-2xl font-bold text-green-400 sm:text-3xl">
                  <AnimatedMetric prefix={m.prefix} num={m.num} suffix={m.suffix} />
                </p>
                <p className="mt-2 text-sm leading-5 text-[#888]">{m.label}</p>
              </div>
            ))}
          </div>
        </section>

      </main>

      <div className="relative z-10 w-full px-5 sm:px-10 lg:px-20">
        <div className="overflow-hidden rounded-2xl border border-zinc-700/40">
          <Image
            src="/projects/walmart-comparison-ui.png"
            alt="Walmart Generative AI Comparison tool – comparing 4 TVs side by side"
            width={5976}
            height={2802}
            className="w-full"
            quality={100}
            unoptimized
          />
        </div>
      </div>

      <main className="relative z-10 mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">

        {/* Project Details */}
        <section className="py-10 sm:py-14">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            <div>
              <p className="text-sm font-bold text-[#888]">Role</p>
              <p className="mt-1 text-base text-[#f5f5f5]">Designer</p>
            </div>
            <div>
              <p className="text-sm font-bold text-[#888]">Domain</p>
              <p className="mt-1 text-base text-[#f5f5f5]">Search, GenAI</p>
            </div>
            <div>
              <p className="text-sm font-bold text-[#888]">Date</p>
              <p className="mt-1 text-base text-[#f5f5f5]">Q4 2023</p>
            </div>
            <div>
              <p className="text-sm font-bold text-[#888]">Responsibilities</p>
              <p className="mt-1 text-base text-[#f5f5f5]">Discovery, Journey Mapping, Strategy, Research, Testing, UX, Execution</p>
            </div>
          </div>
        </section>

        {/* Publications */}
        <section className="py-10 sm:py-14">
          <h2 className="text-2xl font-bold text-[#f5f5f5] sm:text-3xl">
            Publications on this work
          </h2>
          <div className="mt-8 flex flex-col gap-6">
            <a
              href="https://corporate.walmart.com/news/2024/10/30/transforming-holiday-shopping-with-ai-at-walmart"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-6 rounded-2xl bg-[#222222] p-6 transition-all duration-300 hover:bg-[#2a2a2a]"
            >
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[#f5f5f5] group-hover:text-white">Transforming Holiday Shopping With AI at Walmart</h3>
                <p className="mt-1 text-sm text-[#888]">Oct. 30th, 2024 – 4 min read · Walmart Corporate News</p>
                <p className="mt-3 text-sm font-medium text-[#b3b3b3] group-hover:text-white">Read article →</p>
              </div>
              <div className="hidden shrink-0 overflow-hidden rounded-lg sm:block" style={{ width: 180, height: 120 }}>
                <div className="flex h-full w-full flex-col items-center justify-center bg-[#1a1a1a]">
                  <span className="text-2xl font-bold text-white">Walmart</span>
                  <span className="mt-1 text-[10px] uppercase tracking-wider text-white/50">Corporate News</span>
                </div>
              </div>
            </a>
            <a
              href="https://www.linkedin.com/posts/jon-alferness-b193a3_walmartproduct-productmanagement-customerexperience-activity-7180779685763596289-_O0a?utm_source=share&utm_medium=member_desktop&rcm=ACoAABiCajoBvbqcGKqHiKexcwBcTqrG8tB4Wbs"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-6 rounded-2xl bg-[#222222] p-6 transition-all duration-300 hover:bg-[#2a2a2a]"
            >
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[#f5f5f5] group-hover:text-white">Item comparison on Search, powered by GenAI</h3>
                <p className="mt-1 text-sm text-[#888]">Mar. 30th, 2024 – 2 min read · Jon Alferness, VP and CPO, Walmart US</p>
                <p className="mt-3 text-sm font-medium text-[#b3b3b3] group-hover:text-white">Read post →</p>
              </div>
              <div className="hidden shrink-0 overflow-hidden rounded-lg sm:block" style={{ width: 180, height: 120 }}>
                <div className="flex h-full w-full flex-col items-center justify-center bg-[#1a1a1a]">
                  <span className="text-2xl font-bold text-white">in</span>
                  <span className="mt-1 text-[10px] uppercase tracking-wider text-white/50">LinkedIn Post</span>
                </div>
              </div>
            </a>
          </div>
        </section>

        {/* Discovery */}
        <section className="py-10 sm:py-14">
          <p className="text-sm font-bold uppercase tracking-wider text-[#888]">Discovery</p>
          <h2 className="mt-4 text-2xl font-bold text-[#f5f5f5] sm:text-3xl">
            Customer problem – comparing is high effort
          </h2>
          <p className="mt-2 text-lg text-[#b3b3b3]">
            Walmart customers find it difficult to compare products and make a decision online, especially for high-consideration items (priced at $100 or above).
          </p>

          <div className="mt-14 flex flex-col gap-10">
            <div>
              <h3 className="text-2xl font-bold text-[#f5f5f5] sm:text-3xl">Additionally, high consideration items make up 45% of shopping sessions across platforms</h3>
              <p className="mt-3 text-base leading-7 text-[#b3b3b3]">
                Along with benchmarking studies and voice of the customer feedback, we&apos;ve seen comparing details between products being a huge pain point for customers.
              </p>
              <div className="mt-8">
                <Image
                  src="/projects/tv-comparison.png"
                  alt="Three TVs side by side representing the comparison challenge"
                  width={1536}
                  height={1024}
                  className="w-full rounded-2xl"
                  quality={100}
                  unoptimized
                />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#f5f5f5] sm:text-3xl">Other competitors have a more dedicated way to store items on Search and compare</h3>
              <p className="mt-3 text-base leading-7 text-[#b3b3b3]">
                We are lagging behind many competitors, who offer an easier way for their customers to compare items across many different categories.
              </p>

              {/* Competitor Screenshots - Horizontal Carousel */}
              <div className="relative -mx-5 mt-12 sm:-mx-6 lg:-mx-8">
                {canScrollCompLeft && (
                  <button
                    onClick={() => { const el = compScrollRef.current; if (el) el.scrollBy({ left: -el.clientWidth * 0.6, behavior: "smooth" }); }}
                    className="absolute left-2 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full transition-opacity hover:opacity-90"
                    aria-label="Scroll left"
                  >
                    <span aria-hidden className="pointer-events-none absolute inset-0 rounded-full">
                      <span className="absolute inset-0 rounded-full bg-[#1d1d1d] mix-blend-plus-lighter" />
                      <span className="absolute inset-0 rounded-full bg-[rgba(29,29,29,0.2)] mix-blend-color-burn" />
                      <span className="absolute inset-0 rounded-full bg-gradient-to-b from-[rgba(102,102,102,0)] from-50% to-[rgba(102,102,102,0.4)] mix-blend-plus-lighter" />
                      <span className="absolute inset-0 rounded-full bg-gradient-to-b from-[rgba(102,102,102,0.2)] to-[rgba(102,102,102,0)] to-[33%] mix-blend-plus-lighter backdrop-blur-[12px]" />
                    </span>
                    <svg className="relative z-10" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                    <span className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_16px_16px_9px_-18px_rgba(255,255,255,0.5),inset_-12px_-12px_6px_-14px_#b3b3b3,inset_2px_2px_1px_-2px_#b3b3b3,inset_0px_0px_22px_0px_rgba(242,242,242,0.5)]" />
                  </button>
                )}
                {canScrollCompRight && (
                  <button
                    onClick={() => { const el = compScrollRef.current; if (el) el.scrollBy({ left: el.clientWidth * 0.6, behavior: "smooth" }); }}
                    className="absolute right-2 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full transition-opacity hover:opacity-90"
                    aria-label="Scroll right"
                  >
                    <span aria-hidden className="pointer-events-none absolute inset-0 rounded-full">
                      <span className="absolute inset-0 rounded-full bg-[#1d1d1d] mix-blend-plus-lighter" />
                      <span className="absolute inset-0 rounded-full bg-[rgba(29,29,29,0.2)] mix-blend-color-burn" />
                      <span className="absolute inset-0 rounded-full bg-gradient-to-b from-[rgba(102,102,102,0)] from-50% to-[rgba(102,102,102,0.4)] mix-blend-plus-lighter" />
                      <span className="absolute inset-0 rounded-full bg-gradient-to-b from-[rgba(102,102,102,0.2)] to-[rgba(102,102,102,0)] to-[33%] mix-blend-plus-lighter backdrop-blur-[12px]" />
                    </span>
                    <svg className="relative z-10" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                    <span className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_16px_16px_9px_-18px_rgba(255,255,255,0.5),inset_-12px_-12px_6px_-14px_#b3b3b3,inset_2px_2px_1px_-2px_#b3b3b3,inset_0px_0px_22px_0px_rgba(242,242,242,0.5)]" />
                  </button>
                )}
                <div
                  ref={compScrollRef}
                  className="flex gap-4 overflow-x-auto px-5 py-4 sm:px-6 lg:px-8 scrollbar-hide"
                >
                  {competitorCards.map((card, i) => (
                    <div
                      key={i}
                      className="shrink-0 transition-transform duration-300 hover:scale-105"
                    >
                      <div className="w-[160px] overflow-hidden rounded-xl shadow-lg shadow-black/40 sm:w-[200px]">
                        <Image
                          src={card.src}
                          alt={card.label}
                          width={490}
                          height={1024}
                          className="w-full"
                          quality={90}
                          unoptimized
                        />
                      </div>
                      <p className="mt-2 text-center text-xs font-medium text-zinc-400">{card.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Strategy */}
        <section className="py-10 sm:py-14">
          <p className="text-sm font-bold uppercase tracking-wider text-[#888]">Strategy</p>
          <h2 className="mt-4 text-2xl font-bold text-[#f5f5f5] sm:text-3xl">
            Guiding principles for comparison
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {principles.map((p, i) => (
              <div key={i} className="rounded-2xl bg-[#222222] p-6">
                <h3 className="text-lg font-bold text-[#f5f5f5]">{p.title}</h3>
                <p className="mt-2 text-base leading-7 text-[#b3b3b3]">{p.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl bg-[#222222] p-6 sm:p-8">
            <h3 className="text-lg font-bold text-[#f5f5f5]">Why now</h3>
            <p className="mt-3 text-base leading-7 text-[#b3b3b3]">
              Leadership wanted to further invest in large language models to improve and simplify the end-to-end digital shopping experience for customers.
            </p>
          </div>
        </section>

        {/* Design Exploration */}
        <section className="py-10 sm:py-14">
          <p className="text-sm font-bold uppercase tracking-wider text-[#888]">Design</p>
          <h2 className="mt-4 text-2xl font-bold text-[#f5f5f5] sm:text-3xl">
            I explored several high level initial concepts
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {concepts.map((c, i) => (
              <div key={i} className="rounded-2xl bg-[#222222] p-6">
                <h3 className="text-lg font-bold text-[#f5f5f5]">{c.title}</h3>
                <p className="mt-2 text-base leading-7 text-[#b3b3b3]">{c.desc}</p>
                {c.img && (
                  <div className="mt-4 overflow-hidden rounded-xl">
                    <Image src={c.img} alt={c.title} width={800} height={600} className="w-full" quality={90} />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl bg-[#222222] p-6 sm:p-8">
            <h3 className="text-lg font-bold text-[#f5f5f5]">Hypothesis</h3>
            <p className="mt-3 text-base leading-7 text-[#b3b3b3]">
              By providing recommendations with curated information, we will increase buyer confidence and reduce back and forth between search and item pages.
            </p>
          </div>
        </section>

        {/* Research */}
        <section className="py-10 sm:py-14">
          <p className="text-sm font-bold uppercase tracking-wider text-[#888]">Research</p>
          <h2 className="mt-4 text-2xl font-bold text-[#f5f5f5] sm:text-3xl">
            Does this reflect how customers mentally evaluate choices?
          </h2>
          <p className="mt-4 text-base leading-7 text-[#b3b3b3]">
            <strong className="text-[#f5f5f5]">My contributions:</strong> While consulting with my Design Researcher, Jen Luong, I conducted a DIY study which included drafting a study plan, conduct unmoderated study of the prototype, synthesis of results, and creating the insights/recommendation deck.
          </p>
          <p className="mt-3 text-base leading-7 text-[#b3b3b3]">
          </p>

          <h3 className="mt-12 text-2xl font-bold text-[#f5f5f5] sm:text-3xl">Takeaways from research</h3>
          <div className="relative -mx-5 mt-6 sm:-mx-6 lg:-mx-8">
            {canScrollResLeft && (
              <button
                onClick={() => { const el = researchScrollRef.current; if (el) el.scrollBy({ left: -el.clientWidth * 0.6, behavior: "smooth" }); }}
                className="absolute left-2 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full transition-opacity hover:opacity-90"
                aria-label="Scroll left"
              >
                <span aria-hidden className="pointer-events-none absolute inset-0 rounded-full">
                  <span className="absolute inset-0 rounded-full bg-[#1d1d1d] mix-blend-plus-lighter" />
                  <span className="absolute inset-0 rounded-full bg-[rgba(29,29,29,0.2)] mix-blend-color-burn" />
                  <span className="absolute inset-0 rounded-full bg-gradient-to-b from-[rgba(102,102,102,0)] from-50% to-[rgba(102,102,102,0.4)] mix-blend-plus-lighter" />
                  <span className="absolute inset-0 rounded-full bg-gradient-to-b from-[rgba(102,102,102,0.2)] to-[rgba(102,102,102,0)] to-[33%] mix-blend-plus-lighter backdrop-blur-[12px]" />
                </span>
                <svg className="relative z-10" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6" />
                </svg>
                <span className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_16px_16px_9px_-18px_rgba(255,255,255,0.5),inset_-12px_-12px_6px_-14px_#b3b3b3,inset_2px_2px_1px_-2px_#b3b3b3,inset_0px_0px_22px_0px_rgba(242,242,242,0.5)]" />
              </button>
            )}
            {(
              <button
                onClick={() => { const el = researchScrollRef.current; if (el) el.scrollBy({ left: el.clientWidth * 0.6, behavior: "smooth" }); }}
                className="absolute right-2 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full transition-opacity hover:opacity-90"
                aria-label="Scroll right"
              >
                <span aria-hidden className="pointer-events-none absolute inset-0 rounded-full">
                  <span className="absolute inset-0 rounded-full bg-[#1d1d1d] mix-blend-plus-lighter" />
                  <span className="absolute inset-0 rounded-full bg-[rgba(29,29,29,0.2)] mix-blend-color-burn" />
                  <span className="absolute inset-0 rounded-full bg-gradient-to-b from-[rgba(102,102,102,0)] from-50% to-[rgba(102,102,102,0.4)] mix-blend-plus-lighter" />
                  <span className="absolute inset-0 rounded-full bg-gradient-to-b from-[rgba(102,102,102,0.2)] to-[rgba(102,102,102,0)] to-[33%] mix-blend-plus-lighter backdrop-blur-[12px]" />
                </span>
                <svg className="relative z-10" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6" />
                </svg>
                <span className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_16px_16px_9px_-18px_rgba(255,255,255,0.5),inset_-12px_-12px_6px_-14px_#b3b3b3,inset_2px_2px_1px_-2px_#b3b3b3,inset_0px_0px_22px_0px_rgba(242,242,242,0.5)]" />
              </button>
            )}
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-[#191919] to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-[#191919] to-transparent" />
            <div
              ref={researchScrollRef}
              className="flex gap-4 overflow-x-auto px-5 py-4 sm:px-6 lg:px-8 scrollbar-hide"
            >
              {researchTakeaways.map((t, i) => (
                <div key={i} className="w-[300px] shrink-0 rounded-2xl bg-[#222222] p-6 sm:w-[350px]">
                  <h4 className="text-lg font-bold text-[#f5f5f5]">{t.title}</h4>
                  <p className="mt-2 text-base leading-7 text-[#b3b3b3]">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dev Handoff */}
        <section className="py-10 sm:py-14">
          <p className="text-sm font-bold uppercase tracking-wider text-[#888]">Design</p>
          <h2 className="mt-4 text-2xl font-bold text-[#f5f5f5] sm:text-3xl">
            Buttoning up the designs
          </h2>
          <p className="mt-4 text-base leading-7 text-[#b3b3b3]">
            <strong className="text-[#f5f5f5]">Responsibilities:</strong> Character limits, spacing, interaction, flow, error states, variants, AI-disclaimer with legal
          </p>
          <div className="mt-8 flex w-[85vw] items-start gap-1">
            <div className="shrink-0 overflow-hidden rounded-xl">
              <Image src="/projects/walmart-genai/card-spec.png" alt="Dev handoff card spec" width={1920} height={1080} className="w-[480px]" quality={90} unoptimized />
            </div>
            <div className="shrink-0 overflow-hidden rounded-xl">
              <Image src="/projects/walmart-genai/card-nav.png" alt="Dev handoff card navigation" width={1920} height={1080} className="w-[600px]" quality={90} unoptimized />
            </div>
          </div>
          <div className="relative left-1/2 -translate-x-1/2 mt-4 w-[85vw] overflow-hidden rounded-xl">
            <Image src="/projects/walmart-genai/ok.png" alt="Dev handoff overview" width={1920} height={1080} className="w-full" quality={90} unoptimized />
          </div>
        </section>

        {/* Results */}
        <section className="py-10 sm:py-14">
          <p className="text-sm font-bold uppercase tracking-wider text-[#888]">Results</p>
          <h2 className="mt-4 text-2xl font-bold text-[#f5f5f5] sm:text-3xl">
            Design impact
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {metrics.map((m, i) => (
              <div key={i} className="rounded-2xl bg-[#222222] p-5 sm:p-6">
                <p className="text-2xl font-bold text-green-400 sm:text-3xl">
                  <AnimatedMetric prefix={m.prefix} num={m.num} suffix={m.suffix} />
                </p>
                <p className="mt-2 text-sm leading-5 text-[#888]">{m.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Next Steps */}
        <section className="py-10 sm:py-14">
          <p className="text-sm font-bold uppercase tracking-wider text-[#888]">Next steps</p>
          <h2 className="mt-4 text-2xl font-bold text-[#f5f5f5] sm:text-3xl">
            After iOS launch, we&apos;re scaling towards more platforms and touch-points: desktop and cart
          </h2>
          <div className="relative left-1/2 -translate-x-1/2 mt-8 flex w-[85vw] flex-col gap-10">
            <div className="overflow-hidden rounded-xl">
              <Image src="/projects/walmart-genai/desktop-v2.png" alt="Desktop experience" width={1920} height={1080} className="w-full" quality={90} unoptimized />
            </div>
            <div className="overflow-hidden rounded-xl">
              <Image src="/projects/walmart-genai/cart-v2.png" alt="Cart experience" width={1920} height={1080} className="w-full" quality={90} unoptimized />
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="pt-2 pb-10 sm:pb-14">
          <h2 className="text-2xl font-bold text-[#f5f5f5] sm:text-3xl">
            The team behind the magic
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {teamMembers.map((member, i) => (
              <span key={i} className="rounded-full bg-[#222222] px-4 py-2 text-sm text-[#b3b3b3]">
                👤 {member}
              </span>
            ))}
            <span className="rounded-full bg-[#222222] px-4 py-2 text-sm text-[#b3b3b3]">
              ...and many many more!
            </span>
          </div>
        </section>

        {/* More Case Studies */}
        <section className="py-10 sm:py-14">
          <h2 className="text-2xl font-bold text-[#f5f5f5] sm:text-3xl">Up next</h2>
          <div className="mt-8">
            <ProjectCard
              title="Nordstrom • Stores & Services • 2023"
              href="/projects/nordstrom-stores-services"
              tags={["↑ 1.6% conversion", "↑ 24k new alteration users (1 mo after launch)", "↑ $1.4M EBIT profitability over the year"]}
              videoSrc="/highlights/stores-services.mov"
              variant="featured"
            />
          </div>
        </section>
      </main>

      <footer className="relative z-10 -mt-2 border-t border-zinc-800 py-6 sm:-mt-2 sm:py-8">
        <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8 text-center">
          <p className="group/credits mb-1.5 text-xs text-[#555]">
            {"Created using Cursor and Claude".split("").map((char, i) => (
              <span
                key={i}
                className="inline-block transition-colors duration-300 group-hover/credits:animate-[letter-rainbow_1.5s_ease-in-out_infinite]"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </p>
          <p className="text-base sm:text-lg text-[#b3b3b3]">Like what you see?</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#f5f5f5] sm:text-4xl md:text-5xl">
            Drop me a line!
          </h2>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-full border border-zinc-700 px-6 py-3 text-sm font-medium text-zinc-300 transition-all duration-300 hover:scale-105 hover:border-zinc-500 hover:text-white"
            >
              About
            </Link>
            <a
              href="mailto:frankhuynhs@gmail.com"
              className="inline-flex items-center justify-center rounded-full border border-zinc-700 px-6 py-3 text-sm font-medium text-zinc-300 transition-all duration-300 hover:scale-105 hover:border-zinc-500 hover:text-white"
            >
              frankhuynhs@gmail.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
