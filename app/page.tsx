import Link from "next/link";
import {
  ShieldCheck,
  Zap,
  ArrowRight,
  Target,
  TrendingDown,
  ShieldAlert,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-accent selection:text-primary">
      {/* Navbar */}
      <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg border border-accent/20">
              <Zap className="text-accent w-6 h-6 fill-accent" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase">Perun Core</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-gray-400">
            <a href="#features" className="hover:text-white transition-colors">Funkcje</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">Jak to działa</a>
            <a href="#pricing" className="hover:text-white transition-colors">Cennik</a>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-bold uppercase tracking-widest hover:text-accent transition-colors">Zaloguj</Link>
            <Button className="h-11 px-6 font-black uppercase tracking-widest bg-accent text-primary hover:bg-accent/90">Zacznij teraz</Button>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-primary/20 blur-[120px] rounded-full -z-10" />
          <div className="max-w-7xl mx-auto px-6 text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/30 border border-accent/20 text-accent text-xs font-black uppercase tracking-widest animate-bounce">
              <Sparkles className="w-3 h-3" /> Early Bird Access Now Open
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] text-white">
              Chroni Twoją marżę <br className="hidden md:block" />
              <span className="text-accent italic">zanim stracisz pieniądze.</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 font-medium leading-relaxed">
              Perun Core to jedyny CRM stworzony dla firm projektowych, który przenosi budżet ze sprzedaży bezpośrednio do realizacji. Widzisz realną marżę w czasie rzeczywistym.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button className="h-16 px-10 text-lg font-black uppercase tracking-widest bg-accent text-primary hover:bg-accent/90 shadow-[0_0_40px_rgba(209,166,96,0.2)]">
                Załóż darmowe konto <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">Bez karty kredytowej</p>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-24 bg-white/[0.02] border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center border border-accent/20">
                  <Target className="text-accent w-6 h-6" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight">Budżetowanie 1:1</h3>
                <p className="text-gray-400 leading-relaxed">To, co obiecałeś klientowi w Dealu, staje się limitem wydatków w Projekcie. Zero utraty danych przy przekazaniu do realizacji.</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center border border-accent/20">
                  <TrendingDown className="text-accent w-6 h-6" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight">Alerty Przekroczeń</h3>
                <p className="text-gray-400 leading-relaxed">Dostajesz powiadomienie, gdy tylko koszty rzeczywiste zjedzą 75% lub 90% zaplanowanej marży. Reagujesz, zamiast liczyć straty.</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center border border-accent/20">
                  <ShieldCheck className="text-accent w-6 h-6" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight">Ochrona Marży AI</h3>
                <p className="text-gray-400 leading-relaxed">Nasz Co-Pilot analizuje tempo wydatków i ryzyka, sugerując konkretne kroki, aby uratować zysk tam, gdzie inni go tracą.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Magic Moment / How it works */}
        <section id="how-it-works" className="py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-16 items-center">
              <div className="flex-1 space-y-8">
                <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                  Od podpisu umowy do <br />
                  <span className="text-accent">bezpiecznego zysku.</span>
                </h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-accent text-primary flex items-center justify-center font-black shrink-0">1</div>
                    <div>
                      <h4 className="font-bold text-white uppercase text-sm tracking-widest mb-1">Pipeline Sprzedażowy</h4>
                      <p className="text-gray-400 text-sm">Zarządzaj ofertami w Kanbanie. Każdy deal ma przypisaną szacowaną marżę.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-accent text-primary flex items-center justify-center font-black shrink-0">2</div>
                    <div>
                      <h4 className="font-bold text-white uppercase text-sm tracking-widest mb-1">Convert to Project</h4>
                      <p className="text-gray-400 text-sm">Jeden klik zamienia wygrany deal w aktywny projekt. Budżet staje się nienaruszalnym limitem.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-accent text-primary flex items-center justify-center font-black shrink-0">3</div>
                    <div>
                      <h4 className="font-bold text-white uppercase text-sm tracking-widest mb-1">Monitoring Marży</h4>
                      <p className="text-gray-400 text-sm">Loguj koszty etap po etapie. System pokazuje &quot;Burn Rate&quot; i ostrzega przed przekroczeniami.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 w-full aspect-square bg-gradient-to-br from-primary/40 to-black border-2 border-white/10 rounded-3xl p-8 relative group overflow-hidden">
                 <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                 <div className="relative h-full flex flex-col justify-between">
                    <div className="flex justify-between items-center">
                       <div className="text-xs font-black uppercase tracking-widest text-accent">Projekt: Montaż Klimatyzacji</div>
                       <div className="px-2 py-1 rounded bg-green-500/20 text-green-500 text-[10px] font-black uppercase">Active</div>
                    </div>
                    <div className="space-y-4">
                       <div className="flex justify-between items-end">
                          <div className="text-4xl font-black text-white">22.4%</div>
                          <div className="text-right">
                             <div className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Realna Marża</div>
                             <div className="text-sm font-bold text-white">12 450,00 zł</div>
                          </div>
                       </div>
                       <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                          <div className="h-full bg-accent w-[78%]" />
                       </div>
                       <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-500">
                          <span>Burn: 78%</span>
                          <span>Budget: 55k PLN</span>
                       </div>
                    </div>
                    <div className="p-4 rounded-xl bg-accent/10 border border-accent/20 flex items-center gap-3">
                       <ShieldAlert className="w-5 h-5 text-accent" />
                       <p className="text-[10px] font-bold text-accent uppercase leading-tight">Ostrzeżenie AI: Koszty etapu &quot;Realizacja&quot; rosną szybciej niż zakładano.</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 bg-accent/5">
          <div className="max-w-7xl mx-auto px-6 text-center space-y-12">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">Early Bird Access</h2>
              <p className="text-gray-400 max-w-xl mx-auto font-medium">Zarezerwuj miejsce w programie wczesnego dostępu i otrzymaj dożywotnią gwarancję ceny.</p>
            </div>
            <div className="max-w-md mx-auto bg-[#0a0a0a] border-2 border-accent rounded-3xl p-10 relative shadow-2xl">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-primary text-xs font-black uppercase tracking-widest rounded-full">Najlepsza oferta</div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-black uppercase tracking-widest">Early Bird</h3>
                  <div className="text-5xl font-black text-white">79 PLN <span className="text-lg text-gray-500">/mc</span></div>
                  <p className="text-sm text-gray-500 font-bold">cena za użytkownika</p>
                </div>
                <ul className="text-left space-y-4 text-sm font-medium border-y border-white/5 py-8">
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-accent shrink-0" /> Nieograniczona liczba projektów</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-accent shrink-0" /> Pełny Pipeline CRM</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-accent shrink-0" /> Monitoring Marży w czasie rzeczywistym</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-accent shrink-0" /> AI Co-Pilot (Wersja Beta)</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-accent shrink-0" /> Integracja KSeF (wkrótce)</li>
                </ul>
                <Button className="w-full h-14 text-lg font-black uppercase tracking-widest bg-accent text-primary hover:bg-accent/90">
                  Zabezpiecz cenę <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 grayscale opacity-50">
            <Zap className="text-white w-5 h-5" />
            <span className="text-lg font-black tracking-tighter uppercase">Perun Core</span>
          </div>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500">© 2024 Veles Digital. Wszelkie prawa zastrzeżone.</p>
          <div className="flex gap-6 text-xs font-bold uppercase tracking-widest text-gray-500">
             <a href="#" className="hover:text-white transition-colors">Privacy</a>
             <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Sparkles(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}
