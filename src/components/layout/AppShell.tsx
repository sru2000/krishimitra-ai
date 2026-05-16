import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { LayoutDashboard, BarChart3, Users, Package, Sparkles, Map, Bell, Search, Leaf } from "lucide-react";
import type { ReactNode } from "react";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/farmers", label: "Farmer Insights", icon: Users },
  { to: "/inventory", label: "Inventory", icon: Package },
  { to: "/assistant", label: "AI Assistant", icon: Sparkles },
  { to: "/regions", label: "Region Risk", icon: Map },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen flex w-full">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar/80 backdrop-blur-xl">
        <div className="px-6 h-16 flex items-center gap-2 border-b border-sidebar-border">
          <div className="w-9 h-9 rounded-lg bg-gradient-primary grid place-items-center glow">
            <Leaf className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <div className="font-display font-bold text-base leading-tight">KrishiMitra</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">AI · Syngenta</div>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {nav.map(({ to, label, icon: Icon }) => {
            const active = pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                  active
                    ? "text-sidebar-primary-foreground bg-sidebar-primary/15"
                    : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r bg-primary glow"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon className="w-4 h-4" />
                <span className="font-medium">{label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="m-3 p-4 rounded-xl glass">
          <div className="text-xs text-muted-foreground mb-1">Field Force Intelligence</div>
          <div className="text-sm font-semibold">v2.4 · Live</div>
          <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
            <div className="h-full w-3/4 bg-gradient-primary" />
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 px-4 md:px-8 flex items-center gap-4 border-b border-border bg-background/60 backdrop-blur-xl sticky top-0 z-30">
          <div className="md:hidden w-9 h-9 rounded-lg bg-gradient-primary grid place-items-center">
            <Leaf className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="flex-1 max-w-xl relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              placeholder="Search regions, farmers, products…"
              className="w-full pl-10 pr-4 h-10 rounded-lg bg-muted/50 border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
            />
          </div>
          <button className="relative w-10 h-10 rounded-lg hover:bg-muted/60 grid place-items-center">
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-destructive" />
          </button>
          <div className="flex items-center gap-3 pl-3 border-l border-border">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-medium">Arjun Rao</div>
              <div className="text-xs text-muted-foreground">Regional Lead · AP</div>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-primary grid place-items-center text-sm font-bold text-primary-foreground">AR</div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-8 max-w-[1600px] w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
