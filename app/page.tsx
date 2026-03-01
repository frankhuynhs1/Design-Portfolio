"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "./components/Navbar";
import ProjectCard from "./components/ProjectCard";
import HighlightsCarousel from "./components/HighlightsCarousel";
import CustomCursor from "./components/CustomCursor";

interface Droplet {
  id: number;
  x: number;
  y: number;
  size: number;
  angle: number;
  distance: number;
  delay: number;
  duration: number;
}

const popMessages = [
  "Pop!",
  "Bloop!",
  "Splish!",
  "Woah!",
  "Nice one!",
  "Gotcha!",
  "Splash!",
  "Ooh!",
  "Hehe",
  "Again!",
  "Wheee!",
  "Boing!",
  "Pew pew!",
  "Satisfying~",
  "So fun!",
];

function BubblePopParticles({ x, y, onDone }: { x: number; y: number; onDone: () => void }) {
  const [droplets] = useState<Droplet[]>(() => {
    const particles: Droplet[] = [];
    for (let i = 0; i < 14; i++) {
      const angle = (Math.PI * 2 * i) / 14 + (Math.random() - 0.5) * 0.5;
      particles.push({
        id: i,
        x: 0,
        y: 0,
        size: 3 + Math.random() * 6,
        angle,
        distance: 40 + Math.random() * 60,
        delay: Math.random() * 80,
        duration: 400 + Math.random() * 300,
      });
    }
    return particles;
  });

  const [message] = useState(() => popMessages[Math.floor(Math.random() * popMessages.length)]);

  useEffect(() => {
    const timer = setTimeout(onDone, 1200);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="pointer-events-none fixed z-[200]" style={{ left: x, top: y }}>
      {droplets.map((d) => (
        <div
          key={d.id}
          className="absolute rounded-full"
          style={{
            width: d.size,
            height: d.size,
            background: `radial-gradient(circle at 30% 30%, rgba(200,230,255,0.8), rgba(140,200,255,0.3))`,
            boxShadow: "0 0 4px rgba(180,220,255,0.4)",
            animation: `droplet-fly ${d.duration}ms ease-out ${d.delay}ms forwards`,
            "--dx": `${Math.cos(d.angle) * d.distance}px`,
            "--dy": `${Math.sin(d.angle) * d.distance}px`,
          } as React.CSSProperties}
        />
      ))}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 60,
          height: 60,
          background: "radial-gradient(circle, rgba(200,230,255,0.25) 0%, transparent 70%)",
          animation: "pop-ring 500ms ease-out forwards",
        }}
      />
      <p
        className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-medium text-white/80"
        style={{ animation: "pop-message 1000ms ease-out forwards" }}
      >
        {message}
      </p>
    </div>
  );
}

const toolkitItems = [
  { label: "Claude CoWork + ChatGPT", detail: "Discovery" },
  { label: "Cursor + Claude", detail: "Design prototyping" },
  { label: "Dscout + Usertest", detail: "Research" },
  { label: "Figma", detail: "Design & handoff" },
];

const CYCLE_MS = 3000;
const FADE_MS = 200;

function ToolkitCycler() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFading(true);
      setTimeout(() => {
        setActiveIdx((prev) => (prev + 1) % toolkitItems.length);
        setFading(false);
      }, FADE_MS);
    }, CYCLE_MS);
    return () => clearTimeout(timeout);
  }, [activeIdx]);

  const tool = toolkitItems[activeIdx];

  return (
    <div className="mt-3 flex items-center gap-2 text-xs">
      <span className="text-zinc-500">Design toolkit</span>
      <span className="text-zinc-600">/</span>
      <span
        className={`inline-flex items-center gap-1.5 transition-opacity ${fading ? "opacity-0" : "opacity-100"}`}
        style={{ transitionDuration: `${FADE_MS}ms` }}
      >
        <span className="font-medium text-zinc-500">{tool.label}</span>
        <span className="text-zinc-600">·</span>
        <span className="text-zinc-500">{tool.detail}</span>
      </span>
    </div>
  );
}

const recentProjects: { title: string; tags: string[]; imageSrc?: string; videoSrc?: string; videoScale?: number }[] = [
  { title: "Metro/City Landing Pages", tags: ["Chewy • 2026"], videoSrc: "/highlights/metro-pages-mobile.mov" },
  { title: "Drop-off Appointments", tags: ["Chewy • 2026"], videoSrc: "/highlights/dropoff-cross-metro.mov" },
  { title: "Pet Portal Records", tags: ["Chewy • 2025"], videoSrc: "/highlights/records.mov", videoScale: 0.97 },
  { title: "See Similar", tags: ["Walmart • 2024"], videoSrc: "/highlights/see-similar.mov" },
];

const featuredProjects = [
  {
    title: "Walmart • GenAI Comparison • 2024",
    href: "/projects/walmart-genai-comparison",
    tags: [
      "↑ 2.6% add to cart / visitor",
      "↑ 1.1% first time buyer conversion",
      "↓ 1.8% session cart removal",
      "↑ 12.8% re-engagement",
    ],
    videoSrc: "/highlights/comparison-walkthrough.mov",
  },
  {
    title: "Nordstrom • Stores & Services • 2023",
    href: "/projects/nordstrom-stores-services",
    tags: [
      "↑ 1.6% conversion",
      "↑ 24k new alteration users (1 mo after launch)",
      "↑ $1.4M EBIT profitability over the year",
    ],
    videoSrc: "/highlights/stores-services.mov",
  },
];

const brands = [
  { name: "Chewy", logo: "/brands/chewy.png", width: 85, height: 24, hoverBg: "#1C49C2" },
  { name: "Walmart", logo: "/brands/walmart.png", width: 100, height: 22, hoverBg: "#0053E2" },
  { name: "Nordstrom", logo: "/brands/nordstrom.png", width: 110, height: 20, hoverBg: "#000000" },
  { name: "Nordstrom Rack", logo: "/brands/nordstrom-rack.png", logoHover: "/brands/nordstrom-rack-hover.png", width: 100, height: 22, hoverBg: "#BAEAFB" },
  { name: "Best Buy", logo: "/brands/bestbuy.png", logoHover: "/brands/bestbuy-hover.png", width: 70, height: 30, hoverBg: "#0046be" },
];

export default function Home() {
  const [phase, setPhase] = useState(-1);
  const [loadCount, setLoadCount] = useState(0);
  const [crumbling, setCrumbling] = useState(false);
  const [bubble1Popped, setBubble1Popped] = useState(false);
  const [bubble2Popped, setBubble2Popped] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hoveredHighlight, setHoveredHighlight] = useState<number | null>(null);

  function copyEmail() {
    navigator.clipboard.writeText("frankhuynhs@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  const [popEffects, setPopEffects] = useState<{ id: number; x: number; y: number }[]>([]);

  const playPopSound = useCallback(() => {
    try {
      const ctx = new AudioContext();
      const t = ctx.currentTime;

      const startFreq = 400 + Math.random() * 500;
      const endFreq = 80 + Math.random() * 120;
      const duration = 0.12 + Math.random() * 0.12;
      const volume = 0.2 + Math.random() * 0.15;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(startFreq, t);
      osc.frequency.exponentialRampToValueAtTime(endFreq, t + duration);
      gain.gain.setValueAtTime(volume, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + duration + 0.05);
      osc.start(t);
      osc.stop(t + duration + 0.05);

      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(startFreq * (1.4 + Math.random() * 0.4), t);
      osc2.frequency.exponentialRampToValueAtTime(endFreq * 0.8, t + duration * 0.8);
      gain2.gain.setValueAtTime(volume * 0.3, t);
      gain2.gain.exponentialRampToValueAtTime(0.001, t + duration * 0.7);
      osc2.start(t);
      osc2.stop(t + duration);

      const noiseDur = 0.04 + Math.random() * 0.06;
      const noise = ctx.createBufferSource();
      const buf = ctx.createBuffer(1, ctx.sampleRate * noiseDur, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * 0.12;
      noise.buffer = buf;
      const noiseGain = ctx.createGain();
      noise.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noiseGain.gain.setValueAtTime(0.15 + Math.random() * 0.1, t);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, t + noiseDur);
      noise.start(t);

      setTimeout(() => ctx.close(), 400);
    } catch {}
  }, []);

  const spawnPop = useCallback((e: React.MouseEvent) => {
    const id = Date.now();
    setPopEffects((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
    playPopSound();
  }, [playPopSound]);

  const removePop = useCallback((id: number) => {
    setPopEffects((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const [bubble1Offset, setBubble1Offset] = useState({ x: 0, y: 0 });
  const [bubble2Offset, setBubble2Offset] = useState({ x: 0, y: 0 });
  const [bubble1Returning, setBubble1Returning] = useState(false);
  const [bubble2Returning, setBubble2Returning] = useState(false);
  const drag1 = useRef<{ startX: number; startY: number; startOx: number; startOy: number; moved: boolean } | null>(null);
  const drag2 = useRef<{ startX: number; startY: number; startOx: number; startOy: number; moved: boolean } | null>(null);
  const lastDragPop = useRef(0);

  const handleBubbleDown = useCallback((e: React.MouseEvent, bubble: 1 | 2) => {
    e.preventDefault();
    const offset = bubble === 1 ? bubble1Offset : bubble2Offset;
    const dragRef = bubble === 1 ? drag1 : drag2;
    const setReturning = bubble === 1 ? setBubble1Returning : setBubble2Returning;
    const setOffset = bubble === 1 ? setBubble1Offset : setBubble2Offset;
    const setPopped = bubble === 1 ? setBubble1Popped : setBubble2Popped;

    setReturning(false);
    dragRef.current = { startX: e.clientX, startY: e.clientY, startOx: offset.x, startOy: offset.y, moved: false };

    const onMove = (ev: MouseEvent) => {
      if (!dragRef.current) return;
      const dx = ev.clientX - dragRef.current.startX;
      const dy = ev.clientY - dragRef.current.startY;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) dragRef.current.moved = true;
      setOffset({ x: dragRef.current.startOx + dx, y: dragRef.current.startOy + dy });
    };

    const onUp = (ev: MouseEvent) => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      if (dragRef.current?.moved) {
        lastDragPop.current = Date.now();
        const id = Date.now();
        setPopEffects((prev) => [...prev, { id, x: ev.clientX, y: ev.clientY }]);
        playPopSound();
        setPopped(true);
        setOffset({ x: 0, y: 0 });
        setTimeout(() => {
          setPopped(false);
          setReturning(false);
        }, 1500);
      }
      dragRef.current = null;
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, [bubble1Offset, bubble2Offset]);

  const handleBubbleClick = useCallback((e: React.MouseEvent, bubble: 1 | 2) => {
    if (Date.now() - lastDragPop.current < 100) return;
    const dragRef = bubble === 1 ? drag1 : drag2;
    if (dragRef.current?.moved) return;
    spawnPop(e);
    if (bubble === 1) {
      setBubble1Popped(true);
      setTimeout(() => setBubble1Popped(false), 1500);
    } else {
      setBubble2Popped(true);
      setTimeout(() => setBubble2Popped(false), 1500);
    }
  }, [spawnPop]);

  useEffect(() => {
    const played = sessionStorage.getItem("introPlayed");
    const reloadFlag = sessionStorage.getItem("homeReload");

    if (reloadFlag) {
      sessionStorage.removeItem("homeReload");
    } else if (played) {
      setPhase(3);
      return;
    }
    setPhase(0);
    const start = performance.now();
    const countDuration = 780;
    const tick = () => {
      const elapsed = performance.now() - start;
      const progress = Math.min(elapsed / countDuration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setLoadCount(Math.round(eased * 100));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    const tCrumble = setTimeout(() => setCrumbling(true), 1300);
    const t1 = setTimeout(() => setPhase(1), 1900);
    const t2 = setTimeout(() => setPhase(2), 2700);
    const t3 = setTimeout(() => { setPhase(3); sessionStorage.setItem("introPlayed", "1"); }, 3300);
    return () => { clearTimeout(tCrumble); clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  useEffect(() => {
    function onBeforeUnload() {
      sessionStorage.setItem("homeReload", "1");
    }
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#191919] font-sans text-zinc-100">
      <CustomCursor />
      {popEffects.map((p) => (
        <BubblePopParticles key={p.id} x={p.x} y={p.y} onDone={() => removePop(p.id)} />
      ))}
      {/* Intro splash */}
      {phase >= 0 && phase < 3 && (
        <div
          className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#191919] transition-all duration-700 ${
            phase >= 1 ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <div className="relative" style={{ width: 72, height: 80 }}>
            <Image
              src="/logo.svg"
              alt="FH"
              width={72}
              height={80}
              className={`opacity-80 transition-transform duration-500 ease-in-out ${
                loadCount >= 100 ? "rotate-[360deg]" : "rotate-0"
              } ${crumbling ? "invisible" : ""}`}
              priority
            />
            {crumbling && [1, 2, 3, 4, 5, 6].map((n) => (
              <img key={n} src="/logo.svg" alt="" width={72} height={80} className={`crumble-piece crumble-${n} opacity-80`} />
            ))}
          </div>
          <span
            className={`mt-4 tabular-nums text-sm font-medium tracking-widest text-zinc-500 transition-opacity duration-300 ${
              phase >= 1 ? "opacity-0" : "opacity-100"
            }`}
          >
            {loadCount}
          </span>
        </div>
      )}

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
      {phase >= 2 && (
        <div
          className="pointer-events-none fixed inset-0 z-0 grid-highlight"
          style={{
            backgroundImage: `
              linear-gradient(rgba(161,161,170,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(161,161,170,0.5) 1px, transparent 1px)
            `,
            backgroundSize: "28px 28px",
          }}
        />
      )}
      <div className={`transition-all duration-700 ${phase === -1 || phase >= 1 ? "opacity-100" : "opacity-0"}`}>
        <Navbar />
      </div>

      <main className="relative z-10 mx-auto max-w-6xl px-5 pt-40 sm:px-6 sm:pt-48 lg:px-8">
        {/* Hero Section */}
        <section className={`relative pt-12 pb-16 sm:pt-16 sm:pb-20 md:pt-20 md:pb-24 transition-all duration-700 ${phase === -1 || phase >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="absolute inset-0 hidden overflow-visible sm:block">
            <div
              className={`pointer-events-auto select-none absolute -top-4 right-[-80px] w-[180px] cursor-grab active:cursor-grabbing md:right-[-60px] md:w-[220px] lg:right-[-40px] lg:w-[250px] ${
                bubble1Popped ? "scale-0 opacity-0 transition-all duration-300" : "scale-100 opacity-100 transition-all duration-300"
              } ${bubble1Returning ? "transition-[transform,opacity] duration-[600ms] ease-out" : ""}`}
              style={{
                animation: bubble1Popped || drag1.current || bubble1Offset.x !== 0 || bubble1Offset.y !== 0 ? "none" : "bubble-float-1 8s ease-in-out infinite",
                transform: `translate(${bubble1Offset.x}px, ${bubble1Offset.y}px)`,
                ...(bubble1Returning ? { transition: "transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 300ms, scale 300ms" } : {}),
              }}
              onMouseDown={(e) => handleBubbleDown(e, 1)}
              onClick={(e) => handleBubbleClick(e, 1)}
            >
              <Image
                src="/bubble1.png"
                alt=""
                width={600}
                height={669}
                className="w-full select-none pointer-events-none"
                draggable={false}
                quality={100}
                unoptimized
              />
            </div>
            <div
              className={`pointer-events-auto select-none absolute bottom-12 right-[160px] w-[180px] cursor-grab active:cursor-grabbing md:right-[200px] md:w-[220px] lg:right-[240px] lg:w-[250px] ${
                bubble2Popped ? "scale-0 opacity-0 transition-all duration-300" : "scale-100 opacity-100 transition-all duration-300"
              } ${bubble2Returning ? "transition-[transform,opacity] duration-[600ms] ease-out" : ""}`}
              style={{
                animation: bubble2Popped || drag2.current || bubble2Offset.x !== 0 || bubble2Offset.y !== 0 ? "none" : "bubble-float-2 10s ease-in-out infinite",
                transform: `translate(${bubble2Offset.x}px, ${bubble2Offset.y}px)`,
                ...(bubble2Returning ? { transition: "transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 300ms, scale 300ms" } : {}),
              }}
              onMouseDown={(e) => handleBubbleDown(e, 2)}
              onClick={(e) => handleBubbleClick(e, 2)}
            >
              <Image
                src="/bubble2.png"
                alt=""
                width={675}
                draggable={false}
                height={579}
                className="w-full select-none pointer-events-none"
                quality={100}
                unoptimized
              />
            </div>
          </div>
          <div className="relative max-w-xl">
            <p className="text-base sm:text-lg text-[#b3b3b3]">
              Product Designer
            </p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              {"Franklin Huynh".split("").map((char, i) => (
                <span
                  key={i}
                  className={phase >= 2 ? "skeleton-letter" : "text-transparent"}
                  style={{
                    animationDelay: phase >= 2 ? `${i * 0.06}s` : undefined,
                    minWidth: char === " " ? "0.3em" : undefined,
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h1>
            <ToolkitCycler />
            <p className="mt-8 max-w-xl text-base sm:text-lg leading-7 text-[#f5f5f5]">
              5+ years design experience in e-commerce + consumer facing roles for iOS, Android, and Web across mobile, tablet, desktop devices.
            </p>
            <button
              onClick={() => {
                const el = document.getElementById("highlights");
                if (el) {
                  const y = el.getBoundingClientRect().top + window.scrollY + 40;
                  const start = window.scrollY;
                  const distance = y - start;
                  const duration = 1200;
                  let startTime: number | null = null;
                  function step(timestamp: number) {
                    if (!startTime) startTime = timestamp;
                    const elapsed = timestamp - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const ease = progress < 0.5
                      ? 4 * progress * progress * progress
                      : 1 - Math.pow(-2 * progress + 2, 3) / 2;
                    window.scrollTo(0, start + distance * ease);
                    if (progress < 1) requestAnimationFrame(step);
                  }
                  requestAnimationFrame(step);
                }
              }}
              className="relative mt-6 inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:scale-105"
            >
              <div aria-hidden className="pointer-events-none absolute inset-0 rounded-full">
                <div className="absolute inset-0 rounded-full bg-[#1d1d1d] mix-blend-plus-lighter" />
                <div className="absolute inset-0 rounded-full bg-[rgba(29,29,29,0.2)] mix-blend-color-burn" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[rgba(102,102,102,0)] from-50% to-[rgba(102,102,102,0.4)] mix-blend-plus-lighter opacity-40 sm:opacity-100" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[rgba(102,102,102,0.2)] to-[rgba(102,102,102,0)] to-[33%] mix-blend-plus-lighter backdrop-blur-[6px] sm:backdrop-blur-[12px]" />
              </div>
              <span className="relative z-10">View work</span>
              <svg
                className="relative z-10"
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14" />
                <path d="m19 12-7 7-7-7" />
              </svg>
              <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_16px_16px_9px_-18px_rgba(255,255,255,0.5),inset_-12px_-12px_6px_-14px_#b3b3b3,inset_2px_2px_1px_-2px_#b3b3b3,inset_0px_0px_22px_0px_rgba(242,242,242,0.5)]" />
            </button>
          </div>
        </section>

        {/* Where I've Worked */}
        <section className={`py-16 sm:py-24 transition-all duration-700 ${phase === -1 || phase >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="flex flex-col items-start gap-2 text-left text-base sm:items-center sm:text-center sm:text-lg text-[#f5f5f5]">
            <p>I&apos;ve solved complex problems for industry leading companies</p>
            <p className="font-bold">📍 Design at Chewy 🐶🐱</p>
          </div>
          <div className="mt-8">
            <div className="flex flex-wrap items-center justify-start gap-3 sm:justify-center sm:gap-4">
            {brands.map((brand, i) => (
              <div
                key={i}
                className="group/brand relative flex h-[72px] w-[calc(33.333%-8px)] items-center justify-center rounded-2xl bg-zinc-800/40 px-3 transition-all duration-300 hover:scale-105 hover:-rotate-2 sm:h-[96px] sm:w-auto sm:flex-1 sm:px-6"
              >
                {/* Hover icons */}
                <div className="absolute -bottom-10 left-1/2 z-20 flex -translate-x-1/2 items-start gap-1 opacity-0 transition-all duration-300 group-hover/brand:opacity-100 group-hover/brand:-bottom-12">
                  {brand.name === "Chewy" && (<>
                    {/* Dog */}
                    <svg width="32" height="32" viewBox="0 0 64 64" fill="none">
                      <path d="M10 20C10 14 12 6 18 8C22 9 22 14 22 18" fill="#8d6e4a" />
                      <path d="M54 20C54 14 52 6 46 8C42 9 42 14 42 18" fill="#8d6e4a" />
                      <path d="M12 22C12 22 10 44 18 52C22 56 28 58 32 58C36 58 42 56 46 52C54 44 52 22 52 22C52 22 48 16 32 16C16 16 12 22 12 22Z" fill="#c49a6c" />
                      <path d="M10 20C10 14 13 8 18 10C21 11 21 15 21 18" fill="#d4a96a" />
                      <path d="M54 20C54 14 51 8 46 10C43 11 43 15 43 18" fill="#d4a96a" />
                      <ellipse cx="24" cy="30" rx="3.5" ry="4" fill="#333" />
                      <ellipse cx="40" cy="30" rx="3.5" ry="4" fill="#333" />
                      <ellipse cx="25" cy="29" rx="1.5" ry="1.5" fill="#fff" />
                      <ellipse cx="41" cy="29" rx="1.5" ry="1.5" fill="#fff" />
                      <ellipse cx="32" cy="38" rx="4" ry="3" fill="#333" />
                      <path d="M28 42C28 42 30 45 32 45C34 45 36 42 36 42" stroke="#333" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                    </svg>
                    {/* Cat */}
                    <svg width="32" height="32" viewBox="0 0 64 64" fill="none">
                      <path d="M12 18C12 12 16 4 22 4C26 4 28 8 28 12" fill="#f9a825" />
                      <path d="M52 18C52 12 48 4 42 4C38 4 36 8 36 12" fill="#f9a825" />
                      <path d="M10 22C10 22 8 44 16 52C20 56 28 58 32 58C36 58 44 56 48 52C56 44 54 22 54 22C54 22 50 16 32 16C14 16 10 22 10 22Z" fill="#f9a825" />
                      <path d="M12 18C12 12 16 6 22 6C25 6 26 9 26 12" fill="#fbc02d" />
                      <path d="M52 18C52 12 48 6 42 6C39 6 38 9 38 12" fill="#fbc02d" />
                      <ellipse cx="24" cy="30" rx="4" ry="4.5" fill="#333" />
                      <ellipse cx="40" cy="30" rx="4" ry="4.5" fill="#333" />
                      <ellipse cx="25" cy="29" rx="1.5" ry="1.5" fill="#fff" />
                      <ellipse cx="41" cy="29" rx="1.5" ry="1.5" fill="#fff" />
                      <ellipse cx="32" cy="37" rx="3" ry="2" fill="#e88" />
                      <path d="M29 39C29 39 30.5 42 32 42C33.5 42 35 39 35 39" stroke="#333" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                      <line x1="14" y1="34" x2="22" y2="32" stroke="#d4a" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
                      <line x1="14" y1="37" x2="22" y2="36" stroke="#d4a" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
                      <line x1="42" y1="32" x2="50" y2="34" stroke="#d4a" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
                      <line x1="42" y1="36" x2="50" y2="37" stroke="#d4a" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
                    </svg>
                  </>)}
                  {brand.name === "Walmart" && (<>
                    {/* Shopping bag */}
                    <svg width="28" height="28" viewBox="0 0 64 64" fill="none">
                      <path d="M14 24H50L46 56H18L14 24Z" fill="#ffc220" />
                      <path d="M14 24H50L48 28H16L14 24Z" fill="#e6ad00" />
                      <path d="M24 24V18C24 13.6 27.6 10 32 10C36.4 10 40 13.6 40 18V24" stroke="#c49000" strokeWidth="3" fill="none" strokeLinecap="round" />
                      <rect x="28" y="34" width="8" height="10" rx="2" fill="#e6ad00" />
                    </svg>
                    {/* Apple */}
                    <svg width="28" height="28" viewBox="0 0 64 64" fill="none">
                      <path d="M32 16C28 10 34 4 36 6C38 8 34 12 32 16Z" fill="#4caf50" />
                      <path d="M32 18C22 18 14 28 14 40C14 52 22 58 28 58C30 58 31 56 32 56C33 56 34 58 36 58C42 58 50 52 50 40C50 28 42 18 32 18Z" fill="#f44336" />
                      <path d="M32 18C28 18 24 22 22 28C26 24 30 22 32 22C34 22 38 24 42 28C40 22 36 18 32 18Z" fill="#e53935" opacity="0.5" />
                      <ellipse cx="26" cy="36" rx="3" ry="4" fill="#ef5350" opacity="0.4" />
                    </svg>
                  </>)}
                  {brand.name === "Nordstrom" && null}
                  {brand.name === "Nordstrom Rack" && (<>
                    {/* Shirt */}
                    <svg width="28" height="28" viewBox="0 0 64 64" fill="none">
                      <path d="M22 8L16 16L8 12L14 28V56H50V28L56 12L48 16L42 8H22Z" fill="#4a9eff" />
                      <path d="M22 8L28 18H36L42 8" stroke="#3a8eef" strokeWidth="1" fill="none" />
                      <path d="M28 18L32 22L36 18" stroke="#3a8eef" strokeWidth="1" fill="none" />
                      <path d="M32 22V34" stroke="#3a8eef" strokeWidth="1" />
                      <path d="M16 16L8 12L14 28" stroke="#3a8eef" strokeWidth="0.5" fill="none" />
                      <path d="M48 16L56 12L50 28" stroke="#3a8eef" strokeWidth="0.5" fill="none" />
                    </svg>
                    {/* Pants */}
                    <svg width="28" height="28" viewBox="0 0 64 64" fill="none">
                      <path d="M16 8H48V20L40 56H36L32 28L28 56H24L16 20V8Z" fill="#2962ff" />
                      <path d="M16 8H48" stroke="#1e56e0" strokeWidth="2" />
                      <path d="M32 8V28" stroke="#1e56e0" strokeWidth="0.5" />
                      <path d="M16 8V20L24 56H28L32 28" stroke="#1e56e0" strokeWidth="0.5" fill="none" />
                      <path d="M48 8V20L40 56H36L32 28" stroke="#1e56e0" strokeWidth="0.5" fill="none" />
                      <rect x="20" y="10" width="4" height="2" rx="0.5" fill="#1e56e0" opacity="0.5" />
                    </svg>
                  </>)}
                  {brand.name === "Best Buy" && (<>
                    {/* TV */}
                    <svg width="28" height="28" viewBox="0 0 64 64" fill="none">
                      <rect x="6" y="10" width="52" height="34" rx="3" fill="#1a1a1a" />
                      <rect x="9" y="13" width="46" height="28" rx="1" fill="#2196f3" />
                      <rect x="24" y="46" width="16" height="4" rx="1" fill="#333" />
                      <rect x="18" y="50" width="28" height="3" rx="1.5" fill="#1a1a1a" />
                      <path d="M14 22L24 30L14 38" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.4" />
                    </svg>
                    {/* Headphones */}
                    <svg width="28" height="28" viewBox="0 0 64 64" fill="none">
                      <path d="M12 34C12 22 20 12 32 12C44 12 52 22 52 34" stroke="#ffc220" strokeWidth="4" fill="none" strokeLinecap="round" />
                      <rect x="8" y="32" width="10" height="18" rx="5" fill="#ffc220" />
                      <rect x="46" y="32" width="10" height="18" rx="5" fill="#ffc220" />
                      <rect x="10" y="34" width="6" height="14" rx="3" fill="#ffd54f" />
                      <rect x="48" y="34" width="6" height="14" rx="3" fill="#ffd54f" />
                    </svg>
                  </>)}
                </div>
                {brand.name === "Nordstrom" && (
                  <div className="absolute -bottom-10 left-1/2 z-20 flex -translate-x-1/2 items-start gap-1 opacity-0 transition-all duration-300 group-hover/brand:opacity-100 group-hover/brand:-bottom-12">
                    {/* Red high heel */}
                    <svg width="28" height="28" viewBox="0 0 64 64" fill="none">
                      <path d="M10 42L20 18C21 15 24 14 26 16L34 28C36 31 40 34 46 34H56C58 34 60 36 60 38V42C60 44 58 46 56 46H10C8 46 8 42 10 42Z" fill="#e53935" />
                      <path d="M20 18C21 15 24 14 26 16L32 26C30 28 26 26 24 24L20 18Z" fill="#ef5350" />
                      <path d="M10 42H60V44C60 45 59 46 58 46H12C10 46 9 44 10 42Z" fill="#c62828" />
                      <rect x="14" y="42" width="4" height="10" rx="1.5" fill="#c62828" />
                      <path d="M46 34H56C58 34 60 36 60 38" stroke="#ef5350" strokeWidth="0.5" fill="none" />
                    </svg>
                    {/* Spring dress */}
                    <svg width="28" height="28" viewBox="0 0 64 64" fill="none">
                      <path d="M28 6C28 6 30 4 32 4C34 4 36 6 36 6" stroke="#f8bbd0" strokeWidth="2" fill="none" strokeLinecap="round" />
                      <path d="M26 8H38L40 16H24L26 8Z" fill="#fff9c4" />
                      <path d="M24 16L16 48C16 48 20 54 32 54C44 54 48 48 48 48L40 16H24Z" fill="#fff9c4" />
                      <path d="M16 48C16 48 20 54 32 54C44 54 48 48 48 48" stroke="#f0e68c" strokeWidth="0.5" fill="none" />
                      <circle cx="28" cy="24" r="1.5" fill="#f48fb1" />
                      <circle cx="36" cy="28" r="1.5" fill="#81c784" />
                      <circle cx="30" cy="34" r="1.5" fill="#64b5f6" />
                      <circle cx="38" cy="38" r="1.5" fill="#f48fb1" />
                      <circle cx="26" cy="42" r="1.5" fill="#fff176" />
                      <circle cx="34" cy="46" r="1.5" fill="#81c784" />
                      <circle cx="40" cy="22" r="1" fill="#ce93d8" />
                      <circle cx="24" cy="30" r="1" fill="#ffab91" />
                      <circle cx="36" cy="50" r="1" fill="#64b5f6" />
                    </svg>
                  </div>
                )}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover/brand:opacity-100"
                  style={{ background: brand.hoverBg }}
                />
                {brand.logo ? (
                  "logoHover" in brand && brand.logoHover ? (
                    <>
                      <Image
                        src={brand.logo}
                        alt={brand.name}
                        width={brand.width}
                        height={brand.height}
                        className="relative z-10 opacity-50 brightness-0 invert grayscale transition-all duration-300 group-hover/brand:opacity-0"
                      />
                      <Image
                        src={brand.logoHover}
                        alt={brand.name}
                        width={brand.width}
                        height={brand.height}
                        className="absolute z-10 opacity-0 transition-all duration-300 group-hover/brand:opacity-100"
                      />
                    </>
                  ) : (
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      width={brand.width}
                      height={brand.height}
                      className="relative z-10 opacity-50 grayscale transition-all duration-300 group-hover/brand:opacity-100 group-hover/brand:grayscale-0 group-hover/brand:brightness-125 group-hover/brand:saturate-150"
                    />
                  )
                ) : (
                  <span className="relative z-10 text-base sm:text-lg font-bold text-zinc-500 transition-colors duration-300 group-hover/brand:text-white">{brand.name}</span>
                )}
              </div>
            ))}
            </div>
          </div>
        </section>

        {/* Recent Highlights */}
        <section id="highlights" className="pt-16 sm:pt-24 scroll-mt-8">
          <h2 className="text-3xl font-bold tracking-tight text-[#f5f5f5] sm:text-4xl md:text-5xl">
            Recent highlights
          </h2>
        </section>
      </main>
      <HighlightsCarousel>
        {recentProjects.map((project, i) => (
          <div
            key={i}
            className="shrink-0 transition-transform duration-300 ease-out group-hover/carousel:scale-[0.96] hover:!scale-105"
            onMouseEnter={() => setHoveredHighlight(i)}
            onMouseLeave={() => setHoveredHighlight(null)}
          >
            <ProjectCard
              title={project.title}
              tags={project.tags}
              imageSrc={project.imageSrc}
              videoSrc={project.videoSrc}
              videoScale={project.videoScale}
              variant="highlight"
              playing={hoveredHighlight === null ? undefined : hoveredHighlight === i}
            />
          </div>
        ))}
      </HighlightsCarousel>
      <main className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">

        {/* Featured Case Studies */}
        <section className="pt-16 pb-14 sm:pt-24 sm:pb-18">
          <h2 className="text-3xl font-bold tracking-tight text-[#f5f5f5] sm:text-4xl md:text-5xl">
            Featured case studies
          </h2>
          <div className="group/featured mt-10 flex flex-col gap-8">
            {featuredProjects.map((project, i) => (
              <div
                key={i}
                className="transition-transform duration-300 ease-out group-hover/featured:scale-[0.98] hover:!scale-[1.02]"
              >
                <ProjectCard
                  title={project.title}
                  href={"href" in project ? project.href : undefined}
                  tags={project.tags}
                  videoSrc={(project as any).videoSrc}
                  imageSrc={(project as any).imageSrc}
                  variant="featured"
                />
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="relative z-10 -mt-2 border-t border-zinc-800 py-6 sm:-mt-2 sm:py-8">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8 text-center">
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
            <button
              onClick={copyEmail}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-700 px-6 py-3 text-sm font-medium text-zinc-300 transition-all duration-300 hover:scale-105 hover:border-zinc-500 hover:text-white"
            >
              {copied ? "Copied!" : "Copy email"}
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
