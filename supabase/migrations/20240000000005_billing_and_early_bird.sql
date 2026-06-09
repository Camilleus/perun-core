-- Migration: 20240000000005_billing_and_early_bird.sql

-- Add early_bird_until and updated_at to tenants if not exists
ALTER TABLE tenants ADD COLUMN IF NOT EXISTS early_bird_until TIMESTAMPTZ;
ALTER TABLE tenants ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  stripe_subscription_id TEXT UNIQUE,
  status TEXT,
  price_id TEXT,
  quantity INTEGER DEFAULT 1,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  ended_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_subscriptions_tenant_id ON subscriptions(tenant_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_id ON subscriptions(stripe_subscription_id);

-- Enable RLS
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for subscriptions
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'tenant can select subscriptions') THEN
        CREATE POLICY "tenant can select subscriptions" ON subscriptions FOR SELECT USING (tenant_id = public.current_tenant_id());
    END IF;
END $$;

-- Triggers for updated_at
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_tenants_updated_at') THEN
        CREATE TRIGGER update_tenants_updated_at BEFORE UPDATE ON tenants FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_subscriptions_updated_at') THEN
        CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
    END IF;
END $$;
