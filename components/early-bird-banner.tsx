"use client";

import { Zap, ChevronRight, Clock } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function EarlyBirdBanner({ className }: { className?: string }) {
  // Mock spots counter
  const totalSpots = 30;
  const takenSpots = 18;
  const remainingSpots = totalSpots - takenSpots;

  return (
    <div className={cn("bg-brand-gold py-2 overflow-hidden relative", className)}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-brand-navy fill-brand-navy animate-pulse" />
          <span className="text-brand-navy text-[11px] font-black uppercase tracking-[0.2em]">
            Early Bird Launch: Zostało tylko {remainingSpots} z {totalSpots} miejsc
          </span>
        </div>

        <div className="h-1 w-24 bg-brand-navy/10 rounded-full overflow-hidden hidden sm:block">
           <div className="h-full bg-brand-navy" style={{ width: `${(takenSpots/totalSpots)*100}%` }} />
        </div>

        <Link
          href="/early-bird"
          className="flex items-center gap-1 bg-brand-navy text-brand-gold px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg"
        >
          Odbierz 12 m-cy price lock <ChevronRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Decorative texture */}
      <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
    </div>
  );
}
