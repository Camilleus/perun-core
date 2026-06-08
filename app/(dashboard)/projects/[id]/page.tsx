import { createClient } from "@/lib/supabase/server";
import { formatCurrency, cn } from "@/lib/utils";
import {
  ArrowLeft,
  BarChart3,
  Edit3,
  ShieldAlert,
  Plus
} from "lucide-react";
import Link from "next/link";
import { getProjectWithMargin, updateStageActualCost } from "@/lib/actions/project.actions";
import { getActiveAlerts } from "@/lib/actions/alert.actions";
import { AICopilot } from "@/components/ai-copilot";
import { ProjectStage, Alert, Risk } from "@/types";

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = await getProjectWithMargin(params.id);
  const alerts = await getActiveAlerts(params.id) as Alert[];

  const supabase = await createClient();
  const { data: risks } = await supabase
    .from('risks')
    .select('*')
    .eq('project_id', params.id);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col gap-4">
        <Link
          href="/projects"
          className="text-sm text-gray-400 hover:text-white flex items-center gap-2 transition-colors w-fit"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </Link>
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight">{project.name}</h1>
            <p className="text-gray-400 mt-1 font-medium italic">
              Started {project.start_date ? new Date(project.start_date).toLocaleDateString() : 'N/A'}
            </p>
          </div>
          <div className={cn(
            "px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border shadow-lg",
            project.status === 'active' ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
          )}>
            {project.status === 'active' ? 'Active' : 'On Hold'}
          </div>
        </div>
      </div>

      {/* Alerts Section */}
      {alerts && alerts.length > 0 && (
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={cn(
                "p-4 rounded-xl border flex items-center gap-4 animate-pulse",
                alert.severity === 'critical' ? "bg-red-500/10 border-red-500/50 text-red-500" :
                alert.severity === 'high' ? "bg-accent/10 border-accent/50 text-accent" :
                "bg-blue-500/10 border-blue-500/50 text-blue-500"
              )}
            >
              <ShieldAlert className="w-6 h-6 shrink-0" />
              <p className="font-bold text-sm tracking-tight">{alert.message}</p>
            </div>
          ))}
        </div>
      )}

      {/* Enhanced Margin Bar Section */}
      <div className="bg-[#111111] border-2 border-border rounded-3xl p-10 space-y-8 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <BarChart3 className="w-32 h-32 text-accent" />
        </div>

        <div className="flex justify-between items-end relative z-10">
          <div>
            <p className="text-xs text-gray-500 uppercase font-black tracking-[0.2em] mb-1">Current Margin Protection</p>
            <h2 className={cn(
                "text-6xl font-black",
                project.margin_percentage < 20 ? "text-red-500" : "text-accent"
            )}>{project.margin_percentage}%</h2>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 uppercase font-black tracking-[0.2em] mb-1">Available Runway</p>
            <p className="text-3xl font-black text-white">{formatCurrency(project.remaining_budget)}</p>
          </div>
        </div>

        <div className="space-y-4 relative z-10">
          <div className="h-8 w-full bg-white/5 rounded-2xl overflow-hidden flex border-2 border-white/10 p-1.5 shadow-inner">
            <div
              className={cn(
                "h-full rounded-xl transition-all duration-1000 ease-out shadow-lg",
                project.margin_percentage < 20 ? "bg-red-500" : "bg-accent"
              )}
              style={{ width: `${Math.min(100, (project.cost_actual_pln / project.budget_planned_pln) * 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] px-2 text-gray-500">
             <span>Actual Burn</span>
             <span>Budget Cap</span>
          </div>
        </div>
      </div>

      {/* AI Co-Pilot Section */}
      <AICopilot projectId={params.id} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Stages Management */}
        <div className="space-y-6">
          <h3 className="text-2xl font-black text-white flex items-center gap-3">
             Project Stages
          </h3>
          <div className="space-y-4">
              {(project.project_stages as ProjectStage[]).sort((a, b) => a.order_index - b.order_index).map((stage, i) => (
                  <div key={stage.id} className="bg-card border border-border rounded-2xl p-6 flex items-center justify-between group hover:border-accent/30 transition-all shadow-md">
                      <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center font-black text-accent border border-primary/30">
                              {i + 1}
                          </div>
                          <div>
                              <h4 className="font-bold text-white leading-tight">{stage.name}</h4>
                              <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{stage.status}</p>
                          </div>
                      </div>
                      <div className="flex items-center gap-6">
                          <div className="text-right">
                              <p className="font-black text-white">{formatCurrency(stage.cost_actual_pln)}</p>
                          </div>
                          <form action={async (formData: FormData) => {
                              'use server';
                              const cost = parseFloat(formData.get('cost') as string);
                              await updateStageActualCost(stage.id, cost);
                          }} className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <input
                                  type="number"
                                  name="cost"
                                  defaultValue={stage.cost_actual_pln}
                                  className="w-20 bg-black border border-border rounded-lg px-2 py-1 text-xs outline-none"
                              />
                              <button type="submit" className="p-1.5 bg-primary/50 text-accent rounded-md hover:bg-primary transition-colors">
                                  <Edit3 className="w-3.5 h-3.5" />
                              </button>
                          </form>
                      </div>
                  </div>
              ))}
          </div>
        </div>

        {/* Risk Register */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-white">Risk Register</h3>
            <button className="text-accent hover:text-accent/80 transition-colors">
               <Plus className="w-6 h-6" />
            </button>
          </div>
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-md">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-border">
                  <th className="px-4 py-3 text-[10px] font-black uppercase tracking-widest text-gray-500">Risk</th>
                  <th className="px-4 py-3 text-[10px] font-black uppercase tracking-widest text-gray-500">Impact</th>
                  <th className="px-4 py-3 text-[10px] font-black uppercase tracking-widest text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {risks && risks.length > 0 ? (risks as Risk[]).map((risk) => (
                  <tr key={risk.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-4">
                      <p className="font-bold text-sm text-white">{risk.title}</p>
                      <p className="text-[10px] text-gray-500 italic mt-0.5">{risk.mitigation_plan}</p>
                    </td>
                    <td className="px-4 py-4">
                      <span className={cn(
                        "px-2 py-0.5 rounded text-[10px] font-black uppercase",
                        risk.impact === 'high' ? "bg-red-500/20 text-red-500" :
                        risk.impact === 'medium' ? "bg-accent/20 text-accent" :
                        "bg-blue-500/20 text-blue-500"
                      )}>
                        {risk.impact}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                       <span className="text-xs text-gray-400 font-bold capitalize">{risk.status}</span>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={3} className="px-4 py-8 text-center text-gray-500 italic text-sm">
                       No risks identified yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
