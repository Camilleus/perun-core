import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui";
import { CheckCircle2, Zap, Clock } from "lucide-react";
import { redirectToCheckout } from "@/lib/actions/billing.actions";

export default function PricingPage() {
  const earlyBirdPriceId = process.env.NEXT_PUBLIC_STRIPE_EARLY_BIRD_PRICE_ID || "price_early_bird";
  const regularPriceId = process.env.NEXT_PUBLIC_STRIPE_REGULAR_PRICE_ID || "price_regular";

  return (
    <div className="max-w-5xl mx-auto space-y-12 py-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-black text-white tracking-tighter">Plan, który chroni Twoją marżę</h1>
        <p className="text-gray-400 max-w-2xl mx-auto font-medium">
          Wybierz plan dopasowany do Twojej skali. Early Bird to dożywotnia gwarancja najniższej ceny.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* Early Bird Plan */}
        <Card className="relative bg-gradient-to-br from-brand-navy-dk to-brand-navy-dk border-brand-gold/40 shadow-[0_0_40px_var(--shadow-navy)] overflow-hidden flex flex-col h-full">
          <div className="absolute top-0 right-0 px-4 py-1 bg-brand-gold text-black text-[10px] font-black uppercase tracking-widest rounded-bl-xl">
            Najlepszy wybór
          </div>
          <CardHeader className="p-8">
            <div className="flex items-center gap-2 text-brand-gold mb-4">
               <Zap className="w-5 h-5 fill-brand-gold" />
               <span className="text-[10px] font-black uppercase tracking-widest">Early Bird Plan</span>
            </div>
            <CardTitle className="text-3xl font-black text-white">Oferta Fundatora</CardTitle>
            <CardDescription className="text-gray-500 font-medium">Dla pierwszych 30 firm.</CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-0 flex-grow flex flex-col">
            <div className="mb-8 flex items-end gap-2">
              <span className="text-6xl font-black text-white tracking-tighter">79</span>
              <span className="text-xl font-bold text-gray-500 mb-2">PLN / os. / m-ce</span>
            </div>

            <ul className="space-y-4 mb-10 flex-grow">
              {[
                "Wszystkie funkcje Perun Core",
                "Nielimitowana liczba projektów",
                "Gwarancja ceny przez 12 m-cy",
                "Importy kosztów (CSV/XLS)",
                "Status Early Bird w systemie",
                "Priorytetowe wsparcie 1-na-1"
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-medium text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-brand-gold" />
                  {feature}
                </li>
              ))}
            </ul>

            <form action={redirectToCheckout.bind(null, earlyBirdPriceId)}>
              <Button type="submit" className="w-full py-6 bg-brand-gold text-black hover:scale-[1.02] transition-transform font-black uppercase tracking-widest text-xs">
                Zablokuj cenę Early Bird
              </Button>
            </form>
            <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-gray-600 font-bold uppercase tracking-widest">
               <Clock className="w-3 h-3" /> Zostało 18 / 30 miejsc
            </div>
          </CardContent>
        </Card>

        {/* Regular Plan */}
        <Card className="bg-brand-navy-dk border-white/5 flex flex-col h-full opacity-80 hover:opacity-100 transition-opacity">
          <CardHeader className="p-8">
            <div className="flex items-center gap-2 text-gray-500 mb-4">
               <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Regular Plan</span>
            </div>
            <CardTitle className="text-3xl font-black text-white">Standard</CardTitle>
            <CardDescription className="text-gray-500 font-medium">Standardowa cena po zakończeniu fazy Early Bird.</CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-0 flex-grow flex flex-col">
            <div className="mb-8 flex items-end gap-2">
              <span className="text-6xl font-black text-white tracking-tighter">149</span>
              <span className="text-xl font-bold text-gray-500 mb-2">PLN / os. / m-ce</span>
            </div>

            <ul className="space-y-4 mb-10 flex-grow">
              {[
                "Wszystkie funkcje Perun Core",
                "Nielimitowana liczba projektów",
                "Wsparcie standardowe",
                "Importy kosztów",
                "Baza wiedzy i tutoriale"
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-medium text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-gray-600" />
                  {feature}
                </li>
              ))}
            </ul>

            <form action={redirectToCheckout.bind(null, regularPriceId)}>
              <Button type="submit" variant="outline" className="w-full py-6 border-white/10 hover:bg-white/5 font-black uppercase tracking-widest text-xs">
                Wybierz Standard
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="bg-brand-navy/10 border border-brand-navy/20 rounded-[2rem] p-8 text-center max-w-3xl mx-auto">
         <p className="text-sm font-medium text-gray-400">
           Masz więcej niż 20 użytkowników? <a href="mailto:kontakt@veles.digital" className="text-brand-gold hover:underline font-bold">Skontaktuj się z nami</a> po ofertę Enterprise z wdrożeniem dedykowanym.
         </p>
      </div>
    </div>
  );
}
