import { getProjectsWithMargin } from "@/lib/actions/project.actions";
import { getActiveAlerts } from "@/lib/actions/alert.actions";
import { createClient } from "@/lib/supabase/server";
import { formatCurrency, cn } from "@/lib/utils";
import {
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  BarChart3,
  ShieldAlert,
  ArrowRight,
  Zap,
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

export default async function DashboardPage() {
  const projects = await getProjectsWithMargin();
  const alerts = await getActiveAlerts();

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = await supabase.from('profiles').select('tenant_id').eq('id', user?.id).single();
  const { data: tenant } = await supabase.from('tenants').select('*').eq('id', profile?.tenant_id).single();

  const totalMargin = projects.reduce((acc, p) => acc + p.remaining_budget, 0);
  const activeProjectsCount = projects.filter(p => p.status === 'active').length;
  const projectsAtRiskCount = projects.filter(p => p.burn_percentage > 90).length;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      {tenant?.early_bird_until && new Date(tenant.early_bird_until) > new Date() && (
        <div className="bg-brand-gold border border-brand-gold/30 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_0_40px_rgba(209,166,96,0.4)] relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          <div className="flex items-center gap-5 relative z-10">
            <div className="w-14 h-14 bg-brand-navy rounded-2xl flex items-center justify-center shadow-2xl">
              <Zap className="w-8 h-8 text-brand-gold fill-brand-gold animate-pulse" />
            </div>
            <div>
              <p className="text-xl font-black text-brand-navy uppercase tracking-tighter leading-none mb-1">Status Early Bird: Aktywny</p>
              <p className="text-brand-navy/70 font-bold text-sm">Twoja gwarancja ceny <span className="underline decoration-brand-navy/30">79 PLN</span> wygaśnie za {Math.ceil((new Date(tenant.early_bird_until).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} dni.</p>
            </div>
          </div>
          <Link href="/pricing" className="w-full sm:w-auto px-10 py-4 bg-brand-navy text-brand-gold rounded-xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-2xl active:scale-95 relative z-10">
            Zarządzaj subskrypcją
          </Link>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
            <Zap className="w-8 h-8 text-brand-gold fill-brand-gold" />
            Dashboard
          </h1>
          <p className="text-brand-gold/80 font-bold mt-1 text-sm uppercase tracking-wider">
            Perun Core pilnuje, żeby marża, którą sprzedałeś, nie zniknęła podczas realizacji.
          </p>
        </div>
        <div className="flex items-center gap-3">
           <Link
             href="/pipeline"
             className="px-6 py-3 bg-brand-navy text-white rounded-xl font-black uppercase tracking-widest text-xs hover:bg-brand-navy/80 transition-all"
           >
             Nowy Deal
           </Link>
        </div>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-brand-navy-dk border-white/5 hover:border-brand-navy-lt/30 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-brand-navy-lt/5 blur-2xl rounded-full -mr-12 -mt-12 transition-all group-hover:bg-brand-navy-lt/10" />
          <CardHeader className="flex flex-row items-center justify-between pb-2 border-b-0 relative z-10">
            <CardTitle className="text-[10px] font-black uppercase tracking-widest text-gray-500">
              Aktywne Projekty
            </CardTitle>
            <div className="p-2 bg-brand-navy-lt/10 rounded-lg">
              <CheckCircle2 className="w-4 h-4 text-brand-navy-lt" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-4xl font-black text-white tracking-tighter">{activeProjectsCount}</div>
            <div className="flex items-center gap-2 mt-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">W realizacji</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-brand-navy-dk border-brand-gold/10 hover:border-brand-gold/30 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/5 blur-2xl rounded-full -mr-12 -mt-12 transition-all group-hover:bg-brand-gold/10" />
          <CardHeader className="flex flex-row items-center justify-between pb-2 border-b-0 relative z-10">
            <CardTitle className="text-[10px] font-black uppercase tracking-widest text-gray-500">
              Całkowita Marża
            </CardTitle>
            <div className="p-2 bg-brand-gold/10 rounded-lg">
              <TrendingUp className="w-4 h-4 text-brand-gold" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-4xl font-black text-white tracking-tighter">{formatCurrency(totalMargin)}</div>
            <p className="text-[10px] text-brand-gold mt-2 uppercase font-black tracking-widest flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Chroniony Zysk
            </p>
          </CardContent>
        </Card>

        <Card className={cn(
          "bg-brand-navy-dk border-white/5 hover:border-red-500/30 transition-all duration-300 relative overflow-hidden group",
          projectsAtRiskCount > 0 && "border-red-500/30 bg-red-500/[0.02] shadow-[0_0_30px_rgba(239,68,68,0.05)]"
        )}>
          <div className={cn(
            "absolute top-0 right-0 w-24 h-24 blur-2xl rounded-full -mr-12 -mt-12 transition-all",
            projectsAtRiskCount > 0 ? "bg-red-500/10" : "bg-white/5"
          )} />
          <CardHeader className="flex flex-row items-center justify-between pb-2 border-b-0 relative z-10">
            <CardTitle className="text-[10px] font-black uppercase tracking-widest text-gray-500">
              Projekty w Zagrożeniu
            </CardTitle>
            <div className={cn("p-2 rounded-lg", projectsAtRiskCount > 0 ? "bg-red-500/20" : "bg-white/5")}>
              <AlertCircle className={cn("w-4 h-4", projectsAtRiskCount > 0 ? "text-red-500 animate-pulse" : "text-gray-500")} />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className={cn("text-4xl font-black tracking-tighter", projectsAtRiskCount > 0 ? "text-red-500" : "text-white")}>
              {projectsAtRiskCount}
            </div>
            <p className={cn("text-[10px] mt-2 uppercase font-black tracking-widest", projectsAtRiskCount > 0 ? "text-red-500" : "text-gray-500")}>
              {projectsAtRiskCount > 0 ? "Wymagają Natychmiastowej Uwagi" : "Wszystko bezpieczne"}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Projects List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
             <h2 className="text-2xl font-black text-white flex items-center gap-3">
               <BarChart3 className="w-6 h-6 text-brand-gold" />
               Aktywne Projekty
             </h2>
             <Link href="/projects" className="text-xs font-black text-brand-gold hover:text-brand-gold-dk/80 transition-colors flex items-center gap-1 uppercase tracking-widest bg-brand-gold/10 px-3 py-1.5 rounded-full">
               Wszystkie <ArrowRight className="w-3 h-3" />
             </Link>
          </div>

          <div className="grid gap-4">
            {projects.length > 0 ? projects.slice(0, 5).map(project => (
              <Link key={project.id} href={`/projects/${project.id}`} className="block group">
                <Card className={cn(
                  "bg-brand-navy-dk border-white/5 hover:border-brand-gold/30 transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(4,42,82,0.5)] overflow-hidden relative",
                  project.burn_percentage > 90 && "border-red-500/20"
                )}>
                  {/* Decorative glow based on status */}
                  <div className={cn(
                    "absolute top-0 right-0 w-32 h-32 blur-[80px] -mr-16 -mt-16 opacity-20 transition-all",
                    project.burn_percentage > 90 ? "bg-red-500" :
                    project.burn_percentage > 75 ? "bg-yellow-500" : "bg-brand-gold"
                  )} />

                  <CardContent className="p-6 relative z-10">
                   <div className="flex justify-between items-start mb-6">
                      <div className="space-y-1.5">
                         <h3 className="text-xl font-black text-white group-hover:text-brand-gold transition-colors tracking-tight">{project.name}</h3>
                         <div className="flex items-center gap-2">
                           <div className={cn(
                             "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                             project.burn_percentage > 90 ? "bg-red-500/10 text-red-500 border-red-500/20" :
                             project.burn_percentage > 75 ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" :
                             "bg-green-500/10 text-green-500 border-green-500/20"
                           )}>
                             <span className={cn(
                               "w-1.5 h-1.5 rounded-full",
                               project.burn_percentage > 90 ? "bg-red-500 animate-pulse" :
                               project.burn_percentage > 75 ? "bg-yellow-500" : "bg-green-500"
                             )} />
                             {project.burn_percentage > 90 ? "Status: Krytyczny" :
                              project.burn_percentage > 75 ? "Status: Ostrzeżenie" : "Status: Bezpieczny"}
                           </div>
                           <span className="text-[10px] text-gray-500 uppercase font-black tracking-widest bg-white/5 px-2 py-1 rounded-md">Realna Marża: {project.margin_percentage}%</span>
                         </div>
                      </div>
                      <div className="text-right">
                         <div className="flex flex-col items-end">
                            <span className={cn(
                              "font-black text-2xl tracking-tighter leading-none mb-1",
                              project.remaining_budget < 0 ? "text-red-500" : "text-white"
                            )}>
                              {formatCurrency(project.remaining_budget)}
                            </span>
                            <span className="text-[10px] text-gray-500 uppercase font-black tracking-widest flex items-center gap-1">
                              Pozostały Budżet <ChevronRight className="w-3 h-3 text-brand-gold" />
                            </span>
                         </div>
                      </div>
                   </div>

                   <div className="space-y-3">
                      <div className="flex justify-between items-end text-[10px] font-black uppercase tracking-widest">
                        <span className="text-gray-400">Ochrona marży (Burn-rate)</span>
                        <div className="flex items-baseline gap-1">
                           <span className={cn(
                             "text-2xl leading-none font-black tracking-tighter",
                             project.burn_percentage > 90 ? "text-red-500" :
                             project.burn_percentage > 75 ? "text-yellow-500" : "text-brand-gold"
                           )}>{project.burn_percentage}%</span>
                        </div>
                      </div>
                      <div className="h-5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-1">
                         <div
                           className={cn(
                             "h-full rounded-full transition-all duration-1000 ease-out relative",
                             project.burn_percentage > 90 ? "bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]" :
                             project.burn_percentage > 75 ? "bg-yellow-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]" :
                             "bg-brand-gold shadow-[0_0_15px_rgba(209,166,96,0.5)]"
                           )}
                           style={{ width: `${Math.min(100, project.burn_percentage)}%` }}
                         >
                           {/* Shine effect */}
                           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                         </div>
                      </div>
                   </div>
                  </CardContent>
                </Card>
              </Link>
            )) : (
              <div className="bg-brand-navy-dk border border-dashed border-white/10 rounded-2xl p-12 text-center">
                 <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-8 h-8 text-gray-600" />
                 </div>
                 <p className="text-gray-400 font-bold">Brak aktywnych projektów</p>
                 <p className="text-gray-600 text-sm mt-1 mb-6">Przekonwertuj wygranego deala, aby zacząć śledzić marżę.</p>
                 <Link href="/pipeline" className="text-xs font-black text-brand-gold border border-brand-gold/20 px-4 py-2 rounded-lg hover:bg-brand-gold-dk/10 transition-all uppercase tracking-widest">
                   Przejdź do Pipeline
                 </Link>
              </div>
            )}
          </div>
        </div>

        {/* Active Alerts */}
        <div className="space-y-6">
           <h2 className="text-xl font-black text-white flex items-center gap-2">
             <ShieldAlert className="w-5 h-5 text-red-500" />
             Aktywne Alerty
           </h2>

           <div className="space-y-3">
              {alerts.length > 0 ? alerts.slice(0, 5).map(alert => (
                <div
                  key={alert.id}
                  className={cn(
                    "p-4 rounded-xl border-l-4 space-y-1.5 bg-brand-navy-dk border-white/5 transition-all hover:bg-white/[0.05] relative overflow-hidden group",
                    alert.severity === 'critical' ? "border-l-red-500 bg-red-500/[0.03]" :
                    alert.severity === 'high' ? "border-l-brand-gold bg-brand-gold/[0.03]" :
                    "border-l-blue-500 bg-blue-500/[0.03]"
                  )}
                >
                   {alert.severity === 'critical' && (
                     <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/5 blur-xl rounded-full -mr-8 -mt-8" />
                   )}
                   <div className="flex items-center justify-between mb-1 relative z-10">
                      <div className="flex items-center gap-2">
                        {alert.severity === 'critical' ? (
                          <AlertCircle className="w-3 h-3 text-red-500 animate-pulse" />
                        ) : (
                          <ShieldAlert className="w-3 h-3 text-brand-gold" />
                        )}
                        <p className={cn(
                          "text-[9px] font-black uppercase tracking-widest",
                          alert.severity === 'critical' ? "text-red-500" :
                          alert.severity === 'high' ? "text-brand-gold" : "text-blue-500"
                        )}>
                          {alert.type.replace('_', ' ')}
                        </p>
                      </div>
                      <span className="text-[8px] text-gray-600 font-black uppercase tracking-widest">
                        {new Date(alert.created_at).toLocaleDateString('pl-PL')}
                      </span>
                   </div>
                   <p className="text-sm font-bold text-white leading-snug relative z-10 group-hover:text-brand-gold transition-colors">{alert.message}</p>
                </div>
              )) : (
                <div className="bg-brand-navy-dk border border-dashed border-white/10 rounded-2xl p-8 text-center">
                   <CheckCircle2 className="w-8 h-8 text-green-500/20 mx-auto mb-3" />
                   <p className="text-gray-500 font-bold text-sm">Wszystko pod kontrolą</p>
                   <p className="text-gray-600 text-[10px] uppercase tracking-widest font-black mt-1">Brak nowych alertów</p>
                </div>
              )}
           </div>

           {alerts.length > 0 && (
              <div className="p-5 bg-gradient-to-br from-brand-gold/10 to-transparent border border-brand-gold/20 rounded-2xl relative overflow-hidden group">
                 <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
                   <Zap className="w-16 h-16 text-brand-gold fill-brand-gold" />
                 </div>
                 <p className="text-[10px] text-brand-gold font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                   <Zap className="w-3 h-3 fill-brand-gold" />
                   AI Co-Pilot Insight
                 </p>
                 <p className="text-xs text-gray-300 leading-relaxed font-medium">
                   Wykryto {alerts.length} krytycznych punktów zapalnych. Największe ryzyko utraty marży występuje w projekcie <span className="text-white font-bold underline decoration-brand-gold/50 cursor-help">{projects.find(p => p.burn_percentage > 90)?.name || 'aktywnym'}</span>. Zalecamy natychmiastowe wstrzymanie nowych kosztów do czasu rewizji budżetu.
                 </p>
              </div>
           )}
        </div>
      </div>
    </div>
  );
}
