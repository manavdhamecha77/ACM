import { activities } from "../data";

export default function WhatWeDoSection() {
  return (
    <section id="what">
      <div className="container">
        <div className="what-header">
          <h2 className="what-title reveal">
            What
            <br />
            We Do
          </h2>
          <p className="what-sub reveal stagger-2">
            An ecosystem of technical growth, collaboration, and innovation at the intersection of engineering and
            design thinking.
          </p>
        </div>
        <div className="activities">
          {activities.map((activity, index) => (
            <div className={`activity reveal stagger-${index + 1}`} key={activity.title}>
              <div className="activity-n">{activity.number}</div>
              <h3 className="activity-title">{activity.title}</h3>
              <p className="activity-body">{activity.body}</p>
              <div className="activity-tags">
                {activity.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
