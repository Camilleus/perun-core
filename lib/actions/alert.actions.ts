'use server';

import { createClient } from '@/lib/supabase/server';

export async function getActiveAlerts(projectId?: string) {
  const supabase = await createClient();

  let query = supabase
    .from('alerts')
    .select('*')
    .eq('is_read', false)
    .order('created_at', { ascending: false });

  if (projectId) {
    query = query.eq('project_id', projectId);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching active alerts:', error);
    return [];
  }

  return data;
}

export async function markAlertAsRead(alertId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('alerts')
    .update({ is_read: true })
    .eq('id', alertId);

  if (error) throw new Error(error.message);
}
