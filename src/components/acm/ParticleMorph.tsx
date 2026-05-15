"use client";

import { useEffect, useRef } from "react";

type Particle = {
  sx: number;
  sy: number;
  tx: number;
  ty: number;
  jx: number;
  jy: number;
  size: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function buildTextPoints(
  text: string,
  font: string,
  width: number,
  height: number,
  sampleGap: number,
  color = "#000",
) {
  const c = document.createElement("canvas");
  c.width = width;
  c.height = height;
  const ctx = c.getContext("2d");
  if (!ctx) return [] as { x: number; y: number }[];

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = font;
  ctx.fillText(text, width / 2, height / 2);

  const data = ctx.getImageData(0, 0, width, height).data;
  const points: { x: number; y: number }[] = [];
  for (let y = 0; y < height; y += sampleGap) {
    for (let x = 0; x < width; x += sampleGap) {
      const alpha = data[(y * width + x) * 4 + 3];
      if (alpha > 100) points.push({ x, y });
    }
  }
  return points;
}

export default function ParticleMorph() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let raf = 0;
    let w = 0;
    let h = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const sourceEl = document.querySelector(".hero-year") as HTMLElement | null;
      const targetEl = document.querySelector(".manifesto-bignum") as HTMLElement | null;
      if (!sourceEl || !targetEl) return;

      const sourceRect = sourceEl.getBoundingClientRect();
      const targetRect = targetEl.getBoundingClientRect();

      const sourceSize = Math.max(32, sourceRect.height * 0.95);
      const targetSize = Math.max(72, targetRect.height * 0.9);

      const sourcePointsLocal = buildTextPoints(
        "2026",
        `700 ${sourceSize}px Inter, Helvetica Neue, Arial, sans-serif`,
        Math.max(140, Math.floor(sourceRect.width * 1.1)),
        Math.max(80, Math.floor(sourceRect.height * 1.2)),
        4,
      );
      const targetPointsLocal = buildTextPoints(
        "ACM",
        `800 ${targetSize}px Inter, Helvetica Neue, Arial, sans-serif`,
        Math.max(260, Math.floor(targetRect.width * 0.95)),
        Math.max(120, Math.floor(targetRect.height * 0.95)),
        4,
      );

      const sourceCx = sourceRect.left + sourceRect.width / 2;
      const sourceCy = sourceRect.top + sourceRect.height / 2;
      const targetCx = targetRect.left + targetRect.width / 2;
      const targetCy = targetRect.top + targetRect.height / 2;

      const maxCount = Math.min(sourcePointsLocal.length, targetPointsLocal.length, 2200);
      particles = [];
      for (let i = 0; i < maxCount; i += 1) {
        const s = sourcePointsLocal[(i * 7) % sourcePointsLocal.length];
        const t = targetPointsLocal[(i * 11) % targetPointsLocal.length];
        particles.push({
          sx: sourceCx - Math.max(140, Math.floor(sourceRect.width * 1.1)) / 2 + s.x,
          sy: sourceCy - Math.max(80, Math.floor(sourceRect.height * 1.2)) / 2 + s.y,
          tx: targetCx - Math.max(260, Math.floor(targetRect.width * 0.95)) / 2 + t.x,
          ty: targetCy - Math.max(120, Math.floor(targetRect.height * 0.95)) / 2 + t.y,
          jx: (Math.random() - 0.5) * 40,
          jy: Math.random() * 90 + 20,
          size: Math.random() * 1.8 + 0.6,
        });
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, w, h);

      const heroEl = document.getElementById("hero");
      const manifestoEl = document.getElementById("manifesto");
      const yearEl = document.querySelector(".hero-year") as HTMLElement | null;
      const acmEl = document.querySelector(".manifesto-bignum") as HTMLElement | null;

      if (!heroEl || !manifestoEl || !yearEl || !acmEl || particles.length === 0) {
        raf = requestAnimationFrame(render);
        return;
      }

      const start = heroEl.offsetTop + heroEl.offsetHeight * 0.45;
      const end = manifestoEl.offsetTop + manifestoEl.offsetHeight * 0.55;
      const raw = (window.scrollY - start) / Math.max(1, end - start);
      const progress = clamp(raw, 0, 1);

      const breakup = clamp((progress - 0.04) / 0.44, 0, 1);
      const travel = clamp((progress - 0.22) / 0.72, 0, 1);
      const travelEased = easeInOutCubic(travel);
      const holdWindow = clamp((progress - 0.86) / 0.12, 0, 1);
      const holdOpacity = 1 - holdWindow;
      const alpha = progress <= 0 ? 0 : breakup * holdOpacity;

      const yearFill = 1 - clamp(progress / 0.62, 0, 1);
      const yearStroke = clamp(progress / 0.48, 0.18, 1);
      const acmFill = clamp((progress - 0.6) / 0.3, 0, 1);
      yearEl.style.setProperty("--year-fill-alpha", `${yearFill}`);
      yearEl.style.setProperty("--year-stroke-alpha", `${yearStroke}`);
      acmEl.style.setProperty("--acm-fill-alpha", `${acmFill}`);

      if (alpha > 0.001) {
        ctx.globalCompositeOperation = "source-over";
        for (const p of particles) {
          const x = p.sx + (p.tx - p.sx) * travelEased + p.jx * (1 - travelEased);
          const y = p.sy + (p.ty - p.sy) * travelEased + p.jy * Math.sin((1 - travelEased) * Math.PI);

          const r = Math.round(255 - 10 * travelEased);
          const g = Math.round(43 + 198 * travelEased);
          const b = Math.round(43 + 187 * travelEased);

          ctx.fillStyle = `rgba(${r},${g},${b},${0.9 * alpha})`;
          ctx.fillRect(x, y, p.size, p.size);
        }
      }

      raf = requestAnimationFrame(render);
    };

    resize();
    render();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      const yearEl = document.querySelector(".hero-year") as HTMLElement | null;
      const acmEl = document.querySelector(".manifesto-bignum") as HTMLElement | null;
      if (yearEl) yearEl.style.removeProperty("--year-fill-alpha");
      if (yearEl) yearEl.style.removeProperty("--year-stroke-alpha");
      if (acmEl) acmEl.style.removeProperty("--acm-fill-alpha");
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-morph-layer" aria-hidden="true" />;
}
