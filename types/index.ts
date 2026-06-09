export type UserRole = 'owner' | 'admin' | 'member';

export interface Tenant {
  id: string;
  name: string;
  stripe_customer_id?: string | null;
  subscription_status: string;
  rod_api_key?: string | null;
  rod_connected_at?: string | null;
  early_bird_until?: string | null;
  created_at: string;
}

export interface Subscription {
  id: string;
  tenant_id: string;
  stripe_subscription_id: string | null;
  status: string | null;
  price_id: string | null;
  quantity: number;
  cancel_at_period_end: boolean;
  current_period_start: string | null;
  current_period_end: string | null;
  ended_at: string | null;
  created_at: string;
  updated_at: string;
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

export interface Risk {
  id: string;
  project_id: string;
  tenant_id: string;
  title: string;
  probability: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high';
  owner_id?: string | null;
  status: 'active' | 'mitigated' | 'closed';
  mitigation_plan?: string | null;
  created_at: string;
}

export interface Alert {
  id: string;
  project_id: string;
  tenant_id: string;
  type: 'margin_watch' | 'margin_warning' | 'margin_critical' | 'risk_detected';
  severity: 'low' | 'medium' | 'high';
  message: string;
  is_read: boolean;
  created_at: string;
}

export type ActionResult<T = unknown> =
  | { success: true; data: T }
  | { success: false; error: string };
