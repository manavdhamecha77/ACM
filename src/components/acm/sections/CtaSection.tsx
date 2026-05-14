export default function CtaSection() {
  return (
    <section id="cta">
      <div className="cta-bg-text">JOIN US</div>
      <div className="container">
        <div className="cta-inner">
          <span className="label reveal">Ready?</span>
          <h2 className="cta-headline reveal stagger-2">
            Build with people
            <br />
            shaping the <span>future</span>
            <br />
            of technology.
          </h2>
          <p className="cta-sub reveal stagger-3">
            Join a community of serious builders, thinkers, and innovators at NIT Surat. Your next chapter starts
            here.
          </p>
          <a href="#" className="cta-btn reveal stagger-4">
            <span>Join ACM SVNIT</span>
            <span className="cta-arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
