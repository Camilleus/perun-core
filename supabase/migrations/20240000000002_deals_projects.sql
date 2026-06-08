-- DEALS
CREATE TABLE deals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  client_name TEXT,
  value_planned_pln DECIMAL(15,2) DEFAULT 0,
  stage TEXT DEFAULT 'lead', -- 'lead', 'negotiation', 'won', 'lost'
  expected_close_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- PROJECTS
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  deal_id UUID REFERENCES deals(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  status TEXT DEFAULT 'active', -- 'active', 'on_hold', 'completed'
  budget_planned_pln DECIMAL(15,2) DEFAULT 0,
  cost_actual_pln DECIMAL(15,2) DEFAULT 0,
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- PROJECT STAGES
CREATE TABLE project_stages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  budget_allocated_pln DECIMAL(15,2) DEFAULT 0,
  cost_actual_pln DECIMAL(15,2) DEFAULT 0,
  status TEXT DEFAULT 'pending', -- 'pending', 'in_progress', 'done'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_deals_tenant_id ON deals(tenant_id);
CREATE INDEX idx_projects_tenant_id ON projects(tenant_id);
CREATE INDEX idx_project_stages_project_id ON project_stages(project_id);

-- Enable RLS
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_stages ENABLE ROW LEVEL SECURITY;

-- Deals Policies
CREATE POLICY "Users can view deals in their tenant"
  ON deals FOR SELECT
  USING (tenant_id = (SELECT tenant_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Users can insert deals in their tenant"
  ON deals FOR INSERT
  WITH CHECK (tenant_id = (SELECT tenant_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Users can update deals in their tenant"
  ON deals FOR UPDATE
  USING (tenant_id = (SELECT tenant_id FROM profiles WHERE id = auth.uid()));

-- Projects Policies
CREATE POLICY "Users can view projects in their tenant"
  ON projects FOR SELECT
  USING (tenant_id = (SELECT tenant_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Users can insert projects in their tenant"
  ON projects FOR INSERT
  WITH CHECK (tenant_id = (SELECT tenant_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Users can update projects in their tenant"
  ON projects FOR UPDATE
  USING (tenant_id = (SELECT tenant_id FROM profiles WHERE id = auth.uid()));

-- Project Stages Policies
CREATE POLICY "Users can view stages of projects in their tenant"
  ON project_stages FOR SELECT
  USING (project_id IN (SELECT id FROM projects WHERE tenant_id = (SELECT tenant_id FROM profiles WHERE id = auth.uid())));

CREATE POLICY "Users can insert stages of projects in their tenant"
  ON project_stages FOR INSERT
  WITH CHECK (project_id IN (SELECT id FROM projects WHERE tenant_id = (SELECT tenant_id FROM profiles WHERE id = auth.uid())));

CREATE POLICY "Users can update stages of projects in their tenant"
  ON project_stages FOR UPDATE
  USING (project_id IN (SELECT id FROM projects WHERE tenant_id = (SELECT tenant_id FROM profiles WHERE id = auth.uid())));
