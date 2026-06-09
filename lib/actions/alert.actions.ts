'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

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

  const { data: alert } = await supabase
    .from('alerts')
    .select('project_id')
    .eq('id', alertId)
    .single();

  const { error } = await supabase
    .from('alerts')
    .update({ is_read: true })
    .eq('id', alertId);

  if (error) throw new Error(error.message);

  revalidatePath('/');
  if (alert?.project_id) {
    revalidatePath(`/projects/${alert.project_id}`);
  }
}

export async function generateMarginAlerts(projectId: string) {
  const supabase = await createClient();

  const { data: project, error: projectError } = await supabase
    .from('projects')
    .select('tenant_id, budget_planned_pln, cost_actual_pln')
    .eq('id', projectId)
    .single();

  if (projectError || !project) return;

  const totalPlanned = Number(project.budget_planned_pln) || 0;
  const totalActual = Number(project.cost_actual_pln) || 0;
  const burnPct = totalPlanned > 0 ? (totalActual / totalPlanned) * 100 : 0;

  // Clear existing margin alerts for this project
  await supabase
    .from('alerts')
    .delete()
    .eq('project_id', projectId)
    .in('type', ['margin_watch', 'margin_warning', 'margin_critical']);

  if (burnPct > 100) {
    await supabase.from('alerts').insert({
      tenant_id: project.tenant_id,
      project_id: projectId,
      type: 'margin_critical',
      severity: 'high',
      message: `ALARM! Budżet przekroczony. Aktualne zużycie: ${burnPct.toFixed(1)}%. Marża została skonsumowana.`,
    });
  } else if (burnPct > 90) {
    await supabase.from('alerts').insert({
      tenant_id: project.tenant_id,
      project_id: projectId,
      type: 'margin_warning',
      severity: 'medium',
      message: `KRYTYCZNE: Zużycie budżetu wynosi ${burnPct.toFixed(1)}%. Marża na wyczerpaniu!`,
    });
  } else if (burnPct >= 75) {
    await supabase.from('alerts').insert({
      tenant_id: project.tenant_id,
      project_id: projectId,
      type: 'margin_watch',
      severity: 'low',
      message: `UWAGA: Burn-rate osiągnął ${burnPct.toFixed(1)}%. Monitoruj koszty etapu.`,
    });
  }
}
