"use client";

import { useToast, Button, Input } from "@/components/ui";
import { joinWaitlist } from "@/lib/actions/waitlist.actions";
import { useRef } from "react";

export function WaitlistForm() {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    try {
      const result = await joinWaitlist(formData);
      if (result.success) {
        toast("Dziękujemy! Skontaktujemy się z Tobą wkrótce.", "success");
        formRef.current?.reset();
      } else {
        toast(result.error || "Wystąpił błąd podczas zapisu.", "error");
      }
    } catch (error) {
      toast("Wystąpił nieoczekiwany błąd.", "error");
    }
  };

  return (
    <form ref={formRef} action={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Imię i Nazwisko</label>
        <Input name="fullName" placeholder="Jan Kowalski" required className="py-6 bg-white/5 border-white/10 focus:border-brand-gold/50" />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Nazwa Firmy</label>
        <Input name="companyName" placeholder="Veles Construction" required className="py-6 bg-white/5 border-white/10 focus:border-brand-gold/50" />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Adres Email</label>
        <Input name="email" type="email" placeholder="jan@firma.pl" required className="py-6 bg-white/5 border-white/10 focus:border-brand-gold/50" />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Szacowana liczba użytkowników</label>
        <Input name="estimatedUsers" type="number" min="1" defaultValue="1" required className="py-6 bg-white/5 border-white/10 focus:border-brand-gold/50" />
      </div>

      <Button type="submit" className="w-full py-8 bg-brand-gold text-black rounded-xl font-black uppercase tracking-widest text-sm hover:scale-[1.02] transition-all shadow-lg mt-4">
        Dołącz do Early Bird
      </Button>

      <p className="text-[10px] text-gray-600 text-center font-bold uppercase tracking-widest mt-6">
        Nie wymagamy karty kredytowej na tym etapie.
      </p>
    </form>
  );
}
