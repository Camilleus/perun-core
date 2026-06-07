import { formatCurrency } from "@/lib/utils";
import { ArrowLeft, BarChart3, Clock, DollarSign, LucideIcon } from "lucide-react";
import Link from "next/link";

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
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
            <h1 className="text-4xl font-bold text-white">Project Alpha - {params.id}</h1>
            <p className="text-gray-400 mt-1">Horizon Ventures • Started June 1, 2026</p>
          </div>
          <div className="bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-sm font-medium border border-green-500/20">
            On Track
          </div>
        </div>
      </div>

      {/* Margin Bar */}
      <div className="bg-white/5 border border-border rounded-2xl p-8 space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Project Margin</p>
            <h2 className="text-3xl font-bold text-accent">73.3%</h2>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Remaining Budget</p>
            <p className="text-xl font-bold text-white">{formatCurrency(33000)}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="h-4 w-full bg-white/10 rounded-full overflow-hidden flex">
            <div className="h-full bg-accent w-[26.7%]" title="Actual Cost" />
            <div className="h-full bg-primary/40 w-[73.3%]" title="Remaining Margin" />
          </div>
          <div className="flex justify-between text-xs font-medium uppercase tracking-tighter">
            <span className="text-accent">Actual Cost: {formatCurrency(12000)}</span>
            <span className="text-gray-500">Planned Budget: {formatCurrency(45000)}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DetailCard icon={DollarSign} title="Total Invoiced" value={formatCurrency(15000)} />
        <DetailCard icon={Clock} title="Time Elapsed" value="14 Days" />
        <DetailCard icon={BarChart3} title="Forecasted Margin" value="70%" />
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold">Project Stages</h3>
        <div className="grid grid-cols-1 gap-4">
            {['Preparation', 'Execution', 'Closing'].map((stage, i) => (
                <div key={stage} className="bg-white/5 border border-border rounded-xl p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center font-bold text-gray-400">
                            {i + 1}
                        </div>
                        <div>
                            <h4 className="font-semibold">{stage}</h4>
                            <p className="text-sm text-gray-500">{i === 0 ? 'Completed' : i === 1 ? 'In Progress' : 'Pending'}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-8">
                        <div className="text-right">
                            <p className="text-xs text-gray-500 uppercase">Allocated</p>
                            <p className="font-medium">{formatCurrency(15000)}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-gray-500 uppercase">Cost</p>
                            <p className="font-medium text-white">{i === 0 ? formatCurrency(12000) : formatCurrency(0)}</p>
                        </div>
                        <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                            Update Cost
                        </button>
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
    <div className="bg-white/5 border border-border rounded-xl p-6 flex items-center gap-4">
      <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
        <Icon className="text-primary w-6 h-6" />
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
}
