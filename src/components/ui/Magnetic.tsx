"use client";

import { useRef, useEffect, ReactNode } from "react";
import gsap from "gsap";

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

export default function Magnetic({ children, strength = 40, className = "" }: MagneticProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Optimized for performance and mobile
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const mouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = container.getBoundingClientRect();

      const x = (clientX - (left + width / 2)) * (strength / 100);
      const y = (clientY - (top + height / 2)) * (strength / 100);

      gsap.to(container, {
        x,
        y,
        duration: 0.8,
        ease: "power3.out",
      });
    };

    const mouseLeave = () => {
      gsap.to(container, {
        x: 0,
        y: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.3)",
      });
    };

    container.addEventListener("mousemove", mouseMove);
    container.addEventListener("mouseleave", mouseLeave);

    return () => {
      container.removeEventListener("mousemove", mouseMove);
      container.removeEventListener("mouseleave", mouseLeave);
    };
  }, [strength]);

  return (
    <div ref={containerRef} className={`inline-block ${className}`}>
      {children}
    </div>
  );
}
