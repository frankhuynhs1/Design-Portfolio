"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";
import CustomCursor from "../components/CustomCursor";

const testimonials = [
  {
    name: "Charlotte Passot",
    role: "Sr Manager, Design @ Walmart",
    image: "/charlotte.jpeg",
    quote:
      "I had the pleasure of managing Franklin during his time at Walmart. He demonstrated tremendous growth and, over the course of one year, became adept at leading high-priority, complex features across Search and Gen AI, gaining visibility from senior leadership, including SVPs. Franklin is a team player with a strong work ethic. He approaches customer problems holistically and consistently demonstrates strategic thinking, alongside a keen ability to dive into the details. With his talent and collaborative spirit, he would be a valuable asset to any team.",
  },
  {
    name: "Lauren Glazer",
    role: "Principal Designer @ Walmart",
    image: "/lauren.jpeg",
    quote:
      "I've worked with Franklin for over a year now on the search team during my time at Walmart. He is a passionate UX designer, who consistently dives deep into a problem space before jumping into solutions. He shows strength in breaking down a problem, asking the right questions to help push on and influence strategic direction on all of his projects regardless of size. His work leading the design for Comparison in search at Walmart showed his strength in tackling a complex, large scale project, working with many stakeholders and various levels of product and design leadership to ensure alignment and move the project forward. Franklin's visual design skills are as strong as his UX thinking - he does a great job at pushing the right boundaries of a design system and exploring all solutions that can help the team flex into more innovative thinking as well as more traditional solutions. He's able to balance multiple large scale initiatives at a time, and during my time working with Franklin as well, he has always been open and eager to feedback and works quickly to grow in any areas of opportunity. Franklin has been amazing to work with, and would be a great addition to any design team!",
  },
  {
    name: "Tiffany Clark",
    role: "Sr UX Researcher @ Nordstrom",
    image: "/tiffany.jpeg",
    quote:
      "Anyone would be lucky to have Frankie on their team! His passion and talent in design is so obvious. He's always learning, always growing, and a positive ray of sunshine in the room. His work in customer fulfillment has been impactful and significant.",
  },
];

const aboutItems = [
  "Seattle nomad (Federal Way → Central District → University District → Leschi → and now, Beacon Hill)",
  "Enjoys playing League of Legends (except when I lose).",
  "Food, cars, plants, shoes, camping, tennis, snowboarding, and traveling.",
  "Learning to make various cocktails. Mixology is so cool – you can thank the drink masters show on Netflix for that.",
  "A newbie runner who is training for marathons (probably a tell tale sign that I'm approaching my 30's lol).",
];

export default function About() {
  return (
    <div className="relative min-h-screen bg-[#191919] font-sans text-zinc-100">
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

      <main className="relative z-10 mx-auto max-w-6xl px-5 pt-28 sm:px-6 sm:pt-32 lg:px-8">
        {/* Hero + Background & About */}
        <section className="pb-24 sm:pb-36">
          <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:gap-16">
            <div className="flex flex-1 flex-col">
              {/* Hero */}
              <div className="pt-12 pb-6 sm:pt-16 sm:pb-8 md:pt-20 md:pb-10">
                <p className="text-base sm:text-lg text-[#b3b3b3]">About me</p>
                <h1 className="mt-1 text-3xl font-bold tracking-tight text-[#f5f5f5] sm:text-4xl md:text-5xl">
                  Franklin Huynh
                </h1>
                <p className="mt-3 text-base sm:text-lg font-bold text-[#f5f5f5]">
                  📍 Design at Chewy 🐶🐱
                </p>
              </div>

              {/* Background & About */}
              <div className="flex max-w-xl flex-col gap-12">
                <div>
                  <h2 className="text-xl font-bold text-[#f5f5f5] sm:text-2xl">My background</h2>
                  <p className="mt-4 text-base leading-7 text-[#b3b3b3]">
                    I&apos;m a product designer with experience designing within web and app environments.
                    Over my 5+ years of experience, I worked with top brands to craft omni-channel retail,
                    e-commerce, health, enterprise productivity software, and AI experiences that can easily
                    be applied to any industry.
                  </p>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#f5f5f5] sm:text-2xl">About me</h2>
                  <ul className="mt-4 flex flex-col gap-3">
                    {aboutItems.map((item, i) => (
                      <li key={i} className="flex gap-3 text-base leading-7 text-[#b3b3b3]">
                        <span className="mt-1 shrink-0 text-[#555]">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <a
                  href="https://www.linkedin.com/in/huynhfranklin/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-zinc-700 px-6 py-3 text-sm font-medium text-zinc-300 transition-all duration-300 hover:scale-105 hover:border-zinc-500 hover:text-white"
                >
                  View LinkedIn
                </a>
                <a
                  href="mailto:frankhuynhs@gmail.com"
                  className="inline-flex items-center justify-center rounded-full border border-zinc-700 px-6 py-3 text-sm font-medium text-zinc-300 transition-all duration-300 hover:scale-105 hover:border-zinc-500 hover:text-white"
                >
                  frankhuynhs@gmail.com
                </a>
              </div>
            </div>

            <div className="shrink-0 pt-12 sm:pt-16 sm:w-[430px] md:pt-20">
              <div className="rotate-2 rounded-2xl bg-[#2a2a2a] p-3 pb-14 shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:-rotate-1">
                <div className="overflow-hidden rounded-xl">
                  <Image
                    src="/franklin.png"
                    alt="Franklin Huynh"
                    width={640}
                    height={853}
                    className="w-full"
                    quality={100}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Kind Words */}
        <section className="pb-16 sm:pb-24">
          <h2 className="text-3xl font-bold tracking-tight text-[#f5f5f5] sm:text-4xl md:text-5xl">
            Kind words 🤠
          </h2>
          <div className="mt-10 flex flex-col gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="group rounded-2xl bg-[#222222] p-8 text-center transition-all duration-300"
              >
                <div className="mb-4 flex flex-col items-center">
                  {"image" in t && t.image ? (
                    <div className="mb-3 h-20 w-20 overflow-hidden rounded-full">
                      <Image src={t.image} alt={t.name} width={80} height={80} className="h-full w-full object-cover" />
                    </div>
                  ) : (
                    <div className="mb-3 h-20 w-20 rounded-full bg-zinc-700/60" />
                  )}
                  <p className="text-lg font-bold text-[#f5f5f5]">{t.name}</p>
                  <p className="mt-1 text-base text-[#888]"><span className="font-bold">Role when written:</span> {t.role}</p>
                </div>
                <p className="text-left text-base leading-7 text-[#b3b3b3]">&ldquo;{t.quote}&rdquo;</p>
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
