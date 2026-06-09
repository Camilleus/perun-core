import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    quote: "Perun Core pozwolił nam wyłapać nierentowne etapy budowy jeszcze w trakcie ich trwania. Wcześniej dowiadywaliśmy się o stracie po fakcie.",
    author: "Marek Wiśniewski",
    role: "Właściciel, EcoBuild Solutions",
    avatar: "MW"
  },
  {
    quote: "Wreszcie mam jedno miejsce, gdzie widzę realną marżę wszystkich projektów. Dashboard jest niesamowicie czytelny i pomocny w codziennych decyzjach.",
    author: "Anna Kowalska",
    role: "CEO, TechFlow Agency",
    avatar: "AK"
  },
  {
    quote: "Funkcja importu kosztów z CSV oszczędza nam godziny pracy. System sam pilnuje budżetu, a my możemy skupić się na pracy u klienta.",
    author: "Piotr Nowak",
    role: "Dyrektor Operacyjny, SolarInstallers",
    avatar: "PN"
  }
];

export function TestimonialSection({ className }: { className?: string }) {
  return (
    <section className={cn("py-24 relative overflow-hidden", className)}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
            Zaufali nam <span className="text-brand-gold">Liderzy Branży</span>
          </h2>
          <p className="text-gray-500 font-medium max-w-2xl mx-auto text-lg">
            Zobacz, jak firmy projektowe chronią swoją marżę i zwiększają zyski dzięki Perun Core.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-brand-navy-dk/50 backdrop-blur-sm border border-white/5 p-8 rounded-[2rem] hover:border-brand-gold/30 transition-all duration-300 group"
            >
              <Quote className="w-10 h-10 text-brand-gold/20 mb-6 group-hover:text-brand-gold/40 transition-colors" />
              <p className="text-gray-300 font-medium leading-relaxed mb-8 italic">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-gold flex items-center justify-center text-brand-navy font-black text-sm shadow-[0_0_20px_rgba(209,166,96,0.3)]">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-white font-black text-sm">{t.author}</p>
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-brand-navy-lt/10 blur-[100px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-gold/5 blur-[120px] rounded-full" />
    </section>
  );
}
