'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateRodIntegration(formData: FormData) {
  const supabase = await createClient();

  // Get current profile to identify tenant
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data: profile } = await supabase
    .from('profiles')
    .select('tenant_id')
    .eq('id', user.id)
    .single();

  if (!profile) throw new Error('Profile not found');

  const rodApiKey = formData.get('rodApiKey') as string;
  const disconnect = formData.get('disconnect') === 'true';

  const updateData = disconnect
    ? { rod_api_key: null, rod_connected_at: null }
    : { rod_api_key: rodApiKey, rod_connected_at: new Date().toISOString() };

  const { error } = await supabase
    .from('tenants')
    .update(updateData)
    .eq('id', profile.tenant_id);

  if (error) {
    console.error('Error updating ROD integration:', error);
    throw new Error(error.message);
  }

  revalidatePath('/settings/organization');
}
