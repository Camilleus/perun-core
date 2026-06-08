import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      {/* Hero */}
      <div className="relative flex flex-col items-center justify-center min-h-[90vh] px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(at_center,#063a69_0%,transparent_70%)] opacity-40" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md mb-8 border border-white/20">
            <span className="text-[#d1a660] text-xl">⚡</span>
            <span className="text-sm font-medium tracking-widest">PERUN CORE</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold tracking-tighter mb-6 leading-[1.1]">
            Chroni Twoją marżę.<br />
            Zanim stracisz pieniądze.
          </h1>

          <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-10">
            Project-First CRM dla firm, które zarabiają na projektach.<br />
            Od deala do faktury — z real-time ochroną marży.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="bg-[#d1a660] hover:bg-[#c08f4a] text-black font-semibold text-lg px-10 py-4 rounded-2xl transition-all active:scale-95"
            >
              Uruchom darmowe demo
            </Link>
            
            <Link
              href="#earlybird"
              className="border border-white/30 hover:bg-white/5 font-semibold text-lg px-10 py-4 rounded-2xl transition-all"
            >
              Early Bird — 79 zł/mies
            </Link>
          </div>

          <p className="text-sm text-zinc-500 mt-6">
            Pierwsze 30 firm → cena zablokowana na 12 miesięcy
          </p>
        </div>
      </div>

      {/* Magic Moment */}
      <div className="py-24 bg-zinc-950 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            Jeden magiczny moment zmienia wszystko
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-zinc-900 p-8 rounded-3xl">
              <div className="text-5xl mb-6">1️⃣</div>
              <h3 className="text-2xl font-semibold mb-3">Zamykasz deal</h3>
              <p className="text-zinc-400">W pipeline Perun Core</p>
            </div>
            <div className="bg-zinc-900 p-8 rounded-3xl">
              <div className="text-5xl mb-6">2️⃣</div>
              <h3 className="text-2xl font-semibold mb-3">Convert to Project</h3>
              <p className="text-zinc-400">Automatycznie tworzy Project Board z zaplanowanym budżetem</p>
            </div>
            <div className="bg-zinc-900 p-8 rounded-3xl">
              <div className="text-5xl mb-6">3️⃣</div>
              <h3 className="text-2xl font-semibold mb-3">Widzisz marżę na żywo</h3>
              <p className="text-zinc-400">I dostajesz alert zanim projekt zacznie tracić pieniądze</p>
            </div>
          </div>
        </div>
      </div>

      {/* Early Bird CTA */}
      <div id="earlybird" className="py-24 bg-gradient-to-b from-zinc-950 to-black border-t border-white/10">
        <div className="max-w-xl mx-auto text-center px-6">
          <div className="inline-block px-6 py-2 bg-[#d1a660]/10 text-[#d1a660] rounded-full text-sm font-medium mb-6">
            EARLY BIRD — limit 30 firm
          </div>
          
          <h2 className="text-5xl font-bold mb-6">
            Dołącz zanim cena wzrośnie
          </h2>
          
          <p className="text-2xl text-zinc-400 mb-10">
            79–99 zł / użytkownik / miesiąc<br />
            <span className="text-sm text-zinc-500">cena zablokowana na 12 miesięcy</span>
          </p>

          <Link
            href="/dashboard"
            className="inline-block bg-white text-black font-semibold text-xl px-12 py-5 rounded-2xl hover:bg-zinc-200 transition-all active:scale-95"
          >
            Chcę Early Bird →
          </Link>
        </div>
      </div>
    </div>
  );
}