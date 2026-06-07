export type UserRole = 'owner' | 'admin' | 'member';

export interface Tenant {
  id: string;
  name: string;
  stripe_customer_id?: string | null;
  subscription_status: string;
  rod_api_key?: string | null;
  rod_connected_at?: string | null;
  created_at: string;
}

export interface Profile {
  id: string;
  tenant_id: string;
  full_name: string | null;
  role: UserRole;
  created_at: string;
}

export interface Deal {
  id: string;
  tenant_id: string;
  title: string;
  client_name: string | null;
  value_planned_pln: number;
  stage: 'lead' | 'negotiation' | 'won' | 'lost';
  expected_close_date: string | null;
  created_at: string;
}

export interface Project {
  id: string;
  tenant_id: string;
  deal_id: string | null;
  name: string;
  status: 'active' | 'on_hold' | 'completed';
  budget_planned_pln: number;
  cost_actual_pln: number;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
}

export interface ProjectStage {
  id: string;
  project_id: string;
  name: string;
  order_index: number;
  budget_allocated_pln: number;
  cost_actual_pln: number;
  status: 'pending' | 'in_progress' | 'done';
  created_at: string;
}
