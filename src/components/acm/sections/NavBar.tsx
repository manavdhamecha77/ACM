"use client";

import { useState } from "react";

type NavBarProps = {
  scrolled: boolean;
};

export default function NavBar({ scrolled }: NavBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav id="nav" className={`${scrolled ? "scrolled" : ""} ${isOpen ? "menu-open" : ""}`}>
      <a href="#" className="nav-logo">
        ACM <span>·</span> SVNIT
      </a>

      {/* Hamburger Menu Icon */}
      <button 
        className={`nav-toggle ${isOpen ? "active" : ""}`} 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul className={`nav-links ${isOpen ? "active" : ""}`}>
        <li>
          <a href="#what" onClick={() => setIsOpen(false)}>What We Do</a>
        </li>
        <li>
          <a href="#events" onClick={() => setIsOpen(false)}>Events</a>
        </li>
        <li>
          <a href="#team" onClick={() => setIsOpen(false)}>Team</a>
        </li>
        <li>
          <a href="#faq" onClick={() => setIsOpen(false)}>FAQ</a>
        </li>
        <li className="mobile-cta-li">
          <a href="#cta" className="nav-cta" onClick={() => setIsOpen(false)}>
            Join ACM
          </a>
        </li>
      </ul>

      <a href="#cta" className="nav-cta desktop-cta">
        Join ACM
      </a>
    </nav>
  );
}

