"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { years } from "./data";
import BenefitsSection from "./sections/BenefitsSection";
import CtaSection from "./sections/CtaSection";
import EventsSection from "./sections/EventsSection";
import FaqSection from "./sections/FaqSection";
import Footer from "./sections/Footer";
import HeroSection from "./sections/HeroSection";
import ManifestoSection from "./sections/ManifestoSection";
import NavBar from "./sections/NavBar";
import TeamSection from "./sections/TeamSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import WhatWeDoSection from "./sections/WhatWeDoSection";

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeYear, setActiveYear] = useState(years[0]);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [ring, setRing] = useState({ x: 0, y: 0 });
  const [cursorActive, setCursorActive] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });

  const ringTransform = useMemo(
    () => ({ transform: `translate(${ring.x - 20}px, ${ring.y - 20}px)` }),
    [ring],
  );
  const cursorTransform = useMemo(
    () => ({ transform: `translate(${cursor.x - 5}px, ${cursor.y - 5}px)` }),
    [cursor],
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    const onMouseMove = (event: MouseEvent) => {
      const point = { x: event.clientX, y: event.clientY };
      mouseRef.current = point;
      setCursor(point);
    };

    let frame = 0;
    const animateRing = () => {
      setRing((previous) => ({
        x: previous.x + (mouseRef.current.x - previous.x) * 0.12,
        y: previous.y + (mouseRef.current.y - previous.y) * 0.12,
      }));
      frame = requestAnimationFrame(animateRing);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 },
    );

    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    window.addEventListener("scroll", onScroll);
    document.addEventListener("mousemove", onMouseMove);
    frame = requestAnimationFrame(animateRing);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  const handleFaqToggle = (index: number) => {
    setOpenFaqIndex((current) => (current === index ? null : index));
  };

  return (
    <>
      <div
        id="cursor"
        style={{ ...cursorTransform, width: cursorActive ? 18 : 10, height: cursorActive ? 18 : 10 }}
      ></div>
      <div
        id="cursor-ring"
        style={{ ...ringTransform, width: cursorActive ? 60 : 40, height: cursorActive ? 60 : 40 }}
      ></div>
      <main
        onMouseOver={(event) => {
          const target = event.target as HTMLElement;
          if (target.closest("a,button,.activity,.event-row")) setCursorActive(true);
        }}
        onMouseOut={(event) => {
          const target = event.target as HTMLElement;
          if (target.closest("a,button,.activity,.event-row")) setCursorActive(false);
        }}
      >
        <NavBar scrolled={scrolled} />
        <HeroSection />
        <ManifestoSection />
        <WhatWeDoSection />
        <EventsSection />
        <BenefitsSection />
        <TeamSection activeYear={activeYear} setActiveYear={setActiveYear} />
        <TestimonialsSection />
        <FaqSection openIndex={openFaqIndex} onToggle={handleFaqToggle} />
        <CtaSection />
        <Footer />
      </main>
    </>
  );
}
