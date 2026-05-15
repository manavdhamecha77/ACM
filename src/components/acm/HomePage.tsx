"use client";

import { useEffect, useState } from "react";
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
import CustomCursor from "../ui/CustomCursor";

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeYear, setActiveYear] = useState(years[0]);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);

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

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleFaqToggle = (index: number) => {
    setOpenFaqIndex((current) => (current === index ? null : index));
  };

  return (
    <>
      <CustomCursor />
      <main>
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
