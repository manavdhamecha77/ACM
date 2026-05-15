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
          bottom: "22rem", 
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
      <div className="hero-bottom">
        <blockquote className="hero-quote reveal stagger-4">
          Learning never exhausts the mind.
          <cite>— Leonardo Da Vinci</cite>
        </blockquote>
        
        <Magnetic strength={20}>
          <span className="hero-scroll reveal stagger-5 cursor-pointer">Scroll to explore</span>
        </Magnetic>
      </div>
    </section>
  );
}
