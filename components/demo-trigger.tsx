"use client";

import { useToast } from "@/components/ui";
import { Zap, Database } from "lucide-react";
import { seedDemoData } from "@/lib/actions/demo.actions";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function DemoTrigger() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSeed = async () => {
    setLoading(true);
    toast("Generowanie danych demonstracyjnych...", "info");
    try {
      const res = await seedDemoData();
      if (res.success) {
        toast("Dane demo wygenerowane pomyślnie!", "success");
        router.push("/demo");
      } else {
        toast(res.error || "Wystąpił błąd", "error");
      }
    } catch (error) {
      toast("Błąd krytyczny połączenia", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-brand-navy border border-brand-gold/30 rounded-2xl shadow-[0_0_20px_rgba(209,166,96,0.1)] hover:scale-[1.02] transition-all cursor-pointer group" onClick={handleSeed}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-brand-gold/20 flex items-center justify-center">
          <Zap className="w-5 h-5 text-brand-gold fill-brand-gold" />
        </div>
        <div>
          <h2 className="text-xl font-black text-white tracking-tight group-hover:text-brand-gold transition-colors">Tryb Demo</h2>
          <p className="text-[10px] font-black uppercase tracking-widest text-brand-gold-dk">Załaduj dane testowe</p>
        </div>
      </div>
      <p className="text-gray-400 text-sm font-medium leading-relaxed">
        Dodaj do swojego konta przykładowe projekty, aby przetestować Margin Bar, Alerty i Risk Register.
      </p>
      <div className="mt-6 flex items-center gap-2 text-brand-gold text-xs font-black uppercase tracking-widest">
        {loading ? "Generowanie..." : "Uruchom demo"} <Database className="w-4 h-4" />
      </div>
    </div>
  );
}
