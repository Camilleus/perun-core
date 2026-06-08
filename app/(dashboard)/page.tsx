import { getProjectsWithMargin } from "@/lib/actions/project.actions";
import { getActiveAlerts } from "@/lib/actions/alert.actions";
import { formatCurrency, cn } from "@/lib/utils";
import {
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  BarChart3,
  ShieldAlert,
  ArrowRight,
  Zap
} from "lucide-react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

export default async function DashboardPage() {
  const projects = await getProjectsWithMargin();
  const alerts = await getActiveAlerts();

  const totalMargin = projects.reduce((acc, p) => acc + p.remaining_budget, 0);
  const activeProjectsCount = projects.filter(p => p.status === 'active').length;
  const projectsAtRiskCount = projects.filter(p => p.burn_percentage > 90).length;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
            <Zap className="w-8 h-8 text-accent fill-accent" />
            Dashboard
          </h1>
          <p className="text-gray-400 mt-1">Podsumowanie Twojego workspace&apos;u i ochrony marży.</p>
        </div>
        <div className="flex items-center gap-3">
           <Link
             href="/pipeline"
             className="px-6 py-3 bg-primary text-white rounded-xl font-black uppercase tracking-widest text-xs hover:bg-primary/80 transition-all"
           >
             Nowy Deal
           </Link>
        </div>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-[#111111] border-primary/20 hover:border-primary/40 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2 border-b-0">
            <CardTitle className="text-xs font-black uppercase tracking-widest text-gray-500">
              Aktywne Projekty
            </CardTitle>
            <div className="p-2 bg-primary/20 rounded-lg">
              <CheckCircle2 className="w-4 h-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black text-white">{activeProjectsCount}</div>
            <p className="text-[10px] text-gray-500 mt-2 uppercase font-black tracking-widest">W realizacji</p>
          </CardContent>
        </Card>

        <Card className="bg-[#111111] border-accent/20 hover:border-accent/40 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2 border-b-0">
            <CardTitle className="text-xs font-black uppercase tracking-widest text-gray-500">
              Całkowita Marża
            </CardTitle>
            <div className="p-2 bg-accent/10 rounded-lg">
              <TrendingUp className="w-4 h-4 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black text-white">{formatCurrency(totalMargin)}</div>
            <p className="text-[10px] text-accent mt-2 uppercase font-black tracking-widest">Zaplanowany Zysk</p>
          </CardContent>
        </Card>

        <Card className={cn(
          "bg-[#111111] border-red-500/20 hover:border-red-500/40 transition-colors",
          projectsAtRiskCount > 0 && "border-red-500/50 bg-red-500/5 shadow-[0_0_20px_rgba(239,68,68,0.05)]"
        )}>
          <CardHeader className="flex flex-row items-center justify-between pb-2 border-b-0">
            <CardTitle className="text-xs font-black uppercase tracking-widest text-gray-500">
              Projekty w Zagrożeniu
            </CardTitle>
            <div className="p-2 bg-red-500/10 rounded-lg">
              <AlertCircle className={cn("w-4 h-4", projectsAtRiskCount > 0 ? "text-red-500 animate-pulse" : "text-gray-500")} />
            </div>
          </CardHeader>
          <CardContent>
            <div className={cn("text-4xl font-black", projectsAtRiskCount > 0 ? "text-red-500" : "text-white")}>
              {projectsAtRiskCount}
            </div>
            <p className="text-[10px] text-red-500 mt-2 uppercase font-black tracking-widest">Wymagają Uwagi</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Projects List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
             <h2 className="text-2xl font-black text-white flex items-center gap-3">
               <BarChart3 className="w-6 h-6 text-accent" />
               Aktywne Projekty
             </h2>
             <Link href="/projects" className="text-xs font-black text-accent hover:text-accent/80 transition-colors flex items-center gap-1 uppercase tracking-widest bg-accent/10 px-3 py-1.5 rounded-full">
               Wszystkie <ArrowRight className="w-3 h-3" />
             </Link>
          </div>

          <div className="grid gap-4">
            {projects.length > 0 ? projects.slice(0, 5).map(project => (
              <Link key={project.id} href={`/projects/${project.id}`} className="block group">
                <Card className="bg-[#111111] border-white/5 hover:border-accent/30 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(209,166,96,0.05)]">
                  <CardContent className="p-5">
                   <div className="flex justify-between items-start mb-5">
                      <div className="space-y-1">
                         <h3 className="text-lg font-black text-white group-hover:text-accent transition-colors">{project.name}</h3>
                         <div className="flex items-center gap-2">
                           <span className={cn(
                             "text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest",
                             project.burn_percentage > 90 ? "bg-red-500/10 text-red-500" :
                             project.burn_percentage > 75 ? "bg-yellow-500/10 text-yellow-500" :
                             "bg-green-500/10 text-green-500"
                           )}>
                             {project.burn_percentage > 90 ? "Krytyczny" :
                              project.burn_percentage > 75 ? "Ostrzeżenie" : "Bezpieczny"}
                           </span>
                           <span className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Marża: {project.margin_percentage}%</span>
                         </div>
                      </div>
                      <div className="text-right">
                         <p className={cn(
                           "font-black text-lg leading-tight",
                           project.remaining_budget < 0 ? "text-red-500" : "text-white"
                         )}>
                           {formatCurrency(project.remaining_budget)}
                         </p>
                         <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Pozostała Marża</p>
                      </div>
                   </div>

                   <div className="space-y-2">
                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                        <span className="text-gray-400">Zużycie Budżetu</span>
                        <span className={cn(
                          project.burn_percentage > 90 ? "text-red-500" :
                          project.burn_percentage > 75 ? "text-yellow-500" : "text-accent"
                        )}>{project.burn_percentage}%</span>
                      </div>
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 shadow-inner">
                         <div
                           className={cn(
                             "h-full rounded-full transition-all duration-700 ease-out",
                             project.burn_percentage > 90 ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" :
                             project.burn_percentage > 75 ? "bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.3)]" :
                             "bg-accent shadow-[0_0_10px_rgba(209,166,96,0.3)]"
                           )}
                           style={{ width: `${Math.min(100, project.burn_percentage)}%` }}
                         />
                      </div>
                   </div>
                  </CardContent>
                </Card>
              </Link>
            )) : (
              <div className="bg-[#111111] border border-dashed border-white/10 rounded-2xl p-12 text-center">
                 <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-8 h-8 text-gray-600" />
                 </div>
                 <p className="text-gray-400 font-bold">Brak aktywnych projektów</p>
                 <p className="text-gray-600 text-sm mt-1 mb-6">Przekonwertuj wygranego deala, aby zacząć śledzić marżę.</p>
                 <Link href="/pipeline" className="text-xs font-black text-accent border border-accent/20 px-4 py-2 rounded-lg hover:bg-accent/10 transition-all uppercase tracking-widest">
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
                    "p-4 rounded-xl border-l-4 space-y-1 bg-[#111111] border-white/5 transition-all hover:bg-white/[0.02]",
                    alert.severity === 'critical' ? "border-l-red-500 bg-red-500/5 shadow-[0_0_15px_rgba(239,68,68,0.05)]" :
                    alert.severity === 'high' ? "border-l-accent bg-accent/5" :
                    "border-l-blue-500 bg-blue-500/5"
                  )}
                >
                   <div className="flex items-center justify-between mb-1">
                      <p className={cn(
                        "text-[10px] font-black uppercase tracking-widest",
                        alert.severity === 'critical' ? "text-red-500" :
                        alert.severity === 'high' ? "text-accent" : "text-blue-500"
                      )}>
                        {alert.type.replace('_', ' ')}
                      </p>
                      <span className="text-[8px] text-gray-600 font-black uppercase tracking-widest">
                        {new Date(alert.created_at).toLocaleDateString('pl-PL')}
                      </span>
                   </div>
                   <p className="text-sm font-bold text-white leading-tight">{alert.message}</p>
                </div>
              )) : (
                <div className="bg-[#111111] border border-dashed border-white/10 rounded-2xl p-8 text-center">
                   <CheckCircle2 className="w-8 h-8 text-green-500/20 mx-auto mb-3" />
                   <p className="text-gray-500 font-bold text-sm">Wszystko pod kontrolą</p>
                   <p className="text-gray-600 text-[10px] uppercase tracking-widest font-black mt-1">Brak nowych alertów</p>
                </div>
              )}
           </div>

           {alerts.length > 0 && (
              <div className="p-4 bg-accent/5 border border-accent/10 rounded-xl">
                 <p className="text-[10px] text-accent font-black uppercase tracking-widest mb-1 flex items-center gap-2">
                   <ShieldAlert className="w-3 h-3" />
                   AI Insight
                 </p>
                 <p className="text-[11px] text-gray-400 leading-relaxed">
                   System wykrył {alerts.length} aktywnych alertów. Zalecana rewizja kosztów w projektach o wysokim burn-rate.
                 </p>
              </div>
           )}
        </div>
      </div>
    </div>
  );
}
