"use client";

import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { site } from "@/lib/site";

const links = [
  ["Sobre", "/#sobre"],
  ["Especialidades", "/#especialidades"],
  ["Projetos", "/#projetos"],
  ["Experiência", "/#experiencia"],
  ["Contato", "/#contato"]
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Página inicial">
        <span className="brand-mark">AH</span>
        <span>
          Adrian Higa
          <small>Software Engineer</small>
        </span>
      </Link>
      <button
        className="menu-button"
        type="button"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X /> : <Menu />}
      </button>
      <nav className={open ? "nav-links is-open" : "nav-links"}>
        {links.map(([label, href]) => (
          <Link key={href} href={href} onClick={() => setOpen(false)}>
            {label}
          </Link>
        ))}
        <a className="nav-cta" href={site.linkedin} target="_blank" rel="noreferrer">
          Vamos conversar <ArrowUpRight size={16} />
        </a>
      </nav>
    </header>
  );
}
