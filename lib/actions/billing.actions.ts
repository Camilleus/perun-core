'use server';

import { createClient } from '@/lib/supabase/server';
import { stripe } from '@/lib/stripe';
import { redirect } from 'next/navigation';
import { ActionResult } from '@/types';

export async function createCheckoutSession(priceId: string): Promise<ActionResult<string>> {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: 'Not authenticated' };

  const { data: profile } = await supabase
    .from('profiles')
    .select('tenant_id, full_name')
    .eq('id', user.id)
    .single();

  if (!profile) return { success: false, error: 'Profile not found' };

  const { data: tenant } = await supabase
    .from('tenants')
    .select('id, name, stripe_customer_id')
    .eq('id', profile.tenant_id)
    .single();

  if (!tenant) return { success: false, error: 'Tenant not found' };

  let customerId = tenant.stripe_customer_id;

  if (!customerId) {
    const customer = await stripe.customers.create({
      name: tenant.name,
      metadata: {
        tenantId: tenant.id,
      },
    });
    customerId = customer.id;

    await supabase
      .from('tenants')
      .update({ stripe_customer_id: customerId })
      .eq('id', tenant.id);
  }

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    line_items: [
      {
        price: priceId,
        quantity: 1, // Default to 1, could be based on user count later
      },
    ],
    mode: 'subscription',
    subscription_data: {
      metadata: {
        tenantId: tenant.id,
      },
    },
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/early-bird`,
    metadata: {
      tenantId: tenant.id,
    },
  });

  if (!session.url) {
    return { success: false, error: 'Failed to create checkout session' };
  }

  return { success: true, data: session.url };
}

export async function redirectToCheckout(priceId: string) {
    const result = await createCheckoutSession(priceId);
    if (result.success && result.data) {
        redirect(result.data);
    }
}
