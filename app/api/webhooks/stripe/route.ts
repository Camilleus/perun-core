import { stripe } from '@/lib/stripe';
import { createAdminClient } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const relevantEvents = new Set([
  'checkout.session.completed',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
]);

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature') as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) return new Response('Webhook Secret not found.', { status: 400 });
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.error(`❌ Error message: ${err.message}`);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (relevantEvents.has(event.type)) {
    try {
      const supabase = createAdminClient();

      switch (event.type) {
        case 'checkout.session.completed': {
          const session = event.data.object as Stripe.Checkout.Session;
          const subscriptionId = session.subscription as string;
          const tenantId = session.metadata?.tenantId;

          if (tenantId && subscriptionId) {
            const subscription = await stripe.subscriptions.retrieve(subscriptionId) as Stripe.Subscription;

            await supabase
              .from('tenants')
              .update({
                subscription_status: subscription.status,
                stripe_customer_id: session.customer as string
              })
              .eq('id', tenantId);

            await supabase
              .from('subscriptions')
              .upsert({
                tenant_id: tenantId,
                stripe_subscription_id: subscription.id,
                status: subscription.status,
                price_id: subscription.items.data[0].price.id,
                quantity: subscription.items.data[0].quantity,
                cancel_at_period_end: subscription.cancel_at_period_end,
                current_period_start: new Date((subscription as any).current_period_start * 1000).toISOString(),
                current_period_end: new Date((subscription as any).current_period_end * 1000).toISOString(),
              });
          }
          break;
        }
        case 'customer.subscription.created':
        case 'customer.subscription.updated': {
          const subscription = event.data.object as Stripe.Subscription;
          const tenantId = subscription.metadata?.tenantId;

          if (tenantId) {
            await supabase
              .from('tenants')
              .update({ subscription_status: subscription.status })
              .eq('id', tenantId);

            await supabase
              .from('subscriptions')
              .upsert({
                tenant_id: tenantId,
                stripe_subscription_id: subscription.id,
                status: subscription.status,
                price_id: subscription.items.data[0].price.id,
                quantity: subscription.items.data[0].quantity,
                cancel_at_period_end: subscription.cancel_at_period_end,
                current_period_start: new Date((subscription as any).current_period_start * 1000).toISOString(),
                current_period_end: new Date((subscription as any).current_period_end * 1000).toISOString(),
              });
          }
          break;
        }
        case 'customer.subscription.deleted': {
          const subscription = event.data.object as Stripe.Subscription;
          const tenantId = subscription.metadata?.tenantId;

          if (tenantId) {
            await supabase
              .from('tenants')
              .update({ subscription_status: 'canceled' })
              .eq('id', tenantId);

            await supabase
              .from('subscriptions')
              .update({
                status: 'canceled',
                ended_at: new Date().toISOString(),
              })
              .eq('stripe_subscription_id', subscription.id);
          }
          break;
        }
        default:
          throw new Error('Unhandled relevant event!');
      }
    } catch (error) {
      console.error(error);
      return new Response('Webhook handler failed. View logs.', {
        status: 400,
      });
    }
  }

  return NextResponse.json({ received: true });
}
