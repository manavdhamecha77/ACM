import { faqs } from "../data";

type FaqSectionProps = {
  openIndex: number | null;
  onToggle: (index: number) => void;
};

export default function FaqSection({ openIndex, onToggle }: FaqSectionProps) {
  return (
    <section id="faq">
      <div className="container">
        <div className="faq-inner">
          <div>
            <span className="label reveal">Questions</span>
            <h2 className="faq-title reveal stagger-2">
              Frequently
              <br />
              Asked.
              <br />
              <span>Answered.</span>
            </h2>
          </div>
          <div className="faq-list reveal stagger-2">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div className={`faq-item ${isOpen ? "open" : ""}`} key={faq.question}>
                  <button className="faq-q" type="button" onClick={() => onToggle(index)}>
                    {faq.question} <span className="faq-icon">+</span>
                  </button>
                  <div className="faq-a">{faq.answer}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
