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
VALUES ('11111111-1111-1111-1111-111111111111', '77777777-7777-7777-7777-777777777777', 'Remont Biura Centralnego', 'active', 150000.00, 45000.00, CURRENT_DATE - 10);

-- At Risk Project (Burn rate > 90%)
INSERT INTO projects (id, tenant_id, name, status, budget_planned_pln, cost_actual_pln, start_date)
VALUES ('22222222-2222-2222-2222-222222222222', '77777777-7777-7777-7777-777777777777', 'Instalacja Fotowoltaiczna - Etap I', 'active', 100000.00, 92000.00, CURRENT_DATE - 20);

-- 4. Project Stages
-- Healthy Project Stages
INSERT INTO project_stages (project_id, name, order_index, budget_allocated_pln, cost_actual_pln, status)
VALUES
('11111111-1111-1111-1111-111111111111', 'Przygotowanie', 0, 20000.00, 15000.00, 'done'),
('11111111-1111-1111-1111-111111111111', 'Demontaż', 1, 30000.00, 30000.00, 'done'),
('11111111-1111-1111-1111-111111111111', 'Wykończenie', 2, 100000.00, 0.00, 'pending');

-- At Risk Project Stages
INSERT INTO project_stages (project_id, name, order_index, budget_allocated_pln, cost_actual_pln, status)
VALUES
('22222222-2222-2222-2222-222222222222', 'Zakup paneli', 0, 70000.00, 85000.00, 'done'),
('22222222-2222-2222-2222-222222222222', 'Montaż okablowania', 1, 30000.00, 7000.00, 'in_progress');

-- 5. Risks
INSERT INTO risks (tenant_id, project_id, title, probability, impact, status, mitigation_plan)
VALUES
('77777777-7777-7777-7777-777777777777', '11111111-1111-1111-1111-111111111111', 'Opóźnienie dostawy farb', 'low', 'medium', 'active', 'Kontakt z alternatywnym dostawcą.'),
('77777777-7777-7777-7777-777777777777', '22222222-2222-2222-2222-222222222222', 'Wzrost cen paneli o 20%', 'high', 'high', 'active', 'Negocjacje ceny przy zamówieniu hurtowym.');

-- 6. Alerts
INSERT INTO alerts (tenant_id, project_id, type, severity, message)
VALUES
('77777777-7777-7777-7777-777777777777', '22222222-2222-2222-2222-222222222222', 'margin_drop', 'critical', 'UWAGA: Burn rate projektu przekroczył 90%! Marża zagrożona.'),
('77777777-7777-7777-7777-777777777777', '22222222-2222-2222-2222-222222222222', 'risk_detected', 'high', 'Wykryto wysokie ryzyko finansowe: Wzrost cen paneli.');
