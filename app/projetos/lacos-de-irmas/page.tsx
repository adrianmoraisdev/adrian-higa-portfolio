import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowUpRight,
  BadgeCheck,
  CreditCard,
  FileCheck2,
  HeartHandshake,
  LockKeyhole,
  PanelsTopLeft
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { asset, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Laços de Irmãs · Case de plataforma de cuidado",
  description:
    "Case completo da plataforma Laços de Irmãs: produto multiportal em .NET para famílias, profissionais e operação de cuidado."
};

const capabilities = [
  {
    icon: PanelsTopLeft,
    title: "Três jornadas conectadas",
    text: "Experiências específicas para famílias, profissionais e administração, apoiadas pelo mesmo domínio."
  },
  {
    icon: LockKeyhole,
    title: "Identidade & segurança",
    text: "Autenticação, autorização por papel, proteção de dados e trilhas de auditoria."
  },
  {
    icon: CreditCard,
    title: "Operação financeira",
    text: "Preços, comissões, repasses, pagamentos, multas e conciliação no fluxo do plantão."
  },
  {
    icon: FileCheck2,
    title: "Documentos auditáveis",
    text: "Contratos, recibos, documentos privados e persistência segura com histórico operacional."
  },
  {
    icon: BadgeCheck,
    title: "Qualidade verificável",
    text: "Testes automatizados para regras de preço, documentos, pagamentos e jornadas críticas."
  },
  {
    icon: HeartHandshake,
    title: "Tecnologia humana",
    text: "Uma interface acolhedora para um domínio sensível, sem abrir mão de robustez técnica."
  }
];

export default function LacosCasePage() {
  return (
    <>
      <Header />
      <main className="case-main">
        <section className="case-hero">
          <div>
            <p className="eyebrow">Case study · Healthtech operations</p>
            <h1>Laços de Irmãs</h1>
            <p>
              Plataforma full cycle criada para organizar a relação entre famílias,
              profissionais de cuidado e operação administrativa. O produto público,
              Afeto Divino, transforma uma jornada sensível em um fluxo digital seguro,
              rastreável e simples de usar.
            </p>
            <div className="tag-row">
              {[".NET 9", "Blazor", "PostgreSQL", "Identity", "Docker", "CI/CD"].map(
                (tag) => <span key={tag}>{tag}</span>
              )}
            </div>
          </div>
          <div className="case-visual">
            <Image
              src={asset("/projects/lacos/home.png")}
              alt="Landing page Afeto Divino"
              width={1366}
              height={2100}
              priority
            />
          </div>
        </section>

        <section className="case-stat-grid" aria-label="Escopo do projeto">
          <div><strong>3 portais</strong><span>Família, profissional e master</span></div>
          <div><strong>Full cycle</strong><span>Produto, backend, UX e deploy</span></div>
          <div><strong>Auditável</strong><span>Contratos, financeiro e logs</span></div>
          <div><strong>Responsivo</strong><span>Jornadas desktop e mobile</span></div>
        </section>

        <section className="case-section">
          <p className="eyebrow">O desafio</p>
          <h2>Digitalizar sem desumanizar.</h2>
          <p>
            O cuidado domiciliar combina urgência, confiança, documentação,
            disponibilidade, pagamentos e acompanhamento. A arquitetura precisava
            centralizar tudo isso sem criar uma experiência pesada para famílias ou
            profissionais.
          </p>
          <div className="case-grid">
            {capabilities.map(({ icon: Icon, title, text }) => (
              <article key={title}>
                <Icon />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="case-section">
          <p className="eyebrow">Arquitetura</p>
          <h2>Um domínio, múltiplas experiências.</h2>
          <p>
            A solução usa ASP.NET Core e Blazor para concentrar regras de negócio,
            segurança e interfaces em uma base coerente. PostgreSQL persiste o domínio,
            serviços isolam integrações e pipelines automatizados tornam homologação e
            produção reproduzíveis.
          </p>
          <div className="architecture-strip">
            <span>Blazor UI</span><ArrowUpRight />
            <span>Domain services</span><ArrowUpRight />
            <span>EF Core</span><ArrowUpRight />
            <span>PostgreSQL</span><ArrowUpRight />
            <span>Docker + CI/CD</span>
          </div>
        </section>

        <section className="case-gallery" aria-label="Telas da plataforma">
          <figure>
            <Image src={asset("/projects/lacos/master.png")} alt="Dashboard administrativo" width={1366} height={1137} />
            <figcaption>Visão master: pessoas, operação, financeiro e auditoria.</figcaption>
          </figure>
          <figure>
            <Image src={asset("/projects/lacos/familia.png")} alt="Portal da família" width={1366} height={1100} />
            <figcaption>Portal da família com acompanhamento da jornada.</figcaption>
          </figure>
          <figure>
            <Image src={asset("/projects/lacos/profissional.png")} alt="Portal profissional" width={1366} height={1100} />
            <figcaption>Portal profissional, disponibilidade e operação de plantões.</figcaption>
          </figure>
        </section>

        <section className="case-cta">
          <div>
            <p className="eyebrow">Próximo desafio</p>
            <h2>Precisa transformar uma operação complexa em produto?</h2>
          </div>
          <a className="button button-primary" href={`mailto:${site.email}`}>
            Conversar com Adrian <ArrowUpRight />
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
