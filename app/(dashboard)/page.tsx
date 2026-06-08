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
        <Card className="bg-[#111111] border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-black uppercase tracking-widest text-gray-500">
              Aktywne Projekty
            </CardTitle>
            <CheckCircle2 className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-white">{activeProjectsCount}</div>
            <p className="text-[10px] text-gray-500 mt-1 uppercase font-bold">W trakcie realizacji</p>
          </CardContent>
        </Card>

        <Card className="bg-[#111111] border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-black uppercase tracking-widest text-gray-500">
              Całkowita Marża
            </CardTitle>
            <TrendingUp className="w-4 h-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-white">{formatCurrency(totalMargin)}</div>
            <p className="text-[10px] text-gray-500 mt-1 uppercase font-bold text-accent">Chroniona przez Perun</p>
          </CardContent>
        </Card>

        <Card className="bg-[#111111] border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-black uppercase tracking-widest text-gray-500">
              Projekty w Zagrożeniu
            </CardTitle>
            <AlertCircle className="w-4 h-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-white">{projectsAtRiskCount}</div>
            <p className="text-[10px] text-gray-500 mt-1 uppercase font-bold text-red-500">Wymagają uwagi</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Projects List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
             <h2 className="text-xl font-black text-white flex items-center gap-2">
               <BarChart3 className="w-5 h-5 text-accent" />
               Aktywne Projekty
             </h2>
             <Link href="/projects" className="text-xs font-black text-accent hover:underline flex items-center gap-1 uppercase tracking-widest">
               Zobacz wszystkie <ArrowRight className="w-3 h-3" />
             </Link>
          </div>

          <div className="space-y-3">
            {projects.length > 0 ? projects.slice(0, 5).map(project => (
              <Link key={project.id} href={`/projects/${project.id}`}>
                <div className="bg-[#111111] border border-border/50 rounded-2xl p-4 hover:border-accent/50 transition-all group">
                   <div className="flex justify-between items-start mb-3">
                      <div>
                         <h3 className="font-bold text-white group-hover:text-accent transition-colors">{project.name}</h3>
                         <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Margin: {project.margin_percentage}%</p>
                      </div>
                      <div className="text-right">
                         <p className="font-black text-white text-sm">{formatCurrency(project.remaining_budget)}</p>
                         <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Remaining</p>
                      </div>
                   </div>

                   <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all duration-500",
                          project.burn_percentage > 90 ? "bg-red-500" :
                          project.burn_percentage > 75 ? "bg-yellow-500" :
                          "bg-accent"
                        )}
                        style={{ width: `${Math.min(100, project.burn_percentage)}%` }}
                      />
                   </div>
                </div>
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
