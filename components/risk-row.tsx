'use client';

import { useState } from 'react';
import { updateRisk, deleteRisk } from '@/lib/actions/project.actions';
import { Edit3, Trash2, X, Check, AlertCircle } from 'lucide-react';
import { Risk } from '@/types';
import { Button, Input } from './ui';
import { cn } from '@/lib/utils';

export function RiskRow({ risk }: { risk: Risk }) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleUpdate(formData: FormData) {
    setLoading(true);
    setError(null);
    try {
      const title = formData.get('title') as string;
      const probability = formData.get('probability') as Risk['probability'];
      const impact = formData.get('impact') as Risk['impact'];
      const status = formData.get('status') as Risk['status'];
      const mitigationPlan = formData.get('mitigationPlan') as string;

      const res = await updateRisk(risk.id, {
        title,
        probability,
        impact,
        status,
        mitigation_plan: mitigationPlan
      });

      if (res.success) {
        setIsEditing(false);
      } else {
        setError(res.error);
      }
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this risk?')) return;
    setLoading(true);
    try {
      const res = await deleteRisk(risk.id);
      if (!res.success) {
        setError(res.error);
      }
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'Delete failed');
    } finally {
      setLoading(false);
    }
  }

  if (isEditing) {
    return (
      <tr className="bg-accent/5 transition-colors">
        <td colSpan={3} className="px-4 py-4">
          <form action={handleUpdate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-500">Title</label>
                <Input name="title" defaultValue={risk.title} required />
              </div>
              <div className="grid grid-cols-3 gap-2">
                 <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gray-500">Prob.</label>
                    <select name="probability" defaultValue={risk.probability} className="w-full bg-black border border-border rounded-md px-2 py-1.5 text-xs text-white">
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                 </div>
                 <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gray-500">Impact</label>
                    <select name="impact" defaultValue={risk.impact} className="w-full bg-black border border-border rounded-md px-2 py-1.5 text-xs text-white">
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                 </div>
                 <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gray-500">Status</label>
                    <select name="status" defaultValue={risk.status} className="w-full bg-black border border-border rounded-md px-2 py-1.5 text-xs text-white">
                        <option value="active">Active</option>
                        <option value="mitigated">Mitigated</option>
                        <option value="closed">Closed</option>
                    </select>
                 </div>
              </div>
            </div>
            <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-500">Mitigation Plan</label>
                <textarea
                    name="mitigationPlan"
                    defaultValue={risk.mitigation_plan || ''}
                    className="w-full bg-black border border-border rounded-md px-3 py-2 text-xs text-white min-h-[60px]"
                />
            </div>
            {error && <p className="text-red-500 text-[10px] font-bold italic">{error}</p>}
            <div className="flex justify-end gap-2">
               <button type="button" onClick={() => setIsEditing(false)} className="p-1.5 text-gray-400 hover:text-white transition-colors">
                  <X className="w-4 h-4" />
               </button>
               <button type="submit" disabled={loading} className="p-1.5 text-accent hover:text-accent/80 transition-colors">
                  {loading ? <Check className="w-4 h-4 animate-pulse" /> : <Check className="w-4 h-4" />}
               </button>
            </div>
          </form>
        </td>
      </tr>
    );
  }

  return (
    <tr className="hover:bg-white/[0.02] transition-colors group">
      <td className="px-4 py-4">
        <p className="font-bold text-sm text-white">{risk.title}</p>
        <p className="text-[10px] text-gray-500 italic mt-0.5">{risk.mitigation_plan}</p>
      </td>
      <td className="px-4 py-4">
        <div className="flex flex-col gap-1">
            <span className={cn(
            "w-fit px-2 py-0.5 rounded text-[10px] font-black uppercase",
            risk.impact === 'high' ? "bg-red-500/20 text-red-500" :
            risk.impact === 'medium' ? "bg-accent/20 text-accent" :
            "bg-blue-500/20 text-blue-500"
            )}>
            Impact: {risk.impact}
            </span>
            <span className="text-[8px] text-gray-600 font-black uppercase tracking-tighter">Prob: {risk.probability}</span>
        </div>
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center justify-between">
            <span className={cn(
                "text-xs font-bold capitalize",
                risk.status === 'active' ? "text-yellow-500" : "text-green-500"
            )}>{risk.status}</span>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => setIsEditing(true)} className="p-1 text-gray-500 hover:text-white">
                    <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button onClick={handleDelete} className="p-1 text-gray-500 hover:text-red-500">
                    <Trash2 className="w-3.5 h-3.5" />
                </button>
            </div>
        </div>
      </td>
    </tr>
  );
}
