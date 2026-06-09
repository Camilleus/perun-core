import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { Zap, ShieldCheck, CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { WaitlistForm } from "@/components/waitlist-form";

export default function EarlyBirdPage() {
  return (
    <div className="min-h-screen bg-brand-navy selection:bg-brand-gold selection:text-black text-white">
      {/* Simple Nav */}
      <nav className="h-20 border-b border-white/5 flex items-center px-6">
        <Link href="/" className="flex items-center gap-2 group text-gray-400 hover:text-brand-gold transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-bold uppercase tracking-widest">Powrót</span>
        </Link>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-xs font-black uppercase tracking-widest">
            <Zap className="w-4 h-4 fill-brand-gold" /> Early Bird Launch
          </div>
          <h1 className="text-6xl font-black tracking-tighter leading-[0.9]">
            Zostań <span className="text-brand-gold">Fundatorem</span> Perun Core.
          </h1>
          <p className="text-xl text-gray-400 font-medium leading-relaxed max-w-lg">
            Szukamy 30 firm, które chcą realnie wpłynąć na rozwój narzędzia do ochrony marży i zyskać dożywotnią gwarancję najniższej ceny.
          </p>

          <div className="space-y-4">
             {[
               "Cena 79-99 zł/użytkownik (zamiast 149 zł)",
               "Cena zablokowana na pierwsze 12 miesięcy",
               "Dostęp do modułu AI Risk Co-Pilot",
               "Priorytetowe wdrożenie i wsparcie"
             ].map((item, i) => (
               <div key={i} className="flex items-center gap-3">
                 <CheckCircle2 className="w-5 h-5 text-brand-gold" />
                 <span className="font-bold text-gray-300">{item}</span>
               </div>
             ))}
          </div>
        </div>

        <div className="animate-in fade-in slide-in-from-right-4 duration-700">
          <Card className="bg-brand-navy-dk border-white/10 shadow-2xl p-2">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-2xl font-black flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-brand-gold" />
                Zajmij miejsce w kolejce
              </CardTitle>
              <p className="text-gray-500 text-sm font-medium mt-2">Skontaktujemy się z Tobą w ciągu 24h, aby omówić wdrożenie.</p>
            </CardHeader>
            <CardContent className="p-8 pt-4">
              <WaitlistForm />
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="py-20 border-t border-white/5 text-center">
         <p className="text-gray-600 text-xs font-bold uppercase tracking-widest">© 2024 Veles Digital. Built with precision in Warsaw.</p>
      </footer>
    </div>
  );
}
