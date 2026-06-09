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
  Zap,
  ShieldCheck,
  BarChart3,
  MousePointerClick
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-navy-dk/90 backdrop-blur-sm p-4 animate-in fade-in duration-500">
      <div className="bg-brand-navy-dk border border-white/10 w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl relative">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-white/5">
           <div
             className="h-full bg-brand-gold shadow-[0_0_10px_var(--shadow-navy)] transition-all duration-500 ease-out"
             style={{ width: `${(step / 3) * 100}%` }}
           />
        </div>

        <div className="p-10">
           {step === 1 && (
             <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                <div className="w-16 h-16 bg-brand-navy/20 rounded-2xl flex items-center justify-center mb-6">
                   <Building2 className="w-8 h-8 text-brand-gold" />
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
                     className="h-14 text-lg bg-white/5 border-white/10 focus:border-brand-gold/50 transition-all"
                   />
                   <Button
                     onClick={handleStep1}
                     disabled={!companyName || loading}
                     className="w-full h-14 text-lg font-black uppercase tracking-widest bg-brand-navy hover:bg-brand-navy/80"
                   >
                     Dalej <ArrowRight className="ml-2 w-5 h-5" />
                   </Button>
                </div>
             </div>
           )}

           {step === 2 && (
             <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                <div className="w-16 h-16 bg-brand-navy/20 rounded-2xl flex items-center justify-center mb-6">
                   <Briefcase className="w-8 h-8 text-brand-gold" />
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
                     className="h-14 text-lg bg-white/5 border-white/10 focus:border-brand-gold/50 transition-all"
                   />
                   <Input
                     type="number"
                     placeholder="Szacowana wartość (PLN)"
                     value={dealValue}
                     onChange={(e) => setDealValue(e.target.value)}
                     className="h-14 text-lg bg-white/5 border-white/10 focus:border-brand-gold/50 transition-all"
                   />
                   <Button
                     onClick={handleStep2}
                     disabled={!dealTitle || loading}
                     className="w-full h-14 text-lg font-black uppercase tracking-widest bg-brand-navy hover:bg-brand-navy/80"
                   >
                     Dodaj Deal <Sparkles className="ml-2 w-5 h-5" />
                   </Button>
                </div>
             </div>
           )}

           {step === 3 && (
             <div className="space-y-8 animate-in zoom-in-95 duration-500">
                <div className="space-y-2">
                   <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-[10px] font-black uppercase tracking-widest mb-2">
                      <Zap className="w-3 h-3 fill-brand-gold" /> Magic Moment
                   </div>
                   <h2 className="text-3xl font-black text-white tracking-tight">Jak działa magia?</h2>
                   <p className="text-gray-400 text-sm">Twój deal jest już w pipeline. Oto co stanie się później:</p>
                </div>

                <div className="grid gap-4">
                   <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                      <div className="w-10 h-10 rounded-xl bg-brand-gold/20 flex items-center justify-center flex-shrink-0">
                         <MousePointerClick className="w-5 h-5 text-brand-gold" />
                      </div>
                      <div>
                         <p className="text-white font-bold text-sm">Konwersja 1-klinięciem</p>
                         <p className="text-gray-500 text-xs">Gdy wygrasz deal, jednym przyciskiem zamienisz go w aktywny Projekt.</p>
                      </div>
                   </div>

                   <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                      <div className="w-10 h-10 rounded-xl bg-brand-navy/20 flex items-center justify-center flex-shrink-0">
                         <BarChart3 className="w-5 h-5 text-brand-navy" />
                      </div>
                      <div>
                         <p className="text-white font-bold text-sm">Automatyczny Budżet</p>
                         <p className="text-gray-500 text-xs">Wartość deala staje się Twoim limitem wydatków. System pilnuje go za Ciebie.</p>
                      </div>
                   </div>

                   <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                      <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
                         <ShieldCheck className="w-5 h-5 text-green-500" />
                      </div>
                      <div>
                         <p className="text-white font-bold text-sm">Ochrona Marży</p>
                         <p className="text-gray-500 text-xs">Loguj koszty i patrz jak Margin Bar zmienia kolor. System ostrzeże Cię przed stratą.</p>
                      </div>
                   </div>
                </div>

                <Button
                  onClick={handleFinish}
                  disabled={loading}
                  className="w-full h-14 text-lg font-black uppercase tracking-widest bg-brand-gold hover:bg-brand-gold-dk/80 text-black shadow-[0_0_30px_var(--shadow-navy)]"
                >
                  Zacznij Zarabiać <Zap className="ml-2 w-5 h-5 fill-black" />
                </Button>
             </div>
           )}

           {error && (
             <p className="text-red-500 text-sm font-bold text-center mt-4 animate-pulse">{error}</p>
           )}
        </div>
      </div>
    </div>
  );
}
