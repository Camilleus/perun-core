import { Button } from "@/components/ui";
import {
  Zap,
  ShieldCheck,
  BarChart3,
  ArrowRight,
  MousePointerClick,
  TrendingUp,
  ShieldAlert,
  Users
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-accent selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-8 h-8 text-accent fill-accent" />
            <span className="text-xl font-black tracking-tighter uppercase">Perun Core</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-sm font-bold text-gray-400 hover:text-accent transition-colors">Jak to działa</a>
            <a href="#pricing" className="text-sm font-bold text-gray-400 hover:text-accent transition-colors">Cennik</a>
            <Link href="/login" className="px-5 py-2.5 rounded-full border border-white/10 text-sm font-black uppercase tracking-widest hover:bg-white/5 transition-all">
              Zaloguj
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
           <div className="absolute top-[10%] left-[10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full" />
           <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] bg-accent/10 blur-[100px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-black uppercase tracking-widest mb-8 animate-in slide-in-from-bottom-4 duration-500">
               <Zap className="w-4 h-4 fill-accent" /> Early Bird Launch is Live
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8 animate-in slide-in-from-bottom-6 duration-700">
              Chroń swoją marżę, <span className="text-accent">zanim ją stracisz.</span>
            </h1>
            <p className="text-xl text-gray-400 font-medium leading-relaxed mb-10 max-w-2xl animate-in slide-in-from-bottom-8 duration-900">
              Pierwszy CRM zorientowany na projekty. Zobacz realną marżę w czasie rzeczywistym i dostawaj alerty, zanim budżet zacznie przeciekać.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-in slide-in-from-bottom-10 duration-1000">
              <Link href="/login" className="px-8 py-5 bg-accent text-black rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-[0_0_40px_rgba(209,166,96,0.3)] text-center">
                Zacznij za darmo
              </Link>
              <a href="#how-it-works" className="px-8 py-5 bg-white/5 border border-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all text-center">
                Zobacz demo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Magic Moment Section */}
      <section id="how-it-works" className="py-32 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">Magic Moment</h2>
            <p className="text-gray-500 font-medium max-w-2xl mx-auto text-lg">
              Perun Core łączy sprzedaż z realizacją w jeden płynny proces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-10 bg-[#0a0a0a] border border-white/5 rounded-3xl group hover:border-accent/30 transition-all duration-500">
              <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-black mb-4">Wygrany Deal</h3>
              <p className="text-gray-500 leading-relaxed font-medium">
                Prowadź sprzedaż w przejrzystym pipeline. Każdy deal ma swoją zaplanowaną wartość i przewidywaną marżę.
              </p>
            </div>

            <div className="p-10 bg-accent/5 border border-accent/20 rounded-3xl relative group hover:border-accent transition-all duration-500">
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <Zap className="w-6 h-6 text-black fill-black" />
              </div>
              <div className="w-14 h-14 bg-accent/20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <MousePointerClick className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-2xl font-black mb-4">Convert to Project</h3>
              <p className="text-gray-600 leading-relaxed font-medium">
                Klikasz jeden przycisk. System kopiuje budżet i tworzy projekt. Wartość z kontraktu staje się nienaruszalnym limitem.
              </p>
            </div>

            <div className="p-10 bg-[#0a0a0a] border border-white/5 rounded-3xl group hover:border-primary/30 transition-all duration-500">
              <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-7 h-7 text-green-500" />
              </div>
              <h3 className="text-2xl font-black mb-4">Ochrona Marży</h3>
              <p className="text-gray-500 leading-relaxed font-medium">
                Logujesz koszty, a system w czasie rzeczywistym oblicza zysk. Dostajesz alert, gdy marża spada poniżej bezpiecznego poziomu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-accent/20 rounded-[40px] p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />

            <div className="flex flex-col lg:flex-row gap-12 items-center relative z-10">
              <div className="flex-1">
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest mb-6">
                   Limited Offer
                 </div>
                 <h2 className="text-5xl font-black tracking-tighter mb-6">Zostań Early Bird</h2>
                 <p className="text-gray-400 font-medium text-lg leading-relaxed mb-8">
                   Dołącz do pierwszej grupy 30 firm, które wdrożą Perun Core i zyskaj gwarancję ceny na zawsze.
                 </p>
                 <div className="space-y-4">
                   {[
                     "Wszystkie funkcje Phase 1-3",
                     "Gwarancja stałej ceny przez 12 m-cy",
                     "Dedykowany support przy onboardingu",
                     "Wpływ na rozwój nowych funkcji"
                   ].map((item, i) => (
                     <div key={i} className="flex items-center gap-3">
                       <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                          <ShieldCheck className="w-3 h-3 text-green-500" />
                       </div>
                       <span className="text-sm font-bold text-gray-300">{item}</span>
                     </div>
                   ))}
                 </div>
              </div>

              <div className="w-full lg:w-80 bg-white/5 border border-white/10 rounded-3xl p-8 text-center">
                 <p className="text-gray-500 font-black uppercase tracking-widest text-[10px] mb-4">Abonament miesięczny</p>
                 <div className="mb-2">
                    <span className="text-6xl font-black tracking-tighter">79</span>
                    <span className="text-2xl font-black text-gray-500"> PLN</span>
                 </div>
                 <p className="text-accent font-bold text-sm mb-8">za użytkownika / m-ce</p>

                 <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-xs font-bold text-gray-500 border-b border-white/5 pb-2">
                       <span>Dostępnych miejsc</span>
                       <span className="text-white">12 / 30</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                       <div className="w-[40%] h-full bg-accent" />
                    </div>
                 </div>

                 <Link href="/login" className="block w-full py-4 bg-white text-black rounded-xl font-black uppercase tracking-widest text-xs hover:bg-accent transition-all">
                   Zajmij miejsce
                 </Link>
                 <p className="text-[10px] text-gray-600 mt-4 font-bold">* Cena dla firm do 5 użytkowników. Powyżej: 99 PLN/os.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-accent fill-accent" />
            <span className="text-lg font-black tracking-tighter uppercase">Perun Core</span>
          </div>
          <p className="text-gray-600 text-sm font-medium">© 2024 Veles Digital. Wszystkie prawa zastrzeżone.</p>
          <div className="flex gap-8">
            <a href="#" className="text-gray-600 hover:text-white transition-colors"><Users className="w-5 h-5" /></a>
            <a href="#" className="text-gray-600 hover:text-white transition-colors"><ShieldAlert className="w-5 h-5" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
