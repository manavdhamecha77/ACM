"use client";

import { testimonials } from "../data";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const isMobile = window.innerWidth < 1024;
    if (isMobile) return;

    const cards = gsap.utils.toArray<HTMLElement>(".t-card");
    const container = cubeRef.current;
    if (!container) return;

    const { width, height } = container.getBoundingClientRect();

    cards.forEach((card) => {
      // Random initial position
      const cardSize = 250;
      const x = Math.random() * (width - cardSize);
      const y = Math.random() * (height - cardSize);
      
      // Random velocities
      let vx = (Math.random() - 0.5) * 2;
      let vy = (Math.random() - 0.5) * 2;

      gsap.set(card, { x, y, width: cardSize, height: cardSize });

      const update = () => {
        let curX = gsap.getProperty(card, "x") as number;
        let curY = gsap.getProperty(card, "y") as number;

        // Boundary check
        if (curX <= 0 || curX >= width - cardSize) vx *= -1;
        if (curY <= 0 || curY >= height - cardSize) vy *= -1;

        gsap.set(card, {
          x: curX + vx,
          y: curY + vy,
          rotate: (curX + curY) * 0.05, // Slight dynamic rotation
        });
      };

      gsap.ticker.add(update);
    });
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

        {/* Right Side: Floating Cube Area (50%) */}
        <div 
          ref={cubeRef}
          className="bg-black relative overflow-hidden" 
          style={{ width: "50%", height: "100%", position: "relative", backgroundColor: "#000" }}
        >
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.name}
              className="t-card absolute bg-white p-8 flex flex-col justify-between border border-white/10 shadow-2xl"
              style={{ 
                position: "absolute",
                display: "flex",
                flexDirection: "column",
                cursor: "default",
              }}
            >
              <div>
                <span className="text-[#FF2B2B] text-4xl font-serif italic line-height-none">"</span>
                <p className="text-black font-medium text-lg leading-relaxed mt-2" style={{ color: "#111", fontSize: "1.1rem" }}>
                  {testimonial.quote.length > 120 ? testimonial.quote.substring(0, 120) + "..." : testimonial.quote}
                </p>
              </div>
              
              <div className="flex items-center gap-4 mt-6">
                <div className="w-10 h-10 rounded-full bg-[#FF2B2B] flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {testimonial.initials}
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-bold text-black uppercase tracking-wider truncate m-0" style={{ color: "#111" }}>{testimonial.name}</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest truncate m-0" style={{ color: "#888" }}>{testimonial.role}</p>
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
