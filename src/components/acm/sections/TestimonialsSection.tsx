"use client";

import { testimonials } from "../data";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

interface Particle {
  el: HTMLElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

export default function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    
    const cardElements = gsap.utils.toArray<HTMLElement>(".t-card");
    const container = cubeRef.current;
    if (!container || cardElements.length === 0) return;

    let particles: Particle[] = [];
    let update: () => void;

    mm.add({
      isMobile: "(max-width: 1024px)",
      isDesktop: "(min-width: 1025px)"
    }, (context) => {
      const { isMobile } = context.conditions as { isMobile: boolean };
      const cardSize = isMobile ? 165 : 264;
      
      // Clear existing particles for fresh start on resize
      particles = [];
      
      cardElements.forEach((el) => {
        let x, y, overlapping;
        let attempts = 0;
        do {
          overlapping = false;
          const rect = container.getBoundingClientRect();
          x = Math.random() * (rect.width - cardSize);
          y = Math.random() * (rect.height - cardSize);
          for (const p of particles) {
            const dx = x - p.x;
            const dy = y - p.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < cardSize + (isMobile ? 10 : 20)) { overlapping = true; break; }
          }
          attempts++;
        } while (overlapping && attempts < 100);

        const p: Particle = {
          el, size: cardSize, x, y,
          vx: (Math.random() - 0.5) * (isMobile ? 1.0 : 1.2),
          vy: (Math.random() - 0.5) * (isMobile ? 1.0 : 1.2),
        };
        gsap.set(el, { 
          x: p.x, 
          y: p.y, 
          width: cardSize, 
          height: cardSize,
          opacity: 1
        });
        particles.push(p);
      });

      update = () => {
        const rect = container.getBoundingClientRect();
        const currentWidth = rect.width;
        const currentHeight = rect.height;

        particles.forEach((p, i) => {
          p.x += p.vx; p.y += p.vy;
          if (p.x <= 0) { p.x = 0; p.vx *= -1; }
          if (p.x >= currentWidth - p.size) { p.x = currentWidth - p.size; p.vx *= -1; }
          if (p.y <= 0) { p.y = 0; p.vy *= -1; }
          if (p.y >= currentHeight - p.size) { p.y = currentHeight - p.size; p.vy *= -1; }

          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = (p.x + p.size/2) - (p2.x + p2.size/2);
            const dy = (p.y + p.size/2) - (p2.y + p2.size/2);
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < p.size) {
              const angle = Math.atan2(dy, dx);
              const sin = Math.sin(angle), cos = Math.cos(angle);
              const vx1 = p.vx * cos + p.vy * sin, vy1 = p.vy * cos - p.vx * sin;
              const vx2 = p2.vx * cos + p2.vy * sin, vy2 = p2.vy * cos - p2.vx * sin;
              const temp = vx1;
              p.vx = vx2 * cos - vy1 * sin; p.vy = vy1 * cos + vx2 * sin;
              p2.vx = temp * cos - vy2 * sin; p2.vy = vy2 * cos + temp * sin;
              const overlap = p.size - distance;
              p.x += (overlap / 2) * cos;
              p.y += (overlap / 2) * sin;
              p2.x -= (overlap / 2) * cos;
              p2.y -= (overlap / 2) * sin;
              gsap.fromTo(p.el, { borderColor: "#FF2B2B" }, { borderColor: "rgba(0,0,0,0.05)", duration: 0.4 });
            }
          }
          gsap.set(p.el, { x: p.x, y: p.y, rotate: p.vx * 3 });
        });
      };

      gsap.ticker.add(update);
      return () => gsap.ticker.remove(update);
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section 
      id="testimonials" 
      ref={containerRef}
      className="p-0 h-screen overflow-hidden bg-white"
      style={{ borderBottom: "1px solid var(--border)", padding: 0 }}
    >
      <div className="t-container flex h-full w-full" style={{ display: "flex", height: "100%", width: "100%" }}>
        
        {/* Left Side: Static Content (50%) */}
        <div className="t-static flex flex-col border-r border-[#D8D5CE] items-start bg-[#f0ede7]" style={{ width: "50%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", paddingLeft: "6rem", paddingRight: "6rem" }}>
          <span className="label" style={{ marginBottom: "2rem" }}>Voices</span>
          <h2 className="big-title" style={{ marginBottom: "2rem", lineHeight: 1.1 }}>
            What Members
            <br />
            <span>Say.</span>
          </h2>
          <p className="manifesto-body" style={{ maxWidth: "420px", margin: 0 }}>
            Real stories from the builders, thinkers, and innovators of ACM SVNIT.
          </p>
        </div>

        {/* Right Side: Physics Cube Area (50%) */}
        <div 
          ref={cubeRef}
          className="t-moving"
          style={{ width: "50%", height: "100%", position: "relative", backgroundColor: "#000", overflow: "hidden" }}
        >
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.name}
              className="t-card"
              style={{ 
                position: "absolute",
                backgroundColor: "#ffffff",
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderRadius: "20px",
                border: "1px solid rgba(0,0,0,0.05)",
                boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
                zIndex: 10,
                overflow: "hidden"
              }}
            >
              <div>
                <span style={{ color: "#FF2B2B", fontSize: "2rem", lineHeight: 1, fontFamily: "serif", display: "block", marginBottom: "0.2rem" }}>&quot;</span>
                <p style={{ color: "#111", fontSize: "0.9rem", lineHeight: 1.6, fontWeight: 500, margin: 0 }}>
                  {testimonial.quote}
                </p>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginTop: "1rem" }}>
                <div style={{ width: "2.2rem", height: "2.2rem", borderRadius: "50%", backgroundColor: "#FF2B2B", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "0.7rem", fontWeight: 700, flexShrink: 0 }}>
                  {testimonial.initials}
                </div>
                <div className="author-details" style={{ overflow: "hidden" }}>
                  <p className="author-name" style={{ fontSize: "0.8rem", fontWeight: 800, color: "#111", textTransform: "uppercase", letterSpacing: "0.05em", margin: 0 }}>{testimonial.name}</p>
                  <p className="author-role" style={{ fontSize: "0.65rem", color: "#888", textTransform: "uppercase", letterSpacing: "0.1em", margin: 0 }}>{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          #testimonials {
            height: 100svh !important;
            overflow: hidden !important;
          }
          .t-container {
            flex-direction: column !important;
            width: 100% !important;
            height: 100% !important;
            flex-wrap: nowrap !important;
          }
          /* Override inline width:50% to full width for vertical stacking */
          .t-static {
            width: 100% !important;
            min-width: 0 !important;
            height: 50% !important;
            padding: 2rem !important;
            border-right: none !important;
            border-bottom: 1px solid rgba(0,0,0,0.1) !important;
            padding-left: 2rem !important;
            padding-right: 2rem !important;
          }
          .t-moving {
            width: 100% !important;
            min-width: 0 !important;
            height: 50% !important;
            position: relative !important;
            display: block !important;
          }
          .big-title { font-size: 9vw !important; line-height: 1.1 !important; }
          .manifesto-body { font-size: 0.9rem !important; margin-top: 0.8rem !important; }
          .t-card { 
            padding: 0.5rem !important; 
            border-radius: 12px !important; 
            width: 165px !important; 
            height: 165px !important;
            overflow: hidden !important;
            justify-content: space-between !important;
            gap: 0 !important;
          }
          /* Quote mark */
          .t-card span { 
            font-size: 1rem !important; 
            line-height: 1 !important; 
            margin: 0 0 0.15rem 0 !important; 
            padding: 0 !important; 
            display: block !important; 
          }
          /* Quote text */
          .t-card div:first-child p { 
            font-size: 0.7rem !important; 
            line-height: 1.35 !important; 
            margin: 0 !important; 
            padding: 0 !important;
            display: -webkit-box !important;
            -webkit-line-clamp: 5 !important;
            -webkit-box-orient: vertical !important;
          }
          /* Author row */
          .t-card > div:last-child { 
            margin-top: 0.3rem !important; 
            padding: 0 !important; 
            gap: 0.25rem !important; 
            overflow: visible !important; 
          }
          /* Avatar circle */
          .t-card > div:last-child > div:first-child { 
            width: 1.2rem !important; 
            height: 1.2rem !important; 
            font-size: 0.35rem !important; 
            flex-shrink: 0 !important; 
          }
          /* Name/role wrapper */
          .author-details { 
            overflow: hidden !important; 
          }
          .author-name { 
            font-size: 0.45rem !important; 
            line-height: 1.2 !important; 
            white-space: nowrap !important;
            text-overflow: ellipsis !important;
          }
          .author-role { 
            font-size: 0.38rem !important; 
            line-height: 1.1 !important;
            white-space: nowrap !important;
            text-overflow: ellipsis !important;
          }
        }
      `}</style>
    </section>
  );
}
