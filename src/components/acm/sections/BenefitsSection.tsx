"use client";

import { benefits } from "../data";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export default function BenefitsSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();
    const cards = gsap.utils.toArray<HTMLElement>(".benefit-card-inner");

    mm.add({
      isMobile: "(max-width: 1023px)",
      isDesktop: "(min-width: 1024px)"
    }, (context) => {
      const { isMobile } = context.conditions as any;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: "+=300%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Initial state
      gsap.set(cards, { autoAlpha: 0, y: isMobile ? 20 : 30 });
      gsap.set(cards[0], { autoAlpha: 1, y: 0 });

      cards.forEach((card, i) => {
        if (i === 0) {
          tl.to({}, { duration: 1 });
          return;
        }
        tl.to(cards[i - 1], { autoAlpha: 0, y: isMobile ? -20 : -30, duration: 1 });
        tl.to(card, { autoAlpha: 1, y: 0, duration: 1 }, "<+=0.2");
        tl.to({}, { duration: 1 });
      });

      return () => {
        tl.kill();
      };
    });

    return () => mm.revert();
  }, { scope: wrapperRef });

  return (
    <div ref={wrapperRef} className="benefits-section-wrapper">
      <section 
        id="benefits" 
        ref={pinRef} 
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
          <div className="benefits-right relative" style={{ backgroundColor: "#fafafa" }}>
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
                
                <div className="benefit-cta group cursor-pointer inline-flex items-center gap-6 px-8 py-4 border-2 border-black rounded-full hover:bg-black hover:text-white transition-all duration-500">
                  <span className="label" style={{ marginBottom: 0, color: "inherit", fontSize: "0.9rem" }}>Deep Dive</span>
                  <div className="w-10 h-10 rounded-full bg-[#FF2B2B] flex items-center justify-center text-white group-hover:scale-110 transition-transform">
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
          .benefits-left .big-title { font-size: 6.5vw; line-height: 1.1; margin-bottom: 2rem; text-transform: uppercase; }
          .benefits-left .label { margin-bottom: 2rem; }
          .benefits-left .manifesto-body { font-size: 1.5rem; max-width: 600px; }
          
          .benefits-right { width: 50%; height: 100%; }
          .benefit-card-inner { padding: 0 6rem; align-items: flex-start !important; text-align: left !important; }
          .benefit-num { font-size: 8vw; margin-bottom: 2rem; opacity: 0.15; font-weight: 900; line-height: 1; }
          .benefit-title { font-size: 3.5rem; text-transform: uppercase; font-weight: 900; margin-bottom: 2rem; line-height: 1.1; }
          .benefit-body { font-size: 1.4rem; line-height: 1.7; color: var(--mid); max-width: 650px; text-align: left; }
          .benefit-cta { margin-top: 5rem; }

          @media (max-width: 1024px) {
            .benefits-layout { flex-direction: column; }
            .benefits-left { 
              width: 100%; height: 50vh; border-right: none; border-bottom: 1px solid #D8D5CE;
              padding: 2rem 1.5rem; justify-content: center; align-items: flex-start;
            }
            .benefits-left .big-title { font-size: 3.5rem; margin-bottom: 1rem; }
            .benefits-left .label { margin-bottom: 1rem; }
            .benefits-left .manifesto-body { font-size: 0.9rem; max-width: 100%; }

            .benefits-right { width: 100%; height: 50vh; }
            .benefit-card-inner { padding: 3.5rem 1.5rem 2rem; justify-content: center; align-items: flex-start; text-align: left; }
            .benefit-num { font-size: 15vw; margin-bottom: 1rem; }
            .benefit-title { font-size: 1.8rem; margin-bottom: 1rem; }
            .benefit-body { font-size: 1rem; text-align: left; max-width: 100%; }
            .benefit-cta { margin-top: 3rem; }
          }
        `}</style>
      </section>
    </div>
);
}


