export default function ManifestoSection() {
  return (
    <section id="manifesto" className="relative overflow-hidden">
      <div className="container relative z-10">
        <div className="manifesto-inner">
          <div className="manifesto-left">
            <span className="label reveal">Our Manifesto</span>
            <h2 className="manifesto-headline reveal stagger-2">
              We Build
              <br />
              <span>Systems.</span>
              <br />
              Communities.
              <br />
              Ideas.
            </h2>
            <p className="manifesto-body reveal stagger-3">
              ACM SVNIT creates an environment where students learn deeply, collaborate openly, build
              ambitiously, and innovate continuously — through workshops, hackathons, projects, and technical
              initiatives.
            </p>
          </div>
          <div className="manifesto-right reveal stagger-2">
            <div className="manifesto-stat mb-12">
              <div className="stat">
                <div className="stat-val">
                  500<span>+</span>
                </div>
                <div className="stat-label">Active Members</div>
              </div>
              <div className="stat">
                <div className="stat-val">
                  8<span>+</span>
                </div>
                <div className="stat-label">Years of Excellence</div>
              </div>
              <div className="stat">
                <div className="stat-val">
                  30<span>+</span>
                </div>
                <div className="stat-label">Events Annually</div>
              </div>
            </div>

            <div className="manifesto-pillars reveal stagger-4 border-t border-[#333] pt-12">
              <div className="pillar">
                <div className="pillar-n">01</div>
                <div className="pillar-t">Learn Deeply</div>
              </div>
              <div className="pillar">
                <div className="pillar-n">02</div>
                <div className="pillar-t">Collaborate Openly</div>
              </div>
              <div className="pillar">
                <div className="pillar-n">03</div>
                <div className="pillar-t">Build Ambitiously</div>
              </div>
              <div className="pillar">
                <div className="pillar-n">04</div>
                <div className="pillar-t">Innovate Continuously</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
