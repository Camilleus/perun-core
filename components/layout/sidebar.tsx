"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BarChart3,
  Settings,
  Zap,
  Layers,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Pipeline", href: "/pipeline", icon: LayoutDashboard },
  { name: "Projects", href: "/projects", icon: Layers },
  { name: "Margin Dashboard", href: "/dashboard", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-64 bg-sidebar border-r border-border h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-brand-navy rounded flex items-center justify-center">
          <Zap className="text-brand-gold w-5 h-5 fill-brand-gold" />
        </div>
        <span className="font-bold text-xl tracking-tight">PERUN CORE</span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors group",
                isActive
                  ? "bg-brand-navy/10 text-brand-gold font-medium"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 transition-colors",
                isActive ? "text-brand-gold" : "text-gray-500 group-hover:text-gray-300"
              )} />
              {item.name}
              {isActive && <ChevronRight className="ml-auto w-4 h-4" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border mt-auto">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-brand-navy/20 flex items-center justify-center text-xs font-medium">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">John Doe</p>
            <p className="text-xs text-gray-500 truncate">Workspace A</p>
          </div>
        </div>
      </div>
    </div>
  );
}
