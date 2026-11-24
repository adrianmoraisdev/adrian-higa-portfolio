export const site = {
  name: "Adrian Higa",
  role: "Software Engineer .NET & IA",
  headline: "Sistemas corporativos em produção, com IA no centro da engenharia.",
  description:
    "Software Engineer .NET com foco em IA aplicada. Construo e opero sistemas corporativos de ponta a ponta: APIs, automação orientada a eventos, nuvem e segurança, com agentes de IA no fluxo de desenvolvimento.",
  url: "https://adrianmoraisdev.github.io/adrian-higa-portfolio",
  email: "adrianmorais.dev@gmail.com",
  github: "https://github.com/adrianmoraisdev",
  linkedin: "https://www.linkedin.com/in/adrianhiga-tech",
  location: "Paulínia, SP · Remoto no Brasil ou contratos internacionais"
} as const;

export const asset = (path: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

export const metrics = [
  { value: "10+", label: "sistemas em produção sob minha responsabilidade" },
  { value: "~300", label: "endpoints na API central" },
  { value: "600+", label: "testes automatizados nos projetos" },
  { value: "5 anos", label: "construindo software em .NET" }
];

export const capabilities = [
  {
    icon: "Bot",
    title: "IA aplicada à engenharia",
    text: "Desenvolvimento conduzido por agentes de IA (Claude Code e Codex) com governança, testes e revisão humana. Agentes com LLM, function calling e RAG."
  },
  {
    icon: "Server",
    title: "APIs e integrações",
    text: "APIs REST em .NET para regras de negócio críticas, integração com ERPs legados, assinatura digital, e-mail e plataformas de terceiros."
  },
  {
    icon: "Workflow",
    title: "Automação orientada a eventos",
    text: "Workers com RabbitMQ e MassTransit, filas com retentativa e DLQ, robôs (RPA) e workflows com n8n que eliminam trabalho manual."
  },
  {
    icon: "Cloud",
    title: "Nuvem e DevOps",
    text: "AWS, Linux, Docker, nginx e Cloudflare. CI/CD com homologação e produção separadas e deploy sem indisponibilidade."
  },
  {
    icon: "ShieldCheck",
    title: "Segurança e LGPD",
    text: "2FA, auditoria, controle de acesso, CSP, endurecimento de servidor e varredura contínua de vulnerabilidades e segredos."
  },
  {
    icon: "LayoutDashboard",
    title: "Dados e produto interno",
    text: "Painéis executivos e de vendas, relatórios em PDF e apps internos que colocam a informação certa na mão de cada área."
  }
] as const;

export const aiFlow = [
  { step: "01", title: "Demanda", text: "Requisito e critério de aceite escritos antes do código." },
  { step: "02", title: "Briefing", text: "AGENTS.md e regras do repositório: escopo, segurança e limites." },
  { step: "03", title: "Agentes", text: "Claude Code e Codex implementam, com subagentes para tarefas paralelas." },
  { step: "04", title: "Verificação", text: "Testes, negativos de autorização, SAST e varredura de segredos." },
  { step: "05", title: "Revisão", text: "Revisão humana do diff e homologação antes da produção." },
  { step: "06", title: "Produção", text: "Deploy automatizado, monitoramento e registro do que mudou." }
] as const;

export const aiPrinciples = [
  {
    title: "Governança em todo repositório",
    text: "Cada projeto tem AGENTS.md / CLAUDE.md com arquitetura, regras de segurança, proteção contra prompt injection e o que exige aprovação humana."
  },
  {
    title: "Verificação proporcional",
    text: "O agente só declara pronto o que foi testado: comportamento alterado, autorização, isolamento e regressão do que foi afetado."
  },
  {
    title: "Custo sob controle",
    text: "Contexto enxuto, leitura seletiva e espera sem consulta em laço: medi e reduzi o custo de tokens por entrega."
  },
  {
    title: "Segurança antes de velocidade",
    text: "Segredos nunca entram no contexto, homologação vem antes de produção e ações externas pedem confirmação explícita."
  }
] as const;

export const infraLayers = [
  { title: "Borda", items: ["Cloudflare DNS e CDN", "SSL Full (strict) e HSTS", "Origem aceita só o proxy"] },
  { title: "Proxy", items: ["nginx com TLS", "Rate limit e proteção de login", "Bloqueio de scanners"] },
  { title: "Aplicações", items: ["Docker Compose por app", "HML e PRD isolados", "Containers sem root"] },
  { title: "Serviços", items: ["MySQL", "RabbitMQ", "Selenium Grid fora da internet"] }
] as const;

export const infraOps = [
  "SSH só por chave, sem root e com tentativas limitadas",
  "Firewall ufw e fail2ban com bloqueio progressivo",
  "Monitoramento a cada 5 min: disco, memória, containers, HTTP e filas",
  "Alertas por Telegram e e-mail, com resumo semanal",
  "Trivy diário cruzado com o catálogo CISA KEV",
  "Detecção de desvios a cada 15 min e vigia de acessos a cada minuto",
  "Segredos só no servidor, com permissão restrita",
  "Runbooks com backup e reversão, postmortems registrados"
];

export const experience = [
  {
    period: "mai. 2024 — atual",
    company: "Consórcio Guerra Brasil",
    role: "Analista de TI Pleno · Software Engineer .NET & IA",
    text: "Responsável técnico pelos sistemas da administradora de ponta a ponta: arquitetura, desenvolvimento, nuvem e segurança. Estruturei o fluxo de engenharia com agentes de IA que sustenta mais de 10 sistemas em produção.",
    highlights: [
      "API central e painéis da operação comercial",
      "Automação orientada a eventos com RabbitMQ",
      "Apuração de assembleias ao vivo",
      "Infraestrutura AWS e DevSecOps do zero"
    ]
  },
  {
    period: "jun. 2023 — abr. 2024",
    company: "Ololu Plataforma Digital",
    role: "Desenvolvedor Backend .NET",
    text: "Soluções backend em .NET Core e C# para operações e vendedores do segmento de consórcios.",
    highlights: [
      "APIs de integração com empresas parceiras",
      "Automação de fluxos de propostas e RPA",
      "Simuladores de propostas e apoio à análise de crédito"
    ]
  },
  {
    period: "jul. 2021 — mai. 2023",
    company: "Ololu Plataforma Digital",
    role: "Estagiário de Tecnologia · .NET Core e C#",
    text: "Desenvolvimento e manutenção de aplicações .NET para o segmento de consórcios.",
    highlights: ["Automações de RPA e web scraping", "Simuladores e ferramentas internas", "Modelagem em MySQL"]
  }
];

export const stack = [
  { group: "Backend", items: ["C#", ".NET 8 / 9", "ASP.NET Core", "Worker Services", "EF Core", "Dapper", "xUnit"] },
  { group: "IA", items: ["Claude Code", "Codex", "Anthropic API", "OpenAI-compatível", "Function calling", "RAG"] },
  { group: "Frontend", items: ["React", "TypeScript", "Razor / MVC", "Electron", "Tailwind", "Flutter"] },
  { group: "Dados e mensageria", items: ["MySQL", "SQL Server", "SQLite", "RabbitMQ", "MassTransit"] },
  { group: "Nuvem e DevOps", items: ["AWS", "Linux", "Docker", "nginx", "Cloudflare", "Bitbucket Pipelines", "GitHub Actions"] },
  { group: "Segurança", items: ["JWT + TOTP", "CSP", "OWASP", "Trivy", "fail2ban", "LGPD"] }
];
