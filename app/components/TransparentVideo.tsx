"use client";

import { useEffect, useRef } from "react";

interface TransparentVideoProps {
  src: string;
  bgColor?: [number, number, number];
  transparent?: boolean;
  threshold?: number;
  className?: string;
  canvasBg?: string;
  style?: React.CSSProperties;
}

const VERT_SHADER = `
  attribute vec2 a_pos;
  attribute vec2 a_tex;
  varying vec2 v_tex;
  void main() {
    gl_Position = vec4(a_pos, 0.0, 1.0);
    v_tex = a_tex;
  }
`;

const FRAG_SHADER = `
  precision mediump float;
  varying vec2 v_tex;
  uniform sampler2D u_image;
  uniform vec3 u_bgColor;
  uniform float u_threshold;
  uniform float u_transparent;
  void main() {
    vec4 color = texture2D(u_image, v_tex);
    if (color.r < u_threshold && color.g < u_threshold && color.b < u_threshold) {
      if (u_transparent > 0.5) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
      } else {
        gl_FragColor = vec4(u_bgColor, 1.0);
      }
    } else {
      gl_FragColor = color;
    }
  }
`;

function initGL(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: false });
  if (!gl) return null;

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  function compile(type: number, source: string) {
    const s = gl!.createShader(type)!;
    gl!.shaderSource(s, source);
    gl!.compileShader(s);
    return s;
  }

  const prog = gl.createProgram()!;
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT_SHADER));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG_SHADER));
  gl.linkProgram(prog);
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1, -1, 0, 1,
     1, -1, 1, 1,
    -1,  1, 0, 0,
     1,  1, 1, 0,
  ]), gl.STATIC_DRAW);

  const aPos = gl.getAttribLocation(prog, "a_pos");
  const aTex = gl.getAttribLocation(prog, "a_tex");
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 16, 0);
  gl.enableVertexAttribArray(aTex);
  gl.vertexAttribPointer(aTex, 2, gl.FLOAT, false, 16, 8);

  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

  return {
    gl,
    uBgColor: gl.getUniformLocation(prog, "u_bgColor"),
    uThreshold: gl.getUniformLocation(prog, "u_threshold"),
    uTransparent: gl.getUniformLocation(prog, "u_transparent"),
  };
}

export default function TransparentVideo({
  src,
  bgColor = [50, 50, 50],
  transparent = false,
  threshold = 30,
  className,
  canvasBg,
  style,
  playing,
}: TransparentVideoProps & { playing?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const visibleRef = useRef(true);
  const glRef = useRef<ReturnType<typeof initGL>>(null);
  const playingRef = useRef(playing);
  playingRef.current = playing;

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!video || !canvas || !container) return;

    const observer = new IntersectionObserver(
      ([entry]) => { visibleRef.current = entry.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(container);

    function draw() {
      animRef.current = requestAnimationFrame(draw);
      if (!video || !canvas) return;
      if (video.videoWidth === 0) return;

      if (playingRef.current === false) {
        if (!video.paused) video.pause();
        return;
      }

      if (video.paused) { video.play().catch(() => {}); return; }
      if (!visibleRef.current) return;

      if (!glRef.current) {
        glRef.current = initGL(canvas);
      }
      const ctx = glRef.current;
      if (!ctx) return;
      const { gl, uBgColor, uThreshold, uTransparent } = ctx;

      if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
      gl.uniform3f(uBgColor, bgColor[0] / 255, bgColor[1] / 255, bgColor[2] / 255);
      gl.uniform1f(uThreshold, threshold / 255);
      gl.uniform1f(uTransparent, transparent ? 1.0 : 0.0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    function start() {
      cancelAnimationFrame(animRef.current);
      animRef.current = requestAnimationFrame(draw);
    }

    video.addEventListener("loadeddata", start);
    video.addEventListener("play", start);
    if (video.readyState >= 2) start();

    return () => {
      observer.disconnect();
      video.removeEventListener("loadeddata", start);
      video.removeEventListener("play", start);
      cancelAnimationFrame(animRef.current);
    };
  }, [bgColor, threshold, transparent]);

  return (
    <div ref={containerRef} className={className} style={style}>
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute opacity-0 pointer-events-none"
        style={{ width: 0, height: 0 }}
      />
      <canvas ref={canvasRef} className="rounded-xl" style={{ background: canvasBg || "transparent" }} />
    </div>
  );
}
