import { getProjectsWithMargin } from "@/lib/actions/project.actions";
import { getActiveAlerts } from "@/lib/actions/alert.actions";
import { formatCurrency, cn } from "@/lib/utils";
import {
  BarChart3,
  TrendingUp,
  AlertCircle,
  ShieldAlert,
  ChevronRight,
  LayoutDashboard
} from "lucide-react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

export default async function ProjectsPage() {
  const projects = await getProjectsWithMargin();
  const allAlerts = await getActiveAlerts();

  const totalMargin = projects.reduce((acc, p) => acc + p.remaining_budget, 0);
  const avgMargin = projects.length > 0
    ? projects.reduce((acc, p) => acc + p.margin_percentage, 0) / projects.length
    : 0;
  const projectsAtRiskCount = projects.filter(p => p.burn_percentage > 90).length;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-brand-gold" />
            Aktywne Projekty
          </h1>
          <p className="text-gray-400 mt-1 font-medium">Monitoruj realizację i chroń marżę w czasie rzeczywistym.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Wartość w Realizacji"
          value={formatCurrency(projects.reduce((acc, p) => acc + p.budget_planned_pln, 0))}
          trend="+12%"
          description="vs poprzedni miesiąc"
          icon={<TrendingUp className="w-4 h-4 text-brand-gold" />}
        />
        <StatsCard
          title="Średnia Marża"
          value={`${avgMargin.toFixed(1)}%`}
          trend="+5%"
          description="wzrost efektywności"
          icon={<BarChart3 className="w-4 h-4 text-brand-navy-lt" />}
        />
        <StatsCard
          title="Projekty w Zagrożeniu"
          value={projectsAtRiskCount}
          trend="Krytyczne"
          description="wymagają uwagi"
          isNegative={projectsAtRiskCount > 0}
          icon={<AlertCircle className={cn("w-4 h-4", projectsAtRiskCount > 0 ? "text-red-500 animate-pulse" : "text-gray-500")} />}
        />
      </div>

      <div className="bg-brand-navy-dk border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <h2 className="text-xl font-black text-white tracking-tight uppercase tracking-widest text-xs opacity-50">Lista Projektów</h2>
        </div>
        <div className="divide-y divide-white/5">
          {projects.length > 0 ? projects.map((project) => {
            const hasAlerts = allAlerts.some(a => a.project_id === project.id);
            const criticalAlert = allAlerts.find(a => a.project_id === project.id && (a.type === 'margin_critical' || a.severity === 'high'));

            return (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="p-8 flex flex-col md:flex-row md:items-center justify-between hover:bg-white/[0.03] transition-all group cursor-pointer relative"
              >
                {criticalAlert && (
                   <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500 animate-pulse" />
                )}
                <div className="flex items-center gap-6 mb-4 md:mb-0">
                  <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110",
                    project.burn_percentage > 90 ? "bg-red-500/10 text-red-500" : "bg-brand-navy/20 text-brand-gold"
                  )}>
                    <LayoutDashboard className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h4 className="font-black text-xl text-white group-hover:text-brand-gold transition-colors tracking-tight">{project.name}</h4>
                      {hasAlerts && (
                        <div className={cn(
                          "p-1 rounded-full",
                          criticalAlert ? "bg-red-500 animate-pulse" : "bg-brand-gold"
                        )}>
                          <ShieldAlert className="w-3 h-3 text-brand-navy" />
                        </div>
                      )}
                    </div>
                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mt-1">Status: {project.status}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-8 md:gap-12">
                  <div className="text-right">
                    <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Budżet</p>
                    <p className="font-bold text-white">{formatCurrency(project.budget_planned_pln)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Pozostało</p>
                    <p className={cn(
                      "font-bold",
                      project.remaining_budget < 0 ? "text-red-500" : "text-brand-gold"
                    )}>{formatCurrency(project.remaining_budget)}</p>
                  </div>
                  <div className="w-40 space-y-2">
                    <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
                       <span className="text-gray-500">Burn: {project.burn_percentage}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                      <div
                        className={cn(
                          "h-full transition-all duration-1000",
                          project.burn_percentage > 90 ? "bg-red-500" :
                          project.burn_percentage > 75 ? "bg-yellow-500" : "bg-brand-gold"
                        )}
                        style={{ width: `${Math.min(100, project.burn_percentage)}%` }}
                      />
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-brand-gold group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            );
          }) : (
            <div className="p-20 text-center">
              <p className="text-gray-500 font-bold italic">Brak aktywnych projektów w systemie.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface StatsCardProps {
  title: string;
  value: string | number;
  trend: string;
  description: string;
  isNegative?: boolean;
  icon: React.ReactNode;
}

function StatsCard({ title, value, trend, description, isNegative, icon }: StatsCardProps) {
  return (
    <Card className={cn(
      "bg-brand-navy-dk border-white/5 hover:border-brand-navy-lt/30 transition-all duration-300 relative overflow-hidden group",
      isNegative && "border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.05)]"
    )}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b-0">
        <CardTitle className="text-[10px] font-black uppercase tracking-widest text-gray-500">
          {title}
        </CardTitle>
        <div className="p-2 bg-white/5 rounded-lg">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className={cn("text-3xl font-black tracking-tighter", isNegative ? "text-red-500" : "text-white")}>{value}</div>
        <p className="text-[10px] flex items-center gap-2 mt-2">
          <span className={cn("font-black uppercase tracking-widest", isNegative ? "text-red-500" : "text-green-500")}>{trend}</span>
          <span className="text-gray-500 font-bold">{description}</span>
        </p>
      </CardContent>
    </Card>
  );
}
