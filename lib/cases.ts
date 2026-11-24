export type Accent = "cyan" | "violet" | "emerald" | "amber";

export type CaseStudy = {
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  role: string;
  accent: Accent;
  tags: string[];
  metrics: { value: string; label: string }[];
  context: string;
  challenge: string;
  solution: string[];
  flow: { label: string; detail: string }[];
  decisions: { title: string; text: string }[];
  results: string[];
  stack: string[];
  note?: string;
};

export const cases: CaseStudy[] = [
  {
    slug: "plataforma-comercial",
    title: "Plataforma comercial e API central",
    kicker: "Backend .NET · Integrações",
    summary:
      "A API que sustenta a operação comercial de uma administradora de consórcios: simulação de planos, comissões, campanhas, formulários e assinatura digital de contratos.",
    role: "Responsável técnico: arquitetura, desenvolvimento, testes, deploy e sustentação",
    accent: "cyan",
    tags: [".NET 8", "ASP.NET Core", "EF Core", "Dapper", "MySQL", "RabbitMQ", "JWT + TOTP"],
    metrics: [
      { value: "~300", label: "endpoints em produção" },
      { value: "307", label: "testes automatizados (xUnit)" },
      { value: "0", label: "falhas na troca de versão validada com 240 chamadas" },
      { value: "16", label: "releases documentadas com notas técnicas" }
    ],
    context:
      "Vendedores, gerentes e o backoffice dependiam de planilhas, consultas manuais ao ERP legado e processos espalhados em ferramentas diferentes para simular planos, calcular comissões e formalizar contratos.",
    challenge:
      "Centralizar regras de negócio críticas em uma API única, segura e auditável, que conversasse com o ERP legado, com a plataforma de assinatura digital e com os painéis internos, sem parar a operação durante as entregas.",
    solution: [
      "API REST em .NET 8 organizada por domínios de negócio (39 controllers), com EF Core para escrita e Dapper nas consultas pesadas de relatório.",
      "Simulador de planos e estudo de contemplação com geração de propostas em PDF (QuestPDF).",
      "Integração com assinatura digital por webhook assinado com HMAC e proteção contra replay, com trilha completa do contrato.",
      "Autenticação JWT com segundo fator (TOTP), tokens de uso único para links públicos e rate limiting por perfil de rota.",
      "Consumo de filas RabbitMQ (MassTransit) para receber eventos de vendas do ERP sem acoplar os sistemas.",
      "Logs de auditoria cifrados com AES-GCM e cabeçalhos de segurança (HSTS, X-Frame-Options, proteção contra SSRF)."
    ],
    flow: [
      { label: "Canais", detail: "Painéis web e formulários públicos" },
      { label: "API central", detail: ".NET 8 · JWT + TOTP · rate limit" },
      { label: "Domínios", detail: "Simulador, comissões, campanhas, contratos" },
      { label: "Integrações", detail: "Assinatura digital · ERP via filas" },
      { label: "Dados", detail: "MySQL · auditoria cifrada" }
    ],
    decisions: [
      {
        title: "EF Core + Dapper lado a lado",
        text: "EF Core garante consistência nas escritas; Dapper entrega as consultas analíticas com SQL afinado, sem brigar com o ORM."
      },
      {
        title: "Duas instâncias, troca sem queda",
        text: "O deploy sobe a nova versão ao lado da atual e só vira o tráfego depois do health check. A troca foi validada com 240 chamadas e zero falhas."
      },
      {
        title: "Segurança como requisito, não como fase",
        text: "Cada release passa por auditoria de dependências e checklist de segurança; a auditoria completa de agosto/2026 virou nota técnica versionada."
      }
    ],
    results: [
      "Simulação, proposta e contrato em um único fluxo digital, do vendedor à assinatura.",
      "Comissões e campanhas calculadas pela mesma regra em todos os canais.",
      "Entregas frequentes sem janela de manutenção e com rastreabilidade de ponta a ponta."
    ],
    stack: [
      "C#", ".NET 8", "ASP.NET Core", "EF Core (Pomelo)", "Dapper", "MySQL", "MassTransit", "RabbitMQ",
      "QuestPDF", "MailKit", "xUnit", "Docker", "Bitbucket Pipelines"
    ],
    note: "Sistema corporativo: telas, nomes de clientes e endereços foram omitidos por confidencialidade."
  },
  {
    slug: "automacao-orientada-a-eventos",
    title: "Automação orientada a eventos",
    kicker: "Workers · Mensageria · RPA",
    summary:
      "Robôs e workers .NET que automatizam cadastros no ERP legado, calculam comissões e sincronizam as vendas a cada 5 minutos, com filas, retentativas e idempotência.",
    role: "Arquitetura da migração de polling para eventos e desenvolvimento dos workers",
    accent: "violet",
    tags: ["Worker Services", "RabbitMQ", "MassTransit", "Selenium", "Polly"],
    metrics: [
      { value: "3", label: "workers independentes em produção" },
      { value: "5 min", label: "ciclo de sincronização das vendas" },
      { value: "64", label: "testes automatizados" },
      { value: "0", label: "processamento duplicado (upsert idempotente)" }
    ],
    context:
      "O cadastro de vendedores e revendas era feito à mão em um ERP legado sem API. Um robô antigo consultava uma API a cada 30 segundos e, quando o navegador automatizado travava, toda a fila parava.",
    challenge:
      "Isolar falhas, garantir que nenhum cadastro se perdesse e permitir reprocessamento seguro, sem depender de intervenção manual.",
    solution: [
      "Migração do modelo de polling para consumo de filas com MassTransit sobre RabbitMQ.",
      "Robô de cadastro com Selenium WebDriver isolado por mensagem: uma falha não derruba o worker.",
      "Retry exponencial, fila de mensagens mortas (DLQ) e resiliência de rede com Polly.",
      "Worker de vendas que tira um snapshot do ERP a cada 5 minutos e publica em lotes, com upsert idempotente.",
      "Worker de comissões em modo de simulação (dry-run) por padrão, para validar antes de gravar."
    ],
    flow: [
      { label: "Evento", detail: "Novo cadastro ou venda" },
      { label: "Fila", detail: "RabbitMQ · MassTransit" },
      { label: "Worker", detail: "Retry exponencial · Polly" },
      { label: "Destino", detail: "ERP legado via Selenium / banco" },
      { label: "Falha?", detail: "DLQ para reprocessar com segurança" }
    ],
    decisions: [
      {
        title: "Fila em vez de laço",
        text: "Cada mensagem é uma unidade de trabalho isolada. O erro de um cadastro vai para a DLQ e o restante segue."
      },
      {
        title: "Idempotência por padrão",
        text: "O mesmo evento pode chegar duas vezes sem efeito colateral: as gravações são upserts por chave de negócio."
      },
      {
        title: "Segredos fora do pipeline",
        text: "Credenciais ficam só no servidor, em arquivo com permissão restrita; o CI apenas confere que existem."
      }
    ],
    results: [
      "Cadastro no ERP legado sem digitação manual.",
      "Vendas disponíveis para painéis e comissões em minutos, não no dia seguinte.",
      "Falhas pontuais deixaram de parar a operação."
    ],
    stack: ["C#", ".NET 8", "Worker Service", "RabbitMQ", "MassTransit", "Selenium Grid", "Polly", "SSH.NET", "Docker Compose", "xUnit"]
  },
  {
    slug: "assembleias-ao-vivo",
    title: "Apuração de assembleias ao vivo",
    kicker: "Domínio financeiro · Tempo real",
    summary:
      "Sistema de apuração das assembleias mensais de consórcio: sorteio, lances e contemplações calculados ao vivo, com exportação no mesmo formato do ERP.",
    role: "Modelagem do domínio, motor de apuração e API",
    accent: "emerald",
    tags: [".NET 9", "Clean Architecture", "EF Core", "MySQL"],
    metrics: [
      { value: "73", label: "testes cobrindo as regras de apuração" },
      { value: "16", label: "controllers na API" },
      { value: "1:1", label: "exportação idêntica ao formato do ERP" }
    ],
    context:
      "A assembleia é o momento mais sensível do consórcio: define quem é contemplado. A apuração dependia de planilhas e conferência manual.",
    challenge:
      "Reproduzir com exatidão as regras de sorteio e lances, apresentar o resultado ao vivo e gerar uma exportação que o ERP aceitasse sem ajustes.",
    solution: [
      "Motor de apuração isolado na camada de domínio, sem dependência de banco ou interface.",
      "Arquitetura em camadas (Domain, Infrastructure, Api) em .NET 9.",
      "Testes de regra para cada modalidade de lance e para os casos de empate.",
      "Exportação gerada no layout do ERP, validada contra resultados históricos."
    ],
    flow: [
      { label: "Grupo", detail: "Cotas aptas e lances" },
      { label: "Motor", detail: "Regras puras no domínio" },
      { label: "Apuração", detail: "Resultado ao vivo" },
      { label: "Exportação", detail: "Layout do ERP" }
    ],
    decisions: [
      {
        title: "Regra no domínio, não no banco",
        text: "O motor é código puro e testável. A mesma regra roda no teste, na API e na reapuração."
      },
      {
        title: "Histórico como teste",
        text: "Resultados de assembleias anteriores servem de oráculo para validar o motor."
      }
    ],
    results: [
      "Apuração ao vivo, conferível por qualquer pessoa da sala.",
      "Fim da redigitação do resultado no ERP."
    ],
    stack: ["C#", ".NET 9", "ASP.NET Core", "EF Core", "MySQL", "xUnit", "Docker", "Bitbucket Pipelines"]
  },
  {
    slug: "paineis-executivos",
    title: "Painéis executivos e de vendas",
    kicker: "Dados · Produto interno",
    summary:
      "Dashboard executivo, painel de vendas com ranking e metas, telão de campanhas ao vivo e app mobile, todos alimentados pela mesma base e com acesso protegido.",
    role: "Desenvolvimento full stack, segurança de acesso e deploy",
    accent: "amber",
    tags: ["ASP.NET Core MVC", "Chart.js", ".NET 9", "Flutter", "nginx"],
    metrics: [
      { value: "4", label: "produtos de dados em uso" },
      { value: "35", label: "controllers no dashboard" },
      { value: "2FA", label: "em todos os acessos administrativos" }
    ],
    context:
      "Diretoria, gerentes e equipes de venda precisavam acompanhar resultado, metas e campanhas em tempo quase real, cada um no seu nível de acesso.",
    challenge:
      "Entregar informação rápida e confiável para públicos diferentes, do celular ao telão, sem expor dados sensíveis.",
    solution: [
      "Dashboard web em ASP.NET Core com filtros, simulador e PDF executivo para a diretoria.",
      "Painel de vendas separado para um consórcio parceiro: consolidado do período, mês a mês, ranking de vendedores e celebração quando a meta é batida.",
      "Telão de metas e campanhas ao vivo, servido como página estática em nginx sem privilégios.",
      "App mobile em Flutter com login em dois fatores e dispositivo confiável (fase inicial)."
    ],
    flow: [
      { label: "Vendas", detail: "Sincronizadas a cada 5 min" },
      { label: "API", detail: "Regras e permissões" },
      { label: "Painéis", detail: "Web, telão e mobile" },
      { label: "Pessoas", detail: "Diretoria, gerentes, vendas" }
    ],
    decisions: [
      {
        title: "Aplicações separadas por público",
        text: "O painel do parceiro roda isolado do dashboard interno, com usuários e banco próprios."
      },
      {
        title: "Endurecimento por padrão",
        text: "CSP sem script inline, cookies __Host-, antiforgery, senha com PBKDF2, bloqueio após tentativas e containers somente leitura."
      }
    ],
    results: [
      "Resultado comercial visível no mesmo dia, para cada nível da empresa.",
      "Campanhas acompanhadas ao vivo pelas equipes."
    ],
    stack: ["C#", ".NET 8/9", "ASP.NET Core MVC", "Razor", "Chart.js", "Bootstrap", "EF Core", "MySQL", "Flutter", "nginx", "Docker"],
    note: "Telas e números de venda omitidos por confidencialidade."
  },
  {
    slug: "infraestrutura-devsecops",
    title: "Infraestrutura em nuvem e DevSecOps",
    kicker: "AWS · Linux · Segurança contínua",
    summary:
      "O ambiente de produção que configurei do zero na AWS: containers, proxy com TLS, CDN, deploy automatizado, monitoramento, alertas e varredura diária de vulnerabilidades.",
    role: "Desenho, implantação, endurecimento e operação de toda a infraestrutura",
    accent: "cyan",
    tags: ["AWS EC2", "Ubuntu", "Docker", "nginx", "Cloudflare", "Trivy", "fail2ban"],
    metrics: [
      { value: "15 min", label: "ciclo de detecção de desvios no servidor" },
      { value: "1 min", label: "reação a alteração suspeita de acesso" },
      { value: "100%", label: "das imagens varridas diariamente" },
      { value: "0", label: "passivo de vulnerabilidades nas imagens após o saneamento" }
    ],
    context:
      "Os sistemas cresceram rápido e precisavam de um ambiente previsível, seguro e barato, com homologação e produção separadas e sem depender de um time de infraestrutura.",
    challenge:
      "Montar e operar sozinho uma plataforma com padrão corporativo: deploy sem queda, segredos protegidos, monitoramento, resposta a incidentes e conformidade com LGPD.",
    solution: [
      "Servidor Ubuntu na AWS com Docker Compose por aplicação e ambientes HML e PRD isolados, expostos só pelo proxy.",
      "nginx com TLS (Let's Encrypt), limite de requisições, bloqueio de scanners e proteção do login.",
      "Migração de DNS para a Cloudflare com SSL Full (strict), HSTS e origem aceitando tráfego apenas do proxy.",
      "SSH só por chave, firewall (ufw), fail2ban com bloqueio progressivo e kernel endurecido.",
      "Deploy por Bitbucket Pipelines: branch de release vai para homologação, main vai para produção, com troca validada por health check.",
      "Monitoramento a cada 5 minutos (disco, memória, containers, HTTP, filas) com alertas por Telegram e e-mail.",
      "Varredura diária com Trivy cruzada com o catálogo CISA KEV, detecção de desvios a cada 15 minutos e vigia de acessos a cada minuto.",
      "Runbooks com backup e reversão, postmortems registrados e atualização planejada de RabbitMQ e Selenium Grid."
    ],
    flow: [
      { label: "Usuário", detail: "HTTPS" },
      { label: "Cloudflare", detail: "DNS, CDN, SSL strict" },
      { label: "nginx", detail: "TLS, rate limit, bloqueio" },
      { label: "Containers", detail: "HML e PRD isolados" },
      { label: "Serviços", detail: "MySQL, RabbitMQ, Selenium Grid" }
    ],
    decisions: [
      {
        title: "Apps nunca expostos diretamente",
        text: "Cada container escuta só em 127.0.0.1; a única porta pública é a do proxy."
      },
      {
        title: "Patch do sistema a cada build",
        text: "As imagens são reconstruídas com atualização do sistema operacional, e o scanner confirma no dia seguinte."
      },
      {
        title: "Alertas só do que é novo",
        text: "A primeira varredura vira linha de base; depois só chegam avisos de achados novos e relevantes."
      }
    ],
    results: [
      "Ambiente de produção com padrão corporativo operado por uma pessoa.",
      "Passivo de vulnerabilidades das imagens zerado, com riscos aceitos documentados.",
      "Incidentes viram runbook e postmortem, não conhecimento perdido."
    ],
    stack: ["AWS EC2", "Ubuntu 24.04", "Docker", "Docker Compose", "nginx", "Let's Encrypt", "Cloudflare", "ufw", "fail2ban", "Trivy", "Python", "Bash", "Bitbucket Pipelines", "Telegram Bot API"]
  },
  {
    slug: "agente-atendimento-llm",
    title: "Agente de atendimento com LLM",
    kicker: "IA generativa · Function calling · RAG",
    summary:
      "Assistente virtual para uma loja de instrumentos musicais (fictícia) que consulta catálogo, pedidos e políticas por ferramentas, responde no tom do WhatsApp e recusa o que está fora do escopo.",
    role: "Projeto técnico completo: arquitetura, agente, ferramentas, testes e documentação",
    accent: "violet",
    tags: ["Python", "LLM", "Function calling", "RAG", "Anthropic", "OpenAI-compatível"],
    metrics: [
      { value: "7", label: "ferramentas disponíveis ao agente" },
      { value: "3", label: "provedores suportados (Claude, Gemini, Ollama)" },
      { value: "40", label: "testes automatizados" },
      { value: "strict", label: "tipagem com mypy e lint com Ruff" }
    ],
    context:
      "Atendimento de varejo por mensagem precisa responder rápido sobre produtos, pedidos e políticas, sem inventar preço, prazo ou estoque.",
    challenge:
      "Construir um agente útil e confiável: que busque a informação certa, não alucine números e saiba dizer não.",
    solution: [
      "Laço de function calling independente de provedor: SDK da Anthropic e API compatível com OpenAI para Gemini e Ollama.",
      "Sete ferramentas tipadas para catálogo, pedidos do cliente e manual de políticas.",
      "RAG com BM25 por seção do manual, sem embeddings: simples, auditável e barato.",
      "Regras numéricas (frete, prazo, desconto) calculadas em código, nunca pelo modelo.",
      "Histórico por sessão e guarda de escopo para recusar pedidos fora do domínio da loja."
    ],
    flow: [
      { label: "Cliente", detail: "Mensagem em linguagem natural" },
      { label: "LLM", detail: "Decide a ferramenta" },
      { label: "Ferramentas", detail: "Catálogo, pedidos, políticas" },
      { label: "Código", detail: "Cálculos determinísticos" },
      { label: "Resposta", detail: "Tom de WhatsApp, sem alucinação" }
    ],
    decisions: [
      {
        title: "Números ficam no código",
        text: "O modelo interpreta e conversa; quem calcula preço, frete e prazo é código testado."
      },
      {
        title: "BM25 antes de embeddings",
        text: "Para um manual de políticas pequeno, busca lexical por seção é mais previsível e fácil de depurar."
      },
      {
        title: "Provedor intercambiável",
        text: "O mesmo agente roda em Claude, Gemini ou um modelo local, trocando só a configuração."
      }
    ],
    results: [
      "Cinco conversas de exemplo geradas pelo agente real, documentadas no repositório.",
      "Base pronta para levar o padrão a atendimento de clientes em sistemas corporativos."
    ],
    stack: ["Python 3.11", "Anthropic SDK", "OpenAI-compatible API", "Gemini", "Ollama", "BM25", "pytest", "Ruff", "mypy"]
  },
  {
    slug: "assinatura-digital",
    title: "Acervo e integração de assinatura digital",
    kicker: "Integrações · Compliance",
    summary:
      "Cópia organizada e somente leitura de todos os contratos assinados desde 2021 e o desenho da migração para uma nova plataforma de assinatura, com webhooks seguros e máquina de estados.",
    role: "Desenho da solução, aplicativo de acervo e especificação da nova integração",
    accent: "emerald",
    tags: [".NET 8", "WPF", "OAuth JWT", "DPAPI", "Webhooks HMAC"],
    metrics: [
      { value: "2021+", label: "contratos cobertos pelo acervo" },
      { value: "32", label: "testes, incluindo o que proíbe escrita na API" },
      { value: "0", label: "chamadas de escrita na plataforma de assinatura" }
    ],
    context:
      "Contratos assinados digitalmente ficavam só dentro da plataforma do fornecedor, e a empresa planejava trocar de provedor sem perder histórico.",
    challenge:
      "Garantir uma cópia completa e fiel dos contratos, sem risco de alterar nada na origem, respeitando a cota da API compartilhada com outros sistemas.",
    solution: [
      "Aplicativo Windows (WPF + linha de comando) que copia os envelopes de forma organizada e retomável.",
      "Login OAuth com JWT; a chave privada fica cifrada pelo Windows (DPAPI), nunca em arquivo de configuração.",
      "Teste automatizado que falha se surgir qualquer chamada de escrita na API.",
      "Controle de cota: o programa pausa sozinho antes de consumir a reserva usada pela API principal.",
      "Desenho da nova integração com webhook HMAC-SHA256, máquina de estados do contrato e reenvio com trava."
    ],
    flow: [
      { label: "Plataforma atual", detail: "Somente leitura" },
      { label: "Acervo", detail: "Cópia organizada e retomável" },
      { label: "Nova plataforma", detail: "Webhook HMAC" },
      { label: "Estados", detail: "Enviado, assinado, concluído" }
    ],
    decisions: [
      {
        title: "Somente leitura garantida por teste",
        text: "A regra não depende de disciplina: o build quebra se alguém adicionar uma escrita."
      },
      {
        title: "Relatórios sem dados pessoais",
        text: "O diagnóstico mostra só números agregados, sem nomes, e-mails ou documentos."
      }
    ],
    results: [
      "Histórico contratual preservado fora do fornecedor.",
      "Troca de plataforma planejada com segurança e sem perda de rastreabilidade."
    ],
    stack: ["C#", ".NET 8", "WPF", "OAuth 2.0 JWT", "DPAPI", "xUnit", "Webhooks", "HMAC-SHA256"]
  },
  {
    slug: "engpav",
    title: "EngPav: diário de obra com visualização 3D",
    kicker: "Produto desktop · Offline-first",
    summary:
      "Aplicativo desktop para engenharia de pavimentação: diário de obra, relatório diário em texto e PDF, histórico pesquisável e a rua em 3D com a espessura aplicada.",
    role: "Produto completo: UX, desenvolvimento, empacotamento e atualização automática",
    accent: "amber",
    tags: ["Electron", "React 19", "TypeScript", "three.js", "SQLite"],
    metrics: [
      { value: "100%", label: "offline, com banco local" },
      { value: "3D", label: "visualização da rua com espessura aplicada" },
      { value: "auto", label: "atualização via GitHub Releases" }
    ],
    context:
      "Engenheiros de campo registravam o dia da obra em papel e mensagens soltas, o que dificultava relatórios e consulta ao histórico.",
    challenge:
      "Criar uma ferramenta que funcione sem internet no canteiro, gere o relatório do dia em segundos e mostre visualmente o que foi executado.",
    solution: [
      "Electron com React 19, TypeScript e Tailwind para uma interface rápida e moderna.",
      "Banco local SQLite (better-sqlite3): funciona totalmente offline.",
      "Relatório diário pronto para WhatsApp e PDF corporativo.",
      "Visualização 3D da rua com three.js / React Three Fiber, mostrando a espessura aplicada.",
      "Instalador e atualização automática por GitHub Releases."
    ],
    flow: [
      { label: "Campo", detail: "Registro do dia" },
      { label: "SQLite", detail: "Dados locais, offline" },
      { label: "Relatório", detail: "Texto e PDF" },
      { label: "3D", detail: "Rua e espessura" }
    ],
    decisions: [
      {
        title: "Offline-first",
        text: "O canteiro nem sempre tem sinal; o dado nasce e vive no computador do engenheiro."
      },
      {
        title: "Atualização sem fricção",
        text: "Cada versão publicada chega sozinha ao usuário, sem reinstalar."
      }
    ],
    results: [
      "Relatório diário gerado em segundos.",
      "Histórico da obra pesquisável e visual."
    ],
    stack: ["Electron", "React 19", "TypeScript", "Tailwind CSS 4", "three.js", "React Three Fiber", "SQLite", "GitHub Releases"]
  }
];

export const getCase = (slug: string) => cases.find((c) => c.slug === slug);
