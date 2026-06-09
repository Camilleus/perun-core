"use client";

import { useToast } from "@/components/ui";
import { CheckCircle2 } from "lucide-react";
import { convertDealToProject } from "@/lib/actions/deal.actions";

export function ConvertButton({ dealId }: { dealId: string }) {
  const { toast } = useToast();

  const handleConvert = async () => {
    try {
      toast("Konwertowanie deala na projekt...", "info");
      await convertDealToProject(dealId);
      // Redirect happens in the action, but if it fails:
    } catch (error) {
      toast("Błąd podczas konwersji deala.", "error");
    }
  };

  return (
    <button
      onClick={handleConvert}
      className="bg-brand-gold text-brand-navy p-1.5 rounded-md hover:bg-brand-gold-dk/80 transition-colors flex items-center gap-1 text-[10px] font-bold uppercase tracking-tighter"
    >
      <CheckCircle2 className="w-3.5 h-3.5" />
      Konwertuj
    </button>
  );
}
