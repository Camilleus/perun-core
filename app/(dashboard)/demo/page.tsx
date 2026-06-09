import { createClient } from '@/lib/supabase/server';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { Alert as AlertType, Risk as RiskType } from '@/types';
import {
  BarChart3,
  TrendingUp,
  AlertTriangle,
  ShieldCheck,
  Zap,
  ChevronRight,
  ArrowUpRight
} from 'lucide-react';
import Link from 'next/link';

export default async function DemoPage() {
  const supabase = await createClient();

  // Fetch demo projects (those starting with Demo:)
  const { data: projects } = await supabase
    .from('projects')
    .select('*, risks(*), alerts(*)')
    .ilike('name', 'Demo:%')
    .order('created_at', { ascending: false });

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-[10px] font-black uppercase tracking-widest mb-4">
             <Zap className="w-3 h-3 fill-brand-gold" /> Tryb Prezentacyjny
           </div>
           <h1 className="text-4xl font-black tracking-tighter text-white">Przegląd Możliwości Perun Core</h1>
           <p className="text-gray-500 font-medium text-lg mt-2">Zobacz jak chronimy marżę na przykładzie realnych scenariuszy.</p>
        </div>
        <Link href="/projects" className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl text-sm font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2">
          Wróć do projektów <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {projects?.map((project) => {
          const burnPct = (project.cost_actual_pln / project.budget_planned_pln) * 100;
          const isAtRisk = burnPct > 90;

          return (
            <Card key={project.id} className="bg-brand-navy-dk/40 border-white/5 shadow-2xl relative overflow-hidden group">
               {/* Decorative Gradient Background */}
               <div className={isAtRisk ? "absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-[60px]" : "absolute top-0 right-0 w-32 h-32 bg-green-500/5 blur-[60px]"} />

               <CardHeader className="border-b border-white/5 p-8">
                  <div className="flex justify-between items-start mb-6">
                    <h2 className="text-2xl font-black tracking-tight text-white">{project.name}</h2>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${isAtRisk ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-green-500/10 text-green-500 border border-green-500/20'}`}>
                       {isAtRisk ? 'At Risk' : 'Healthy'}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                       <span className="text-xs font-black uppercase text-gray-500 tracking-widest">Margin Bar</span>
                       <span className={`text-sm font-black ${isAtRisk ? 'text-red-500' : 'text-green-500'}`}>
                          {burnPct.toFixed(1)}% zużycia
                       </span>
                    </div>
                    <div className="w-full h-4 bg-white/5 rounded-full overflow-hidden border border-white/5">
                       <div
                         className={`h-full transition-all duration-1000 ${isAtRisk ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-gradient-to-r from-green-500 to-brand-gold'}`}
                         style={{ width: `${Math.min(burnPct, 100)}%` }}
                       />
                    </div>
                    <div className="flex justify-between text-[10px] font-bold text-gray-600">
                       <span>Koszty: {new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(project.cost_actual_pln)}</span>
                       <span>Budżet: {new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(project.budget_planned_pln)}</span>
                    </div>
                  </div>
               </CardHeader>

               <CardContent className="p-8 space-y-8">
                  {/* Alerts Section */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
                       <AlertTriangle className="w-4 h-4" /> Aktywne Alerty
                    </h3>
                    <div className="space-y-3">
                      {project.alerts?.length > 0 ? (project.alerts as AlertType[]).map(alert => (
                        <div key={alert.id} className={`p-4 rounded-xl border ${alert.severity === 'high' ? 'bg-red-500/5 border-red-500/20 text-red-200' : 'bg-orange-500/5 border-orange-500/20 text-orange-200'} text-sm font-medium`}>
                           <span className="font-black block uppercase text-[10px] mb-1">Alert Systemowy</span>
                           {alert.message}
                        </div>
                      )) : (
                        <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/10 text-green-500 text-sm flex items-center gap-2">
                           <ShieldCheck className="w-4 h-4" /> Brak krytycznych zagrożeń
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Risk Register Section */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
                       <TrendingUp className="w-4 h-4" /> Risk Register
                    </h3>
                    <div className="bg-white/5 border border-white/5 rounded-xl overflow-hidden">
                       <table className="w-full text-left text-xs">
                         <thead className="bg-white/5 border-b border-white/5">
                            <tr>
                               <th className="px-4 py-3 font-black uppercase tracking-tighter">Ryzyko</th>
                               <th className="px-4 py-3 font-black uppercase tracking-tighter">Impact</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-white/5">
                            {(project.risks as any[])?.map(risk => (
                              <tr key={risk.id} className="hover:bg-white/5 transition-colors">
                                 <td className="px-4 py-3 text-white font-medium">{risk.description}</td>
                                 <td className="px-4 py-3 font-black text-brand-gold">{risk.impact}</td>
                              </tr>
                            ))}
                            {(!project.risks || project.risks.length === 0) && (
                              <tr>
                                <td colSpan={2} className="px-4 py-6 text-center text-gray-600 font-bold uppercase tracking-widest text-[10px]">Brak zarejestrowanych ryzyk</td>
                              </tr>
                            )}
                         </tbody>
                       </table>
                    </div>
                  </div>

                  {/* AI Copilot Highlight */}
                  <div className="p-6 rounded-2xl bg-brand-navy border border-brand-gold/30 shadow-[0_0_30px_var(--shadow-navy)] group-hover:scale-[1.02] transition-transform">
                    <div className="flex items-center gap-2 text-brand-gold text-[10px] font-black uppercase tracking-widest mb-3">
                       <Zap className="w-4 h-4 fill-brand-gold" /> AI Co-Pilot Insight
                    </div>
                    <p className="text-white text-sm font-bold leading-relaxed italic">
                      {isAtRisk
                        ? `"Wykryłem anomalie w kosztach materiałów (marmur). Sugeruję wstrzymanie zakupów w etapie 'Wykończenie' do czasu renegocjacji z dostawcą."`
                        : `"Budżet projektu jest stabilny. Marża na poziomie 35% jest bezpieczna. Sugeruję utrzymanie obecnego tempa prac."`}
                    </p>
                  </div>
               </CardContent>
            </Card>
          );
        })}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-brand-navy-dk to-brand-navy border border-brand-gold/20 rounded-[3rem] p-12 text-center space-y-8 shadow-2xl relative overflow-hidden">
         <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-gold/10 blur-[100px] rounded-full" />
         <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white relative z-10">
           Zacznij chronić swoją <span className="text-brand-gold">marżę już dziś.</span>
         </h2>
         <p className="text-gray-400 font-medium text-xl max-w-2xl mx-auto relative z-10">
           Dołącz do 30 firm, które jako pierwsze zyskują przewagę dzięki technologii Perun Core.
         </p>
         <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
            <Link href="/early-bird" className="px-10 py-5 bg-brand-gold text-black rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-xl flex items-center justify-center gap-2">
              Zajmij miejsce Early Bird <ArrowUpRight className="w-5 h-5" />
            </Link>
         </div>
      </div>
    </div>
  );
}
