-- Migration: add_onboarded_to_profiles.sql
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS onboarded BOOLEAN DEFAULT FALSE;
