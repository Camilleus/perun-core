'use server';

import { createClient } from '@/lib/supabase/server';
import { Risk } from '@/types';
import { revalidatePath } from 'next/cache';

export async function getProjectWithMargin(projectId: string) {
  const supabase = await createClient();

  const { data: project, error: projectError } = await supabase
    .from('projects')
    .select('*, project_stages(*)')
    .eq('id', projectId)
    .single();

  if (projectError || !project) throw new Error('Project not found');

  const totalPlanned = project.budget_planned_pln || 0;
  const totalActual = project.cost_actual_pln || 0;

  // Calculate Margin
  // Margin = (Planned - Actual) / Planned * 100
  const marginValue = totalPlanned > 0 ? ((totalPlanned - totalActual) / totalPlanned) * 100 : 0;

  return {
    ...project,
    margin_percentage: parseFloat(marginValue.toFixed(1)),
    remaining_budget: totalPlanned - totalActual,
  };
}

export async function updateStageActualCost(stageId: string, actualCost: number) {
  const supabase = await createClient();

  // 1. Update the stage
  const { data: stage, error: stageError } = await supabase
    .from('project_stages')
    .update({
      cost_actual_pln: actualCost,
      status: actualCost > 0 ? 'in_progress' : 'pending'
    })
    .eq('id', stageId)
    .select('project_id')
    .single();

  if (stageError) throw new Error(stageError.message);

  // 2. Recalculate total project cost
  const { data: stages, error: stagesError } = await supabase
    .from('project_stages')
    .select('cost_actual_pln')
    .eq('project_id', stage.project_id);

  if (stagesError) throw new Error(stagesError.message);

  const totalActualCost = stages.reduce((acc, curr) => acc + (curr.cost_actual_pln || 0), 0);

  const { error: projectUpdateError } = await supabase
    .from('projects')
    .update({ cost_actual_pln: totalActualCost })
    .eq('id', stage.project_id);

  if (projectUpdateError) throw new Error(projectUpdateError.message);

  revalidatePath(`/projects/${stage.project_id}`);
  await generateMarginAlerts(stage.project_id);
}

export async function createRisk(formData: FormData) {
  const supabase = await createClient();

  const projectId = formData.get('projectId') as string;
  const title = formData.get('title') as string;
  const probability = formData.get('probability') as string;
  const impact = formData.get('impact') as string;
  const mitigationPlan = formData.get('mitigationPlan') as string;

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data: profile } = await supabase
    .from('profiles')
    .select('tenant_id')
    .eq('id', user.id)
    .single();

  if (!profile) throw new Error('Profile not found');

  const { error } = await supabase.from('risks').insert({
    tenant_id: profile.tenant_id,
    project_id: projectId,
    title,
    probability,
    impact,
    mitigation_plan: mitigationPlan,
  });

  if (error) throw new Error(error.message);

  revalidatePath(`/projects/${projectId}`);
}

export async function updateRisk(riskId: string, updates: Partial<Risk>) {
  const supabase = await createClient();

  const { data: risk, error: fetchError } = await supabase
    .from('risks')
    .select('project_id')
    .eq('id', riskId)
    .single();

  if (fetchError) throw new Error(fetchError.message);

  const { error } = await supabase
    .from('risks')
    .update(updates)
    .eq('id', riskId);

  if (error) throw new Error(error.message);

  revalidatePath(`/projects/${risk.project_id}`);
}

export async function generateMarginAlerts(projectId: string) {
  const supabase = await createClient();

  const project = await getProjectWithMargin(projectId);
  const margin = project.margin_percentage;

  // Clear existing margin alerts for this project
  await supabase
    .from('alerts')
    .delete()
    .eq('project_id', projectId)
    .eq('type', 'margin_drop');

  if (margin < 20) {
    await supabase.from('alerts').insert({
      tenant_id: project.tenant_id,
      project_id: projectId,
      type: 'margin_drop',
      severity: margin < 5 ? 'critical' : 'high',
      message: `Critical margin warning: Current margin is only ${margin}%. Action required immediately.`,
    });
  } else if (margin < 50) {
    await supabase.from('alerts').insert({
      tenant_id: project.tenant_id,
      project_id: projectId,
      type: 'margin_drop',
      severity: 'medium',
      message: `Margin drop warning: Project margin has slipped to ${margin}%.`,
    });
  }
}
