'use server';

import { createClient } from '@/lib/supabase/server';
import { getProjectWithMargin } from './project.actions';

export async function analyzeProjectRisks(projectId: string) {
  const project = await getProjectWithMargin(projectId);
  const supabase = await createClient();

  const { data: risks } = await supabase
    .from('risks')
    .select('*')
    .eq('project_id', projectId);

  const context = {
    project: {
      name: project.name,
      planned_budget: project.budget_planned_pln,
      actual_cost: project.cost_actual_pln,
      margin: project.margin_percentage,
      stages: project.project_stages,
    },
    risks: risks || [],
  };

  const isHealthy = project.margin_percentage > 30;

  return {
    summary: `Projekt ${project.name} wykazuje marżę na poziomie ${project.margin_percentage}%.`,
    threats: isHealthy ? ["Brak krytycznych zagrożeń"] : ["Niska marża operacyjna", "Ryzyko przekroczenia budżetu całkowitego"],
    recommendations: isHealthy
      ? ["Monitoruj koszty etapu Execution", "Utrzymuj obecne tempo prac"]
      : ["Zredukuj koszty zmienne w kolejnych etapach", "Negocjuj stawki z podwykonawcami"],
    health_score: isHealthy ? 85 : 42,
  };
}
