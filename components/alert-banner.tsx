'use client';

import { Alert } from "@/types";
import { markAlertAsRead } from "@/lib/actions/alert.actions";
import { cn } from "@/lib/utils";
import { ShieldAlert, AlertCircle, Check } from "lucide-react";

interface AlertBannerProps {
  alert: Alert;
}

export function AlertBanner({ alert }: AlertBannerProps) {
  const isCritical = alert.type === 'margin_critical' || alert.severity === 'high';
  const isWarning = alert.type === 'margin_warning' || alert.severity === 'medium';

  return (
    <div
      className={cn(
        "p-4 rounded-xl border-l-4 space-y-1.5 transition-all relative overflow-hidden group",
        isCritical ? "bg-red-500/10 border-l-red-500 hover:bg-red-500/15" :
        isWarning ? "bg-brand-gold/10 border-l-brand-gold hover:bg-brand-gold/15" :
        "bg-brand-navy-dk border-white/5 hover:bg-white/[0.05]"
      )}
    >
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          {isCritical ? (
            <AlertCircle className="w-4 h-4 text-red-500 animate-pulse" />
          ) : (
            <ShieldAlert className="w-4 h-4 text-brand-gold" />
          )}
          <p className={cn(
            "text-[10px] font-black uppercase tracking-widest",
            isCritical ? "text-red-500" : "text-brand-gold"
          )}>
            {alert.type.replace('_', ' ')}
          </p>
        </div>
        <button
          onClick={() => markAlertAsRead(alert.id)}
          className="p-1 hover:bg-white/10 rounded-md transition-colors text-gray-500 hover:text-white"
          title="Oznacz jako przeczytane"
        >
          <Check className="w-4 h-4" />
        </button>
      </div>
      <p className="text-sm font-bold text-white leading-snug relative z-10 group-hover:text-brand-gold transition-colors pr-8">
        {alert.message}
      </p>
      <div className="flex justify-between items-center mt-2 relative z-10">
        <span className="text-[9px] text-gray-500 font-black uppercase tracking-widest">
          {new Date(alert.created_at).toLocaleDateString('pl-PL')}
        </span>
      </div>
    </div>
  );
}
