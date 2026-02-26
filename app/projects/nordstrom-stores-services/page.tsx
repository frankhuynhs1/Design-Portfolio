"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import CustomCursor from "../../components/CustomCursor";
import ProjectCard from "../../components/ProjectCard";

const metrics = [
  { prefix: "+", num: 24, suffix: "k", label: "New & unique customers using alterations (1 mo after launch)" },
  { prefix: "+", num: 1.63, suffix: "%", label: "Overall conversion" },
  { prefix: "+$", num: 1.4, suffix: "M", label: "EBIT / Profitability over the year" },
];

function AnimatedMetric({ prefix, num, suffix, duration = 1.6 }: { prefix: string; num: number; suffix: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState("0");
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

const teamMembers = [
  "Franklin Huynh (UX Designer)",
  "Aneesa Memon (Product Manager)",
  "Emily Hou (Technical Program Manager)",
  "Tiffany Clark (UX Researcher)",
  "Surabhi Sakhalkar (UX Researcher)",
  "Annelise Schuler (UX Researcher)",
  "Lianne Minnis (UX Content Design)",
  "Tai Ho (Engineer)",
  "Chelsea Carr (Engineer)",
  "Seth Root (Engineer)",
  "Alan Long (Engineer)",
  "Ashley Zammitt (UX Design Manager)",
];

export default function NordstromStoresServices() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#191919] font-sans text-zinc-100">
      <CustomCursor />
      <Navbar />

      <main className="relative z-10 mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="pt-32 pb-10 sm:pt-40 sm:pb-14">
          <p className="text-base sm:text-lg text-[#b3b3b3]">Nordstrom – Stores &amp; Services</p>
          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-[#f5f5f5] sm:text-4xl md:text-5xl">
            Helping customers understand the benefits we offer is essential to Nordstrom&apos;s exceptional service
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-[#b3b3b3] sm:text-lg">
            Leadership wants to shift some of the fulfillment load back to our stores and welcome customers back following the online shopping surges during the pandemic.
          </p>
        </section>

        {/* Metrics */}
        <section className="pb-10 sm:pb-10">
          <div className="grid grid-cols-3 gap-4 sm:gap-6">
            {metrics.map((m, i) => (
              <div key={i} className="rounded-2xl bg-[#222222] p-5 sm:p-6">
                <p className="text-2xl font-bold text-green-400 sm:text-3xl">
                  <AnimatedMetric prefix={m.prefix} num={m.num} suffix={m.suffix} />
                </p>
                <p className="mt-2 text-sm leading-5 text-[#888]">{m.label}</p>
              </div>
            ))}
          </div>
          <div className="relative left-1/2 -translate-x-1/2 mt-8 w-[85vw] overflow-hidden rounded-xl">
            <Image src="/projects/nordstrom-stores/stores.png" alt="Nordstrom Stores & Services overview" width={1920} height={1080} className="w-full" quality={90} unoptimized />
          </div>
        </section>

        {/* Project Details */}
        <section className="py-10 sm:py-14">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            <div>
              <p className="text-sm font-bold text-[#888]">Role</p>
              <p className="mt-1 text-base text-[#f5f5f5]">Designer</p>
            </div>
            <div>
              <p className="text-sm font-bold text-[#888]">Domain</p>
              <p className="mt-1 text-base text-[#f5f5f5]">Fulfillment &amp; Returns</p>
            </div>
            <div>
              <p className="text-sm font-bold text-[#888]">Date</p>
              <p className="mt-1 text-base text-[#f5f5f5]">2023</p>
            </div>
            <div>
              <p className="text-sm font-bold text-[#888]">Responsibilities</p>
              <p className="mt-1 text-base text-[#f5f5f5]">Discovery, Journeys, Strategy, Research, Testing, UX, Execution</p>
            </div>
          </div>
        </section>

        {/* Discovery */}
        <section className="py-10 sm:py-14">
          <p className="text-sm font-bold uppercase tracking-wider text-[#888]">Discovery</p>
          <h2 className="mt-4 text-2xl font-bold text-[#f5f5f5] sm:text-3xl">
            Customer problem – many customers do not understand how coming into their local Nordstrom store may fit into the picture when shopping digitally
          </h2>

          <div className="mt-14 flex gap-4">
            <div className="group/img1 flex-1">
              <p className="mb-1 text-center text-lg font-bold text-[#f5f5f5]">Low discovery</p>
              <p className="mb-3 max-h-0 overflow-hidden text-center text-sm text-[#b3b3b3] opacity-0 transition-all duration-300 group-hover/img1:max-h-20 group-hover/img1:opacity-100">Store info and services are buried</p>
              <div className="overflow-hidden rounded-xl">
                <Image src="/projects/nordstrom-stores/problem1.png" alt="Customer problem insight 1" width={1920} height={1080} className="w-full" quality={90} unoptimized />
              </div>
            </div>
            <div className="group/img2 flex-1">
              <p className="mb-1 text-center text-lg font-bold text-[#f5f5f5]">Dead ends</p>
              <p className="mb-3 max-h-0 overflow-hidden text-center text-sm text-[#b3b3b3] opacity-0 transition-all duration-300 group-hover/img2:max-h-20 group-hover/img2:opacity-100">Missing tablestake details and booking options</p>
              <div className="overflow-hidden rounded-xl">
                <Image src="/projects/nordstrom-stores/problem2.png" alt="Customer problem insight 2" width={1920} height={1080} className="w-full" quality={90} unoptimized />
              </div>
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-10">
            <div>
              <h3 className="text-2xl font-bold text-[#f5f5f5] sm:text-3xl">85% of our customers live within 10 miles of a Nordstrom store</h3>
              <p className="mt-3 text-base leading-7 text-[#b3b3b3]">
                This presents a huge opportunity to target our app customer segments first, who are usually our most loyal customers and most likely to go to our stores and use our services.
              </p>
              <div className="mt-8" style={{ mask: "radial-gradient(circle at center, black 45%, transparent 80%)", WebkitMask: "radial-gradient(circle at center, black 45%, transparent 80%)" }}>
                <svg viewBox="0 0 520 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                  <rect width="520" height="360" fill="#1c1c1e" />
                  {/* Building blocks */}
                  <rect x="103" y="58" rx="1.5" ry="1.5" width="24" height="14" fill="#252527" />
                  <rect x="133" y="58" rx="1.5" ry="1.5" width="24" height="14" fill="#232325" />
                  <rect x="103" y="78" rx="1.5" ry="1.5" width="12" height="18" fill="#232325" />
                  <rect x="118" y="78" rx="1.5" ry="1.5" width="10" height="18" fill="#252527" />
                  <rect x="163" y="58" rx="1.5" ry="1.5" width="15" height="14" fill="#252527" />
                  <rect x="182" y="58" rx="1.5" ry="1.5" width="15" height="14" fill="#232325" />
                  <rect x="163" y="78" rx="1.5" ry="1.5" width="34" height="18" fill="#252527" />
                  <rect x="222" y="58" rx="1.5" ry="1.5" width="34" height="14" fill="#232325" />
                  <rect x="222" y="78" rx="1.5" ry="1.5" width="15" height="18" fill="#252527" />
                  <rect x="240" y="78" rx="1.5" ry="1.5" width="16" height="18" fill="#232325" />
                  <rect x="103" y="103" rx="1.5" ry="1.5" width="24" height="14" fill="#252527" />
                  <rect x="133" y="103" rx="1.5" ry="1.5" width="24" height="14" fill="#232325" />
                  <rect x="103" y="123" rx="1.5" ry="1.5" width="54" height="14" fill="#252527" />
                  <rect x="163" y="103" rx="1.5" ry="1.5" width="14" height="34" fill="#232325" />
                  <rect x="183" y="103" rx="1.5" ry="1.5" width="14" height="14" fill="#252527" />
                  <rect x="203" y="103" rx="1.5" ry="1.5" width="20" height="14" fill="#232325" />
                  <rect x="333" y="103" rx="1.5" ry="1.5" width="28" height="14" fill="#252527" />
                  <rect x="368" y="103" rx="1.5" ry="1.5" width="28" height="14" fill="#232325" />
                  <rect x="333" y="123" rx="1.5" ry="1.5" width="28" height="14" fill="#232325" />
                  <rect x="368" y="123" rx="1.5" ry="1.5" width="28" height="14" fill="#252527" />
                  <rect x="403" y="58" rx="1.5" ry="1.5" width="24" height="14" fill="#252527" />
                  <rect x="433" y="58" rx="1.5" ry="1.5" width="24" height="14" fill="#232325" />
                  <rect x="403" y="78" rx="1.5" ry="1.5" width="54" height="18" fill="#232325" />
                  <rect x="403" y="103" rx="1.5" ry="1.5" width="24" height="34" fill="#252527" />
                  <rect x="433" y="103" rx="1.5" ry="1.5" width="24" height="14" fill="#232325" />
                  {/* Lower blocks */}
                  <rect x="163" y="258" rx="1.5" ry="1.5" width="34" height="18" fill="#252527" />
                  <rect x="203" y="258" rx="1.5" ry="1.5" width="34" height="18" fill="#232325" />
                  <rect x="163" y="283" rx="1.5" ry="1.5" width="24" height="14" fill="#232325" />
                  <rect x="193" y="283" rx="1.5" ry="1.5" width="24" height="14" fill="#252527" />
                  <rect x="223" y="283" rx="1.5" ry="1.5" width="24" height="14" fill="#232325" />
                  <rect x="103" y="258" rx="1.5" ry="1.5" width="24" height="18" fill="#252527" />
                  <rect x="133" y="258" rx="1.5" ry="1.5" width="24" height="18" fill="#232325" />
                  <rect x="103" y="303" rx="1.5" ry="1.5" width="54" height="24" fill="#252527" />
                  <rect x="163" y="303" rx="1.5" ry="1.5" width="34" height="24" fill="#232325" />
                  <rect x="333" y="258" rx="1.5" ry="1.5" width="28" height="18" fill="#252527" />
                  <rect x="368" y="258" rx="1.5" ry="1.5" width="28" height="18" fill="#232325" />
                  <rect x="333" y="283" rx="1.5" ry="1.5" width="64" height="14" fill="#232325" />
                  <rect x="403" y="258" rx="1.5" ry="1.5" width="24" height="18" fill="#232325" />
                  <rect x="433" y="258" rx="1.5" ry="1.5" width="24" height="18" fill="#252527" />
                  {/* Minor streets */}
                  <line x1="130" y1="55" x2="130" y2="100" stroke="#252527" strokeWidth="0.5" />
                  <line x1="130" y1="140" x2="130" y2="195" stroke="#252527" strokeWidth="0.5" />
                  <line x1="180" y1="100" x2="180" y2="140" stroke="#252527" strokeWidth="0.5" />
                  <line x1="220" y1="55" x2="220" y2="100" stroke="#252527" strokeWidth="0.5" />
                  <line x1="240" y1="140" x2="240" y2="255" stroke="#252527" strokeWidth="0.5" />
                  <line x1="300" y1="140" x2="300" y2="255" stroke="#252527" strokeWidth="0.5" />
                  <line x1="365" y1="100" x2="365" y2="140" stroke="#252527" strokeWidth="0.5" />
                  <line x1="430" y1="55" x2="430" y2="100" stroke="#252527" strokeWidth="0.5" />
                  <line x1="430" y1="140" x2="430" y2="255" stroke="#252527" strokeWidth="0.5" />
                  <line x1="100" y1="75" x2="260" y2="75" stroke="#252527" strokeWidth="0.5" />
                  <line x1="100" y1="120" x2="160" y2="120" stroke="#252527" strokeWidth="0.5" />
                  <line x1="330" y1="120" x2="400" y2="120" stroke="#252527" strokeWidth="0.5" />
                  <line x1="160" y1="280" x2="250" y2="280" stroke="#252527" strokeWidth="0.5" />
                  <line x1="330" y1="280" x2="400" y2="280" stroke="#252527" strokeWidth="0.5" />
                  {/* Major streets — horizontal */}
                  <line x1="60" y1="55" x2="520" y2="55" stroke="#2c2c2e" strokeWidth="1.5" />
                  <line x1="0" y1="100" x2="520" y2="100" stroke="#2c2c2e" strokeWidth="1" />
                  <line x1="60" y1="140" x2="240" y2="140" stroke="#2c2c2e" strokeWidth="1" />
                  <line x1="290" y1="140" x2="520" y2="140" stroke="#2c2c2e" strokeWidth="1" />
                  <line x1="0" y1="255" x2="520" y2="255" stroke="#2c2c2e" strokeWidth="1.5" />
                  <line x1="60" y1="300" x2="420" y2="300" stroke="#2c2c2e" strokeWidth="1" />
                  <line x1="80" y1="330" x2="240" y2="330" stroke="#2c2c2e" strokeWidth="0.7" />
                  {/* Major streets — vertical */}
                  <line x1="100" y1="0" x2="100" y2="210" stroke="#2c2c2e" strokeWidth="1.5" />
                  <line x1="100" y1="260" x2="100" y2="360" stroke="#2c2c2e" strokeWidth="1.5" />
                  <line x1="160" y1="0" x2="160" y2="150" stroke="#2c2c2e" strokeWidth="1" />
                  <line x1="160" y1="170" x2="160" y2="360" stroke="#2c2c2e" strokeWidth="1" />
                  <line x1="200" y1="55" x2="200" y2="360" stroke="#2c2c2e" strokeWidth="0.7" />
                  <line x1="330" y1="0" x2="330" y2="360" stroke="#2c2c2e" strokeWidth="1" />
                  <line x1="400" y1="0" x2="400" y2="360" stroke="#2c2c2e" strokeWidth="1.5" />
                  <line x1="460" y1="0" x2="460" y2="280" stroke="#2c2c2e" strokeWidth="0.7" />
                  {/* Highway — curved main road */}
                  <path d="M0 200 Q100 190 160 160 Q220 130 280 140 Q360 155 420 120 L520 90" stroke="#3a3a3c" strokeWidth="6" strokeLinecap="round" />
                  <path d="M0 200 Q100 190 160 160 Q220 130 280 140 Q360 155 420 120 L520 90" stroke="#48484a" strokeWidth="4" strokeLinecap="round" />
                  {/* Secondary highway */}
                  <path d="M260 0 Q255 60 270 120 Q285 180 260 240 Q240 290 250 360" stroke="#3a3a3c" strokeWidth="4" strokeLinecap="round" />
                  <path d="M260 0 Q255 60 270 120 Q285 180 260 240 Q240 290 250 360" stroke="#48484a" strokeWidth="2.5" strokeLinecap="round" />
                  {/* 10 mi radius */}
                  <circle cx="260" cy="180" r="140" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="5 3" />
                  <circle cx="260" cy="180" r="140" fill="rgba(255,255,255,0.015)" />
                  {/* Customer dots — animated */}
                  {/* Dense near store */}
                  <circle cx="245" cy="165" r="2" fill="#fff" className="map-dot" style={{ animationDelay: "0s" }} />
                  <circle cx="275" cy="170" r="2" fill="#fff" className="map-dot" style={{ animationDelay: "0.3s" }} />
                  <circle cx="250" cy="190" r="2" fill="#fff" className="map-dot" style={{ animationDelay: "0.7s" }} />
                  <circle cx="272" cy="192" r="2" fill="#fff" className="map-dot" style={{ animationDelay: "1.1s" }} />
                  <circle cx="240" cy="180" r="2" fill="#fff" className="map-dot" style={{ animationDelay: "1.5s" }} />
                  <circle cx="280" cy="160" r="2" fill="#fff" className="map-dot" style={{ animationDelay: "0.4s" }} />
                  <circle cx="255" cy="198" r="2" fill="#fff" className="map-dot" style={{ animationDelay: "2.0s" }} />
                  <circle cx="268" cy="155" r="2" fill="#fff" className="map-dot" style={{ animationDelay: "1.8s" }} />
                  <circle cx="242" cy="172" r="1.5" fill="#fff" className="map-dot" style={{ animationDelay: "2.3s" }} />
                  <circle cx="278" cy="185" r="1.5" fill="#fff" className="map-dot" style={{ animationDelay: "0.9s" }} />
                  {/* Mid-range */}
                  <circle cx="210" cy="150" r="1.5" fill="#fff" className="map-dot" style={{ animationDelay: "1.2s" }} />
                  <circle cx="310" cy="155" r="1.5" fill="#fff" className="map-dot" style={{ animationDelay: "2.5s" }} />
                  <circle cx="220" cy="210" r="1.5" fill="#fff" className="map-dot" style={{ animationDelay: "0.6s" }} />
                  <circle cx="300" cy="215" r="1.5" fill="#fff" className="map-dot" style={{ animationDelay: "1.7s" }} />
                  <circle cx="195" cy="180" r="1.5" fill="#fff" className="map-dot" style={{ animationDelay: "3.0s" }} />
                  <circle cx="325" cy="175" r="1.5" fill="#fff" className="map-dot" style={{ animationDelay: "2.1s" }} />
                  <circle cx="230" cy="130" r="1.5" fill="#fff" className="map-dot" style={{ animationDelay: "0.2s" }} />
                  <circle cx="290" cy="125" r="1.5" fill="#fff" className="map-dot" style={{ animationDelay: "2.8s" }} />
                  <circle cx="205" cy="200" r="1.5" fill="#fff" className="map-dot" style={{ animationDelay: "3.3s" }} />
                  <circle cx="315" cy="200" r="1.5" fill="#fff" className="map-dot" style={{ animationDelay: "1.4s" }} />
                  {/* Outer edge */}
                  <circle cx="165" cy="120" r="1.5" fill="#fff" className="map-dot" style={{ animationDelay: "3.6s" }} />
                  <circle cx="355" cy="130" r="1.5" fill="#fff" className="map-dot" style={{ animationDelay: "2.7s" }} />
                  <circle cx="175" cy="240" r="1.5" fill="#fff" className="map-dot" style={{ animationDelay: "1.0s" }} />
                  <circle cx="345" cy="245" r="1.5" fill="#fff" className="map-dot" style={{ animationDelay: "3.9s" }} />
                  <circle cx="150" cy="180" r="1.5" fill="#fff" className="map-dot" style={{ animationDelay: "0.5s" }} />
                  <circle cx="370" cy="185" r="1.5" fill="#fff" className="map-dot" style={{ animationDelay: "2.4s" }} />
                  <circle cx="260" cy="70" r="1.5" fill="#fff" className="map-dot" style={{ animationDelay: "3.2s" }} />
                  <circle cx="255" cy="290" r="1.5" fill="#fff" className="map-dot" style={{ animationDelay: "1.6s" }} />
                  <circle cx="140" cy="145" r="1.5" fill="#fff" className="map-dot" style={{ animationDelay: "4.1s" }} />
                  <circle cx="380" cy="155" r="1.5" fill="#fff" className="map-dot" style={{ animationDelay: "0.8s" }} />
                  {/* Store pin with shadow */}
                  <ellipse cx="260" cy="175" rx="6" ry="2" fill="rgba(0,0,0,0.3)" />
                  <g transform="translate(249,148)">
                    <path d="M11 0C5 0 0 5 0 11c0 7.5 11 20 11 20s11-12.5 11-20c0-6-5-11-11-11z" fill="#fff" />
                    <circle cx="11" cy="11" r="4.5" fill="#1c1c1e" />
                  </g>
                  
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#f5f5f5] sm:text-3xl">Yet most consumers aren&apos;t aware of the services we have to offer at our stores</h3>
              <p className="mt-3 text-base leading-7 text-[#b3b3b3]">
                Our goal is to have at least 30% of consumers aware of the services we have to offer.
              </p>
              <div className="mt-6 overflow-hidden rounded-xl">
                <Image src="/projects/nordstrom-stores/awareness-v4.png" alt="Service awareness data" width={1920} height={1080} className="w-full grayscale" quality={90} unoptimized />
              </div>
            </div>
          </div>
        </section>

        {/* Vision */}
        <section className="py-10 sm:py-14">
          <p className="text-sm font-bold uppercase tracking-wider text-[#888]">Our vision</p>
          <h2 className="mt-4 text-2xl font-bold text-[#f5f5f5] sm:text-3xl">
            We want the customer to feel like they&apos;re being taken care of by a salesperson regardless of channel
          </h2>
          <div className="mt-8 overflow-hidden rounded-xl">
            <Image src="/projects/nordstrom-stores/laughing.jpeg" alt="Nordstrom customer experience" width={1920} height={1080} className="w-full" quality={90} unoptimized />
          </div>

          <div className="mt-12 rounded-2xl bg-[#222222] p-6 sm:p-8">
            <h3 className="text-lg font-bold text-[#f5f5f5]">Hypothesis</h3>
            <p className="mt-3 text-base leading-7 text-[#b3b3b3]">
              By dedicating a tab to make it easy for customers to find store information, set a store, and find relevant items and services, it will lead to more customer engagement with the brand.
            </p>
          </div>
        </section>

        {/* Alignment */}
        <section className="py-10 sm:py-14">
          <p className="text-sm font-bold uppercase tracking-wider text-[#888]">Alignment</p>
          <h2 className="mt-4 text-2xl font-bold text-[#f5f5f5] sm:text-3xl">
            There were two competing agendas with the customer and business that meant leading with a tab labeled Services or Stores
          </h2>

          {/* Visual comparison */}
          <div className="relative mt-14 flex gap-3 sm:gap-5">
            {/* Option A */}
            <div className="group/optA flex flex-1 flex-col items-center">
              {/* Tab label preview */}
              <div className="mb-6 flex items-center gap-2 rounded-full border border-zinc-700/50 px-4 py-1.5">
                <span className="text-xs font-bold tracking-wider text-[#f5f5f5]">TAB:</span>
                <span className="text-xs font-medium text-[#b3b3b3]">&quot;Stores&quot;</span>
              </div>
              {/* Phone mockup */}
              <div className="relative w-full max-w-[240px] overflow-hidden rounded-[24px] border-[3px] border-zinc-600/30 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                <svg viewBox="0 0 200 380" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                  <rect width="200" height="380" fill="#fff" />
                  {/* Notch */}
                  <rect x="65" y="0" width="70" height="18" rx="9" fill="#000" />
                  {/* Header */}
                  <text x="100" y="36" textAnchor="middle" fontSize="10" fontWeight="600" fill="#000" fontFamily="Product Sans, sans-serif">Stores &amp; Services</text>
                  {/* Map */}
                  <rect x="0" y="46" width="200" height="120" fill="#e8e4df" />
                  {/* Water */}
                  <path d="M0 46 L0 100 Q20 95 35 102 Q50 110 45 120 Q38 135 50 145 L0 166 Z" fill="#c4d4e8" opacity="0.35" />
                  {/* Park */}
                  <ellipse cx="155" cy="135" rx="22" ry="14" fill="#c8dcc8" opacity="0.4" />
                  {/* Major roads */}
                  <line x1="0" y1="86" x2="200" y2="86" stroke="#d8d8d8" strokeWidth="2" />
                  <line x1="0" y1="130" x2="200" y2="130" stroke="#d8d8d8" strokeWidth="2" />
                  <line x1="80" y1="46" x2="80" y2="166" stroke="#d8d8d8" strokeWidth="2" />
                  <line x1="140" y1="46" x2="140" y2="166" stroke="#d8d8d8" strokeWidth="2" />
                  {/* Minor roads */}
                  <line x1="0" y1="106" x2="80" y2="106" stroke="#ddd" strokeWidth="0.8" />
                  <line x1="80" y1="108" x2="140" y2="108" stroke="#ddd" strokeWidth="0.8" />
                  <line x1="140" y1="155" x2="200" y2="155" stroke="#ddd" strokeWidth="0.8" />
                  <line x1="50" y1="46" x2="50" y2="86" stroke="#ddd" strokeWidth="0.8" />
                  <line x1="110" y1="86" x2="110" y2="130" stroke="#ddd" strokeWidth="0.8" />
                  <line x1="170" y1="46" x2="170" y2="86" stroke="#ddd" strokeWidth="0.8" />
                  <line x1="170" y1="130" x2="170" y2="166" stroke="#ddd" strokeWidth="0.8" />
                  <line x1="30" y1="130" x2="30" y2="166" stroke="#ddd" strokeWidth="0.8" />
                  {/* Blocks */}
                  <rect x="82" y="88" rx="1" ry="1" width="26" height="16" fill="#e0dcd8" />
                  <rect x="112" y="88" rx="1" ry="1" width="26" height="16" fill="#ddd9d5" />
                  <rect x="82" y="110" rx="1" ry="1" width="26" height="18" fill="#ddd9d5" />
                  <rect x="112" y="110" rx="1" ry="1" width="26" height="18" fill="#e0dcd8" />
                  <rect x="142" y="88" rx="1" ry="1" width="26" height="16" fill="#e0dcd8" />
                  <rect x="142" y="108" rx="1" ry="1" width="26" height="20" fill="#ddd9d5" />
                  <rect x="52" y="48" rx="1" ry="1" width="26" height="12" fill="#ddd9d5" />
                  <rect x="2" y="88" rx="1" ry="1" width="24" height="16" fill="#e0dcd8" />
                  <rect x="32" y="132" rx="1" ry="1" width="18" height="14" fill="#ddd9d5" />
                  <rect x="52" y="132" rx="1" ry="1" width="26" height="14" fill="#e0dcd8" />
                  {/* Curved road */}
                  <path d="M0 70 Q60 55 100 68 Q140 80 200 60" stroke="#d8d8d8" strokeWidth="1.2" fill="none" />
                  {/* Pins */}
                  <circle cx="60" cy="96" r="3.5" fill="#c00" />
                  <circle cx="125" cy="96" r="3.5" fill="#c00" />
                  <circle cx="165" cy="96" r="3.5" fill="#c00" />
                  <circle cx="45" cy="140" r="3.5" fill="#c00" />
                  {/* Nordstrom pin */}
                  <circle cx="100" cy="106" r="7" fill="#000" />
                  <text x="100" y="110" textAnchor="middle" fontSize="8" fontWeight="700" fill="#fff" fontFamily="Product Sans, sans-serif" dominantBaseline="central" dy="-4">N</text>
                  {/* Find a Store */}
                  <text x="100" y="182" textAnchor="middle" fontSize="8" fill="#333" fontFamily="Product Sans, sans-serif">Find a Store</text>
                  {/* Search */}
                  <rect x="16" y="190" width="168" height="22" rx="6" fill="#f2f2f2" />
                  <text x="28" y="205" fontSize="7" fill="#aaa" fontFamily="Product Sans, sans-serif">Seattle</text>
                  {/* Result */}
                  <rect x="16" y="220" width="168" height="56" rx="8" fill="#f8f8f8" />
                  <rect x="24" y="228" width="9" height="9" rx="2" fill="#000" />
                  <text x="38" y="235" fontSize="7" fontWeight="600" fill="#000" fontFamily="Product Sans, sans-serif">Downtown Seattle</text>
                  <text x="170" y="235" textAnchor="end" fontSize="6" fill="#aaa" fontFamily="Product Sans, sans-serif">0.6 mi</text>
                  <text x="24" y="248" fontSize="5.5" fill="#888" fontFamily="Product Sans, sans-serif">500 Pine Street, Seattle WA</text>
                  <text x="24" y="262" fontSize="5" fill="#aaa" fontFamily="Product Sans, sans-serif">Gift Wrap · Curbside Pickup</text>
                  {/* Button */}
                  <rect x="20" y="286" width="60" height="18" rx="9" fill="none" stroke="#000" strokeWidth="0.8" />
                  <text x="50" y="298" textAnchor="middle" fontSize="6.5" fontWeight="500" fill="#000" fontFamily="Product Sans, sans-serif">Set Your Store</text>
                  {/* Tab bar */}
                  <line x1="0" y1="342" x2="200" y2="342" stroke="#eee" strokeWidth="0.5" />
                  <text x="28" y="360" textAnchor="middle" fontSize="6.5" fill="#bbb" fontFamily="Product Sans, sans-serif">Home</text>
                  <text x="68" y="360" textAnchor="middle" fontSize="6.5" fill="#bbb" fontFamily="Product Sans, sans-serif">Search</text>
                  <text x="104" y="360" textAnchor="middle" fontSize="6.5" fontWeight="700" fill="#000" fontFamily="Product Sans, sans-serif">Stores</text>
                  <line x1="90" y1="366" x2="118" y2="366" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
                  <text x="142" y="360" textAnchor="middle" fontSize="6.5" fill="#bbb" fontFamily="Product Sans, sans-serif">Wish List</text>
                  <text x="178" y="360" textAnchor="middle" fontSize="6.5" fill="#bbb" fontFamily="Product Sans, sans-serif">Account</text>
                </svg>
              </div>
              {/* Pros & Cons */}
              <div className="mt-6 flex w-full flex-col gap-2">
                <div className="flex items-center gap-2 rounded-lg bg-emerald-500/8 px-3 py-2">
                  <span className="block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                  <span className="text-xs leading-5 text-[#b3b3b3]">Happy path oriented</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-emerald-500/8 px-3 py-2">
                  <span className="block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                  <span className="text-xs leading-5 text-[#b3b3b3]">Immediate access to store info</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-red-500/8 px-3 py-2">
                  <span className="block h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                  <span className="text-xs leading-5 text-[#b3b3b3]">Services not expected under &quot;Stores&quot;</span>
                </div>
              </div>
            </div>

            {/* VS divider */}
            <div className="flex flex-col items-center justify-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-700/50 bg-[#222]">
                <span className="text-xs font-bold tracking-wider text-zinc-400">VS</span>
              </div>
            </div>

            {/* Option B */}
            <div className="group/optB flex flex-1 flex-col items-center">
              {/* Tab label preview */}
              <div className="mb-6 flex items-center gap-2 rounded-full border border-zinc-700/50 px-4 py-1.5">
                <span className="text-xs font-bold tracking-wider text-[#f5f5f5]">TAB:</span>
                <span className="text-xs font-medium text-[#b3b3b3]">&quot;Services&quot;</span>
              </div>
              {/* Phone mockup */}
              <div className="relative w-full max-w-[240px] overflow-hidden rounded-[24px] border-[3px] border-zinc-600/30 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                <svg viewBox="0 0 200 380" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                  <rect width="200" height="380" fill="#fff" />
                  {/* Notch */}
                  <rect x="65" y="0" width="70" height="18" rx="9" fill="#000" />
                  {/* Header */}
                  <text x="100" y="36" textAnchor="middle" fontSize="10" fontWeight="600" fill="#000" fontFamily="Product Sans, sans-serif">Your Store</text>
                  {/* Set store banner */}
                  <rect x="16" y="46" width="168" height="58" rx="10" fill="#f5f5f5" />
                  <circle cx="40" cy="70" r="14" fill="#e0e0e0" />
                  <text x="40" y="70" textAnchor="middle" fontSize="11" fontWeight="700" fill="#000" fontFamily="Product Sans, sans-serif" dominantBaseline="central">N</text>
                  <text x="62" y="64" fontSize="7" fontWeight="600" fill="#000" fontFamily="Product Sans, sans-serif">Set your preferred store</text>
                  <text x="62" y="74" fontSize="5.5" fill="#999" fontFamily="Product Sans, sans-serif">See store hours, services, and more.</text>
                  <rect x="62" y="82" width="52" height="12" rx="6" fill="none" stroke="#000" strokeWidth="0.7" />
                  <text x="88" y="88" textAnchor="middle" fontSize="5.5" fill="#000" fontFamily="Product Sans, sans-serif" dominantBaseline="central">Find a Store</text>
                  {/* Section title */}
                  <text x="16" y="124" fontSize="8.5" fontWeight="700" fill="#000" fontFamily="Product Sans, sans-serif">Virtual appointments</text>
                  {/* Service card 1 */}
                  <rect x="16" y="136" width="82" height="130" rx="8" fill="#f5f5f5" />
                  <rect x="16" y="136" width="82" height="56" rx="8" fill="#e0d8cf" />
                  <text x="22" y="206" fontSize="6.5" fontWeight="600" fill="#000" fontFamily="Product Sans, sans-serif">Personal Styling</text>
                  <text x="22" y="217" fontSize="5" fill="#888" fontFamily="Product Sans, sans-serif">Free fashion and fit advice</text>
                  <text x="22" y="226" fontSize="5" fill="#888" fontFamily="Product Sans, sans-serif">in a 30-min meeting.</text>
                  <text x="22" y="240" fontSize="5" fill="#555" fontFamily="Product Sans, sans-serif">✓ Expert styling</text>
                  <text x="22" y="250" fontSize="5" fill="#555" fontFamily="Product Sans, sans-serif">✓ Wardrobe tips</text>
                  {/* Service card 2 */}
                  <rect x="104" y="136" width="82" height="130" rx="8" fill="#f5f5f5" />
                  <rect x="104" y="136" width="82" height="56" rx="8" fill="#d5dae0" />
                  <text x="110" y="206" fontSize="6.5" fontWeight="600" fill="#000" fontFamily="Product Sans, sans-serif">Beauty Consult</text>
                  <text x="110" y="217" fontSize="5" fill="#888" fontFamily="Product Sans, sans-serif">Personalized beauty</text>
                  <text x="110" y="226" fontSize="5" fill="#888" fontFamily="Product Sans, sans-serif">session with an expert.</text>
                  <text x="110" y="240" fontSize="5" fill="#555" fontFamily="Product Sans, sans-serif">✓ Skincare routine</text>
                  <text x="110" y="250" fontSize="5" fill="#555" fontFamily="Product Sans, sans-serif">✓ Product recs</text>
                  {/* Tab bar */}
                  <line x1="0" y1="342" x2="200" y2="342" stroke="#eee" strokeWidth="0.5" />
                  <text x="28" y="360" textAnchor="middle" fontSize="6.5" fill="#bbb" fontFamily="Product Sans, sans-serif">Home</text>
                  <text x="68" y="360" textAnchor="middle" fontSize="6.5" fill="#bbb" fontFamily="Product Sans, sans-serif">Search</text>
                  <text x="104" y="360" textAnchor="middle" fontSize="6.5" fontWeight="700" fill="#000" fontFamily="Product Sans, sans-serif">Services</text>
                  <line x1="88" y1="366" x2="120" y2="366" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
                  <text x="142" y="360" textAnchor="middle" fontSize="6.5" fill="#bbb" fontFamily="Product Sans, sans-serif">Wish List</text>
                  <text x="178" y="360" textAnchor="middle" fontSize="6.5" fill="#bbb" fontFamily="Product Sans, sans-serif">Account</text>
                </svg>
              </div>
              {/* Pros & Cons */}
              <div className="mt-6 flex w-full flex-col gap-2">
                <div className="flex items-center gap-2 rounded-lg bg-emerald-500/8 px-3 py-2">
                  <span className="block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                  <span className="text-xs leading-5 text-[#b3b3b3]">Services highly discoverable (biz goal)</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-red-500/8 px-3 py-2">
                  <span className="block h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                  <span className="text-xs leading-5 text-[#b3b3b3]">Store info not expected under &quot;Services&quot;</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-red-500/8 px-3 py-2">
                  <span className="block h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                  <span className="text-xs leading-5 text-[#b3b3b3]">Limited content in cold start</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Design */}
        <section className="py-10 sm:py-14">
          <p className="text-sm font-bold uppercase tracking-wider text-[#888]">Design</p>
          <h2 className="mt-4 text-2xl font-bold text-[#f5f5f5] sm:text-3xl">
            Building convenience and connection
          </h2>

          <div className="mt-8 overflow-hidden rounded-xl">
            <Image src="/projects/nordstrom-stores/stores-design.png" alt="Convenience and connection design" width={1920} height={1080} className="w-full" quality={90} unoptimized />
          </div>

          <div className="mt-14 flex flex-col gap-10">
            <div>
              <h3 className="text-2xl font-bold text-[#f5f5f5] sm:text-3xl">Building convenience towards pickup</h3>
              <p className="mt-3 text-base leading-7 text-[#b3b3b3]">
                Our long term goal for the new tab will be to provide convenience for our customers. Customers want to engage with their pickup and purchase experience to be efficient and convenient.
              </p>
              <div className="relative left-1/2 mt-6 w-[75vw] -translate-x-1/2 overflow-hidden rounded-xl">
                <Image src="/projects/nordstrom-stores/next.png" alt="Pickup experience next steps" width={1920} height={1080} className="w-full" quality={90} unoptimized />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#f5f5f5] sm:text-3xl">Building connection to our services and brand</h3>
              <p className="mt-3 text-base leading-7 text-[#b3b3b3]">
                We want to ensure that customers are connected to our brands and can engage with them to look good and feel their best. These features will allow customers to engage with services and promotions.
              </p>
              <div className="relative left-1/2 mt-6 flex w-[75vw] -translate-x-1/2 flex-col gap-4">
                <div className="overflow-hidden rounded-xl">
                  <Image src="/projects/nordstrom-stores/next2.png" alt="Services and brand connection 1" width={1920} height={1080} className="w-full" quality={90} unoptimized />
                </div>
                <div className="overflow-hidden rounded-xl">
                  <Image src="/projects/nordstrom-stores/next3.png" alt="Services and brand connection 2" width={1920} height={1080} className="w-full" quality={90} unoptimized />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Research */}

        {/* Results */}
        <section className="py-10 sm:py-14">
          <p className="text-sm font-bold uppercase tracking-wider text-[#888]">Results</p>
          <h2 className="mt-4 text-2xl font-bold text-[#f5f5f5] sm:text-3xl">
            Design impact
          </h2>
          <p className="mt-4 text-base leading-7 text-[#b3b3b3]">
            We migrated our existing Store Hub experience from the home page widget as a new tab, offering a bigger presence of our digital and in-store services offerings and building upon our vision of convenience and connection for our customers.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4 sm:gap-6">
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

        {/* Team */}
        <section className="pt-10 pb-10 sm:pt-14 sm:pb-14">
          <h2 className="text-2xl font-bold text-[#f5f5f5] sm:text-3xl">
            The team behind the magic
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {teamMembers.map((member, i) => (
              <span key={i} className="rounded-full bg-[#222222] px-4 py-2 text-sm text-[#b3b3b3]">
                👤 {member}
              </span>
            ))}
          </div>
        </section>

        {/* Up Next */}
        <section className="py-10 sm:py-14">
          <h2 className="text-2xl font-bold text-[#f5f5f5] sm:text-3xl">Up next</h2>
          <div className="mt-8">
            <ProjectCard
              title="Walmart • GenAI Comparison • 2024"
              href="/projects/walmart-genai-comparison"
              tags={["↑ 2.6% add to cart / visitor", "↑ 1.1% first time buyer conversion", "↓ 1.8% session cart removal", "↑ 12.8% re-engagement"]}
              videoSrc="/highlights/comparison-walkthrough.mov"
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
