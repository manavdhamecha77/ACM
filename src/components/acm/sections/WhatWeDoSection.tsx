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
    const cards = gsap.utils.toArray<HTMLElement>(".activity-card-inner");

    if (isMobile) {
      // Mobile: Vertical Split (Top 50% Pinned, Bottom 50% Transitions)
      gsap.set(cards, {
        autoAlpha: 0,
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
          end: "+=400%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      cards.forEach((card, i) => {
        if (i === 0) {
          tl.to({}, { duration: 0.5 });
          return;
        }

        const isVertical = i % 2 === 0;
        const label = `step-${i}`;

        if (!isVertical) {
          tl.to(cards[i - 1], {
            rotateY: -90,
            autoAlpha: 0,
            transformOrigin: "center right",
            duration: 1,
            ease: "power2.inOut",
          }, label);

          tl.fromTo(card,
            { rotateY: 90, autoAlpha: 0, transformOrigin: "center left" },
            { rotateY: 0, autoAlpha: 1, duration: 1, ease: "power2.inOut" },
            label
          );
        } else {
          tl.to(cards[i - 1], {
            rotateX: 90,
            autoAlpha: 0,
            transformOrigin: "top center",
            duration: 1,
            ease: "power2.inOut",
          }, label);

          tl.fromTo(card,
            { rotateX: -90, autoAlpha: 0, transformOrigin: "bottom center" },
            { rotateX: 0, autoAlpha: 1, duration: 1, ease: "power2.inOut" },
            label
          );
        }

        tl.to({}, { duration: 0.5 });
      });

    } else {

      // Desktop: Horizontal Split with Cube Rotation
      gsap.set(cards, {
        autoAlpha: 0,
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
          end: `+=${activities.length * 150}%`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      cards.forEach((card, i) => {
        if (i === 0) {
          tl.to({}, { duration: 0.5 });
          return;
        }

        const isVertical = i % 2 === 0;
        const label = `step-${i}`;

        if (!isVertical) {
          tl.to(cards[i - 1], {
            rotateY: -90,
            autoAlpha: 0,
            transformOrigin: "center right",
            duration: 1,
            ease: "power2.inOut",
          }, label);

          tl.fromTo(card,
            { rotateY: 90, autoAlpha: 0, transformOrigin: "center left" },
            { rotateY: 0, autoAlpha: 1, duration: 1, ease: "power2.inOut" },
            label
          );
        } else {
          tl.to(cards[i - 1], {
            rotateX: 90,
            autoAlpha: 0,
            transformOrigin: "top center",
            duration: 1,
            ease: "power2.inOut",
          }, label);

          tl.fromTo(card,
            { rotateX: -90, autoAlpha: 0, transformOrigin: "bottom center" },
            { rotateX: 0, autoAlpha: 1, duration: 1, ease: "power2.inOut" },
            label
          );
        }

        tl.to({}, { duration: 0.5 });
      });
    }

  }, { scope: triggerRef });

  return (
    <div ref={triggerRef} className="bg-white">
      <section
        id="what"
        className="p-0 h-screen overflow-hidden"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div className="what-layout flex h-full w-full">

          {/* Top/Right Side: Frozen Content */}
          <div className="what-info flex flex-col border-[#D8D5CE] items-end text-right bg-[#f0ede7]">
            <span className="label">Ecosystem</span>
            <h2 className="big-title">
              What do
              <br />
              <span>We Do?</span>
            </h2>
            <p className="manifesto-body">
              A multifaceted approach to technical excellence, combining theory with aggressive practical building.
            </p>
          </div>

          {/* Bottom/Left Side: Stacked Content */}
          <div className="what-cards bg-black relative" style={{ perspective: "2000px" }}>
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
                <span className="activity-num label">
                  {activity.number.split(" / ")[0]}
                </span>
                <h3 className="activity-title">
                  {activity.title}
                </h3>
                <p className="activity-body">
                  {activity.body}
                </p>

                <div className="activity-cta mt-12 group cursor-pointer flex items-center gap-4">
                  <div className="flex gap-2">
                    {activity.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#FF2B2B] group-hover:border-[#FF2B2B] group-hover:text-white transition-all text-white">
                    <span>→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        <style jsx>{`
          .what-layout { display: flex; height: 100%; width: 100%; }
          .what-info { 
            width: 50%; height: 100%; border-left: 1px solid #D8D5CE; order: 2;
            padding: 0 6rem; justify-content: center;
          }
          .what-info .big-title { font-size: var(--fs-xl); line-height: 1.1; margin-bottom: 2rem; text-transform: uppercase; }
          .what-info .label { margin-bottom: 2rem; }
          .what-info .manifesto-body { max-width: 420px; }

          .what-cards { width: 50%; height: 100%; order: 1; }
          .activity-card-inner { padding: 0 6rem; }
          .activity-num { font-size: 5vw; margin-bottom: 2rem; opacity: 0.15; font-weight: 900; line-height: 1; color: white; }
          .activity-title { font-size: 2.5rem; text-transform: uppercase; font-weight: 900; margin-bottom: 2rem; line-height: 1.1; color: white; }
          .activity-body { font-size: 1.2rem; line-height: 1.7; color: rgba(255,255,255,0.6); max-width: 500px; }
          .tag { border: 1px solid rgba(255,255,255,0.2); color: rgba(255,255,255,0.6); padding: 0.2rem 0.6rem; fontSize: 0.7rem; text-transform: uppercase; letterSpacing: 0.1em; }

          @media (max-width: 1024px) {
            .what-layout { flex-direction: column; }
            .what-info { 
              width: 100%; height: 50vh; border-left: none; border-bottom: 1px solid #D8D5CE; order: 1;
              padding: 2rem 1.5rem; justify-content: center; align-items: flex-start; text-align: left;
            }
            .what-info .big-title { font-size: 3.5rem; margin-bottom: 1rem; }
            .what-info .label { margin-bottom: 1rem; }
            .what-info .manifesto-body { font-size: 0.9rem; max-width: 100%; }

            .what-cards { width: 100%; height: 50vh; order: 2; }
            .activity-card-inner { padding: 2rem 1.5rem; justify-content: center; align-items: flex-start; text-align: left; }
            .activity-num { font-size: 15vw; margin-bottom: 1rem; }
            .activity-title { font-size: 1.8rem; margin-bottom: 1rem; }
            .activity-body { font-size: 1rem; text-align: left; max-width: 100%; }
            .activity-cta { margin-top: 1.5rem; }
          }
        `}</style>
      </section>
    </div>
  );
}

