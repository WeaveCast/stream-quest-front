"use client";

import {
  Home,
  Scroll,
  BookOpen,
  Sparkles,
  ScrollText,
  Settings,
} from "lucide-react";
import { AuthGate } from "@/features/auth";
import { SidebarNavItem } from "@/components/ui/sidebar-nav-item";

const navItems = [
  { href: "/hall", label: "The Hall", icon: <Home size={16} /> },
  { href: "/saga", label: "The Saga", icon: <Scroll size={16} /> },
  { href: "/grimoire", label: "The Grimoire", icon: <BookOpen size={16} /> },
  { href: "/runes", label: "The Runes", icon: <Sparkles size={16} /> },
  {
    href: "/chronicle",
    label: "The Chronicle",
    icon: <ScrollText size={16} />,
  },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGate>
      <div className="flex min-h-screen">
        <aside className="w-56 shrink-0 border-r border-border-default/40 bg-bg-surface p-lg flex flex-col gap-xs">
          <nav className="flex flex-col gap-xs flex-1">
            {navItems.map((item) => (
              <SidebarNavItem key={item.href} href={item.href} icon={item.icon}>
                {item.label}
              </SidebarNavItem>
            ))}
          </nav>
          <SidebarNavItem href="/settings" icon={<Settings size={16} />}>
            Settings
          </SidebarNavItem>
        </aside>

        <main className="flex-1 p-xl">{children}</main>
      </div>
    </AuthGate>
  );
}
