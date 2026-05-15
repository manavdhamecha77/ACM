"use client";

import { benefits } from "../data";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export default function BenefitsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isMobile = window.innerWidth < 1024;
    if (isMobile) return;

    const cards = gsap.utils.toArray(".benefit-card-inner");
    
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
    cards.forEach((card: any, i: number) => {
      if (i === 0) {
        // First card stays for a bit
        tl.to({}, { duration: 1 });
        return;
      }

      // Transition
      tl.to(cards[i - 1] as any, { autoAlpha: 0, y: -30, duration: 1 });
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
      className="p-0"
      style={{ background: "#f0ede7", borderBottom: "1px solid var(--border)", height: "100vh", overflow: "hidden", padding: 0 }}
    >
      <div className="container" style={{ maxWidth: "100%", padding: 0, height: "100%", margin: 0 }}>
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: 0, height: "100%" }}>
          
          {/* Left Side: Frozen Content (50%) - LEFT ALIGNED */}
          <div className="flex flex-col pt-[20vh] px-12 sm:px-24 border-r border-[#D8D5CE] text-left items-start h-full bg-[#f0ede7] z-10">
            <span className="label" style={{ textAlign: "left", width: "100%" }}>Membership</span>
            <h2 className="big-title" style={{ margin: "1.5rem 0", textAlign: "left" }}>
              Why Join
              <br />
              <span>ACM SVNIT?</span>
            </h2>
            <p className="manifesto-body" style={{ maxWidth: "420px", margin: 0, textAlign: "left" }}>
              We provide the tools, community, and platform for engineering students to excel beyond the classroom.
            </p>
          </div>

          {/* Right Side: Stacked Content (50%) - RIGHT ALIGNED */}
          <div ref={rightRef} className="relative h-full bg-white overflow-hidden">
            {benefits.map((benefit, i) => (
              <div 
                key={benefit.title}
                className="benefit-card-inner absolute inset-x-0 top-0 pt-[20vh] px-12 sm:px-24 text-right flex flex-col items-end"
                style={{ 
                  opacity: i === 0 ? 1 : 0, 
                  visibility: i === 0 ? "visible" : "hidden",
                  pointerEvents: i === 0 ? "auto" : "none" 
                }}
              >
                <span className="label" style={{ fontSize: "5vw", marginBottom: "2rem", opacity: 0.15, display: "block", fontWeight: 900, textAlign: "right" }}>
                  {benefit.number}
                </span>
                <h3 className="big-title" style={{ fontSize: "2.5rem", textTransform: "uppercase", fontWeight: 900, marginBottom: "1.5rem", lineHeight: 1.1, textAlign: "right" }}>
                  {benefit.title}
                </h3>
                <p className="manifesto-body" style={{ fontSize: "1.2rem", lineHeight: 1.7, color: "var(--mid)", maxWidth: "500px", textAlign: "right" }}>
                  {benefit.body}
                </p>
                
                <div className="mt-12 group cursor-pointer flex items-center gap-4 justify-end">
                  <span className="label" style={{ marginBottom: 0, fontSize: "0.7rem", color: "var(--ink)" }}>Deep Dive</span>
                  <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-[#FF2B2B] group-hover:border-[#FF2B2B] group-hover:text-white transition-all">
                    <span>→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
