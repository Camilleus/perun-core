import { Button } from "@/components/ui";
import { EarlyBirdBanner } from "@/components/early-bird-banner";
import { TestimonialSection } from "@/components/testimonial-section";
import { CheckoutButton } from "@/components/checkout-button";
import { cn } from "@/lib/utils";
import {
  X,
  Zap,
  ShieldCheck,
  BarChart3,
  ArrowRight,
  MousePointerClick,
  TrendingUp,
  ShieldAlert,
  Users,
  HardHat,
  Lightbulb,
  Factory,
  ChevronRight,
  CheckCircle2,
  Clock,
  ArrowDown
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-hero text-white selection:bg-brand-gold selection:text-black font-sans">
      <EarlyBirdBanner className="fixed top-0 w-full z-[60]" />
      {/* Navigation */}
      <nav className="fixed top-12 w-full z-50 bg-gradient-hero/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <Zap className="w-8 h-8 text-brand-gold fill-brand-gold group-hover:scale-110 transition-transform" />
            <span className="text-xl font-black tracking-tighter uppercase">Perun Core</span>
          </div>
          <div className="hidden md:flex items-center gap-10">
            <a href="#magic-moment" className="text-sm font-bold text-gray-400 hover:text-brand-gold-dk transition-colors">Magic Moment</a>
            <a href="#korzysci" className="text-sm font-bold text-gray-400 hover:text-brand-gold-dk transition-colors">Dla kogo</a>
            <a href="#oferta" className="text-sm font-bold text-gray-400 hover:text-brand-gold-dk transition-colors">Cennik</a>
            <Link href="/login" className="px-6 py-2.5 rounded-full border border-white/10 text-sm font-black uppercase tracking-widest hover:bg-white/5 transition-all">
              Zaloguj
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-32 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
           <div className="absolute top-[10%] left-[5%] w-[50%] h-[50%] bg-brand-navy-lt/20 blur-[140px] rounded-full animate-pulse" />
           <div className="absolute bottom-[5%] right-[5%] w-[40%] h-[40%] bg-brand-gold/10 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="max-w-4xl">
            <Link href="/early-bird" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-gold text-brand-navy text-xs font-black uppercase tracking-widest mb-10 animate-in slide-in-from-bottom-4 duration-500 hover:scale-105 transition-all shadow-[0_0_30px_rgba(209,166,96,0.3)] group">
               <Zap className="w-4 h-4 fill-brand-navy animate-pulse" /> Early Bird – 79–99 zł/mies (limit 30 firm) <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <h1 className="text-6xl md:text-8xl lg:text-[100px] font-black tracking-tighter leading-[0.85] mb-10 animate-in slide-in-from-bottom-6 duration-700">
              Perun Core — CRM, <br/>
              <span className="text-brand-gold drop-shadow-[0_0_30px_rgba(209,166,96,0.3)] text-[0.8em]">który nie kończy się na sprzedaży. Chroni Twoją marżę.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 font-medium leading-relaxed mb-12 max-w-2xl animate-in slide-in-from-bottom-8 duration-900">
              Project-First CRM dla firm, które zarabiają na projektach. <br className="hidden md:block"/>
              Zobacz realną marżę w czasie rzeczywistym i zatrzymaj przecieki budżetu.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 animate-in slide-in-from-bottom-10 duration-1000">
              <Link href="/login" className="px-10 py-6 bg-brand-gold text-black rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-[0_0_50px_var(--shadow-navy)] text-center flex items-center justify-center gap-2">
                Uruchom darmowe demo <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="#early-bird-section" className="px-10 py-6 bg-white/5 border border-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all text-center flex items-center justify-center gap-2">
                Zobacz ofertę Early Bird
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
           <ArrowDown className="w-6 h-6 text-gray-500" />
        </div>
      </section>

      {/* The Magic Moment Section */}
      <section id="magic-moment" className="py-32 bg-gradient-hero/50 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-navy-lt/20 border border-brand-navy-lt/30 text-white text-[10px] font-black uppercase tracking-widest mb-4">
               Flow produktu
            </div>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-6">The Magic Moment</h2>
            <p className="text-gray-500 font-medium max-w-2xl mx-auto text-xl">
              Perun Core zamyka lukę między sprzedażą a realizacją. To tutaj dzieje się magia.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
            {/* Connecting lines for desktop */}
            <div className="hidden lg:block absolute top-1/2 left-[25%] right-[25%] h-px bg-gradient-to-r from-primary/50 via-brand-gold/50 to-green-500/50 -translate-y-1/2 z-0" />

            <div className="relative z-10 space-y-6 text-center lg:text-left">
              <div className="w-20 h-20 bg-brand-navy-lt/20 rounded-[2rem] flex items-center justify-center mx-auto lg:mx-0 border border-brand-navy-lt/30 shadow-[0_0_30px_var(--shadow-navy)]">
                <TrendingUp className="w-10 h-10 text-brand-navy" />
              </div>
              <div>
                <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter">1. New Deal</h3>
                <p className="text-gray-500 leading-relaxed font-medium text-lg">
                  Wyceniasz deal w Pipeline. Już tutaj system pomaga Ci zaplanować bezpieczną marżę.
                </p>
              </div>
            </div>

            <div className="relative z-10 space-y-6 text-center lg:text-left">
              <div className="w-24 h-24 bg-brand-gold rounded-[2.5rem] flex items-center justify-center mx-auto lg:mx-0 border-4 border-brand-navy-dk shadow-[0_0_40px_var(--shadow-navy)] scale-110">
                <Zap className="w-12 h-12 text-black fill-black" />
              </div>
              <div>
                <h3 className="text-3xl font-black mb-4 text-brand-gold uppercase tracking-tighter">2. Convert to Project</h3>
                <p className="text-gray-400 leading-relaxed font-bold text-lg">
                  Magic Moment. Jednym kliknięciem przenosisz obiecany budżet prosto do realizacji projektu.
                </p>
              </div>
            </div>

            <div className="relative z-10 space-y-6 text-center lg:text-left">
              <div className="w-20 h-20 bg-green-500/20 rounded-[2rem] flex items-center justify-center mx-auto lg:mx-0 border border-green-500/30 shadow-[0_0_30px_var(--color-success)]">
                <BarChart3 className="w-10 h-10 text-green-500" />
              </div>
              <div>
                <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter">3. Real-time Margin</h3>
                <p className="text-gray-500 leading-relaxed font-medium text-lg">
                  Koszty są logowane na bieżąco. Ty widzisz margin bar i wiesz, czy projekt zarabia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="korzysci" className="py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <h2 className="text-5xl font-black tracking-tighter mb-12">
                Dla kogo budujemy <br className="hidden md:block"/>
                <span className="text-brand-navy">Perun Core?</span>
              </h2>

              <div className="space-y-10">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                    <HardHat className="w-7 h-7 text-gray-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-white">Budownictwo & Instalacje</h4>
                    <p className="text-gray-500 font-medium">Gdy każdy błąd w kosztorysie materiałów może zjeść Twoją marżę w tydzień.</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                    <Lightbulb className="w-7 h-7 text-gray-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-white">Software Houses & Agencje</h4>
                    <p className="text-gray-500 font-medium">Kiedy projekty Fixed-Price zaczynają "puchnąć" i tracisz kontrolę nad rentownością roboczogodzin.</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                    <Factory className="w-7 h-7 text-gray-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-white">Produkcja na zamówienie</h4>
                    <p className="text-gray-500 font-medium">Gdy musisz wiedzieć dokładnie, ile kosztował każdy etap realizacji zamówienia.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-brand-navy-lt/10 to-brand-gold/5 p-1 rounded-[3rem] border border-white/10 shadow-2xl relative">
               <div className="bg-gradient-hero rounded-[2.9rem] p-10">
                  <div className="inline-flex items-center gap-2 text-red-500 text-xs font-black uppercase tracking-widest mb-6">
                     <ShieldAlert className="w-4 h-4" /> Problemy, które rozwiązujemy
                  </div>
                  <div className="space-y-6">
                    {[
                      { p: "Nie wiem, ile naprawdę zarabiam na projekcie do momentu jego końca.", s: "Real-time Margin Dashboard pokazuje zysk na żywo." },
                      { p: "Pracownicy logują koszty po czasie lub wcale.", s: "Frictionless Cost Capture - dodawanie kosztu trwa 5 sekund." },
                      { p: "Budżet się kończy, a my o tym nie wiemy.", s: "Automatyczne alerty o burn-rate powyżej 75% i 90%." },
                      { p: "Bałagan w Excelach i zgubione faktury.", s: "Centralny Risk Register i historia kosztów przypisana do etapów." }
                    ].map((item, i) => (
                      <div key={i} className="pb-6 border-b border-white/5 last:border-0 last:pb-0">
                         <p className="text-gray-500 text-sm font-medium italic mb-2">"{item.p}"</p>
                         <p className="text-white font-bold flex items-center gap-2">
                           <CheckCircle2 className="w-4 h-4 text-green-500" /> {item.s}
                         </p>
                      </div>
                    ))}
                  </div>
               </div>

               {/* Decorative elements */}
               <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-gold/20 blur-[60px] rounded-full" />
               <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-brand-navy-lt/20 blur-[60px] rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-32 bg-brand-navy-dk/30 relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-6">
              Dlaczego <span className="text-brand-gold">Perun Core?</span>
            </h2>
            <p className="text-gray-500 font-medium max-w-2xl mx-auto text-xl">
              Inne narzędzia kończą pracę tam, gdzie zaczynają się Twoje realne koszty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Excel",
                bad: "Bałagan, błędy w formułach i brak danych na żywo.",
                good: "Centralna baza kosztów i automatyczne marże.",
                icon: "📊"
              },
              {
                name: "HubSpot / CRM",
                bad: "Kończy się na sprzedaży. Nie wiesz, co dzieje się z kasą później.",
                good: "Project-First: Pipeline płynnie przechodzi w realizację.",
                icon: "🤝"
              },
              {
                name: "ClickUp / Tasks",
                bad: "Skupia się na taskach, ignorując finanse i marżę.",
                good: "Każdy etap projektu ma swój budżet i realny koszt.",
                icon: "✅"
              },
              {
                name: "Perun Core",
                bad: null,
                good: "Jedyny system, który chroni marżę w czasie rzeczywistym.",
                icon: "⚡",
                featured: true
              }
            ].map((item, i) => (
              <div
                key={i}
                className={cn(
                  "p-8 rounded-[2.5rem] border transition-all duration-500",
                  item.featured
                    ? "bg-brand-gold border-brand-gold shadow-[0_0_50px_rgba(209,166,96,0.2)] scale-105"
                    : "bg-white/5 border-white/10 hover:border-brand-gold/30"
                )}
              >
                <div className="text-4xl mb-6">{item.icon}</div>
                <h3 className={cn("text-2xl font-black mb-6", item.featured ? "text-brand-navy" : "text-white")}>
                  {item.name}
                </h3>

                <div className="space-y-4">
                  {item.bad && (
                    <div className="flex gap-3">
                      <X className="w-5 h-5 text-red-500 shrink-0" />
                      <p className="text-sm font-medium text-gray-500 italic">{item.bad}</p>
                    </div>
                  )}
                  <div className="flex gap-3">
                    <CheckCircle2 className={cn("w-5 h-5 shrink-0", item.featured ? "text-brand-navy" : "text-brand-gold")} />
                    <p className={cn("text-sm font-bold", item.featured ? "text-brand-navy" : "text-gray-300")}>
                      {item.good}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Jak zacząć Section */}
      <section className="py-32 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-6">Jak zacząć?</h2>
            <p className="text-gray-500 font-medium max-w-2xl mx-auto text-xl">
              Wdrożenie Perun Core zajmuje mniej czasu niż wypicie kawy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Załóż konto",
                desc: "Rejestracja trwa 30 sekund. Nie potrzebujesz karty kredytowej na start."
              },
              {
                step: "02",
                title: "Dodaj pierwszy Deal",
                desc: "Wprowadź nazwę klienta i budżet. To Twój punkt wyjściowy dla marży."
              },
              {
                step: "03",
                title: "Chroń swoją marżę",
                desc: "Konwertuj Deal na Projekt i loguj koszty. System zajmie się resztą."
              }
            ].map((s, i) => (
              <div key={i} className="relative p-10 bg-brand-navy-dk border border-white/5 rounded-[2.5rem] group hover:border-brand-gold/30 transition-all">
                <span className="absolute -top-6 left-10 text-6xl font-black text-brand-gold/10 group-hover:text-brand-gold/20 transition-colors leading-none">
                  {s.step}
                </span>
                <h3 className="text-2xl font-black mb-4 relative z-10">{s.title}</h3>
                <p className="text-gray-500 font-medium relative z-10">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dedicated Early Bird Counter Section */}
      <section id="early-bird-section" className="py-24 bg-brand-gold relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="text-brand-navy max-w-xl">
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-6 leading-none">
                Zostało tylko <br/>
                <span className="text-white drop-shadow-sm">8 z 30 miejsc</span>
              </h2>
              <p className="text-lg font-bold opacity-80 mb-8">
                Dołącz do grona 30 pierwszych firm i zablokuj cenę 79-99 PLN / użytkownik / m-ce na 12 miesięcy.
                To jedyny taki moment, żeby wpłynąć na rozwój narzędzia i chronić marżę najtaniej.
              </p>
              <div className="w-full h-4 bg-brand-navy/10 rounded-full overflow-hidden mb-4 p-1 border border-brand-navy/5">
                 <div className="h-full bg-brand-navy rounded-full shadow-lg" style={{ width: '73%' }} />
              </div>
              <p className="text-xs font-black uppercase tracking-widest opacity-60">Status: 22 firmy już chronią swoją marżę</p>
            </div>
            <Link href="/early-bird" className="px-12 py-8 bg-brand-navy text-brand-gold rounded-[2rem] font-black uppercase tracking-[0.2em] text-lg hover:scale-105 transition-all shadow-2xl flex items-center gap-4 group">
              Zablokuj cenę teraz <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
        {/* Background Patterns */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-navy/5 blur-[80px] rounded-full -translate-x-1/2 translate-y-1/2" />
      </section>

      {/* Testimonials */}
      <TestimonialSection />

      {/* Early Bird / Offer Section */}
      <section id="oferta" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative bg-gradient-to-br from-brand-navy-dk to-brand-navy-dk border border-brand-gold/30 rounded-[4rem] p-12 lg:p-20 overflow-hidden shadow-[0_0_100px_var(--shadow-navy)]">
            <div className="absolute top-0 right-0 w-[50%] h-[100%] bg-brand-gold/5 blur-[120px] rounded-full translate-x-1/2" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
              <div>
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-[10px] font-black uppercase tracking-widest mb-8">
                   <Clock className="w-3 h-3" /> Oferta ograniczona czasowo
                 </div>
                 <h2 className="text-6xl font-black tracking-tighter mb-8 leading-[0.9]">
                    Dołącz jako <br/>
                    <span className="text-brand-gold">Early Bird.</span>
                 </h2>
                 <p className="text-gray-400 font-medium text-xl leading-relaxed mb-10">
                    Szukamy 30 firm, które chcą realnie wpłynąć na rozwój narzędzia i zyskać dożywotnią gwarancję najniższej ceny.
                 </p>

                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                   {[
                     "Dostęp do wszystkich modułów",
                     "Gwarancja ceny przez 12 m-cy",
                     "Priority onboarding & support",
                     "Status Fundatora w systemie",
                     "Brak limitu projektów",
                     "Wsparcie importu danych"
                   ].map((item, i) => (
                     <div key={i} className="flex items-center gap-3">
                       <CheckCircle2 className="w-5 h-5 text-brand-gold" />
                       <span className="text-sm font-bold text-gray-300">{item}</span>
                     </div>
                   ))}
                 </div>
              </div>

              <div className="bg-gradient-hero/50 backdrop-blur-xl border border-white/10 rounded-[3rem] p-10 text-center relative">
                 <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-brand-gold text-black px-6 py-2 rounded-full font-black uppercase tracking-widest text-xs">
                    Najlepszy moment na start
                 </div>

                 <p className="text-gray-500 font-black uppercase tracking-widest text-[10px] mb-6">Abonament miesięczny</p>
                 <div className="flex justify-center items-end gap-2 mb-2">
                    <span className="text-7xl md:text-8xl font-black tracking-tighter text-white">79-99</span>
                    <span className="text-2xl md:text-3xl font-black text-gray-500 mb-2"> PLN</span>
                 </div>
                 <p className="text-brand-gold font-bold text-lg mb-10">za użytkownika / m-ce</p>

                 <div className="space-y-6 mb-10 text-left bg-white/5 p-6 rounded-2xl border border-white/5">
                    <div className="flex justify-between text-xs font-bold text-gray-500">
                       <span>Dostępnych miejsc Early Bird</span>
                       <span className="text-white">8 / 30</span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                       <div className="w-[73%] h-full bg-brand-gold shadow-[0_0_15px_var(--shadow-navy)]" />
                    </div>
                    <p className="text-[10px] text-gray-600 font-bold text-center italic">Zostało tylko 8 wolnych licencji z blokadą ceny na 12 miesięcy.</p>
                 </div>

                 <CheckoutButton priceId="price_early_bird" className="block w-full py-6 bg-brand-gold text-black rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-[1.02] transition-all shadow-lg">
                   Zajmij miejsce w kolejce
                 </CheckoutButton>
                 <p className="text-[10px] text-gray-600 mt-6 font-bold uppercase tracking-widest tracking-widest">Bez kart kredytowej na start</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-20">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Zap className="w-8 h-8 text-brand-gold fill-brand-gold" />
                <span className="text-2xl font-black tracking-tighter uppercase">Perun Core</span>
              </div>
              <p className="text-gray-500 max-w-xs font-medium">
                Chronimy marżę tam, gdzie Excel i tradycyjne systemy ERP zawodzą.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-16">
              <div className="space-y-6">
                <h5 className="font-black uppercase tracking-widest text-[10px] text-gray-400">Produkt</h5>
                <ul className="space-y-4 text-sm font-bold text-gray-600">
                  <li><a href="#magic-moment" className="hover:text-brand-gold-dk transition-colors">Jak to działa</a></li>
                  <li><a href="#korzysci" className="hover:text-brand-gold-dk transition-colors">Korzyści</a></li>
                  <li><a href="#oferta" className="hover:text-brand-gold-dk transition-colors">Cennik</a></li>
                </ul>
              </div>
              <div className="space-y-6">
                <h5 className="font-black uppercase tracking-widest text-[10px] text-gray-400">Legal</h5>
                <ul className="space-y-4 text-sm font-bold text-gray-600">
                  <li><a href="#" className="hover:text-brand-gold-dk transition-colors">Polityka prywatności</a></li>
                  <li><a href="#" className="hover:text-brand-gold-dk transition-colors">Regulamin</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/5 pt-12">
            <p className="text-gray-600 text-xs font-bold">© 2024 Veles Digital. Built with precision in Warsaw.</p>
            <div className="flex gap-6">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-brand-gold-dk hover:border-brand-gold-dk/50 transition-all">
                 <Users className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-brand-gold-dk hover:border-brand-gold-dk/50 transition-all">
                 <ShieldAlert className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
