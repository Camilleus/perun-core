-- Migration: 20240000000006_waitlist.sql

-- Create waitlist_entries table
CREATE TABLE IF NOT EXISTS waitlist_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  company_name TEXT NOT NULL,
  email TEXT NOT NULL,
  estimated_users INTEGER DEFAULT 1,
  status TEXT DEFAULT 'pending', -- 'pending', 'contacted', 'onboarded'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE waitlist_entries ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for the waitlist form)
CREATE POLICY "Anyone can join the waitlist"
  ON waitlist_entries
  FOR INSERT
  WITH CHECK (true);

-- Only service role or authorized admins can view (default RLS behavior for select)
CREATE POLICY "Admins can view waitlist"
  ON waitlist_entries
  FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- Trigger for updated_at
CREATE TRIGGER update_waitlist_updated_at BEFORE UPDATE ON waitlist_entries FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
