import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { Zap, ShieldCheck, CheckCircle2, ArrowLeft, Clock, HelpCircle, Star, ShieldAlert, TrendingUp, BarChart3 } from "lucide-react";
import Link from "next/link";
import { CheckoutButton } from "@/components/checkout-button";

export default function EarlyBirdPage() {
  return (
    <div className="min-h-screen bg-brand-navy selection:bg-brand-gold selection:text-black text-white font-sans">
      {/* Simple Nav */}
      <nav className="fixed top-0 w-full z-50 bg-brand-navy/80 backdrop-blur-md border-b border-white/5 h-20 flex items-center px-6 justify-between">
        <Link href="/" className="flex items-center gap-2 group text-gray-400 hover:text-brand-gold transition-colors">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="text-xs font-black uppercase tracking-widest">Powrót do strony głównej</span>
        </Link>
        <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-brand-gold fill-brand-gold" />
            <span className="text-lg font-black tracking-tighter uppercase">Perun Core</span>
        </div>
      </nav>

      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div className="space-y-12 animate-in fade-in slide-in-from-left-4 duration-700">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-[10px] font-black uppercase tracking-widest">
                <Clock className="w-4 h-4" /> Oferta Limitowana: 12 / 30 miejsc zajętych
              </div>
              <h1 className="text-6xl md:text-7xl font-black tracking-tighter leading-[0.85]">
                Zostań <span className="text-brand-gold drop-shadow-[0_0_30px_rgba(209,166,96,0.3)]">Fundatorem</span> <br/>
                Perun Core.
              </h1>
              <p className="text-xl text-gray-400 font-medium leading-relaxed max-w-lg">
                Szukamy 30 wizjonerskich firm, które chcą realnie wpłynąć na rozwój narzędzia do ochrony marży i zyskać dożywotnią gwarancję najniższej ceny.
              </p>
            </div>

            <div className="grid gap-6">
               {[
                 { title: "Gwarancja ceny 79-99 PLN", desc: "Zablokuj stawkę na pierwsze 12 miesięcy użytkowania. Bez ukrytych kosztów." },
                 { title: "Status Fundatora", desc: "Twój feedback bezpośrednio kształtuje roadmapę produktu. Masz głos w rozwoju." },
                 { title: "AI Risk Co-Pilot", desc: "Dostęp do zaawansowanych analiz ryzyka i rekomendacji AI w czasie rzeczywistym." },
                 { title: "Priorytetowe Wdrożenie", desc: "Osobisty opiekun, który pomoże Ci zaimportować dane i przeszkoli zespół." }
               ].map((item, i) => (
                 <div key={i} className="flex gap-4 p-6 bg-white/[0.03] border border-white/5 rounded-2xl hover:border-brand-gold/20 transition-all group">
                   <div className="flex-shrink-0 w-10 h-10 bg-brand-gold/10 rounded-xl flex items-center justify-center border border-brand-gold/20 group-hover:scale-110 transition-transform">
                      <CheckCircle2 className="w-5 h-5 text-brand-gold" />
                   </div>
                   <div>
                     <h4 className="font-black text-white mb-1">{item.title}</h4>
                     <p className="text-gray-500 text-sm font-medium">{item.desc}</p>
                   </div>
                 </div>
               ))}
            </div>

            {/* FAQ Section */}
            <div className="space-y-8 pt-10 border-t border-white/5">
               <h3 className="text-2xl font-black tracking-tight flex items-center gap-3">
                 <HelpCircle className="w-6 h-6 text-brand-gold" /> Częste pytania (FAQ)
               </h3>
               <div className="space-y-6">
                  {[
                    { q: "Dlaczego oferta jest limitowana?", a: "Chcemy zapewnić najwyższą jakość wsparcia dla pierwszych użytkowników i blisko z nimi współpracować przy rozwoju funkcji." },
                    { q: "Co się stanie po 12 miesiącach?", a: "Twoja cena pozostanie atrakcyjna. Jako Fundator zawsze otrzymasz najlepsze warunki w porównaniu do standardowego cennika." },
                    { q: "Czy mogę zrezygnować w dowolnym momencie?", a: "Tak, nie stosujemy długoterminowych, wiążących umów. Płacisz miesięcznie i możesz przerwać subskrypcję kiedy chcesz." }
                  ].map((faq, i) => (
                    <div key={i} className="space-y-2">
                       <p className="text-white font-bold">{faq.q}</p>
                       <p className="text-gray-500 text-sm font-medium leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          <div className="sticky top-32 animate-in fade-in slide-in-from-right-4 duration-700">
            <Card className="bg-brand-navy-dk border-brand-gold/20 shadow-[0_0_100px_rgba(4,42,82,0.6)] overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 blur-[80px] rounded-full -mr-32 -mt-32 transition-all group-hover:bg-brand-gold/10" />
              <CardHeader className="p-10 pb-6 relative z-10 border-b border-white/5">
                <CardTitle className="text-3xl font-black flex items-center gap-3 tracking-tight">
                  <Star className="w-8 h-8 text-brand-gold fill-brand-gold" />
                  Dołącz do Early Bird
                </CardTitle>
                <p className="text-gray-500 font-bold mt-4 leading-relaxed">
                  Zajmij jedno z ostatnich 18 miejsc. Skontaktujemy się z Tobą w ciągu 24h, aby uruchomić Twój dostęp.
                </p>
              </CardHeader>
              <CardContent className="p-10 pt-8 relative z-10">
                <div className="bg-brand-gold/10 border border-brand-gold/20 p-6 rounded-2xl mb-8 flex items-center justify-between">
                   <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-brand-gold mb-1">Cena Early Bird</p>
                      <p className="text-3xl font-black text-white tracking-tighter">79 - 99 PLN</p>
                   </div>
                   <div className="text-right">
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Miejsce</p>
                      <p className="text-3xl font-black text-brand-gold tracking-tighter">13 / 30</p>
                   </div>
                </div>
                <CheckoutButton
                  priceId="price_early_bird"
                  className="w-full py-8 bg-brand-gold text-black rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-2xl"
                >
                  Zablokuj cenę Early Bird <Zap className="ml-2 w-4 h-4 fill-current" />
                </CheckoutButton>
                <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest text-center mt-8">Gwarancja najniższej ceny przez 12 miesięcy.</p>
              </CardContent>
            </Card>

            <div className="mt-8 grid grid-cols-3 gap-4">
               <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl text-center">
                  <ShieldAlert className="w-5 h-5 text-red-500 mx-auto mb-2" />
                  <p className="text-[8px] font-black uppercase text-gray-500 tracking-widest">Risk Mgmt</p>
               </div>
               <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl text-center">
                  <TrendingUp className="w-5 h-5 text-green-500 mx-auto mb-2" />
                  <p className="text-[8px] font-black uppercase text-gray-500 tracking-widest">Margin Up</p>
               </div>
               <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl text-center">
                  <BarChart3 className="w-5 h-5 text-brand-gold mx-auto mb-2" />
                  <p className="text-[8px] font-black uppercase text-gray-500 tracking-widest">Real-time Data</p>
               </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-20 border-t border-white/5 bg-brand-navy-dk">
         <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
                <Zap className="w-6 h-6 text-brand-gold fill-brand-gold" />
                <span className="text-lg font-black tracking-tighter uppercase text-white/50">Perun Core</span>
            </div>
            <p className="text-gray-600 text-xs font-bold uppercase tracking-widest">© 2024 Veles Digital. Built with precision in Warsaw.</p>
         </div>
      </footer>
    </div>
  );
}
