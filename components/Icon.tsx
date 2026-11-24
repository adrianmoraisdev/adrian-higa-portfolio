import { Bot, Cloud, LayoutDashboard, Server, ShieldCheck, Workflow } from "lucide-react";

const icons = { Bot, Cloud, LayoutDashboard, Server, ShieldCheck, Workflow };

export function Icon({ name, size = 22 }: { name: string; size?: number }) {
  const Component = icons[name as keyof typeof icons] ?? Server;
  return <Component size={size} aria-hidden="true" />;
}
