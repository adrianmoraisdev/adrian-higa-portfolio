"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Lenis from "lenis";
import {
  ArrowDown,
  ArrowUpRight,
  Bot,
  Boxes,
  BrainCircuit,
  CheckCircle2,
  CloudCog,
  Code2,
  Database,
  Github,
  Globe2,
  Layers3,
  Linkedin,
  LockKeyhole,
  Network,
  ServerCog,
  Sparkles,
  Workflow
} from "lucide-react";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { asset, site } from "@/lib/site";

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 }
};

const tech = [
  "C#",
  ".NET",
  "ASP.NET Core",
  "Entity Framework",
  "SQL Server",
  "PostgreSQL",
  "APIs REST",
  "Docker",
  "GitHub Actions",
  "Azure DevOps",
  "OpenAI",
  "RAG",
  "Embeddings",
  "n8n",
  "Playwright",
  "Scraping",
  "Linux",
  "CI/CD"
];

const expertise = [
  {
    icon: ServerCog,
    title: "Engenharia Backend",
    text: "APIs, serviços, modelagem de domínio e integrações críticas em .NET/C#.",
    tags: [".NET", "C#", "APIs", "SQL"]
  },
  {
    icon: BrainCircuit,
    title: "IA aplicada",
    text: "Agentes, RAG e automações com LLMs incorporados ao fluxo real do negócio.",
    tags: ["OpenAI", "RAG", "Agents", "Embeddings"]
  },
  {
    icon: Workflow,
    title: "Automação",
    text: "Robôs, scraping e orquestrações que reduzem trabalho manual e erros.",
    tags: ["RPA", "n8n", "Playwright", "Workers"]
  },
  {
    icon: CloudCog,
    title: "Plataforma & DevOps",
    text: "Pipelines, containers, observabilidade e entregas reproduzíveis.",
    tags: ["Docker", "CI/CD", "Azure", "Linux"]
  }
];

const timeline = [
  {
    year: "2026",
    title: "Produtos digitais completos",
    text: "Arquitetura, UX, automação e operação de plataformas próprias do zero à produção."
  },
  {
    year: "2025",
    title: "IA dentro do processo",
    text: "Agentes e copilotos aplicados a revisão, atendimento, conteúdo e decisões operacionais."
  },
  {
    year: "2024",
    title: "Sistemas e integrações",
    text: "APIs, painéis, automações e rastreabilidade para fluxos corporativos críticos."
  },
  {
    year: "2023",
    title: "Base de engenharia",
    text: "Especialização prática em .NET, C#, bancos relacionais e automação."
  }
];

export function HomeClient() {
  const reduceMotion = useReducedMotion();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    const timer = window.setTimeout(() => setLoading(false), reduceMotion ? 0 : 850);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      lenis.destroy();
    };
  }, [reduceMotion]);

  return (
    <>
      <motion.div
        className="loader"
        initial={false}
        animate={loading ? { y: 0 } : { y: "-110%" }}
        transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.76, 0, 0.24, 1] }}
        aria-hidden={!loading}
      >
        <span className="loader-mark">AH</span>
        <div>
          <strong>Initializing intelligent systems</strong>
          <i />
        </div>
      </motion.div>

      <Header />
      <main>
        <section className="hero" id="top">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-copy">
            <motion.div
              className="availability"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <span />
              Disponível para projetos e oportunidades
            </motion.div>
            <motion.p
              className="eyebrow"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              Software Engineer · Backend .NET · AI & Automation
            </motion.p>
            <h1 className="hero-title" aria-label="I build intelligent software">
              {["I BUILD", "INTELLIGENT", "SOFTWARE"].map((line, index) => (
                <motion.span
                  key={line}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{
                    delay: 1 + index * 0.1,
                    duration: 0.75,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                >
                  {line}
                </motion.span>
              ))}
            </h1>
            <motion.p
              className="hero-lead"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.35 }}
            >
              Construo sistemas escaláveis que conectam software, IA e automação
              para transformar processos complexos em operações simples.
            </motion.p>
            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.45 }}
            >
              <a className="button button-primary" href="#projetos">
                Ver projetos <ArrowDown size={18} />
              </a>
              <a className="button button-secondary" href="#contato">
                Falar comigo <ArrowUpRight size={18} />
              </a>
            </motion.div>
          </div>
          <motion.div
            className="hero-portrait"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="portrait-orbit orbit-one" />
            <div className="portrait-orbit orbit-two" />
            <div className="portrait-frame">
              <Image
                src={asset("/adrian-higa.webp")}
                alt="Adrian Higa, Software Engineer"
                width={640}
                height={640}
                priority
                sizes="(max-width: 800px) 78vw, 38vw"
              />
              <div className="portrait-scan" />
            </div>
            <div className="portrait-card portrait-role">
              <span>Current focus</span>
              <strong>.NET · AI · Automation</strong>
            </div>
            <div className="portrait-card portrait-signal">
              <i />
              <span>Systems online</span>
            </div>
            <span className="portrait-code">AH / 2026</span>
          </motion.div>
          <div className="hero-proof">
            <div>
              <strong>3+</strong>
              <span>anos criando sistemas e automações</span>
            </div>
            <div>
              <strong>Full cycle</strong>
              <span>arquitetura, código, deploy e operação</span>
            </div>
            <div>
              <strong>AI native</strong>
              <span>IA aplicada onde produz resultado real</span>
            </div>
          </div>
        </section>

        <section className="marquee" aria-label="Tecnologias principais">
          <div>
            {[...tech, ...tech].map((item, index) => (
              <span key={`${item}-${index}`}>{item}</span>
            ))}
          </div>
        </section>

        <section className="section about" id="sobre">
          <motion.div
            className="section-heading"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            <p className="eyebrow">01 / Sobre</p>
            <h2>Engenharia com visão de produto.</h2>
          </motion.div>
          <div className="about-grid">
            <motion.div
              className="about-statement"
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <Sparkles />
              <p>
                Não entrego apenas código. Entendo o processo, desenho a solução,
                automatizo o que trava a operação e acompanho o resultado em produção.
              </p>
            </motion.div>
            <div className="about-copy">
              <p>
                Sou Adrian Higa, engenheiro de software especializado em backend .NET,
                sistemas corporativos, integrações e inteligência artificial aplicada.
              </p>
              <p>
                Minha melhor zona de trabalho é a interseção entre tecnologia,
                operação e negócio: onde uma boa arquitetura precisa ser confiável,
                mensurável e simples para quem usa.
              </p>
              <div className="value-list">
                {[
                  "Arquitetura orientada ao domínio",
                  "Automação com rastreabilidade",
                  "Segurança e privacidade desde o desenho",
                  "Entrega contínua e visão operacional"
                ].map((value) => (
                  <span key={value}>
                    <CheckCircle2 size={17} /> {value}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="especialidades">
          <div className="section-heading split">
            <div>
              <p className="eyebrow">02 / Especialidades</p>
              <h2>Do núcleo ao produto.</h2>
            </div>
            <p>
              Capacidade técnica para construir o sistema e visão para conectá-lo ao
              que realmente importa.
            </p>
          </div>
          <div className="expertise-grid">
            {expertise.map(({ icon: Icon, title, text, tags }, index) => (
              <motion.article
                className="expertise-card"
                key={title}
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.08 }}
              >
                <div className="card-index">0{index + 1}</div>
                <Icon />
                <h3>{title}</h3>
                <p>{text}</p>
                <div className="tag-row">
                  {tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="section projects" id="projetos">
          <div className="section-heading split">
            <div>
              <p className="eyebrow">03 / Selected work</p>
              <h2>Produtos que já saíram do diagrama.</h2>
            </div>
            <p>
              Cases com decisões de arquitetura, execução full cycle e contexto de
              negócio.
            </p>
          </div>

          <article className="project-featured project-lacos">
            <div className="project-copy">
              <span className="project-number">Projeto 01 · Case principal</span>
              <h3>Laços de Irmãs</h3>
              <p className="project-kicker">
                Experiência digital para uma marca de velas e lembranças artesanais.
              </p>
              <p>
                Site institucional e catálogo visual que transforma a história de três
                irmãs em uma jornada delicada, responsiva e preparada para converter
                encomendas pelo WhatsApp.
              </p>
              <div className="tag-row">
                {["Front-end", "UX/UI", "Motion", "Responsivo", "Performance", "WhatsApp"].map(
                  (tag) => <span key={tag}>{tag}</span>
                )}
              </div>
              <Link className="text-link" href="/projetos/lacos-de-irmas">
                Explorar case completo <ArrowUpRight />
              </Link>
            </div>
            <div className="project-visual laptop-frame">
              <div className="browser-bar"><i /><i /><i /></div>
              <Image
                src={asset("/projects/lacos/home.webp")}
                alt="Página inicial do projeto Laços de Irmãs"
                width={1600}
                height={1000}
                sizes="(max-width: 900px) 100vw, 56vw"
              />
            </div>
          </article>

          <article className="project-featured project-achados">
            <div className="project-visual dashboard-frame">
              <Image
                src={asset("/projects/achados/home-current.webp")}
                alt="Vitrine do Achados na Web"
                width={1600}
                height={792}
                sizes="(max-width: 900px) 100vw, 56vw"
              />
            </div>
            <div className="project-copy">
              <span className="project-number">Projeto 02 · Plataforma em produção</span>
              <h3>Achados na Web</h3>
              <p className="project-kicker">
                Motor de ofertas, feeds de afiliados e distribuição automatizada.
              </p>
              <p>
                Plataforma escalável para coletar, normalizar, expirar e distribuir
                ofertas de múltiplas lojas, com SEO técnico e foco em conversão.
              </p>
              <div className="tag-row">
                {["Node.js", "PostgreSQL", "Feeds", "SEO", "n8n", "WhatsApp"].map(
                  (tag) => <span key={tag}>{tag}</span>
                )}
              </div>
              <div className="project-links">
                <Link className="text-link" href="/projetos/achados-na-web">
                  Ver engenharia <ArrowUpRight />
                </Link>
                <a className="text-link muted" href={site.achados} target="_blank" rel="noreferrer">
                  Visitar site <Globe2 />
                </a>
              </div>
            </div>
          </article>

          <div className="project-mini-grid">
            <article>
              <span><LockKeyhole /> Sistema corporativo</span>
              <h3>Plataforma operacional crítica</h3>
              <p>
                APIs, regras de negócio, integrações financeiras, auditoria, LGPD e
                painéis para áreas internas.
              </p>
              <div className="tag-row">
                <span>.NET</span><span>SQL Server</span><span>Azure</span>
              </div>
            </article>
            <article>
              <span><Bot /> Automation suite</span>
              <h3>Bots & automações inteligentes</h3>
              <p>
                Coleta, tratamento, triagem e distribuição de dados com monitoramento
                e recuperação de falhas.
              </p>
              <div className="tag-row">
                <span>RPA</span><span>Playwright</span><span>LLMs</span>
              </div>
            </article>
          </div>
        </section>

        <section className="section experience" id="experiencia">
          <div className="section-heading">
            <p className="eyebrow">04 / Trajetória</p>
            <h2>Evolução contínua, impacto acumulado.</h2>
          </div>
          <div className="timeline">
            {timeline.map((item) => (
              <motion.article
                key={item.year}
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
              >
                <span>{item.year}</span>
                <div><h3>{item.title}</h3><p>{item.text}</p></div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="section stack-section">
          <div className="section-heading split">
            <div>
              <p className="eyebrow">05 / Technology</p>
              <h2>Stack escolhida pelo problema.</h2>
            </div>
            <p>Fundamentos sólidos, ferramentas modernas e zero apego a buzzwords.</p>
          </div>
          <div className="stack-cloud">
            {tech.map((item, index) => (
              <span key={item} className={index % 5 === 0 ? "accent" : ""}>{item}</span>
            ))}
          </div>
          <div className="architecture-strip">
            <span><Code2 /> Application</span>
            <ArrowUpRight />
            <span><Layers3 /> Domain</span>
            <ArrowUpRight />
            <span><Database /> Data</span>
            <ArrowUpRight />
            <span><Network /> Integrations</span>
            <ArrowUpRight />
            <span><Boxes /> Platform</span>
          </div>
        </section>

        <section className="section github-section">
          <div>
            <p className="eyebrow">Open source & labs</p>
            <h2>Código, experimentos e produtos em evolução.</h2>
            <p>
              Repositórios com provas de conceito, plataformas publicadas e soluções
              que aproximam engenharia de resultado.
            </p>
          </div>
          <a href={site.github} target="_blank" rel="noreferrer" className="github-card">
            <Github size={34} />
            <span>github.com/adrianmoraisdev</span>
            <strong>Explorar GitHub <ArrowUpRight /></strong>
          </a>
        </section>

        <section className="section contact" id="contato">
          <div className="contact-intro">
            <p className="eyebrow">06 / Contato</p>
            <h2>Tem um sistema difícil para construir?</h2>
            <p>
              Vamos conversar sobre produtos, integrações, automações ou uma
              oportunidade para criar software que mova o negócio.
            </p>
            <div className="contact-social">
              <a href={site.linkedin} target="_blank" rel="noreferrer">
                <Linkedin /> LinkedIn
              </a>
              <a href={site.github} target="_blank" rel="noreferrer">
                <Github /> GitHub
              </a>
            </div>
          </div>
          <ContactForm />
        </section>
      </main>
      <Footer />
    </>
  );
}
