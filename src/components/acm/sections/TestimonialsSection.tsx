"use client";

import { testimonials } from "../data";
import { useRef } from "react";
import gsap from "gsap";
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
    const isMobile = window.innerWidth < 1024;
    if (isMobile) return;

    const cardElements = gsap.utils.toArray<HTMLElement>(".t-card");
    const container = cubeRef.current;
    if (!container || cardElements.length === 0) return;

    const { width, height } = container.getBoundingClientRect();
    const cardSize = 264;
    
    // Improved initial placement: Non-overlapping
    const particles: Particle[] = [];
    
    cardElements.forEach((el) => {
      let x, y, overlapping;
      let attempts = 0;
      
      do {
        overlapping = false;
        x = Math.random() * (width - cardSize);
        y = Math.random() * (height - cardSize);
        
        // Check against existing particles
        for (const p of particles) {
          const dx = x - p.x;
          const dy = y - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < cardSize + 20) {
            overlapping = true;
            break;
          }
        }
        attempts++;
      } while (overlapping && attempts < 100);

      const p: Particle = {
        el,
        size: cardSize,
        x,
        y,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
      };
      
      gsap.set(el, { x: p.x, y: p.y, width: cardSize, height: cardSize });
      particles.push(p);
    });

    const update = () => {
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wall collisions
        if (p.x <= 0) { p.x = 0; p.vx *= -1; }
        if (p.x >= width - p.size) { p.x = width - p.size; p.vx *= -1; }
        if (p.y <= 0) { p.y = 0; p.vy *= -1; }
        if (p.y >= height - p.size) { p.y = height - p.size; p.vy *= -1; }

        // Particle collisions
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = (p.x + p.size/2) - (p2.x + p2.size/2);
          const dy = (p.y + p.size/2) - (p2.y + p2.size/2);
          const distance = Math.sqrt(dx * dx + dy * dy);
          const minDistance = p.size; // Strict collision boundary

          if (distance < minDistance) {
            // Collision response
            const angle = Math.atan2(dy, dx);
            const sin = Math.sin(angle);
            const cos = Math.cos(angle);

            // Rotate velocities
            const vx1 = p.vx * cos + p.vy * sin;
            const vy1 = p.vy * cos - p.vx * sin;
            const vx2 = p2.vx * cos + p2.vy * sin;
            const vy2 = p2.vy * cos - p2.vx * sin;

            // Simple elastic swap
            const temp = vx1;
            p.vx = vx2 * cos - vy1 * sin;
            p.vy = vy1 * cos + vx2 * sin;
            p2.vx = temp * cos - vy2 * sin;
            p2.vy = vy2 * cos + temp * sin;

            // Resolve overlap immediately
            const overlap = minDistance - distance;
            p.x += (overlap / 2) * cos;
            p.y += (overlap / 2) * sin;
            p2.x -= (overlap / 2) * cos;
            p2.y -= (overlap / 2) * sin;

            // Flash effect
            gsap.fromTo(p.el, { borderColor: "#FF2B2B" }, { borderColor: "rgba(0,0,0,0.05)", duration: 0.4 });
          }
        }

        gsap.set(p.el, { 
          x: p.x, 
          y: p.y, 
          rotate: p.vx * 3,
        });
      });
    };

    gsap.ticker.add(update);
    return () => gsap.ticker.remove(update);
  }, { scope: containerRef });

  return (
    <section 
      id="testimonials" 
      ref={containerRef}
      className="p-0 h-screen overflow-hidden bg-white"
      style={{ borderBottom: "1px solid var(--border)", padding: 0 }}
    >
      <div className="flex h-full w-full" style={{ display: "flex", height: "100%", width: "100%" }}>
        
        {/* Left Side: Static Content (50%) */}
        <div className="flex flex-col border-r border-[#D8D5CE] items-start bg-[#f0ede7]" style={{ width: "50%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", paddingLeft: "6rem", paddingRight: "6rem" }}>
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
                <div style={{ overflow: "hidden" }}>
                  <p style={{ fontSize: "0.8rem", fontWeight: 800, color: "#111", textTransform: "uppercase", letterSpacing: "0.05em", margin: 0 }}>{testimonial.name}</p>
                  <p style={{ fontSize: "0.65rem", color: "#888", textTransform: "uppercase", letterSpacing: "0.1em", margin: 0 }}>{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          #testimonials { height: auto !important; overflow: visible !important; }
          .flex { display: block !important; }
          .t-card { position: relative !important; width: 100% !important; height: auto !important; transform: none !important; margin-bottom: 2rem !important; }
          .border-r { border-right: none !important; border-bottom: 1px solid var(--border); }
        }
      `}</style>
    </section>
  );
}
