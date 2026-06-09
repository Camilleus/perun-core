"use client";

import { cn } from "@/lib/utils";
import React, { createContext, useContext, useState, useEffect } from "react";
import { X, CheckCircle2, AlertCircle, Info } from "lucide-react";

/* ── Toast Logic ────────────────────────────── */
type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = (message: string, type: ToastType = "info") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 max-w-md w-full pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              "pointer-events-auto flex items-center justify-between p-4 rounded-xl border shadow-2xl animate-in slide-in-from-right-10 fade-in duration-300",
              t.type === "success" && "bg-brand-navy-dk border-green-500/50 text-white",
              t.type === "error" && "bg-brand-navy-dk border-red-500/50 text-white",
              t.type === "info" && "bg-brand-navy-dk border-brand-gold/50 text-white"
            )}
          >
            <div className="flex items-center gap-3">
              {t.type === "success" && <CheckCircle2 className="w-5 h-5 text-green-500" />}
              {t.type === "error" && <AlertCircle className="w-5 h-5 text-red-500" />}
              {t.type === "info" && <Info className="w-5 h-5 text-brand-gold" />}
              <p className="text-sm font-bold tracking-tight">{t.message}</p>
            </div>
            <button
              onClick={() => setToasts((prev) => prev.filter((toast) => toast.id !== t.id))}
              className="p-1 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("bg-card border border-border rounded-lg overflow-hidden", className)}>
      {children}
    </div>
  );
}

export function CardHeader({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("px-6 py-4 border-b border-border", className)}>{children}</div>;
}

export function CardTitle({ className, children }: { className?: string; children: React.ReactNode }) {
  return <h3 className={cn("text-lg font-semibold text-white", className)}>{children}</h3>;
}

export function CardDescription({ className, children }: { className?: string; children: React.ReactNode }) {
  return <p className={cn("text-sm text-gray-400 mt-1", className)}>{children}</p>;
}

export function CardContent({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("p-6", className)}>{children}</div>;
}

export function CardFooter({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("px-6 py-4 bg-brand-navy-lt/10 border-t border-border", className)}>{children}</div>;
}

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "flex h-10 w-full rounded-md border border-border bg-brand-navy-dk px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-white",
        className
      )}
      {...props}
    />
  );
}

import { Loader2 } from "lucide-react";

export function Button({
  className,
  variant = "default",
  loading = false,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline";
  loading?: boolean;
}) {
  const variants = {
    default: "bg-brand-navy text-brand-gold hover:bg-brand-navy/90 font-medium",
    outline: "border border-border bg-transparent hover:bg-brand-navy-lt/10 text-white font-medium"
  };

  return (
    <button
      disabled={loading || props.disabled}
      className={cn(
        "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        className
      )}
      {...props}
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
      {children}
    </button>
  );
}
