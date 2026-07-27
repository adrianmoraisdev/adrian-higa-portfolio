export const site = {
  name: "Adrian Higa",
  role: "Software Engineer · Backend .NET · IA & Automação",
  description:
    "Engenheiro de software especializado em .NET, sistemas corporativos, agentes de IA e automações que eliminam atrito operacional.",
  url: "https://adrianmoraisdev.github.io/adrian-higa-portfolio",
  email: "adrianmorais.dev@gmail.com",
  github: "https://github.com/adrianmoraisdev",
  linkedin: "https://www.linkedin.com/in/adrianhiga-tech",
  achados: "https://achadosnaweb.com.br"
} as const;

export const asset = (path: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
