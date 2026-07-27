import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowUpRight,
  Bot,
  DatabaseZap,
  Gauge,
  RadioTower,
  SearchCheck,
  ShoppingBag
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { asset, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Achados na Web · Case de afiliados e automação",
  description:
    "Case da plataforma Achados na Web: feeds de afiliados, catálogo, SEO, automações e distribuição de ofertas em produção."
};

const capabilities = [
  {
    icon: DatabaseZap,
    title: "Feeds normalizados",
    text: "Importação de catálogos com formatos distintos para um modelo consistente e consultável."
  },
  {
    icon: SearchCheck,
    title: "SEO técnico",
    text: "Páginas indexáveis, dados estruturados, canonicals e estratégia para ofertas expiradas."
  },
  {
    icon: RadioTower,
    title: "Distribuição",
    text: "Publicação coordenada no site, newsletters e canais segmentados por parceiro."
  },
  {
    icon: Bot,
    title: "Automação operacional",
    text: "Rotinas de coleta, expiração, relatórios, alertas e recuperação de falhas."
  },
  {
    icon: Gauge,
    title: "Performance",
    text: "Cache, paginação, imagens eficientes e consultas desenhadas para grandes catálogos."
  },
  {
    icon: ShoppingBag,
    title: "Conversão",
    text: "Navegação por loja e categoria, CTAs claros e transparência sobre preço e disponibilidade."
  }
];

export default function AchadosCasePage() {
  return (
    <>
      <Header />
      <main className="case-main">
        <section className="case-hero">
          <div>
            <p className="eyebrow">Case study · Affiliate commerce</p>
            <h1>Achados na Web</h1>
            <p>
              Ecossistema de afiliados que transforma feeds de grandes varejistas em uma
              vitrine rápida, organizada e distribuída automaticamente. O desafio não é
              apenas exibir produtos: é manter catálogo, links, validade e canais
              funcionando em escala.
            </p>
            <div className="tag-row">
              {["Node.js", "PostgreSQL", "n8n", "Feeds", "SEO", "WhatsApp"].map(
                (tag) => <span key={tag}>{tag}</span>
              )}
            </div>
            <p>
              <a className="text-link" href={site.achados} target="_blank" rel="noreferrer">
                Visitar achadosnaweb.com.br <ArrowUpRight />
              </a>
            </p>
          </div>
          <div className="case-visual">
            <Image
              src={asset("/projects/achados/home.png")}
              alt="Página inicial do Achados na Web"
              width={1900}
              height={1000}
              priority
            />
          </div>
        </section>

        <section className="case-stat-grid" aria-label="Escopo do projeto">
          <div><strong>Multi-store</strong><span>Catálogos e regras por parceiro</span></div>
          <div><strong>Automatizado</strong><span>Coleta, expiração e distribuição</span></div>
          <div><strong>SEO ready</strong><span>Descoberta e higiene de índice</span></div>
          <div><strong>Em produção</strong><span>Produto vivo e evolutivo</span></div>
        </section>

        <section className="case-section">
          <p className="eyebrow">O sistema</p>
          <h2>Um catálogo vivo, não uma página estática.</h2>
          <p>
            Cada parceiro oferece dados, categorias, frequência e regras comerciais
            diferentes. O núcleo do produto normaliza essas entradas, mantém somente
            ofertas válidas, cria experiências específicas por loja e distribui os
            melhores itens para os canais corretos.
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
          <p className="eyebrow">Pipeline</p>
          <h2>Da fonte ao clique.</h2>
          <p>
            A arquitetura separa aquisição, normalização, catálogo, apresentação e
            distribuição. Essa divisão permite trocar fornecedores, aplicar políticas
            específicas e crescer sem transformar a aplicação em um conjunto frágil de
            raspadores.
          </p>
          <div className="architecture-strip">
            <span>Feeds & APIs</span><ArrowUpRight />
            <span>Normalization</span><ArrowUpRight />
            <span>PostgreSQL</span><ArrowUpRight />
            <span>Web catalog</span><ArrowUpRight />
            <span>Channels</span>
          </div>
        </section>

        <section className="case-gallery" aria-label="Telas da plataforma">
          <figure>
            <Image src={asset("/projects/achados/home.png")} alt="Vitrine multi-loja" width={1900} height={1000} />
            <figcaption>Vitrine organizada por parceiros e categorias.</figcaption>
          </figure>
          <figure>
            <Image src={asset("/projects/achados/produto.png")} alt="Detalhes da oferta" width={1900} height={1000} />
            <figcaption>Detalhes da oferta com foco em decisão e clique seguro.</figcaption>
          </figure>
          <figure>
            <Image src={asset("/projects/achados/mobile.png")} alt="Achados na Web no celular" width={430} height={900} />
            <figcaption>Experiência mobile para descoberta rápida.</figcaption>
          </figure>
        </section>

        <section className="case-cta">
          <div>
            <p className="eyebrow">Produto em produção</p>
            <h2>Explore a plataforma e veja o sistema funcionando.</h2>
          </div>
          <a className="button button-primary" href={site.achados} target="_blank" rel="noreferrer">
            Abrir Achados na Web <ArrowUpRight />
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
