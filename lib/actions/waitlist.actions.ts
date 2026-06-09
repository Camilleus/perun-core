'use server';

import { createClient } from '@/lib/supabase/server';
import { ActionResult } from '@/types';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const WaitlistSchema = z.object({
  fullName: z.string().min(2, 'Imię i nazwisko jest wymagane'),
  companyName: z.string().min(2, 'Nazwa firmy jest wymagana'),
  email: z.string().email('Niepoprawny adres email'),
  estimatedUsers: z.coerce.number().min(1, 'Liczba użytkowników musi być większa od 0'),
});

export async function joinWaitlist(formData: FormData): Promise<ActionResult> {
  try {
    const supabase = await createClient();

    const validatedFields = WaitlistSchema.safeParse({
      fullName: formData.get('fullName'),
      companyName: formData.get('companyName'),
      email: formData.get('email'),
      estimatedUsers: formData.get('estimatedUsers'),
    });

    if (!validatedFields.success) {
      return {
        success: false,
        error: validatedFields.error.flatten().fieldErrors.email?.[0] || 'Niepoprawne dane w formularzu'
      };
    }

    const { error } = await supabase.from('waitlist_entries').insert({
      full_name: validatedFields.data.fullName,
      company_name: validatedFields.data.companyName,
      email: validatedFields.data.email,
      estimated_users: validatedFields.data.estimatedUsers,
    });

    if (error) {
      console.error('Waitlist error:', error);
      return { success: false, error: 'Nie udało się zapisać. Spróbuj ponownie później.' };
    }

    revalidatePath('/early-bird');
    return { success: true, data: null };
  } catch (err) {
    console.error('Waitlist exception:', err);
    return { success: false, error: 'Wystąpił nieoczekiwany błąd.' };
  }
}
