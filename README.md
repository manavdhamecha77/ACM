# ACM NIT SURAT Website Redesign

This project is a high-fidelity, performance-oriented redesign of the ACM SVNIT Student Chapter website. Built to compete at a national level for the "Outstanding Chapter Website" award, the platform reflects technical excellence through sophisticated animations, a professional "Swiss-minimalist" aesthetic, and robust architecture.

## Project Description

### Overview
The redesign focuses on a "Swiss-inspired" modular layout, utilizing a 50/50 split design to maintain a clean, professional, and corporate aesthetic while delivering high-impact visual narratives. The platform is designed to be more than just a website; it is an immersive experience that showcases the technical caliber of SVNIT's developers.

### Architecture
- **Framework:** [Next.js](https://nextjs.org/) (App Router) for optimized routing, server-side rendering, and performance.
- **Styling:** Vanilla CSS combined with utility-first principles for maximum flexibility and performance.
- **Animation Engine:** [GSAP](https://greensock.com/gsap/) (GreenSock) with `ScrollTrigger` for industry-standard scroll-driven interactions.
- **Smooth Scroll:** [Lenis](https://lenis.darkroom.engineering/) for high-end, tactile scrolling physics.
- **Visual Effects:** 
    - **Particle Morphing:** Custom Canvas-based particle system that morphs branding elements (2026 to ACM) on scroll.
    - **3D Cube Rotation:** A multi-axis 3D rotation system for the "What We Do" section.
    - **Collision Physics:** A custom elastic collision engine for the Testimonials section, featuring floating, non-overlapping rounded cards.

### Design Choices
- **Professionalism over Gimmicks:** Avoided cartoonish elements in favor of sharp typography, generous white space, and a bold color palette (Black, White, and ACM Red).
- **Responsive Stacking:** All 50/50 layouts gracefully degrade to a single-column flow on mobile, ensuring zero loss in readability or function.
- **Tactile Feedback:** Every interaction, from the custom Difference-mode cursor to the 3D transitions, provides immediate visual feedback, making the site feel "alive."

## Future Scope

- **Interactive Member Dashboard:** A secure area for members to track their participation, view internal resources, and manage profiles.
- **Event Registration System:** Integrated ticketing and QR-code based attendance tracking for flagship events like Dotslash and Epiphany.
- **Blog & Technical Journal:** A platform for members to publish research papers, technical articles, and project post-mortems.
- **Global Search:** A site-wide command-palette (Cmd+K) for quick navigation to events, team archives, and FAQs.
- **AI Chatbot Integration:** A custom-trained model to assist prospective members with recruitment queries and event information.

## Skills Matrix

| Domain | Technologies / Frameworks / Tools |
| :--- | :--- |
| **Frontend** | HTML, CSS, JS, React, Next.js, TS, Tailwind CSS |
| **Backend** | PostgreSQL, FastAPI, Prisma, MySQL, Firebase |
| **AI** | Gemini API|
| **ML** | Python, Pandas, NumPy, Matplotlib |
| **DevOps** | Vercel, Docker, Git, Linux, Bash, Windows |

---

