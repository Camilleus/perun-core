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
  const [isConverted, setIsConverted] = useState(false);
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
                   <div className="space-y-1">
                     <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Co sprzedajesz?</label>
                     <Input
                       placeholder="np. Budowa Instalacji Fotowoltaicznej"
                       value={dealTitle}
                       onChange={(e) => setDealTitle(e.target.value)}
                       className="h-14 text-lg bg-white/5 border-white/10 focus:border-brand-gold/50 transition-all"
                     />
                   </div>
                   <div className="space-y-1">
                     <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Za ile (PLN)?</label>
                     <Input
                       type="number"
                       placeholder="np. 150000"
                       value={dealValue}
                       onChange={(e) => setDealValue(e.target.value)}
                       className="h-14 text-lg bg-white/5 border-white/10 focus:border-brand-gold/50 transition-all"
                     />
                   </div>
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
                   <h2 className="text-3xl font-black text-white tracking-tight">Poczuj tę magię</h2>
                   <p className="text-gray-400 text-sm">Kliknij przycisk poniżej, aby zobaczyć jak Deal zamienia się w Projekt.</p>
                </div>

                <div className="relative min-h-[160px] flex items-center justify-center bg-white/5 rounded-[2rem] border border-white/5 overflow-hidden group">
                  {!isConverted ? (
                    <div className="text-center space-y-4 animate-in fade-in zoom-in duration-300">
                      <div className="bg-brand-navy-dk border border-white/10 p-6 rounded-2xl shadow-xl">
                        <div className="flex items-center justify-between mb-4">
                           <span className="text-[10px] font-black uppercase tracking-widest text-brand-gold">Deal: Won</span>
                           <span className="text-white font-bold">150 000 PLN</span>
                        </div>
                        <p className="text-white font-black text-left mb-4">Instalacja PV - Kowalski</p>
                        <Button
                          onClick={() => setIsConverted(true)}
                          className="w-full bg-brand-gold text-black font-black uppercase text-xs tracking-widest h-10 hover:scale-105 transition-all"
                        >
                          Konwertuj na Projekt
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full p-8 animate-in slide-in-from-bottom-4 duration-500">
                       <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-black uppercase text-white">Projekt Aktywny</span>
                          <span className="text-brand-gold font-black">Zysk: 45 000 PLN</span>
                       </div>
                       <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden mb-4 border border-white/5">
                          <div className="w-[70%] h-full bg-gradient-to-r from-green-500 to-brand-gold" />
                       </div>
                       <div className="flex gap-2 items-center text-green-500 text-[10px] font-black uppercase tracking-widest">
                          <CheckCircle2 className="w-3 h-3" /> Budżet zabezpieczony
                       </div>
                    </div>
                  )}

                  {/* Decorative background for the magic moment box */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/5 to-transparent pointer-events-none" />
                </div>

                <div className="grid grid-cols-3 gap-2">
                   <div className="text-center p-2">
                      <BarChart3 className="w-5 h-5 text-brand-gold mx-auto mb-1" />
                      <p className="text-[8px] font-black uppercase text-gray-500">Real-time Margin</p>
                   </div>
                   <div className="text-center p-2">
                      <ShieldCheck className="w-5 h-5 text-brand-gold mx-auto mb-1" />
                      <p className="text-[8px] font-black uppercase text-gray-500">Risk Control</p>
                   </div>
                   <div className="text-center p-2">
                      <Zap className="w-5 h-5 text-brand-gold mx-auto mb-1" />
                      <p className="text-[8px] font-black uppercase text-gray-500">Automation</p>
                   </div>
                </div>

                <Button
                  onClick={handleFinish}
                  disabled={loading || !isConverted}
                  className={cn(
                    "w-full h-14 text-lg font-black uppercase tracking-widest transition-all duration-500",
                    isConverted
                      ? "bg-brand-gold text-black shadow-[0_0_30px_rgba(209,166,96,0.4)] hover:bg-brand-gold-dk/80"
                      : "bg-white/5 text-gray-600 cursor-not-allowed border border-white/5"
                  )}
                >
                  {isConverted ? "Zacznij Zarabiać" : "Najpierw wykonaj konwersję"} <Zap className={cn("ml-2 w-5 h-5", isConverted ? "fill-black" : "fill-gray-600")} />
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
