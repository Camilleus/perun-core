"use client";

import { Zap, ChevronRight, Clock } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function EarlyBirdBanner({ className }: { className?: string }) {
  // Mock spots counter
  const totalSpots = 30;
  const takenSpots = 22;
  const remainingSpots = totalSpots - takenSpots;

  return (
    <div className={cn("bg-brand-gold py-3 overflow-hidden relative shadow-[0_4px_20px_rgba(209,166,96,0.4)]", className)}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-brand-navy fill-brand-navy animate-pulse" />
            <span className="text-brand-navy text-xs font-black uppercase tracking-[0.2em]">
              Early Bird: Zostało tylko {remainingSpots} z {totalSpots} miejsc
            </span>
          </div>

          <div className="h-2 w-32 bg-brand-navy/10 rounded-full overflow-hidden hidden md:block p-0.5 border border-brand-navy/5">
             <div className="h-full bg-brand-navy rounded-full" style={{ width: `${(takenSpots/totalSpots)*100}%` }} />
          </div>
        </div>

        <Link
          href="/early-bird"
          className="flex items-center gap-2 bg-brand-navy text-brand-gold px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-2xl group"
        >
          Odbierz 12 m-cy price lock (79 PLN) <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Animated Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_3s_infinite] pointer-events-none" />

      {/* Decorative texture */}
      <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
    </div>
  );
}
