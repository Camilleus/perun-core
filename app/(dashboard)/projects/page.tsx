import { LayoutDashboard, MoreVertical, TrendingUp } from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Active Projects</h1>
          <p className="text-gray-400 mt-1">Monitor project execution and margin protection.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Total Active Value"
          value={formatCurrency(1250000)}
          trend="+12%"
          description="from last month"
        />
        <StatsCard
          title="Avg. Project Margin"
          value="64%"
          trend="+5%"
          description="efficiency increase"
        />
        <StatsCard
          title="At Risk Projects"
          value="2"
          trend="Critical"
          description="needs attention"
          isNegative
        />
      </div>

      <div className="bg-brand-navy-lt/10 border border-border rounded-xl overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-xl font-semibold">Current Projects</h2>
          <button className="text-sm text-gray-400 hover:text-white transition-colors">View All</button>
        </div>
        <div className="divide-y divide-border">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-6 flex items-center justify-between hover:bg-white/[0.02] transition-colors group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-navy/20 rounded-lg flex items-center justify-center">
                  <LayoutDashboard className="text-brand-navy w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Project Alpha - {i}</h4>
                  <p className="text-sm text-gray-400">Client: Horizon Ventures</p>
                </div>
              </div>

              <div className="flex items-center gap-12">
                <div className="text-right">
                  <p className="text-xs text-gray-500 uppercase font-medium">Budget</p>
                  <p className="font-medium text-white">{formatCurrency(45000)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 uppercase font-medium">Actual Cost</p>
                  <p className="font-medium text-white">{formatCurrency(12000)}</p>
                </div>
                <div className="w-48 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-gold w-[26%]" />
                </div>
                <button className="p-2 text-gray-500 hover:text-white opacity-0 group-hover:opacity-100 transition-all">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
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
}

function StatsCard({ title, value, trend, description, isNegative }: StatsCardProps) {
  return (
    <div className="bg-brand-navy-lt/10 border border-border rounded-xl p-6">
      <div className="flex justify-between items-start mb-4">
        <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">{title}</p>
        <TrendingUp className={cn("w-4 h-4", isNegative ? "text-red-500" : "text-green-500")} />
      </div>
      <div className="space-y-1">
        <h3 className="text-2xl font-bold">{value}</h3>
        <p className="text-sm flex items-center gap-2">
          <span className={isNegative ? "text-red-500 font-medium" : "text-green-500 font-medium"}>{trend}</span>
          <span className="text-gray-500">{description}</span>
        </p>
      </div>
    </div>
  );
}
