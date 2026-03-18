"use client";

import { useEffect, useRef, useState } from "react";

interface TransparentVideoProps {
  src: string;
  bgColor?: [number, number, number];
  transparent?: boolean;
  threshold?: number;
  className?: string;
  canvasBg?: string;
  style?: React.CSSProperties;
}

export default function TransparentVideo({
  src,
  bgColor = [50, 50, 50],
  className,
  canvasBg,
  style,
  playing,
}: TransparentVideoProps & { playing?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const visibleRef = useRef(false);
  const playingRef = useRef(playing);
  playingRef.current = playing;
  const [nearViewport, setNearViewport] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const lazyObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNearViewport(true);
          lazyObserver.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    lazyObserver.observe(container);
    return () => lazyObserver.disconnect();
  }, []);

  useEffect(() => {
    if (!nearViewport) return;
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const visObserver = new IntersectionObserver(
      ([entry]) => { visibleRef.current = entry.isIntersecting; },
      { threshold: 0 }
    );
    visObserver.observe(container);

    let raf = 0;
    function tick() {
      raf = requestAnimationFrame(tick);
      if (!video) return;

      if (playingRef.current === false) {
        if (!video.paused) video.pause();
        return;
      }

      if (!visibleRef.current) {
        if (!video.paused) video.pause();
        return;
      }

      if (video.paused) video.play().catch(() => {});
    }

    raf = requestAnimationFrame(tick);

    return () => {
      visObserver.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [nearViewport]);

  const bg = canvasBg || `rgb(${bgColor[0]},${bgColor[1]},${bgColor[2]})`;

  return (
    <div ref={containerRef} className={className} style={style}>
      {nearViewport && (
        <video
          ref={videoRef}
          src={src}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="rounded-xl"
          style={{ background: bg }}
        />
      )}
    </div>
  );
}
