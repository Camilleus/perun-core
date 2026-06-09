import { createClient } from "@/lib/supabase/server";
import { formatCurrency } from "@/lib/utils";
import { ConvertButton } from "@/components/convert-button";
import {
  Plus,
  MoreVertical,
  Calendar,
  Building2,
  CheckCircle2
} from "lucide-react";
import { Deal } from "@/types";

export default async function PipelinePage() {
  const supabase = await createClient();

  const { data: deals, error } = await supabase
    .from('deals')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching deals:', error);
  }

  const stages = [
    { id: 'lead', name: 'Lead' },
    { id: 'negotiation', name: 'Negotiation' },
    { id: 'won', name: 'Won' },
    { id: 'lost', name: 'Lost' }
  ];

  const dealsByStage = stages.reduce((acc, stage) => {
    acc[stage.id] = (deals as Deal[])?.filter(deal => deal.stage === stage.id) || [];
    return acc;
  }, {} as Record<string, Deal[]>);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Sales Pipeline</h1>
          <p className="text-gray-400 mt-1">Manage your active deals and convert them into projects.</p>
        </div>
        <button className="bg-brand-navy text-brand-gold px-4 py-2 rounded-lg font-medium hover:bg-brand-navy/90 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Deal
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stages.map((stage) => (
          <div key={stage.id} className="bg-brand-navy-lt/10 rounded-xl p-4 border border-border min-h-[600px] flex flex-col gap-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-400">{stage.name}</h3>
              <span className="text-xs bg-white/10 px-2.5 py-1 rounded-full text-gray-300 font-medium">
                {dealsByStage[stage.id].length}
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {dealsByStage[stage.id].map((deal) => (
                <DealCard key={deal.id} deal={deal} />
              ))}

              {dealsByStage[stage.id].length === 0 && (
                <div className="border border-dashed border-border rounded-lg p-8 flex flex-col items-center justify-center text-center opacity-50">
                  <p className="text-xs text-gray-500 italic">No deals in this stage</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DealCard({ deal }: { deal: Deal }) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 hover:border-brand-gold-dk/50 transition-all group cursor-pointer shadow-sm">
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-semibold text-white group-hover:text-brand-gold-dk transition-colors leading-tight">
          {deal.title}
        </h4>
        <button className="text-gray-500 hover:text-white transition-colors">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
          <Building2 className="w-3.5 h-3.5" />
          <span className="truncate">{deal.client_name || 'No Client'}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
          <Calendar className="w-3.5 h-3.5" />
          <span>{deal.expected_close_date ? new Date(deal.expected_close_date).toLocaleDateString() : 'No date'}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border/50">
        <span className="font-bold text-brand-gold">
          {formatCurrency(deal.value_planned_pln)}
        </span>

        {deal.stage === 'won' && (
          <ConvertButton dealId={deal.id} />
        )}
      </div>
    </div>
  );
}
