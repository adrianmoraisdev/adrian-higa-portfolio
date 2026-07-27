import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowUpRight,
  GalleryHorizontalEnd,
  Gauge,
  HeartHandshake,
  MessageCircleMore,
  Palette,
  Smartphone
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { asset, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Laços de Irmãs · Case de marca e experiência digital",
  description:
    "Case do Laços de Irmãs: site de marca, catálogo e conversão para um ateliê de velas e lembranças artesanais."
};

const capabilities = [
  {
    icon: Palette,
    title: "Identidade traduzida",
    text: "Tipografia, ritmo e cores construídos para preservar a delicadeza da marca e o caráter artesanal."
  },
  {
    icon: HeartHandshake,
    title: "História que aproxima",
    text: "Narrativa sobre as três irmãs, o ofício e o cuidado presente em cada encomenda."
  },
  {
    icon: GalleryHorizontalEnd,
    title: "Catálogo visual",
    text: "Coleções e galeria organizadas para comunicar variedade, personalização e qualidade."
  },
  {
    icon: MessageCircleMore,
    title: "Conversão direta",
    text: "Chamadas para orçamento e contato via WhatsApp presentes nos pontos de maior intenção."
  },
  {
    icon: Smartphone,
    title: "Responsivo de verdade",
    text: "Experiência adaptada para descoberta e contato em telas grandes ou no celular."
  },
  {
    icon: Gauge,
    title: "Leve e objetivo",
    text: "Motion sutil, imagens equilibradas e navegação fluida sem competir com os produtos."
  }
];

export default function LacosCasePage() {
  return (
    <>
      <Header />
      <main className="case-main">
        <section className="case-hero">
          <div>
            <p className="eyebrow">Case study · Brand experience</p>
            <h1>Laços de Irmãs</h1>
            <p>
              Experiência digital criada para apresentar uma marca familiar de velas e
              lembranças artesanais. O site une história, coleções e intenção de compra
              em uma jornada visual sensível, elegante e fácil de navegar.
            </p>
            <div className="tag-row">
              {["Front-end", "UX/UI", "Motion", "Responsivo", "Performance", "WhatsApp"].map(
                (tag) => <span key={tag}>{tag}</span>
              )}
            </div>
          </div>
          <div className="case-visual">
            <Image
              src={asset("/projects/lacos/home.webp")}
              alt="Página inicial do Laços de Irmãs"
              width={1600}
              height={1000}
              priority
            />
          </div>
        </section>

        <section className="case-stat-grid" aria-label="Escopo do projeto">
          <div><strong>3 irmãs</strong><span>Uma história transformada em marca</span></div>
          <div><strong>Catálogo</strong><span>Coleções, ateliê e galeria</span></div>
          <div><strong>WhatsApp</strong><span>Orçamento no canal mais direto</span></div>
          <div><strong>Responsivo</strong><span>Experiência desktop e mobile</span></div>
        </section>

        <section className="case-section">
          <p className="eyebrow">O desafio</p>
          <h2>Transformar afeto em experiência.</h2>
          <p>
            O desafio era dar presença digital a um trabalho essencialmente manual.
            Cada detalhe precisava transmitir cuidado, delicadeza e confiança, ao mesmo
            tempo que levava o visitante das primeiras impressões até o pedido de
            orçamento sem atrito.
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
          <p className="eyebrow">Estratégia de experiência</p>
          <h2>História, produto e conversão no mesmo fluxo.</h2>
          <p>
            A estrutura acompanha a forma como clientes conhecem uma marca artesanal:
            primeiro a essência, depois a história, as coleções, o processo do ateliê,
            provas visuais e respostas para dúvidas. O orçamento aparece como próximo
            passo natural, sem interromper a narrativa.
          </p>
          <div className="architecture-strip">
            <span>Essência</span><ArrowUpRight />
            <span>História</span><ArrowUpRight />
            <span>Coleções</span><ArrowUpRight />
            <span>Prova visual</span><ArrowUpRight />
            <span>Orçamento</span>
          </div>
        </section>

        <section className="case-section case-video-section">
          <p className="eyebrow">Demonstração real</p>
          <h2>Veja a experiência completa.</h2>
          <p>
            O vídeo abaixo percorre a página publicada e mostra a narrativa, o catálogo,
            a galeria, os depoimentos e a jornada de contato.
          </p>
          <video
            className="case-video"
            controls
            playsInline
            preload="metadata"
            poster={asset("/projects/lacos/home.webp")}
          >
            <source
              src={asset("/projects/lacos/lacos-de-irmas-demo.mp4")}
              type="video/mp4"
            />
            Seu navegador não suporta reprodução de vídeo.
          </video>
        </section>

        <section className="case-gallery" aria-label="Telas da plataforma">
          <figure>
            <Image src={asset("/projects/lacos/home.webp")} alt="Página inicial Laços de Irmãs" width={1600} height={1000} />
            <figcaption>Hero de marca com proposta clara e identidade artesanal.</figcaption>
          </figure>
          <figure>
            <Image src={asset("/projects/lacos/historia.webp")} alt="História das três irmãs" width={1600} height={1000} />
            <figcaption>História da marca conectada ao processo artesanal.</figcaption>
          </figure>
          <figure>
            <Image src={asset("/projects/lacos/galeria.webp")} alt="Galeria de criações artesanais" width={1600} height={1000} />
            <figcaption>Galeria que transforma variedade e acabamento em prova visual.</figcaption>
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
