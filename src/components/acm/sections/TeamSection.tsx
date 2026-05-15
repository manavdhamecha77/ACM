import { getInitials, teamData, years } from "../data";

type TeamSectionProps = {
  activeYear: string;
  setActiveYear: (year: string) => void;
};

export default function TeamSection({ activeYear, setActiveYear }: TeamSectionProps) {
  return (
    <section id="team">
      <div className="container">
        <div className="team-header">
          <h2 className="team-title reveal">
            Team
            <br />
            <span>Archive.</span>
          </h2>
          <p className="archive-note reveal stagger-2">A living record of the people who built ACM SVNIT — year by year.</p>
        </div>
        <div className="year-tabs reveal stagger-2" id="yearTabs">
          {years.map((year) => (
            <button
              className={`year-tab ${activeYear === year ? "active" : ""}`}
              key={year}
              type="button"
              onClick={() => setActiveYear(year)}
            >
              {year}
            </button>
          ))}
        </div>
        <div id="teamPanels">
          {years.map((year) => {
            const details = teamData[year];
            const isActive = year === activeYear;
            const archiveMembers =
              details.roles?.flatMap((role) =>
                role.names.map((name) => ({
                  name,
                  role: role.label,
                  dept: "",
                })),
              ) ?? [];
            const members = details.type === "current" ? (details.members ?? []) : archiveMembers;

            return (
              <div className={`team-panel ${isActive ? "active" : ""}`} id={`panel-${year}`} key={year}>
                <div className="team-grid active">
                  {members.map((member) => (
                    <div className="member-card" key={`${year}-${member.name}`}>
                      <div className="member-photo">
                        <span className="member-initials">{getInitials(member.name)}</span>
                      </div>
                      <div className="member-role">{member.role}</div>
                      <div className="member-name">{member.name}</div>
                      <div className="member-dept">{member.dept ?? ""}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
