'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateTenantName, completeOnboarding } from '@/lib/actions/tenant';
import { createDeal } from '@/lib/actions/deal.actions';
import { Button, Input } from '@/components/ui';
import {
  Building2,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function OnboardingWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Step 1 State
  const [companyName, setCompanyName] = useState('');

  // Step 2 State
  const [dealTitle, setDealTitle] = useState('');
  const [dealValue, setDealValue] = useState('');

  async function handleStep1() {
    if (!companyName) return;
    setLoading(true);
    try {
      await updateTenantName(companyName);
      setStep(2);
    } catch (err) {
      const error = err as Error;
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleStep2() {
    if (!dealTitle) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', dealTitle);
      formData.append('value', dealValue);
      // Explicitly ensuring value_planned_pln is captured as 'value' in the formData
      // which is then parsed in createDeal action.
      await createDeal(formData);
      setStep(3);
    } catch (err) {
      const error = err as Error;
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleFinish() {
    setLoading(true);
    try {
      await completeOnboarding();
      router.push('/pipeline');
    } catch (err) {
      const error = err as Error;
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-500">
      <div className="bg-[#0a0a0a] border border-border w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl relative">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
           <div
             className="h-full bg-accent transition-all duration-500 ease-out"
             style={{ width: `${(step / 3) * 100}%` }}
           />
        </div>

        <div className="p-10 space-y-8">
           {step === 1 && (
             <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-6">
                   <Building2 className="w-8 h-8 text-accent" />
                </div>
                <div className="space-y-2">
                   <h2 className="text-3xl font-black text-white tracking-tight">Witaj w Perun Core</h2>
                   <p className="text-gray-400">Zacznijmy od podstaw. Jak nazywa się Twoja firma?</p>
                </div>
                <div className="space-y-4">
                   <Input
                     placeholder="Nazwa Twojej firmy"
                     value={companyName}
                     onChange={(e) => setCompanyName(e.target.value)}
                     className="h-14 text-lg bg-white/5 border-white/10"
                   />
                   <Button
                     onClick={handleStep1}
                     disabled={!companyName || loading}
                     className="w-full h-14 text-lg font-black uppercase tracking-widest"
                   >
                     Dalej <ArrowRight className="ml-2 w-5 h-5" />
                   </Button>
                </div>
             </div>
           )}

           {step === 2 && (
             <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-6">
                   <Briefcase className="w-8 h-8 text-accent" />
                </div>
                <div className="space-y-2">
                   <h2 className="text-3xl font-black text-white tracking-tight">Pierwszy Deal</h2>
                   <p className="text-gray-400">Dodajmy Twoją pierwszą szansę sprzedażową do pipeline&apos;u.</p>
                </div>
                <div className="space-y-4">
                   <Input
                     placeholder="Tytuł projektu / Klient"
                     value={dealTitle}
                     onChange={(e) => setDealTitle(e.target.value)}
                     className="h-14 text-lg bg-white/5 border-white/10"
                   />
                   <Input
                     type="number"
                     placeholder="Szacowana wartość (PLN)"
                     value={dealValue}
                     onChange={(e) => setDealValue(e.target.value)}
                     className="h-14 text-lg bg-white/5 border-white/10"
                   />
                   <Button
                     onClick={handleStep2}
                     disabled={!dealTitle || loading}
                     className="w-full h-14 text-lg font-black uppercase tracking-widest"
                   >
                     Dodaj Deal <Sparkles className="ml-2 w-5 h-5" />
                   </Button>
                </div>
             </div>
           )}

           {step === 3 && (
             <div className="space-y-6 text-center animate-in zoom-in-95 duration-500">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-green-500/50">
                   <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <div className="space-y-2">
                   <h2 className="text-3xl font-black text-white tracking-tight">Gotowe do startu!</h2>
                   <p className="text-gray-400">Twój workspace jest skonfigurowany. Możesz teraz zarządzać pipeline&apos;em i chronić swoją marżę.</p>
                </div>
                <Button
                  onClick={handleFinish}
                  disabled={loading}
                  className="w-full h-14 text-lg font-black uppercase tracking-widest bg-green-600 hover:bg-green-700 text-white"
                >
                  Wejdź do Dashboardu <Zap className="ml-2 w-5 h-5 fill-white" />
                </Button>
             </div>
           )}

           {error && (
             <p className="text-red-500 text-sm font-bold text-center animate-pulse">{error}</p>
           )}
        </div>
      </div>
    </div>
  );
}
