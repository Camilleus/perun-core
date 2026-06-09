import { CheckCircle2, Zap, ArrowRight, ShieldCheck, BarChart3 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-brand-navy selection:bg-brand-gold selection:text-black text-white flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center space-y-12 animate-in fade-in zoom-in duration-700">
        <div className="relative inline-block">
          <div className="w-24 h-24 bg-brand-gold rounded-[2rem] flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(209,166,96,0.4)] relative z-10 animate-bounce">
            <CheckCircle2 className="w-12 h-12 text-brand-navy" />
          </div>
          <div className="absolute inset-0 bg-brand-gold/20 blur-3xl rounded-full scale-150 animate-pulse" />
        </div>

        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-none">
            Witaj w gronie <br/>
            <span className="text-brand-gold">Fundatorów!</span>
          </h1>
          <p className="text-xl text-gray-400 font-medium max-w-lg mx-auto">
            Dziękujemy za zaufanie. Twój status Early Bird został aktywowany, a cena została zablokowana na najbliższe 12 miesięcy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="p-6 bg-white/[0.03] border border-white/5 rounded-2xl space-y-3 group hover:border-brand-gold/30 transition-all">
              <Zap className="w-6 h-6 text-brand-gold mx-auto group-hover:scale-110 transition-transform" />
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Status</p>
              <p className="text-sm font-bold">Early Bird Aktywny</p>
           </div>
           <div className="p-6 bg-white/[0.03] border border-white/5 rounded-2xl space-y-3 group hover:border-brand-gold/30 transition-all">
              <ShieldCheck className="w-6 h-6 text-brand-gold mx-auto group-hover:scale-110 transition-transform" />
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Ochrona</p>
              <p className="text-sm font-bold">Cena Zablokowana</p>
           </div>
           <div className="p-6 bg-white/[0.03] border border-white/5 rounded-2xl space-y-3 group hover:border-brand-gold/30 transition-all">
              <BarChart3 className="w-6 h-6 text-brand-gold mx-auto group-hover:scale-110 transition-transform" />
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Dostęp</p>
              <p className="text-sm font-bold">Wszystkie Moduły</p>
           </div>
        </div>

        <div className="pt-8">
          <Link href="/dashboard">
            <Button className="px-12 py-8 bg-brand-gold text-black rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-[0_0_50px_rgba(209,166,96,0.3)] group">
              Przejdź do Dashboardu <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
