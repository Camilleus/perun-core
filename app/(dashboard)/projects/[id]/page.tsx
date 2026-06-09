import { createClient } from "@/lib/supabase/server";
import { formatCurrency, cn } from "@/lib/utils";
import {
  ArrowLeft,
  BarChart3,
  Edit3,
} from "lucide-react";
import Link from "next/link";
import { getProjectWithMargin, updateStageActualCost } from "@/lib/actions/project.actions";
import { getActiveAlerts } from "@/lib/actions/alert.actions";
import { AICopilot } from "@/components/ai-copilot";
import { AddRiskDialog } from "@/components/add-risk-dialog";
import { RiskRow } from "@/components/risk-row";
import { AlertBanner } from "@/components/alert-banner";
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
              Rozpoczęto {project.start_date ? new Date(project.start_date).toLocaleDateString('pl-PL') : 'N/A'}
            </p>
          </div>
          <div className={cn(
            "px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border shadow-2xl",
            project.status === 'active' ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
          )}>
            {project.status === 'active' ? 'Aktywny' : 'Wstrzymany'}
          </div>
        </div>
      </div>

      {/* Alerts Section */}
      {alerts && alerts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {alerts.map((alert) => (
            <AlertBanner key={alert.id} alert={alert} />
          ))}
        </div>
      )}

      {/* Enhanced Margin Bar Section */}
      <div className="bg-brand-navy-dk border-2 border-white/5 rounded-[2.5rem] p-12 space-y-10 shadow-[0_0_80px_rgba(4,42,82,0.5)] relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:scale-110 transition-transform duration-1000">
           <BarChart3 className="w-40 h-40 text-brand-gold" />
        </div>

        <div className="flex justify-between items-end relative z-10">
          <div>
            <p className="text-xs text-gray-500 uppercase font-black tracking-[0.2em] mb-2">Aktualna Ochrona Marży</p>
            <h2 className={cn(
                "text-7xl font-black transition-colors duration-500 tracking-tighter",
                project.burn_percentage > 100 ? "text-red-600" :
                project.burn_percentage > 90 ? "text-red-500" :
                project.burn_percentage > 75 ? "text-yellow-500" :
                "text-brand-gold"
            )}>{project.margin_percentage}%</h2>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 uppercase font-black tracking-[0.2em] mb-2">Pozostały Budżet</p>
            <p className={cn(
              "text-4xl font-black transition-colors duration-500 tracking-tighter",
              project.remaining_budget < 0 ? "text-red-500" : "text-white"
            )}>{formatCurrency(project.remaining_budget)}</p>
          </div>
        </div>

        <div className="space-y-5 relative z-10">
          <div className="h-12 w-full bg-white/5 rounded-[1.25rem] overflow-hidden flex border-2 border-white/10 p-1.5 shadow-inner">
            <div
              className={cn(
                "h-full rounded-lg transition-all duration-1000 ease-out shadow-lg relative",
                project.burn_percentage > 100 ? "bg-red-600" :
                project.burn_percentage > 90 ? "bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.4)]" :
                project.burn_percentage > 75 ? "bg-yellow-500 shadow-[0_0_20px_rgba(245,158,11,0.4)]" :
                "bg-brand-gold shadow-[0_0_20px_rgba(209,166,96,0.4)]"
              )}
              style={{ width: `${Math.min(100, project.burn_percentage)}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-shimmer" />
            </div>
          </div>
          <div className="flex justify-between text-[11px] font-black uppercase tracking-[0.2em] px-2">
             <span className={cn(
               project.burn_percentage > 75 ? "text-red-400" : "text-gray-500"
             )}>Zużycie: {project.burn_percentage}%</span>
             <span className="text-gray-500 tracking-widest">Limit: {formatCurrency(project.budget_planned_pln)}</span>
          </div>
        </div>
      </div>

      {/* AI Co-Pilot Section */}
      <AICopilot projectId={params.id} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Stages Management */}
        <div className="space-y-6">
          <h3 className="text-2xl font-black text-white flex items-center gap-3 tracking-tight">
             Etapy Projektu
          </h3>
          <div className="space-y-4">
              {(project.project_stages as ProjectStage[]).sort((a, b) => a.order_index - b.order_index).map((stage, i) => (
                  <div key={stage.id} className="bg-card border border-border rounded-2xl p-6 flex items-center justify-between group hover:border-brand-gold-dk/30 transition-all shadow-md">
                      <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-brand-navy/20 flex items-center justify-center font-black text-brand-gold border border-brand-navy/30">
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
                                  className="w-20 bg-brand-navy-dk border border-border rounded-lg px-2 py-1 text-xs outline-none"
                              />
                              <button type="submit" className="p-1.5 bg-brand-navy/50 text-brand-gold rounded-md hover:bg-brand-navy transition-colors">
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
            <h3 className="text-2xl font-black text-white tracking-tight">Rejestr Ryzyk</h3>
            <AddRiskDialog projectId={params.id} />
          </div>
          <div className="bg-brand-navy-dk/50 border border-white/5 rounded-2xl overflow-hidden shadow-md">
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
                  <RiskRow key={risk.id} risk={risk} />
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
