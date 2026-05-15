"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { events } from "../data";

export default function EventsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    // Desktop: Horizontal move of the whole section
    mm.add("(min-width: 1025px)", () => {
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

      tl.to(sectionRef.current, {
        x: () => {
          if (!sectionRef.current) return 0;
          return -(sectionRef.current.scrollWidth - window.innerWidth);
        },
        ease: "none",
      });

      return () => tl.kill();
    });

    // Mobile: Split layout, only bottom scrolls horizontally on vertical scroll
    mm.add("(max-width: 1024px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: () => {
            if (!cardsContainerRef.current) return "+=1000";
            return `+=${cardsContainerRef.current.scrollWidth}`;
          },
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(cardsContainerRef.current, {
        x: () => {
          if (!cardsContainerRef.current) return 0;
          return -(cardsContainerRef.current.scrollWidth - window.innerWidth);
        },
        ease: "none",
      });

      return () => tl.kill();
    });

    return () => mm.revert();
  }, { scope: triggerRef });

  return (
    <div ref={triggerRef} className="events-wrapper overflow-hidden bg-black text-white">
      <div 
        ref={sectionRef} 
        className="events-container flex h-screen relative items-center"
        style={{ width: "max-content" }}
      >
        {/* Header Slide */}
        <div className="header-slide h-screen w-screen flex flex-col justify-center px-12 shrink-0" style={{ background: "#111" }}>
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

        <div ref={cardsContainerRef} className="cards-horizontal-container flex h-full items-center">
          {/* Event Slides */}
          {events.map((event, idx) => (
            <div 
              key={event.name}
              className="slide-item h-screen w-screen flex flex-col justify-center px-12 shrink-0 border-r border-white/10"
              style={{ background: idx % 2 === 0 ? "#000" : "#0a0a0a" }}
            >
              <div className="mb-8">
                <span className="label" style={{ fontSize: "12rem", marginBottom: 0, opacity: 0.4 }}>{event.number}</span>
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
          <div className="slide-item h-screen w-screen flex flex-col justify-center items-center shrink-0 bg-black text-white" style={{ background: "#FF2B2B" }}>
            <h2 className="big-title" style={{ color: "white", textAlign: "center", fontSize: "8vw" }}>
              READY TO
              <br />
              EVOLVE?
            </h2>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .events-wrapper {
            overflow: hidden !important;
          }
          .events-container {
            display: flex !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            width: 100vw !important;
            height: 100vh !important;
            overflow: hidden !important;
          }
          .header-slide {
            height: 50vh !important;
            width: 100vw !important;
            padding: 2rem !important;
            justify-content: center !important;
            flex-shrink: 0 !important;
            border-bottom: 1px solid rgba(255,255,255,0.1);
          }
          .cards-horizontal-container {
            display: flex !important;
            flex-direction: row !important;
            flex-wrap: nowrap !important;
            height: 50vh !important;
            width: max-content !important; /* Important for GSAP to scroll the whole width */
            overflow: visible !important; /* Allow GSAP to move it */
            -webkit-overflow-scrolling: touch !important;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          .cards-horizontal-container::-webkit-scrollbar {
            display: none;
          }
          .slide-item {
            flex: 0 0 90vw !important;
            width: 90vw !important;
            height: 50vh !important;
            padding: 2rem !important;
            border-right: 1px solid rgba(255,255,255,0.1);
            display: flex !important;
            flex-direction: column !important;
            justify-content: center !important;
          }
          .big-title { 
            font-size: 11vw !important; 
            line-height: 1.1;
            margin-bottom: 1rem !important;
          }
          .header-slide .big-title {
            font-size: 11vw !important;
          }
          .label {
            font-size: 0.8rem !important;
            letter-spacing: 0.2em;
            margin-bottom: 1.5rem !important;
          }
          .manifesto-body {
            font-size: 0.95rem !important;
            line-height: 1.5 !important;
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
}