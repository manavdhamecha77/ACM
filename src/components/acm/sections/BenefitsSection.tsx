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
    const cards = gsap.utils.toArray<HTMLElement>(".benefit-card-inner");

    if (isMobile) {
      // Mobile: Vertical Split (Top 50% Pinned, Bottom 50% Transitions)
      gsap.set(cards, { autoAlpha: 0, y: 20 });
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

      cards.forEach((card, i) => {
        if (i === 0) {
          tl.to({}, { duration: 1 });
          return;
        }
        tl.to(cards[i - 1], { autoAlpha: 0, y: -20, duration: 1 });
        tl.to(card, { autoAlpha: 1, y: 0, duration: 1 }, "<+=0.2");
        tl.to({}, { duration: 1 });
      });

    } else {
      // Desktop: Horizontal Split
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

      cards.forEach((card, i) => {
        if (i === 0) {
          tl.to({}, { duration: 1 });
          return;
        }
        tl.to(cards[i - 1], { autoAlpha: 0, y: -30, duration: 1 });
        tl.to(card, { autoAlpha: 1, y: 0, duration: 1 }, "<+=0.2");
        tl.to({}, { duration: 1 });
      });
    }

  }, { scope: containerRef });

  return (
    <section 
      id="benefits" 
      ref={containerRef} 
      className="p-0 bg-[#f0ede7] h-screen overflow-hidden"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      <div className="benefits-layout flex h-full w-full">
        
        {/* Top/Left Side: Frozen Content */}
        <div className="benefits-left flex flex-col border-[#D8D5CE] items-start">
          <span className="label">Membership</span>
          <h2 className="big-title">
            The Way
            <br />
            <span>We Grow.</span>
          </h2>
          <p className="manifesto-body">
            We provide the tools, community, and platform for engineering students to excel beyond the classroom.
          </p>
        </div>

        {/* Bottom/Right Side: Stacked Content */}
        <div className="benefits-right bg-white relative">
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
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                opacity: i === 0 ? 1 : 0, 
                visibility: i === 0 ? "visible" : "hidden",
                pointerEvents: i === 0 ? "auto" : "none" 
              }}
            >
              <span className="benefit-num label">
                {benefit.number}
              </span>
              <h3 className="benefit-title">
                {benefit.title}
              </h3>
              <p className="benefit-body">
                {benefit.body}
              </p>
              
              <div className="benefit-cta mt-12 group cursor-pointer flex items-center gap-4">
                <span className="label">Deep Dive</span>
                <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-[#FF2B2B] group-hover:border-[#FF2B2B] group-hover:text-white transition-all">
                  <span>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .benefits-layout { display: flex; height: 100%; width: 100%; }
        .benefits-left { 
          width: 50%; height: 100%; border-right: 1px solid #D8D5CE;
          display: flex; flexDirection: column; justify-content: center; 
          padding: 0 6rem;
        }
        .benefits-left .big-title { font-size: var(--fs-xl); line-height: 1.1; margin-bottom: 2rem; text-transform: uppercase; }
        .benefits-left .label { margin-bottom: 2rem; }
        .benefits-left .manifesto-body { max-width: 420px; }
        
        .benefits-right { width: 50%; height: 100%; }
        .benefit-card-inner { padding: 0 6rem; }
        .benefit-num { font-size: 5vw; margin-bottom: 2rem; opacity: 0.15; font-weight: 900; line-height: 1; }
        .benefit-title { font-size: 2.5rem; text-transform: uppercase; font-weight: 900; margin-bottom: 2rem; lineHeight: 1.1; }
        .benefit-body { font-size: 1.2rem; line-height: 1.7; color: var(--mid); max-width: 500px; text-align: right; }

        @media (max-width: 1024px) {
          .benefits-layout { flex-direction: column; }
          .benefits-left { 
            width: 100%; height: 50vh; border-right: none; border-bottom: 1px solid #D8D5CE;
            padding: 2rem 1.5rem; justify-content: center; align-items: flex-start;
          }
          .benefits-left .big-title { font-size: 2.5rem; margin-bottom: 1rem; }
          .benefits-left .label { margin-bottom: 1rem; }
          .benefits-left .manifesto-body { font-size: 0.9rem; max-width: 100%; }

          .benefits-right { width: 100%; height: 50vh; }
          .benefit-card-inner { padding: 2rem 1.5rem; justify-content: center; align-items: flex-start; text-align: left; }
          .benefit-num { font-size: 15vw; margin-bottom: 1rem; }
          .benefit-title { font-size: 1.8rem; margin-bottom: 1rem; }
          .benefit-body { font-size: 1rem; text-align: left; max-width: 100%; }
          .benefit-cta { margin-top: 1.5rem; }
        }
      `}</style>
    </section>
  );
}

