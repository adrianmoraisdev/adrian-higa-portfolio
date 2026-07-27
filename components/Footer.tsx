import { Github, Linkedin, Mail } from "lucide-react";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <strong>Adrian Higa</strong>
        <p>Software inteligente. Operações mais simples.</p>
      </div>
      <div className="footer-links">
        <a href={site.github} target="_blank" rel="noreferrer" aria-label="GitHub">
          <Github />
        </a>
        <a href={site.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
          <Linkedin />
        </a>
        <a href={`mailto:${site.email}`} aria-label="E-mail">
          <Mail />
        </a>
      </div>
      <small>© {new Date().getFullYear()} · Projetado e desenvolvido por Adrian Higa.</small>
    </footer>
  );
}
