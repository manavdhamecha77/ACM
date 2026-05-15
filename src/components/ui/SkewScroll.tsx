"use client";

import { useRef, useEffect, ReactNode } from "react";

export default function SkewScroll({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Note: The skew effect logic is currently disabled to keep it optimized for mobile.
    // We can re-enable it by implementing a simpler transform based on scroll speed if needed.
  }, []);

  return <div ref={containerRef}>{children}</div>;
}
