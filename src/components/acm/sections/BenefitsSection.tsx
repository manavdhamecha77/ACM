import { benefits } from "../data";

export default function BenefitsSection() {
  return (
    <section id="benefits">
      <div className="container">
        <div className="benefits-inner">
          <div className="benefits-left">
            <span className="label reveal">Why Join</span>
            <h2 className="big-title reveal stagger-2">
              What You
              <br />
              <span>Gain.</span>
            </h2>
          </div>
          <div className="benefits-list">
            {benefits.map((benefit, index) => (
              <div className={`benefit-item reveal stagger-${index + 1}`} key={benefit.title}>
                <span className="b-num">{benefit.number}</span>
                <div>
                  <div className="b-title">{benefit.title}</div>
                  <p className="b-body">{benefit.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
