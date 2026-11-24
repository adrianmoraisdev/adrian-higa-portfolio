"use client";

import { useEffect, useRef } from "react";

// Campo de atenção: palavras-token flutuam; o cursor (ou uma query autônoma)
// age como a query de uma camada de atenção e distribui pesos por softmax
// entre os tokens mais próximos. Pesos aparecem como linhas e valores ao vivo.

const WORDS = [
  "C#", ".NET", "LLM", "RAG", "API", "agent", "token", "RabbitMQ", "Docker", "AWS",
  "embedding", "attention", "query", "key", "value", "softmax", "deploy", "xUnit",
  "SQL", "nginx", "TOTP", "event", "worker", "prompt", "context", "Claude", "Codex",
  "CI/CD", "Linux", "React", "Polly", "DLQ", "JWT", "LGPD", "Trivy", "EF Core"
];

type Token = { word: string; x: number; y: number; vx: number; vy: number; w: number; glow: number };

const TOP_K = 7;
const TAU = 90;

export function AttentionField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let tokens: Token[] = [];
    let raf = 0;
    let visible = true;
    let t = 0;
    const pointer = { x: 0, y: 0, last: -1e9 };
    const query = { x: 0, y: 0 };

    const seed = () => {
      const count = width < 720 ? 20 : 34;
      const words = [...WORDS].sort(() => Math.random() - 0.5).slice(0, count);
      tokens = words.map((word) => ({
        word,
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        w: 0,
        glow: 0
      }));
      query.x = width * 0.7;
      query.y = height * 0.45;
    };

    const resize = () => {
      const rect = host.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!tokens.length) seed();
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const rect = host.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.last = performance.now();
    };

    const step = () => {
      t += 1;
      const now = performance.now();
      const usePointer = now - pointer.last < 2500;
      const autoX = width * (0.5 + 0.42 * Math.sin(t / 260));
      const autoY = height * (0.5 + 0.4 * Math.sin(t / 190 + 1.3));
      const targetX = usePointer ? pointer.x : autoX;
      const targetY = usePointer ? pointer.y : autoY;
      query.x += (targetX - query.x) * 0.08;
      query.y += (targetY - query.y) * 0.08;

      for (const tk of tokens) {
        tk.x += tk.vx;
        tk.y += tk.vy;
        if (tk.x < -40) tk.x = width + 40;
        if (tk.x > width + 40) tk.x = -40;
        if (tk.y < -20) tk.y = height + 20;
        if (tk.y > height + 20) tk.y = -20;
      }

      // Atenção: softmax sobre os TOP_K tokens mais próximos da query.
      const ranked = tokens
        .map((tk, i) => ({ i, d: Math.hypot(tk.x - query.x, tk.y - query.y) }))
        .sort((a, b) => a.d - b.d)
        .slice(0, TOP_K);
      const exps = ranked.map((r) => Math.exp(-r.d / TAU));
      const sum = exps.reduce((a, b) => a + b, 0) || 1;
      const weights = new Map(ranked.map((r, k) => [r.i, exps[k] / sum]));
      tokens.forEach((tk, i) => {
        const target = weights.get(i) ?? 0;
        tk.w += (target - tk.w) * 0.12;
        tk.glow = Math.max(tk.glow * 0.96, tk.w);
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Grafo de fundo: ligações entre tokens próximos.
      for (let a = 0; a < tokens.length; a++) {
        for (let b = a + 1; b < tokens.length; b++) {
          const ta = tokens[a];
          const tb = tokens[b];
          const d = Math.hypot(ta.x - tb.x, ta.y - tb.y);
          if (d < 140) {
            ctx.strokeStyle = `rgba(125, 211, 252, ${0.1 * (1 - d / 140)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(ta.x, ta.y);
            ctx.lineTo(tb.x, tb.y);
            ctx.stroke();
          }
        }
      }

      // Linhas de atenção da query para os tokens com peso.
      let best: Token | null = null;
      for (const tk of tokens) {
        if (tk.w < 0.01) continue;
        if (!best || tk.w > best.w) best = tk;
        const grad = ctx.createLinearGradient(query.x, query.y, tk.x, tk.y);
        grad.addColorStop(0, `rgba(56, 189, 248, ${0.3 + tk.w * 0.7})`);
        grad.addColorStop(1, `rgba(167, 139, 250, ${0.2 + tk.w * 0.8})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1 + tk.w * 5;
        ctx.beginPath();
        ctx.moveTo(query.x, query.y);
        ctx.lineTo(tk.x, tk.y);
        ctx.stroke();
      }

      // Tokens.
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (const tk of tokens) {
        const a = 0.24 + tk.glow * 0.76;
        ctx.font = `${tk.glow > 0.12 ? 600 : 500} 13px ui-monospace, "Cascadia Code", Menlo, monospace`;
        if (tk.glow > 0.05) {
          ctx.fillStyle = `rgba(56, 189, 248, ${tk.glow * 0.18})`;
          ctx.beginPath();
          ctx.arc(tk.x, tk.y, 16 + tk.glow * 26, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = `rgba(${Math.round(154 + 70 * tk.glow)}, ${Math.round(168 + 70 * tk.glow)}, 230, ${a})`;
        ctx.fillText(tk.word, tk.x, tk.y);
        if (tk.w > 0.06) {
          ctx.font = '600 11px ui-monospace, "Cascadia Code", Menlo, monospace';
          ctx.fillStyle = `rgba(110, 231, 183, ${Math.min(1, tk.w * 2.2)})`;
          ctx.fillText(tk.w.toFixed(2), tk.x, tk.y + 15);
        }
      }

      // Query.
      const pulse = 1 + Math.sin(t / 14) * 0.15;
      ctx.strokeStyle = "rgba(56, 189, 248, 0.9)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(query.x, query.y, 11 * pulse, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = "rgba(56, 189, 248, 0.18)";
      ctx.beginPath();
      ctx.arc(query.x, query.y, 30 * pulse, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#e0f2fe";
      ctx.font = '700 10px ui-monospace, "Cascadia Code", Menlo, monospace';
      ctx.fillText("Q", query.x, query.y + 0.5);
      if (best) {
        ctx.fillStyle = "rgba(200, 211, 227, 0.75)";
        ctx.font = '500 10px ui-monospace, "Cascadia Code", Menlo, monospace';
        ctx.textAlign = "left";
        ctx.fillText(`softmax(QKᵀ/√d) → ${best.word}`, query.x + 16, query.y - 16);
      }
    };

    const loop = () => {
      if (visible && !document.hidden) {
        step();
        draw();
      }
      raf = requestAnimationFrame(loop);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(host);
    host.addEventListener("pointermove", onMove);

    if (reduced) {
      for (let i = 0; i < 60; i++) step();
      draw();
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      host.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="attention-field" aria-hidden="true" />;
}
