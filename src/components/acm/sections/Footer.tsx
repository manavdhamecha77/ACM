export default function Footer() {
  return (
    <footer>
      <div className="footer-brand">
        ACM <span>·</span> SVNIT
        <br />
        <small style={{ fontWeight: 400, letterSpacing: ".06em", color: "var(--mid)", textTransform: "none", fontSize: ".65rem" }}>
          NIT Surat Student Chapter · Est. 2016
        </small>
      </div>
      <div className="footer-links">
        <a href="#">GitHub</a>
        <a href="#">LinkedIn</a>
        <a href="#">YouTube</a>
        <a href="#">Contact</a>
      </div>
      <div className="footer-right">
        © 2026 ACM SVNIT
        <br />
        All rights reserved.
      </div>
    </footer>
  );
}
