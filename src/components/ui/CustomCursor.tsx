"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    // Use quickSetter for performance and to avoid React state updates
    const xCursorSetter = gsap.quickSetter(cursor, "x", "px");
    const yCursorSetter = gsap.quickSetter(cursor, "y", "px");
    const xRingSetter = gsap.quickSetter(ring, "x", "px");
    const yRingSetter = gsap.quickSetter(ring, "y", "px");

    const mouse = { x: 0, y: 0 };
    const ringPos = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      
      xCursorSetter(mouse.x - 5);
      yCursorSetter(mouse.y - 5);

      // Check for hoverable elements
      const target = e.target as HTMLElement;
      setActive(!!target.closest("a, button, .activity, .event-row, .group"));
    };

    const animateRing = () => {
      ringPos.x += (mouse.x - ringPos.x) * 0.15;
      ringPos.y += (mouse.y - ringPos.y) * 0.15;
      
      xRingSetter(ringPos.x - 20);
      yRingSetter(ringPos.y - 20);
      
      requestAnimationFrame(animateRing);
    };

    window.addEventListener("mousemove", onMouseMove);
    const frame = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        id="cursor"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: active ? 18 : 10,
          height: active ? 18 : 10,
          backgroundColor: "white",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "difference",
          transition: "width 0.3s, height 0.3s",
        }}
      />
      <div
        ref={ringRef}
        id="cursor-ring"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: active ? 60 : 40,
          height: active ? 60 : 40,
          border: "1px solid white",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9998,
          mixBlendMode: "difference",
          transition: "width 0.3s, height 0.3s",
        }}
      />
    </>
  );
}
