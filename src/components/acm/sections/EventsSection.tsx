"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { events } from "../data";

export default function EventsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isMobile = window.innerWidth < 1024;
    if (isMobile) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top top",
        end: () => `+=${sectionRef.current?.scrollWidth ? sectionRef.current.scrollWidth - window.innerWidth : 0}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // Animate the horizontal movement
    tl.to(sectionRef.current, {
      x: () => {
        if (!sectionRef.current) return 0;
        return -(sectionRef.current.scrollWidth - window.innerWidth);
      },
      ease: "none",
    });

    return () => {
      tl.kill();
    };
  }, { scope: triggerRef });

  return (
    <div ref={triggerRef} className="overflow-hidden bg-black text-white">
      <div 
        ref={sectionRef} 
        className="flex h-screen relative items-center"
        style={{ width: `${(events.length + 2) * 100}vw` }}
      >
        {/* Header Slide */}
        <div className="h-screen w-screen flex flex-col justify-center px-12 shrink-0" style={{ background: "#111" }}>
          <span className="label">Flagship Events</span>
          <h2 className="big-title" style={{ color: "white", fontSize: "10vw" }}>
            The
            <br />
            Experiences
          </h2>
          <p className="manifesto-body" style={{ color: "rgba(255,255,255,0.5)" }}>
            A showcase of our most impactful technical gatherings and competitions.
          </p>
        </div>

        {/* Event Slides */}
        {events.map((event, idx) => (
          <div 
            key={event.name}
            className="h-screen w-screen flex flex-col justify-center px-12 shrink-0 border-r border-white/10"
            style={{ background: idx % 2 === 0 ? "#000" : "#0a0a0a" }}
          >
            <div className="flex items-baseline gap-4 mb-8">
              <span className="label" style={{ fontSize: "4rem", marginBottom: 0, opacity: 0.2 }}>{event.number}</span>
              <span className="label" style={{ fontSize: "0.8rem" }}>{event.type}</span>
            </div>
            <h3 className="big-title" style={{ color: "white", fontSize: "8vw", marginBottom: "2rem" }}>
              {event.name}
            </h3>
            <p className="manifesto-body" style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.5rem", maxWidth: "800px" }}>
              {event.description}
            </p>
          </div>
        ))}
        
        {/* End Slide */}
        <div className="h-screen w-screen flex flex-col justify-center items-center shrink-0 bg-black text-white" style={{ background: "#FF2B2B" }}>
          <h2 className="big-title" style={{ color: "white", textAlign: "center", fontSize: "8vw" }}>
            READY TO
            <br />
            EVOLVE?
          </h2>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .flex { display: block !important; width: 100% !important; height: auto !important; }
          .h-screen { height: auto !important; padding: 5rem 1.5rem !important; }
          .w-screen { width: 100% !important; }
          .big-title { font-size: 3.5rem !important; }
        }
      `}</style>
    </div>
  );
}