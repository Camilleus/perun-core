import { getProjectsWithMargin } from "@/lib/actions/project.actions";
import { getActiveAlerts } from "@/lib/actions/alert.actions";
import { formatCurrency, cn } from "@/lib/utils";
import {
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  BarChart3,
  ShieldAlert,
  ArrowRight
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
      <div>
        <h1 className="text-3xl font-black text-white tracking-tight">Dashboard</h1>
        <p className="text-gray-400 mt-1">Podsumowanie Twoich projektów i marży.</p>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-[#111111] border-primary/20">
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

        <Card className="bg-[#111111] border-accent/20">
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

        <Card className="bg-[#111111] border-red-500/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2 border-b-0">
            <CardTitle className="text-xs font-black uppercase tracking-widest text-gray-500">
              Projekty w Zagrożeniu
            </CardTitle>
            <div className="p-2 bg-red-500/10 rounded-lg">
              <AlertCircle className="w-4 h-4 text-red-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black text-white">{projectsAtRiskCount}</div>
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
              <Link key={project.id} href={`/projects/${project.id}`} className="block">
                <Card className="bg-[#111111] border-white/5 hover:border-accent/30 transition-all duration-300 group hover:shadow-[0_0_20px_rgba(209,166,96,0.05)]">
                  <CardContent className="p-5">
                   <div className="flex justify-between items-start mb-5">
                      <div className="space-y-1">
                         <h3 className="text-lg font-black text-white group-hover:text-accent transition-colors">{project.name}</h3>
                         <div className="flex items-center gap-2">
                           <span className={cn(
                             "text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest",
                             project.burn_percentage > 90 ? "bg-red-500/10 text-red-500" :
                             project.burn_percentage > 75 ? "bg-accent/10 text-accent" :
                             "bg-green-500/10 text-green-500"
                           )}>
                             {project.burn_percentage > 90 ? "Zagrożony" : "Bezpieczny"}
                           </span>
                           <span className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Marża: {project.margin_percentage}%</span>
                         </div>
                      </div>
                      <div className="text-right">
                         <p className="font-black text-white text-lg leading-tight">{formatCurrency(project.remaining_budget)}</p>
                         <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Pozostała Marża</p>
                      </div>
                   </div>

                   <div className="space-y-2">
                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                        <span className="text-gray-500">Zużycie Budżetu</span>
                        <span className={cn(
                          project.burn_percentage > 90 ? "text-red-500" : "text-gray-400"
                        )}>{project.burn_percentage}%</span>
                      </div>
                      <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 shadow-inner">
                         <div
                           className={cn(
                             "h-full rounded-full transition-all duration-700 ease-out",
                             project.burn_percentage > 90 ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" :
                             project.burn_percentage > 75 ? "bg-yellow-500" :
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
              <div className="bg-[#111111] border border-dashed border-border rounded-2xl p-8 text-center">
                 <p className="text-gray-500 italic text-sm">Brak aktywnych projektów. Dodaj swojego pierwszego deala!</p>
              </div>
            )}
          </div>
        </div>

        {/* Active Alerts */}
        <div className="space-y-4">
           <h2 className="text-xl font-black text-white flex items-center gap-2">
             <ShieldAlert className="w-5 h-5 text-red-500" />
             Aktywne Alerty
           </h2>

           <div className="space-y-3">
              {alerts.length > 0 ? alerts.slice(0, 5).map(alert => (
                <div
                  key={alert.id}
                  className={cn(
                    "p-4 rounded-xl border-l-4 space-y-1 bg-[#111111]",
                    alert.severity === 'critical' ? "border-red-500 bg-red-500/5" :
                    alert.severity === 'high' ? "border-accent bg-accent/5" :
                    "border-blue-500 bg-blue-500/5"
                  )}
                >
                   <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">{alert.type.replace('_', ' ')}</p>
                   <p className="text-xs font-bold text-white leading-tight">{alert.message}</p>
                </div>
              )) : (
                <div className="bg-[#111111] border border-dashed border-border rounded-2xl p-8 text-center">
                   <p className="text-gray-500 italic text-sm">Wszystko pod kontrolą. Brak aktywnych alertów.</p>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
}
