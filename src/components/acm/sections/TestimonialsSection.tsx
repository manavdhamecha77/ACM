import { testimonials } from "../data";

export default function TestimonialsSection() {
  return (
    <section id="testimonials">
      <div className="container">
        <div className="testimonials-inner">
          <div className="testimonials-left">
            <span className="label reveal">Voices</span>
            <h2 className="section-title reveal stagger-2">
              What Members
              <br />
              <span>Say.</span>
            </h2>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div className={`testimonial reveal stagger-${index + 1}`} key={testimonial.name}>
                <p className="t-quote">{testimonial.quote}</p>
                <div className="t-meta">
                  <div className="t-avatar">{testimonial.initials}</div>
                  <div className="t-info">
                    <div className="t-name">{testimonial.name}</div>
                    <div className="t-role">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
