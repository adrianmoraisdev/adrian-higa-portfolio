"use client";

import { useEffect, useState } from "react";

const lines = [
  { kind: "cmd", text: "agente › implementar cálculo de comissões com testes" },
  { kind: "info", text: "lendo AGENTS.md · regras de segurança e escopo carregadas" },
  { kind: "info", text: "plano: 3 arquivos, 1 migration, 6 testes novos" },
  { kind: "info", text: "subagente › negativos de autorização (401 / 403)" },
  { kind: "ok", text: "testes passando · nenhuma vulnerabilidade nova" },
  { kind: "ok", text: "diff pronto para revisão humana" },
  { kind: "go", text: "deploy em homologação · health check ok" }
] as const;

export function AgentTerminal() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(lines.length);
      return;
    }
    if (count >= lines.length) {
      const reset = window.setTimeout(() => setCount(0), 5200);
      return () => window.clearTimeout(reset);
    }
    const timer = window.setTimeout(() => setCount((c) => c + 1), count === 0 ? 600 : 900);
    return () => window.clearTimeout(timer);
  }, [count]);

  return (
    <div className="terminal" aria-label="Exemplo do fluxo de desenvolvimento com agentes de IA">
      <div className="terminal-bar" aria-hidden="true">
        <span />
        <span />
        <span />
        <em>fluxo com agentes de IA</em>
      </div>
      <ol className="terminal-body">
        {lines.map((line, index) => (
          <li key={line.text} className={`t-${line.kind}${index < count ? " is-on" : ""}`}>
            <span className="t-prefix" aria-hidden="true">
              {line.kind === "cmd" ? "$" : line.kind === "ok" ? "✓" : line.kind === "go" ? "→" : "›"}
            </span>
            {line.text}
          </li>
        ))}
        <li className="t-cursor" aria-hidden="true">
          <span />
        </li>
      </ol>
    </div>
  );
}
