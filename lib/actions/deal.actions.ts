'use server';

import { createClient } from '@/lib/supabase/server';
import { SupabaseClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

async function getTenantId(supabase: SupabaseClient) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data: profile } = await supabase
    .from('profiles')
    .select('tenant_id')
    .eq('id', user.id)
    .single();

  if (!profile) throw new Error('Profile not found');
  return profile.tenant_id;
}

export async function createDeal(formData: FormData) {
  const supabase = await createClient();
  const tenantId = await getTenantId(supabase);

  const title = formData.get('title') as string;
  const clientName = formData.get('clientName') as string;
  const value = parseFloat(formData.get('value') as string) || 0;
  const expectedCloseDate = formData.get('expectedCloseDate') as string;

  const { error } = await supabase.from('deals').insert({
    tenant_id: tenantId,
    title,
    client_name: clientName,
    value_planned_pln: value,
    expected_close_date: expectedCloseDate || null,
  });

  if (error) throw new Error(error.message);

  revalidatePath('/pipeline');
}

export async function updateDealStage(dealId: string, stage: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('deals')
    .update({ stage })
    .eq('id', dealId);

  if (error) throw new Error(error.message);

  revalidatePath('/pipeline');
}

export async function convertDealToProject(dealId: string) {
  const supabase = await createClient();
  const tenantId = await getTenantId(supabase);

  const { data: deal, error: dealError } = await supabase
    .from('deals')
    .select('*')
    .eq('id', dealId)
    .single();

  if (dealError || !deal) throw new Error('Deal not found');

  // 1. Create Project
  const { data: project, error: projectError } = await supabase
    .from('projects')
    .insert({
      tenant_id: tenantId,
      deal_id: deal.id,
      name: deal.title,
      budget_planned_pln: deal.value_planned_pln,
      status: 'active',
      start_date: new Date().toISOString(),
    })
    .select()
    .single();

  if (projectError) throw new Error(projectError.message);

  // 2. Create Default Stages
  const defaultStages = [
    { name: 'Preparation', order_index: 0 },
    { name: 'Execution', order_index: 1 },
    { name: 'Delivery', order_index: 2 },
    { name: 'Closure', order_index: 3 },
  ];

  const stagesToInsert = defaultStages.map(stage => ({
    project_id: project.id,
    name: stage.name,
    order_index: stage.order_index,
    budget_allocated_pln: stage.order_index === 0 ? project.budget_planned_pln : 0, // Mock allocation
  }));

  const { error: stagesError } = await supabase
    .from('project_stages')
    .insert(stagesToInsert);

  if (stagesError) throw new Error(stagesError.message);

  // 3. Update Deal Stage to 'won' if it wasn't already
  await supabase.from('deals').update({ stage: 'won' }).eq('id', dealId);

  revalidatePath('/pipeline');
  revalidatePath('/projects');
  redirect(`/projects/${project.id}`);
}
