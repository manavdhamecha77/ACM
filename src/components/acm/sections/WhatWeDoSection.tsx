"use client";

import { activities } from "../data";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export default function WhatWeDoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isMobile = window.innerWidth < 1024;
    if (isMobile) return;

    const cards = gsap.utils.toArray<HTMLElement>(".activity-card-inner");
    if (cards.length === 0) return;

    // Set initial states
    gsap.set(cards, { 
      autoAlpha: 0, 
      rotateY: 90, 
      zIndex: 1,
      transformPerspective: 2000,
    });
    gsap.set(cards[0], { 
      autoAlpha: 1, 
      rotateY: 0, 
      zIndex: 2 
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top top",
        end: `+=${activities.length * 150}%`, // More scroll space for smoother transition
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // Sequence for Cube Rotation
    cards.forEach((card, i) => {
      if (i === 0) {
        tl.to({}, { duration: 0.5 }); // Initial pause
        return;
      }

      // Rotate out previous card
      tl.to(cards[i - 1], { 
        rotateY: -90, 
        autoAlpha: 0, 
        transformOrigin: "center left",
        duration: 1, 
        ease: "power2.inOut",
      });
      
      // Rotate in current card
      tl.fromTo(card, 
        { rotateY: 90, autoAlpha: 0, transformOrigin: "center right" },
        { rotateY: 0, autoAlpha: 1, duration: 1, ease: "power2.inOut" },
        "<" // Sync with previous card's rotation
      );

      // Brief pause on the current card
      tl.to({}, { duration: 0.5 });
    });

    return () => {
      tl.kill();
    };
  }, { scope: triggerRef });

  return (
    <div ref={triggerRef} className="bg-white">
      <section 
        id="what" 
        ref={containerRef} 
        className="p-0 h-screen overflow-hidden flex"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div className="flex h-full w-full" style={{ display: "flex", height: "100%", width: "100%" }}>
          
          {/* Left Side: Stacked Content (50%) - Cube Rotation - LEFT ALIGNED */}
          <div className="bg-black" style={{ width: "50%", height: "100%", position: "relative", perspective: "2000px" }}>
            {activities.map((activity, i) => (
              <div 
                key={activity.title}
                className="activity-card-inner"
                style={{ 
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  paddingLeft: "6rem",
                  paddingRight: "6rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  textAlign: "left",
                  backfaceVisibility: "hidden",
                  transformStyle: "preserve-3d",
                  opacity: i === 0 ? 1 : 0, 
                  visibility: i === 0 ? "visible" : "hidden",
                  pointerEvents: i === 0 ? "auto" : "none" 
                }}
              >
                <span className="label" style={{ fontSize: "5vw", marginBottom: "2rem", opacity: 0.15, display: "block", fontWeight: 900, lineHeight: 1, color: "white" }}>
                  {activity.number.split(" / ")[0]}
                </span>
                <h3 className="big-title" style={{ fontSize: "2.5rem", textTransform: "uppercase", fontWeight: 900, marginBottom: "2rem", lineHeight: 1.1, color: "white" }}>
                  {activity.title}
                </h3>
                <p className="manifesto-body" style={{ fontSize: "1.2rem", lineHeight: 1.7, color: "rgba(255,255,255,0.6)", maxWidth: "500px", textAlign: "left", margin: 0 }}>
                  {activity.body}
                </p>
                
                <div className="mt-12 group cursor-pointer flex items-center gap-4" style={{ marginTop: "3rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div className="flex gap-2">
                    {activity.tags.map((tag) => (
                      <span key={tag} className="tag" style={{ border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.6)", padding: "0.2rem 0.6rem", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>{tag}</span>
                    ))}
                  </div>
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#FF2B2B] group-hover:border-[#FF2B2B] group-hover:text-white transition-all text-white" style={{ width: "3rem", height: "3rem" }}>
                    <span>→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side: Frozen Content (50%) - RIGHT ALIGNED */}
          <div className="flex flex-col border-l border-[#D8D5CE] items-end text-right bg-[#f0ede7]" style={{ width: "50%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", paddingLeft: "6rem", paddingRight: "6rem" }}>
            <span className="label" style={{ marginBottom: "2rem" }}>Ecosystem</span>
            <h2 className="big-title" style={{ marginBottom: "2rem", lineHeight: 1.1 }}>
              The Way
              <br />
              <span>We Grow.</span>
            </h2>
            <p className="manifesto-body" style={{ maxWidth: "420px", margin: 0 }}>
              A multifaceted approach to technical excellence, combining theory with aggressive practical building.
            </p>
          </div>

        </div>

        <style jsx>{`
          @media (max-width: 1024px) {
            #what { height: auto !important; overflow: visible !important; }
            .flex { display: block !important; }
            .activity-card-inner { position: relative !important; opacity: 1 !important; visibility: visible !important; padding-bottom: 5rem !important; transform: none !important; }
            .border-l { border-left: none !important; border-top: 1px solid var(--border); }
          }
        `}</style>
      </section>
    </div>
  );
}
