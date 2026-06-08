'use server';

import { createClient } from '@/lib/supabase/server';
import { Risk, ActionResult } from '@/types';
import { revalidatePath } from 'next/cache';

export async function getProjectsWithMargin() {
  const supabase = await createClient();

  const { data: projects, error } = await supabase
    .from('projects')
    .select('*, project_stages(*)');

  if (error) throw new Error(error.message);

  return projects.map(project => {
    const totalPlanned = Number(project.budget_planned_pln) || 0;
    const totalActual = Number(project.cost_actual_pln) || 0;

    // Calculate Burn %
    const burnPct = totalPlanned > 0 ? (totalActual / totalPlanned) * 100 : 0;

    // Calculate Margin %
    const marginPercentage = totalPlanned > 0 ? ((totalPlanned - totalActual) / totalPlanned) * 100 : 0;

    return {
      ...project,
      margin_percentage: parseFloat(marginPercentage.toFixed(1)),
      burn_percentage: parseFloat(burnPct.toFixed(1)),
      remaining_budget: totalPlanned - totalActual,
    };
  });
}

export async function getProjectWithMargin(projectId: string) {
  const supabase = await createClient();

  const { data: project, error: projectError } = await supabase
    .from('projects')
    .select('*, project_stages(*)')
    .eq('id', projectId)
    .single();

  if (projectError || !project) throw new Error('Project not found');

  const totalPlanned = Number(project.budget_planned_pln) || 0;
  const totalActual = Number(project.cost_actual_pln) || 0;

  // Calculate Burn %
  const burnPct = totalPlanned > 0 ? (totalActual / totalPlanned) * 100 : 0;

  // Calculate Margin %
  const marginPercentage = totalPlanned > 0 ? ((totalPlanned - totalActual) / totalPlanned) * 100 : 0;

  return {
    ...project,
    margin_percentage: parseFloat(marginPercentage.toFixed(1)),
    burn_percentage: parseFloat(burnPct.toFixed(1)),
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

  const totalActualCost = stages.reduce((acc, curr) => acc + (Number(curr.cost_actual_pln) || 0), 0);

  const { error: projectUpdateError } = await supabase
    .from('projects')
    .update({ cost_actual_pln: totalActualCost })
    .eq('id', stage.project_id);

  if (projectUpdateError) throw new Error(projectUpdateError.message);

  revalidatePath(`/projects/${stage.project_id}`);
  await generateMarginAlerts(stage.project_id);
}

export async function createRisk(formData: FormData): Promise<ActionResult<Risk>> {
  try {
    const supabase = await createClient();

    const projectId = formData.get('projectId') as string;
    const title = formData.get('title') as string;
    const probability = formData.get('probability') as Risk['probability'];
    const impact = formData.get('impact') as Risk['impact'];
    const mitigationPlan = formData.get('mitigationPlan') as string;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false, error: 'Not authenticated' };

    const { data: profile } = await supabase
      .from('profiles')
      .select('tenant_id')
      .eq('id', user.id)
      .single();

    if (!profile) return { success: false, error: 'Profile not found' };

    const { data, error } = await supabase.from('risks').insert({
      tenant_id: profile.tenant_id,
      project_id: projectId,
      title,
      probability,
      impact,
      mitigation_plan: mitigationPlan,
      status: 'active'
    }).select().single();

    if (error) return { success: false, error: error.message };

    revalidatePath(`/projects/${projectId}`);
    return { success: true, data };
  } catch (err) {
    const error = err as Error;
    return { success: false, error: error.message || 'An unexpected error occurred' };
  }
}

export async function deleteRisk(riskId: string): Promise<ActionResult<void>> {
  try {
    const supabase = await createClient();

    const { data: risk, error: fetchError } = await supabase
      .from('risks')
      .select('project_id')
      .eq('id', riskId)
      .single();

    if (fetchError) return { success: false, error: fetchError.message };

    const { error } = await supabase
      .from('risks')
      .delete()
      .eq('id', riskId);

    if (error) return { success: false, error: error.message };

    revalidatePath(`/projects/${risk.project_id}`);
    return { success: true, data: undefined };
  } catch (err) {
    const error = err as Error;
    return { success: false, error: error.message || 'An unexpected error occurred' };
  }
}

export async function updateRisk(riskId: string, updates: Partial<Risk>): Promise<ActionResult<Risk>> {
  try {
    const supabase = await createClient();

    const { data: risk, error: fetchError } = await supabase
      .from('risks')
      .select('project_id')
      .eq('id', riskId)
      .single();

    if (fetchError) return { success: false, error: fetchError.message };

    const { data, error } = await supabase
      .from('risks')
      .update(updates)
      .eq('id', riskId)
      .select()
      .single();

    if (error) return { success: false, error: error.message };

    revalidatePath(`/projects/${risk.project_id}`);
    return { success: true, data };
  } catch (err) {
    const error = err as Error;
    return { success: false, error: error.message || 'An unexpected error occurred' };
  }
}

export async function generateMarginAlerts(projectId: string) {
  const supabase = await createClient();

  const project = await getProjectWithMargin(projectId);
  const burnPct = project.burn_percentage;

  // Clear existing margin/budget alerts for this project
  await supabase
    .from('alerts')
    .delete()
    .eq('project_id', projectId)
    .in('type', ['margin_drop', 'budget_overrun']);

  if (burnPct > 100) {
    await supabase.from('alerts').insert({
      tenant_id: project.tenant_id,
      project_id: projectId,
      type: 'budget_overrun',
      severity: 'critical',
      message: `BUDGET OVERRUN! Project has exceeded its planned budget. Current burn: ${burnPct.toFixed(1)}%.`,
    });
  } else if (burnPct > 90) {
    await supabase.from('alerts').insert({
      tenant_id: project.tenant_id,
      project_id: projectId,
      type: 'margin_drop',
      severity: 'high',
      message: `Critical alert: Project burn rate at ${burnPct.toFixed(1)}%. Margin is almost depleted.`,
    });
  } else if (burnPct >= 75) {
    await supabase.from('alerts').insert({
      tenant_id: project.tenant_id,
      project_id: projectId,
      type: 'margin_drop',
      severity: 'medium',
      message: `Warning: Project burn rate has reached ${burnPct.toFixed(1)}%. Monitor costs closely.`,
    });
  }
}
