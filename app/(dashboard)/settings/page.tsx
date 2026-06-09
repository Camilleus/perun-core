import { DemoTrigger } from "@/components/demo-trigger";

export default function SettingsPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12">
      <div>
        <h1 className="text-4xl font-black tracking-tighter text-white">Ustawienia</h1>
        <p className="text-gray-500 font-medium text-lg mt-2">Zarządzaj swoją firmą i narzędziami Perun Core.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <a href="/settings/organization" className="p-8 bg-card border border-border rounded-3xl hover:border-brand-gold-dk transition-all group shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/5 group-hover:border-brand-gold/30 transition-all">
             <span className="text-xl font-bold text-gray-500 group-hover:text-brand-gold transition-all">Org</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white mb-2 group-hover:text-brand-gold transition-colors">Organizacja</h2>
          <p className="text-gray-500 font-medium text-sm leading-relaxed">Ustawienia profilu firmy, logotyp i parametry domyślne.</p>
        </a>

        {/* Demo Mode Trigger */}
        <DemoTrigger />
      </div>
    </div>
  );
}
