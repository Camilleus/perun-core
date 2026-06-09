'use client';

import { useState } from 'react';
import { createRisk } from '@/lib/actions/project.actions';
import { Plus, X, AlertCircle } from 'lucide-react';
import { Button, Input } from './ui';

export function AddRiskDialog({ projectId }: { projectId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    try {
      const res = await createRisk(formData);
      if (res.success) {
        setIsOpen(false);
      } else {
        setError(res.error);
      }
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="text-brand-gold hover:text-brand-gold-dk/80 transition-colors"
      >
        <Plus className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-navy-dk/80 p-4 animate-in fade-in duration-200">
      <div className="bg-brand-navy-dk border border-border w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-black text-white">Add New Risk</h3>
          <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form action={handleSubmit} className="space-y-4">
          <input type="hidden" name="projectId" value={projectId} />

          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Risk Title</label>
            <Input name="title" placeholder="e.g., Material Price Increase" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Probability</label>
              <select
                name="probability"
                className="flex h-10 w-full rounded-md border border-border bg-brand-navy-dk px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Impact</label>
              <select
                name="impact"
                className="flex h-10 w-full rounded-md border border-border bg-brand-navy-dk px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Mitigation Plan</label>
            <textarea
              name="mitigationPlan"
              placeholder="How will we prevent or handle this?"
              className="flex min-h-[100px] w-full rounded-md border border-border bg-brand-navy-dk px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-500 text-xs font-bold bg-red-500/10 p-3 rounded-lg border border-red-500/20">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Save Risk'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
