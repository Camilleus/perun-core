'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function seedDemoData() {
  const supabase = await createClient();

  // Get current user and tenant
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: 'Not authenticated' };

  const { data: profile } = await supabase
    .from('profiles')
    .select('tenant_id')
    .eq('id', user.id)
    .single();

  if (!profile) return { success: false, error: 'Profile not found' };
  const tenantId = profile.tenant_id;

  try {
    // 1. Create a Healthy Project
    const { data: healthyProject, error: hpError } = await supabase
      .from('projects')
      .insert({
        tenant_id: tenantId,
        name: 'Demo: Green Tower Office (Healthy)',
        budget_planned_pln: 1200000,
        status: 'active',
        start_date: new Date().toISOString()
      })
      .select()
      .single();

    if (hpError) throw hpError;

    // Add healthy stages and costs
    await supabase.from('project_stages').insert([
      { tenant_id: tenantId, project_id: healthyProject.id, name: 'Fundamenty', order_index: 0, budget_allocated_pln: 200000 },
      { tenant_id: tenantId, project_id: healthyProject.id, name: 'Konstrukcja Stalowa', order_index: 1, budget_allocated_pln: 500000 }
    ]);

    await supabase.from('costs').insert([
      { tenant_id: tenantId, project_id: healthyProject.id, description: 'Beton konstrukcyjny B30', amount_pln: 120000, category: 'materials' },
      { tenant_id: tenantId, project_id: healthyProject.id, description: 'Zbrojenie stalowe', amount_pln: 80000, category: 'materials' }
    ]);

    // 2. Create an At-Risk Project
    const { data: riskProject, error: rpError } = await supabase
      .from('projects')
      .insert({
        tenant_id: tenantId,
        name: 'Demo: Modern Villa Fit-out (At Risk)',
        budget_planned_pln: 350000,
        status: 'active',
        start_date: new Date().toISOString()
      })
      .select()
      .single();

    if (rpError) throw rpError;

    const { data: stage } = await supabase.from('project_stages').insert({
      tenant_id: tenantId, project_id: riskProject.id, name: 'Wykończenie wnętrz', order_index: 0, budget_allocated_pln: 350000
    }).select().single();

    // High costs to trigger critical alerts (>90% burn)
    await supabase.from('costs').insert([
      { tenant_id: tenantId, project_id: riskProject.id, stage_id: stage?.id, description: 'Importowany marmur Carrara', amount_pln: 180000, category: 'materials' },
      { tenant_id: tenantId, project_id: riskProject.id, stage_id: stage?.id, description: 'Zaliczka dla ekipy Premium', amount_pln: 150000, category: 'labor' }
    ]);

    // Add a Risk and Alert
    await supabase.from('risks').insert({
      tenant_id: tenantId,
      project_id: riskProject.id,
      description: 'Drastyczny wzrost cen materiałów wykończeniowych',
      probability: 'High',
      impact: 'Critical',
      mitigation_plan: 'Rewizja projektu i wybór tańszych zamienników dla pozostałych etapów',
      owner: 'Marek Nowak'
    });

    await supabase.from('alerts').insert({
      tenant_id: tenantId,
      project_id: riskProject.id,
      title: 'KRYTYCZNE: Budżet niemal wyczerpany',
      message: 'Projekt osiągnął 94% planowanych kosztów. Każdy kolejny wydatek zniszczy marżę.',
      severity: 'critical',
      type: 'budget_limit_reached'
    });

    revalidatePath('/');
    revalidatePath('/projects');
    return { success: true };
  } catch (error) {
    console.error('Demo seed error:', error);
    return { success: false, error: 'Failed to seed demo data' };
  }
}
