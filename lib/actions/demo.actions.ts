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
        name: 'Demo: Green Tower Office',
        budget_planned_pln: 500000,
        status: 'active',
        start_date: new Date().toISOString()
      })
      .select()
      .single();

    if (hpError) throw hpError;

    // Add healthy stages and costs
    await supabase.from('project_stages').insert([
      { tenant_id: tenantId, project_id: healthyProject.id, name: 'Fundamenty', order_index: 0, budget_allocated_pln: 100000 },
      { tenant_id: tenantId, project_id: healthyProject.id, name: 'Konstrukcja', order_index: 1, budget_allocated_pln: 300000 }
    ]);

    await supabase.from('costs').insert([
      { tenant_id: tenantId, project_id: healthyProject.id, description: 'Beton B25', amount_pln: 45000, category: 'materials' },
      { tenant_id: tenantId, project_id: healthyProject.id, description: 'Zbrojenie stalowe', amount_pln: 30000, category: 'materials' }
    ]);

    // 2. Create an At-Risk Project
    const { data: riskProject, error: rpError } = await supabase
      .from('projects')
      .insert({
        tenant_id: tenantId,
        name: 'Demo: Modern Villa Fit-out',
        budget_planned_pln: 200000,
        status: 'active',
        start_date: new Date().toISOString()
      })
      .select()
      .single();

    if (rpError) throw rpError;

    const { data: stage } = await supabase.from('project_stages').insert({
      tenant_id: tenantId, project_id: riskProject.id, name: 'Wykończenie wnętrz', order_index: 0, budget_allocated_pln: 200000
    }).select().single();

    // High costs to trigger alerts
    await supabase.from('costs').insert([
      { tenant_id: tenantId, project_id: riskProject.id, stage_id: stage?.id, description: 'Włoskie marmury (nadmiar)', amount_pln: 120000, category: 'materials' },
      { tenant_id: tenantId, project_id: riskProject.id, stage_id: stage?.id, description: 'Ekipa wykończeniowa Premium', amount_pln: 70000, category: 'labor' }
    ]);

    // Add a Risk and Alert
    await supabase.from('risks').insert({
      tenant_id: tenantId,
      project_id: riskProject.id,
      description: 'Opóźnienie dostawy armatury',
      probability: 'High',
      impact: 'Critical',
      mitigation_plan: 'Zamówienie u lokalnego dostawcy (drożej)',
      owner: 'Jan Kowalski'
    });

    await supabase.from('alerts').insert({
      tenant_id: tenantId,
      project_id: riskProject.id,
      title: 'Krytyczne zużycie budżetu',
      message: 'Projekt przekroczył 95% planowanych kosztów na etapie wykończenia.',
      severity: 'critical'
    });

    revalidatePath('/');
    revalidatePath('/projects');
    return { success: true };
  } catch (error) {
    console.error('Demo seed error:', error);
    return { success: false, error: 'Failed to seed demo data' };
  }
}
