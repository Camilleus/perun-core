'use client';

import { useState } from 'react';
import { analyzeProjectRisks } from '@/lib/actions/ai.actions';
import { Sparkles, Loader2, AlertTriangle, CheckCircle2, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AIAnalysis {
  summary: string;
  threats: string[];
  recommendations: string[];
  health_score: number;
}

export function AICopilot({ projectId }: { projectId: string }) {
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleAnalyze() {
    setLoading(true);
    try {
      const res = await analyzeProjectRisks(projectId);
      if (res.success) {
        setAnalysis(res.data);
      } else {
        console.error(res.error);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-brand-navy/10 border border-brand-navy/30 rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-navy rounded-lg flex items-center justify-center shadow-lg">
            <Sparkles className="text-brand-gold w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Perun AI Co-Pilot</h3>
            <p className="text-xs text-gray-400">Analiza ryzyka marży w czasie rzeczywistym</p>
          </div>
        </div>
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="bg-brand-navy text-brand-gold px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-brand-navy/80 transition-all disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4 fill-brand-gold" />}
          Analizuj Projekt
        </button>
      </div>

      {analysis && (
        <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-500">
          <div className="p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <div className={cn(
                "w-3 h-3 rounded-full",
                analysis.health_score > 70 ? "bg-green-500" : analysis.health_score > 40 ? "bg-brand-gold" : "bg-red-500"
              )} />
              <span className="text-sm font-bold uppercase tracking-wider text-gray-400">Project Health Score: {analysis.health_score}/100</span>
            </div>
            <p className="text-white font-medium">{analysis.summary}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase tracking-widest text-red-500 flex items-center gap-2">
                <AlertTriangle className="w-3 h-3" /> Zagrożenia
              </h4>
              <ul className="space-y-1">
                {analysis.threats.map((t: string, i: number) => (
                  <li key={i} className="text-sm text-gray-300 flex items-start gap-2 italic">
                    <span className="text-red-500 mt-1">•</span> {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase tracking-widest text-brand-gold flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3" /> Rekomendacje
              </h4>
              <ul className="space-y-1">
                {analysis.recommendations.map((r: string, i: number) => (
                  <li key={i} className="text-sm text-gray-300 flex items-start gap-2 italic">
                    <span className="text-brand-gold mt-1">•</span> {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
