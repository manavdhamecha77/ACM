type NavBarProps = {
  scrolled: boolean;
};

export default function NavBar({ scrolled }: NavBarProps) {
  return (
    <nav id="nav" className={scrolled ? "scrolled" : ""}>
      <a href="#" className="nav-logo">
        ACM <span>·</span> SVNIT
      </a>
      <ul className="nav-links">
        <li>
          <a href="#what">What We Do</a>
        </li>
        <li>
          <a href="#events">Events</a>
        </li>
        <li>
          <a href="#team">Team</a>
        </li>
        <li>
          <a href="#faq">FAQ</a>
        </li>
      </ul>
      <a href="#cta" className="nav-cta">
        Join ACM
      </a>
    </nav>
  );
}
