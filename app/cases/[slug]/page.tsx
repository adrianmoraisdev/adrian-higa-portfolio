import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, Info } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { cases, getCase } from "@/lib/cases";
import { site } from "@/lib/site";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const item = getCase(slug);
  if (!item) return {};
  const url = `${site.url}/cases/${item.slug}/`;
  return {
    title: item.title,
    description: item.summary,
    alternates: { canonical: url },
    openGraph: { title: `${item.title} — Adrian Higa`, description: item.summary, url, images: [`${site.url}/og.png`] }
  };
}

export default async function CasePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const item = getCase(slug);
  if (!item) notFound();

  const index = cases.findIndex((c) => c.slug === item.slug);
  const next = cases[(index + 1) % cases.length];

  return (
    <>
      <Header />
      <main id="conteudo" className={`case-page accent-${item.accent}`}>
        <section className="case-hero">
          <div className="hero-glow" aria-hidden="true" />
          <div className="container">
            <Link className="text-link back-link" href="/#cases">
              <ArrowLeft size={16} /> Todos os cases
            </Link>
            <p className="eyebrow">{item.kicker}</p>
            <h1>{item.title}</h1>
            <p className="lead">{item.summary}</p>
            <p className="case-role">{item.role}</p>
            <ul className="tags">
              {item.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <dl className="metrics case-metrics">
              {item.metrics.map((m) => (
                <div key={m.label}>
                  <dt>{m.value}</dt>
                  <dd>{m.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="section">
          <div className="container case-body">
            <div className="case-columns">
              <article className="card" data-reveal>
                <h2>Contexto</h2>
                <p>{item.context}</p>
              </article>
              <article className="card" data-reveal>
                <h2>Desafio</h2>
                <p>{item.challenge}</p>
              </article>
            </div>

            <article className="case-block" data-reveal>
              <h2>Arquitetura</h2>
              <ol className="pipeline">
                {item.flow.map((f, i) => (
                  <li key={f.label} style={{ ["--i" as string]: i }}>
                    <strong>{f.label}</strong>
                    <span>{f.detail}</span>
                  </li>
                ))}
              </ol>
            </article>

            <article className="case-block" data-reveal>
              <h2>Solução</h2>
              <ul className="checklist">
                {item.solution.map((s) => (
                  <li key={s}>
                    <CheckCircle2 size={18} aria-hidden="true" />
                    {s}
                  </li>
                ))}
              </ul>
            </article>

            <article className="case-block" data-reveal>
              <h2>Decisões técnicas</h2>
              <div className="decision-grid">
                {item.decisions.map((d) => (
                  <div className="card decision" key={d.title}>
                    <h3>{d.title}</h3>
                    <p>{d.text}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="case-block" data-reveal>
              <h2>Resultado</h2>
              <ul className="results">
                {item.results.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </article>

            <article className="case-block" data-reveal>
              <h2>Stack</h2>
              <ul className="tags tags-lg">
                {item.stack.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </article>

            {item.note && (
              <p className="case-note">
                <Info size={16} aria-hidden="true" /> {item.note}
              </p>
            )}

            <Link className="card next-case" href={`/cases/${next.slug}/`}>
              <span className="eyebrow">Próximo case</span>
              <strong>{next.title}</strong>
              <ArrowRight size={22} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
