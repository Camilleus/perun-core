-- Seed Data for Perun Core

-- 1. Create a Tenant
INSERT INTO tenants (id, name, subscription_status, early_bird_until)
VALUES ('77777777-7777-7777-7777-777777777777', 'Veles Construction Sp. z o.o.', 'active', NOW() + INTERVAL '30 days');

-- 2. Create Deals
INSERT INTO deals (tenant_id, title, client_name, value_planned_pln, stage, expected_close_date)
VALUES
('77777777-7777-7777-7777-777777777777', 'Remont Biura Centralnego', 'TechHub S.A.', 150000.00, 'won', NOW() + INTERVAL '14 days'),
('77777777-7777-7777-7777-777777777777', 'Instalacja HVAC - Nowa Hala', 'Logistyka Plus', 280000.00, 'negotiation', NOW() + INTERVAL '30 days'),
('77777777-7777-7777-7777-777777777777', 'Modernizacja Sieci Elektrycznej', 'Gmina Warszawa', 85000.00, 'lead', NOW() + INTERVAL '45 days'),
('77777777-7777-7777-7777-777777777777', 'Wykończenie Apartamentów', 'Luxury Living', 450000.00, 'lost', NOW() - INTERVAL '7 days');

-- 3. Create Projects (Healthy and At Risk)
-- Healthy Project
INSERT INTO projects (id, tenant_id, name, status, budget_planned_pln, cost_actual_pln, start_date)
VALUES ('11111111-1111-1111-1111-111111111111', '77777777-7777-7777-7777-777777777777', 'Demo: Projekt Biurowiec (Zdrowy)', 'active', 1500000.00, 450000.00, CURRENT_DATE - 15);

-- At Risk Project (Burn rate > 90%)
INSERT INTO projects (id, tenant_id, name, status, budget_planned_pln, cost_actual_pln, start_date)
VALUES ('22222222-2222-2222-2222-222222222222', '77777777-7777-7777-7777-777777777777', 'Demo: Wykończenie Villi (Zagrożony)', 'active', 300000.00, 285000.00, CURRENT_DATE - 30);

-- 4. Project Stages
-- Healthy Project Stages
INSERT INTO project_stages (project_id, name, order_index, budget_allocated_pln, cost_actual_pln, status)
VALUES
('11111111-1111-1111-1111-111111111111', 'Przygotowanie terenu', 0, 200000.00, 180000.00, 'done'),
('11111111-1111-1111-1111-111111111111', 'Stan surowy', 1, 800000.00, 270000.00, 'in_progress'),
('11111111-1111-1111-1111-111111111111', 'Instalacje', 2, 500000.00, 0.00, 'pending');

-- At Risk Project Stages
INSERT INTO project_stages (project_id, name, order_index, budget_allocated_pln, cost_actual_pln, status)
VALUES
('22222222-2222-2222-2222-222222222222', 'Zakup materiałów Premium', 0, 150000.00, 210000.00, 'done'),
('22222222-2222-2222-2222-222222222222', 'Prace wykończeniowe', 1, 150000.00, 75000.00, 'in_progress');

-- 5. Risks
INSERT INTO risks (tenant_id, project_id, title, probability, impact, status, mitigation_plan)
VALUES
('77777777-7777-7777-7777-777777777777', '11111111-1111-1111-1111-111111111111', 'Możliwe opóźnienie dostawy stali', 'low', 'high', 'active', 'Złożenie zamówienia u drugiego dostawcy jako zabezpieczenie.'),
('77777777-7777-7777-7777-777777777777', '22222222-2222-2222-2222-222222222222', 'Wzrost cen marmuru o 30%', 'high', 'critical', 'active', 'Natychmiastowy zakup całości materiału po obecnych cenach.');

-- 6. Alerts
INSERT INTO alerts (tenant_id, project_id, type, severity, message)
VALUES
('77777777-7777-7777-7777-777777777777', '22222222-2222-2222-2222-222222222222', 'budget_limit_reached', 'critical', 'KRYTYCZNE: Budżet niemal wyczerpany (95%). Marża operacyjna spadła poniżej bezpiecznego poziomu.'),
('77777777-7777-7777-7777-777777777777', '22222222-2222-2222-2222-222222222222', 'risk_detected', 'high', 'Wykryto krytyczne ryzyko: Drastyczny wzrost kosztów materiałów wykończeniowych.');
