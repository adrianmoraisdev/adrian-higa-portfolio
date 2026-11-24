"use client";

import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const links = [
  ["IA na engenharia", "/#ia"],
  ["Cases", "/#cases"],
  ["Infraestrutura", "/#infra"],
  ["Experiência", "/#experiencia"],
  ["Stack", "/#stack"]
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="Página inicial">
          <span className="brand-mark" aria-hidden="true">AH</span>
          <span className="brand-text">
            Adrian Higa
            <small>{site.role}</small>
          </span>
        </Link>
        <button
          className="menu-button"
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav className={open ? "nav-links is-open" : "nav-links"} aria-label="Navegação principal">
          {links.map(([label, href]) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
          <Link className="nav-cta" href="/#contato" onClick={() => setOpen(false)}>
            Falar comigo <ArrowUpRight size={16} />
          </Link>
        </nav>
      </div>
    </header>
  );
}
