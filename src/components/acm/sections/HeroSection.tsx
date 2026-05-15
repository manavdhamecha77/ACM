"use client";

import Magnetic from "@/components/ui/Magnetic";

export default function HeroSection() {
  return (
    <section id="hero">
      <div className="hero-grid"></div>
      
      <div 
        className="manifesto-bignum hero-bg-text" 
        style={{ 
          position: "absolute", 
          left: "50%", 
          transform: "translateX(-50%)", 
          zIndex: 0,
          WebkitTextStroke: "1.2px rgba(177, 177, 177, 0.41)"
        }}
      >
        ACM
      </div>


      <div className="hero-year">2026</div>
      {/* <div className="hero-index reveal stagger-1">NIT Surat / Gujarat, India</div> */}
      <p className="hero-acm reveal stagger-2">Association for Computing Machinery — SVNIT Student Chapter</p>
      <h1 className="hero-headline reveal stagger-3">
        Think.
        <br />
        Build.
        <br />
        <em>Evolve.</em>
      </h1>

      <blockquote className="hero-quote reveal stagger-4">
        Learning never exhausts the mind.
        <cite>— Leonardo Da Vinci</cite>
      </blockquote>

      <div className="hero-bottom">
        <div className="hero-ctas reveal stagger-5">
          <a href="#cta" className="cta-btn primary">
            <span>Join Chapter</span>
            <span className="cta-arrow">↗</span>
          </a>
          <a href="#events" className="cta-btn secondary">
            <span>Explore Events</span>
          </a>
        </div>
        
        <Magnetic strength={20}>
          <span className="hero-scroll reveal stagger-6 cursor-pointer">Scroll to explore</span>
        </Magnetic>
      </div>
    </section>


  );
}
