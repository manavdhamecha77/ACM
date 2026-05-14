import { events } from "../data";

export default function EventsSection() {
  return (
    <section id="events">
      <div className="container">
        <div className="events-header">
          <span className="label reveal">Flagship Events</span>
          <h2 className="events-title reveal stagger-2">
            The
            <br />
            Experiences.
          </h2>
        </div>
        <div className="events-list">
          {events.map((event) => (
            <div className="event-row reveal" key={event.name}>
              <span className="event-num">{event.number}</span>
              <h3 className="event-name">{event.name}</h3>
              <p className="event-desc">{event.description}</p>
              <span className="event-type">{event.type}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
