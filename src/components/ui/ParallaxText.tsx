"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ParallaxTextProps {
  children: string;
  className?: string;
}

export default function ParallaxText({
  children,
  className = "",
}: ParallaxTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;

    const tl = gsap.to(text, {
      xPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5, // Smoother scrub
      },
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className={`overflow-hidden whitespace-nowrap flex py-4 ${className}`}>
      <div ref={textRef} className="flex whitespace-nowrap will-change-transform">
        <span className="block pr-12 text-transparent [-webkit-text-stroke:1px_rgba(17,17,17,0.1)] dark:[-webkit-text-stroke:1px_rgba(245,243,238,0.1)]">
          {children}
        </span>
        <span className="block pr-12 text-transparent [-webkit-text-stroke:1px_rgba(17,17,17,0.1)] dark:[-webkit-text-stroke:1px_rgba(245,243,238,0.1)]">
          {children}
        </span>
        <span className="block pr-12 text-transparent [-webkit-text-stroke:1px_rgba(17,17,17,0.1)] dark:[-webkit-text-stroke:1px_rgba(245,243,238,0.1)]">
          {children}
        </span>
        <span className="block pr-12 text-transparent [-webkit-text-stroke:1px_rgba(17,17,17,0.1)] dark:[-webkit-text-stroke:1px_rgba(245,243,238,0.1)]">
          {children}
        </span>
      </div>
    </div>
  );
}
