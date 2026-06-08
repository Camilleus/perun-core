import { formatCurrency, cn } from "@/lib/utils";
import { ArrowLeft, BarChart3, Clock, DollarSign, LucideIcon, Edit3 } from "lucide-react";
import Link from "next/link";
import { getProjectWithMargin, updateStageActualCost } from "@/lib/actions/project.actions";
import { ProjectStage } from "@/types";

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = await getProjectWithMargin(params.id);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4">
        <Link
          href="/projects"
          className="text-sm text-gray-400 hover:text-white flex items-center gap-2 transition-colors w-fit"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </Link>
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-bold text-white">{project.name}</h1>
            <p className="text-gray-400 mt-1">
              Started {project.start_date ? new Date(project.start_date).toLocaleDateString() : 'N/A'}
            </p>
          </div>
          <div className={cn(
            "px-3 py-1 rounded-full text-sm font-medium border",
            project.status === 'active' ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
          )}>
            {project.status === 'active' ? 'Active' : 'On Hold'}
          </div>
        </div>
      </div>

      {/* Margin Bar Section */}
      <div className="bg-card border border-border rounded-2xl p-8 space-y-6 shadow-xl">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Current Project Margin</p>
            <h2 className="text-4xl font-black text-accent">{project.margin_percentage}%</h2>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Remaining Budget</p>
            <p className="text-2xl font-bold text-white">{formatCurrency(project.remaining_budget)}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="h-6 w-full bg-white/5 rounded-full overflow-hidden flex border border-white/10 p-1">
            <div
              className="h-full bg-accent rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${Math.min(100, (project.cost_actual_pln / project.budget_planned_pln) * 100)}%` }}
              title="Actual Cost"
            />
          </div>
          <div className="flex justify-between text-xs font-bold uppercase tracking-widest px-1">
            <div className="flex items-center gap-2 text-accent">
              <div className="w-2 h-2 rounded-full bg-accent" />
              Actual Cost: {formatCurrency(project.cost_actual_pln)}
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              Planned Budget: {formatCurrency(project.budget_planned_pln)}
              <div className="w-2 h-2 rounded-full bg-white/10" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DetailCard icon={DollarSign} title="Planned Value" value={formatCurrency(project.budget_planned_pln)} />
        <DetailCard icon={BarChart3} title="Margin Performance" value={`${project.margin_percentage}%`} />
        <DetailCard icon={Clock} title="Status" value={project.status === 'active' ? 'Active' : 'Completed'} />
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-white">Project Stages</h3>
        <div className="grid grid-cols-1 gap-4">
            {(project.project_stages as ProjectStage[]).sort((a, b) => a.order_index - b.order_index).map((stage, i) => (
                <div key={stage.id} className="bg-white/5 border border-border rounded-xl p-6 flex items-center justify-between group hover:bg-white/[0.07] transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-accent border border-primary/30">
                            {i + 1}
                        </div>
                        <div>
                            <h4 className="font-bold text-white text-lg">{stage.name}</h4>
                            <div className="flex items-center gap-2">
                                <span className={cn(
                                    "w-2 h-2 rounded-full",
                                    stage.status === 'done' ? "bg-green-500" : stage.status === 'in_progress' ? "bg-accent animate-pulse" : "bg-gray-600"
                                )} />
                                <p className="text-sm text-gray-500 font-medium capitalize">{stage.status.replace('_', ' ')}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-12">
                        <div className="text-right">
                            <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Allocated</p>
                            <p className="font-bold text-gray-300">{formatCurrency(stage.budget_allocated_pln)}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Actual Cost</p>
                            <p className="font-black text-white text-lg">{formatCurrency(stage.cost_actual_pln)}</p>
                        </div>

                        <form action={async (formData: FormData) => {
                            'use server';
                            const cost = parseFloat(formData.get('cost') as string);
                            await updateStageActualCost(stage.id, cost);
                        }} className="flex items-center gap-2">
                            <input
                                type="number"
                                name="cost"
                                defaultValue={stage.cost_actual_pln}
                                className="w-24 bg-black/50 border border-border rounded px-2 py-1 text-sm focus:border-accent outline-none transition-colors"
                            />
                            <button
                                type="submit"
                                className="bg-primary/50 hover:bg-primary text-accent p-2 rounded-lg transition-colors border border-primary/30"
                                title="Update Cost"
                            >
                                <Edit3 className="w-4 h-4" />
                            </button>
                        </form>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}

interface DetailCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
}

function DetailCard({ icon: Icon, title, value }: DetailCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 flex items-center gap-4 shadow-lg">
      <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/20">
        <Icon className="text-accent w-6 h-6" />
      </div>
      <div>
        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">{title}</p>
        <p className="text-xl font-black text-white">{value}</p>
      </div>
    </div>
  );
}
