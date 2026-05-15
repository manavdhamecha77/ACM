"use client";

import { benefits } from "../data";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export default function BenefitsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isMobile = window.innerWidth < 1024;
    if (isMobile) return;

    const cards = gsap.utils.toArray<HTMLElement>(".benefit-card-inner");
    
    // Initial state: first card visible, others hidden
    gsap.set(cards, { autoAlpha: 0, y: 30 });
    gsap.set(cards[0], { autoAlpha: 1, y: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=300%",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Sequence
    cards.forEach((card, i) => {
      if (i === 0) {
        // First card stays for a bit
        tl.to({}, { duration: 1 });
        return;
      }

      // Transition
      tl.to(cards[i - 1], { autoAlpha: 0, y: -30, duration: 1 });
      tl.to(card, { autoAlpha: 1, y: 0, duration: 1 }, "<+=0.2");
      tl.to({}, { duration: 1 }); // Stay on current card
    });

    return () => {
      tl.kill();
    };
  }, { scope: containerRef });

  return (
    <section 
      id="benefits" 
      ref={containerRef} 
      className="p-0 bg-[#f0ede7] h-screen overflow-hidden"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      <div className="flex h-full w-full" style={{ display: "flex", height: "100%", width: "100%" }}>
        
        {/* Left Side: Frozen Content (50%) - LEFT ALIGNED */}
        <div className="flex flex-col border-r border-[#D8D5CE] items-start" style={{ width: "50%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", paddingLeft: "6rem", paddingRight: "6rem" }}>
          <span className="label" style={{ marginBottom: "2rem" }}>Membership</span>
          <h2 className="big-title" style={{ marginBottom: "2rem", lineHeight: 1.1 }}>
            Why Join
            <br />
            <span>ACM SVNIT?</span>
          </h2>
          <p className="manifesto-body" style={{ maxWidth: "420px", margin: 0 }}>
            We provide the tools, community, and platform for engineering students to excel beyond the classroom.
          </p>
        </div>

        {/* Right Side: Stacked Content (50%) - RIGHT ALIGNED */}
        <div className="bg-white" style={{ width: "50%", height: "100%", position: "relative" }}>
          {benefits.map((benefit, i) => (
            <div 
              key={benefit.title}
              className="benefit-card-inner flex flex-col items-end text-right"
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
                opacity: i === 0 ? 1 : 0, 
                visibility: i === 0 ? "visible" : "hidden",
                pointerEvents: i === 0 ? "auto" : "none" 
              }}
            >
              <span className="label" style={{ fontSize: "5vw", marginBottom: "2rem", opacity: 0.15, display: "block", fontWeight: 900, lineHeight: 1 }}>
                {benefit.number}
              </span>
              <h3 className="big-title" style={{ fontSize: "2.5rem", textTransform: "uppercase", fontWeight: 900, marginBottom: "2rem", lineHeight: 1.1 }}>
                {benefit.title}
              </h3>
              <p className="manifesto-body" style={{ fontSize: "1.2rem", lineHeight: 1.7, color: "var(--mid)", maxWidth: "500px", textAlign: "right", margin: 0 }}>
                {benefit.body}
              </p>
              
              <div className="mt-12 group cursor-pointer flex items-center gap-4" style={{ marginTop: "3rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                <span className="label" style={{ marginBottom: 0, fontSize: "0.7rem", color: "var(--ink)" }}>Deep Dive</span>
                <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-[#FF2B2B] group-hover:border-[#FF2B2B] group-hover:text-white transition-all" style={{ width: "3rem", height: "3rem" }}>
                  <span>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          #benefits { height: auto !important; overflow: visible !important; }
          .flex { display: block !important; }
          .w-1/2 { width: 100% !important; height: auto !important; }
          .pt-\[20vh\] { padding-top: 5rem !important; }
          .benefit-card-inner { position: relative !important; opacity: 1 !important; visibility: visible !important; padding-bottom: 5rem !important; }
          .border-r { border-right: none !important; border-bottom: 1px solid var(--border); }
        }
      `}</style>
    </section>
  );
}
