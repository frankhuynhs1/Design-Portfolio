"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import TransparentVideo from "./TransparentVideo";

function AnimatedTag({ text, visible }: { text: string; visible: boolean }) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [display, setDisplay] = useState(text);

  const match = text.match(/^([↑↓]\s*\$?)([\d.]+)(%|k|M)(.*)$/);

  useEffect(() => {
    if (!match) return;
    if (!visible) {
      setHasAnimated(false);
      setDisplay(`${match[1]}0${match[3]}${match[4]}`);
      return;
    }
    if (hasAnimated) return;
    setHasAnimated(true);

    const target = parseFloat(match[2]);
    const decimals = match[2].split(".")[1]?.length || 0;
    const startTime = performance.now();
    const duration = 1200;

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;
      setDisplay(`${match![1]}${current.toFixed(decimals)}${match![3]}${match![4]}`);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [visible]);

  if (!match) return <>{text}</>;

  return <>{display}</>;
}

export type ProjectCardVariant = "highlight" | "featured";

export interface ProjectCardProps {
  title: string;
  href?: string;
  imageSrc?: string;
  videoSrc?: string;
  videoScale?: number;
  videoFit?: "cover" | "contain";
  imageAlt?: string;
  tags?: string[];
  variant?: ProjectCardVariant;
  playing?: boolean;
}

export default function ProjectCard({
  title,
  href,
  imageSrc,
  videoSrc,
  videoScale,
  videoFit = "cover",
  imageAlt = title,
  tags = [],
  variant = "featured",
  playing,
}: ProjectCardProps) {
  const isHighlight = variant === "highlight";
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const tagsVisible = isHighlight || isMobile || hovered;

  const card = (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group/card flex shrink-0 flex-col overflow-hidden rounded-2xl transition-all duration-300 ${
        isHighlight
          ? "w-[75vw] sm:w-[440px] border border-zinc-700/40 bg-[#222222] hover:border-zinc-600/60"
          : "w-full border border-zinc-600/60 bg-[#222222] sm:border-transparent sm:bg-transparent sm:hover:border-zinc-600/60 sm:hover:bg-[#222222]"
      }`}
    >
      <div className={`flex items-start justify-between gap-3 transition-all duration-300 ${isHighlight ? "px-5 pt-5 pb-3" : "max-h-20 opacity-100 px-4 pt-4 pb-3 sm:max-h-0 sm:overflow-hidden sm:opacity-0 sm:pt-0 sm:pb-0 sm:group-hover/card:max-h-20 sm:group-hover/card:opacity-100 sm:group-hover/card:pt-4 sm:group-hover/card:pb-3"}`}>
        <h3 className={`font-medium text-[#f5f5f5] ${isHighlight ? "text-lg" : "text-xl"}`}>
          {title}
        </h3>
        {!isHighlight && (
          <div className="shrink-0 relative flex h-10 w-[4.5rem] items-center overflow-hidden rounded-full transition-colors duration-300 group-hover/card:bg-white">
            <span aria-hidden className="pointer-events-none absolute inset-0 rounded-full transition-opacity duration-300 group-hover/card:opacity-0">
              <span className="absolute inset-0 rounded-full bg-[#1d1d1d] mix-blend-plus-lighter" />
              <span className="absolute inset-0 rounded-full bg-[rgba(29,29,29,0.2)] mix-blend-color-burn" />
              <span className="absolute inset-0 rounded-full bg-gradient-to-b from-[rgba(102,102,102,0)] from-50% to-[rgba(102,102,102,0.4)] mix-blend-plus-lighter opacity-40 sm:opacity-100" />
              <span className="absolute inset-0 rounded-full bg-gradient-to-b from-[rgba(102,102,102,0.2)] to-[rgba(102,102,102,0)] to-[33%] mix-blend-plus-lighter backdrop-blur-[6px] sm:backdrop-blur-[12px]" />
            </span>
            <span className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_16px_16px_9px_-18px_rgba(255,255,255,0.5),inset_-12px_-12px_6px_-14px_#b3b3b3,inset_2px_2px_1px_-2px_#b3b3b3,inset_0px_0px_22px_0px_rgba(242,242,242,0.5)] transition-opacity duration-300 group-hover/card:opacity-0" />
            <div className="absolute left-2 z-10 transition-all duration-300 group-hover/card:left-[calc(100%-30px)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-zinc-300 transition-colors duration-300 group-hover/card:text-zinc-800"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </div>
          </div>
        )}
      </div>
      <div className={`transition-all duration-300 ${isHighlight ? "px-5 pb-3" : "px-4 pb-3 sm:px-0 sm:pb-0 sm:group-hover/card:px-4 sm:group-hover/card:pb-3"}`}>
        <div className={`relative w-full overflow-hidden rounded-xl ${videoSrc ? "" : "bg-zinc-800/50"} ${isHighlight ? "aspect-[2/3]" : videoSrc ? "aspect-[3/4] sm:aspect-[16/10]" : "aspect-[2/1]"}`}>
          {videoSrc ? (
            <TransparentVideo
              src={videoSrc}
              bgColor={[34, 34, 34]}
              threshold={30}
              className={`absolute inset-0 h-full w-full ${
                videoFit === "contain"
                  ? "[&_canvas]:h-full [&_canvas]:w-full [&_canvas]:object-contain"
                  : "[&_canvas]:h-full [&_canvas]:w-full [&_canvas]:object-cover"
              }`}
              canvasBg={videoFit === "contain" ? "rgb(34,34,34)" : undefined}
              style={videoScale ? { transform: `scale(${videoScale})` } : undefined}
              playing={playing}
            />
          ) : imageSrc ? (
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes={isHighlight ? "280px" : "(max-width: 768px) 100vw, 1200px"}
              quality={100}
              unoptimized
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <div className="h-10 w-10 rounded-lg bg-zinc-700/40" />
            </div>
          )}
        </div>
      </div>
      <div className={`flex flex-1 flex-col gap-3 px-4 transition-all duration-300 ${isHighlight ? "pb-4" : "max-h-40 opacity-100 pb-4 sm:max-h-0 sm:overflow-hidden sm:opacity-0 sm:pb-0 sm:group-hover/card:max-h-40 sm:group-hover/card:opacity-100 sm:group-hover/card:pb-4"}`}>
        {tags.length > 0 && (
          <div className="flex flex-wrap justify-start gap-2 sm:justify-center">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/10 px-3 py-1 text-xs sm:px-4 sm:py-1.5 sm:text-sm text-zinc-200"
              >
                <AnimatedTag text={tag} visible={tagsVisible} />
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );

  if (href) {
    return <Link href={href} className="block">{card}</Link>;
  }

  return card;
}
