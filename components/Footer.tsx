import { Github, Linkedin, Mail } from "lucide-react";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <strong>Adrian Higa</strong>
          <p>{site.role} · {site.location}</p>
        </div>
        <div className="footer-links">
          <a href={site.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Linkedin size={20} />
          </a>
          <a href={site.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github size={20} />
          </a>
          <a href={`mailto:${site.email}`} aria-label="E-mail">
            <Mail size={20} />
          </a>
        </div>
      </div>
      <small className="footer-note">
        Sistemas corporativos apresentados sem telas, nomes de clientes ou endereços, por confidencialidade.
      </small>
    </footer>
  );
}
