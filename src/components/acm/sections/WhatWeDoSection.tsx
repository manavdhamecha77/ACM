"use client";

import { activities } from "../data";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Magnetic from "@/components/ui/Magnetic";

export default function WhatWeDoSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".activity-item", {
      scrollTrigger: {
        trigger: ".activities-grid",
        start: "top 80%",
      },
      y: 50,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: "power3.out"
    });
  }, { scope: containerRef });

  return (
    <section id="what" ref={containerRef} style={{ borderBottom: "1px solid var(--border)" }}>
      <div className="container" style={{ maxWidth: "100%", padding: 0 }}>
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: 0 }}>

          {/* Left Side: Scrolling Content (50%) */}
          <div className="activities-grid flex flex-col py-32 px-12 sm:px-24 gap-12 order-2 lg:order-1 bg-white/30">
            {activities.map((activity) => (
              <Magnetic key={activity.title} strength={10} className="w-full">
                <div className="activity-item bg-white p-12 border border-[#eee] hover:border-[#FF2B2B] transition-all">
                  <div className="flex justify-between items-start mb-8">
                    <span className="label" style={{ marginBottom: 0 }}>{activity.number}</span>
                    <div className="flex gap-2">
                      {activity.tags.map((tag) => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <h3 className="b-title" style={{ fontSize: "2rem", textTransform: "uppercase", fontWeight: 900, marginBottom: "1rem" }}>
                    {activity.title}
                  </h3>
                  <p className="b-body" style={{ fontSize: "1rem", lineHeight: 1.6 }}>{activity.body}</p>
                </div>
              </Magnetic>
            ))}
          </div>

          {/* Right Side: Sticky Content (50%) */}
          <div className="lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center px-12 sm:px-24 order-1 lg:order-2 border-l border-[#D8D5CE]">
            <span className="label">Ecosystem</span>
            <h2 className="big-title" style={{ margin: "1.5rem 0" }}>
              The Way
              <br />
              <span>We Grow.</span>
            </h2>
            <p className="manifesto-body" style={{ maxWidth: "420px", margin: 0 }}>
              A multifaceted approach to technical excellence, combining theory with aggressive practical building.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
