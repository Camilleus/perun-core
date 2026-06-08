'use server';

import { createClient } from '@/lib/supabase/server';
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
}
