-- Add ROD integration columns to tenants table
ALTER TABLE tenants ADD COLUMN IF NOT EXISTS rod_api_key TEXT;
ALTER TABLE tenants ADD COLUMN IF NOT EXISTS rod_connected_at TIMESTAMPTZ;
