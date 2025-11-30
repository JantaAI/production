-- Simplify plans table: Remove company_id relationship since all companies share the same plan
-- All companies use the exact same plan (from plan_example_global.json)

-- Step 1: Remove the unique constraint on company_id
ALTER TABLE plans DROP CONSTRAINT IF EXISTS plans_company_id_key;

-- Step 2: Remove the foreign key constraint
ALTER TABLE plans DROP CONSTRAINT IF EXISTS plans_company_id_fkey;

-- Step 3: Remove company_id column (no longer needed)
ALTER TABLE plans DROP COLUMN IF EXISTS company_id;

-- Step 4: Create a single global plan with the exact data from plan_example_global.json
-- This is the example plan used until the first customer signs, then it will be replaced with the government-approved plan
INSERT INTO plans (id, coverage_json, coverage_text)
SELECT 
  '00000000-0000-0000-0000-000000000001'::uuid,
  '{"document_type": "internal_policy_example", "legal_status": "NOT_A_CONTRACT", "audience": "AI_SYSTEM_ONLY", "usage": "RAG_testing_and_reasoning", "distribution": "FORBIDDEN", "externally_valid": false, "plan_metadata": {"plan_id": "EXAMPLE-GLOBAL-ALL-IN-2025", "company_name": "Example Corp", "plan_type": "self_funded_employer_health_program", "plan_year": 2025, "jurisdiction_reference": "erisa_style", "stop_loss_present": true, "model_scope": "worldwide"}, "cost_model": {"copayments": "none", "deductibles": "none", "coinsurance": "none", "out_of_pocket_maximum": "none", "participant_cost_responsibility": "zero", "billing_model": "employer_pays_all_valid_claims"}, "eligibility": {"employee_required": true, "min_hours_per_week": 30, "waiting_period_days": 0, "dependents_allowed": true, "coverage_starts": "employment_start", "coverage_ends": "employment_end"}, "global_access_model": {"provider_scope": "worldwide", "network_required": false, "any_licensed_provider": true, "telehealth_default": true, "referrals_required": false}, "coverage_philosophy": {"principle": "Any condition involving body, brain, or mental health is covered unless explicitly excluded."}, "coverage_categories": {"covered": ["emergency_services", "hospital_care", "surgery", "diagnostics", "outpatient_care", "mental_health", "prescriptions", "preventive_services", "imaging", "therapy", "rehabilitation", "maternity", "pediatrics", "oncology", "chronic_conditions"]}, "exclusions": {"explicit_only": ["experimental_or_unapproved_procedures", "cosmetic_only_treatments", "non_medical_products"]}, "claim_model": {"employee_submits_claims": true, "provider_direct_billing": "optional", "primary_flow": "reimbursement", "document_upload_required": true, "currency_handling": "enabled"}, "processing_sla": {"decision_time_target_minutes": 59, "payment_processing_time_not_guaranteed": true, "escalation_if_target_exceeded": true}, "fraud_control": {"provider_verification_required": true, "invoice_validation_required": true, "ai_fraud_flagging": "active", "manual_review_threshold": "high_cost_cases"}, "claim_handling": {"claims_administered_by": "TPA", "decision_layers": ["automated_validation", "clinical_review", "fraud_check", "escalation_to_human"], "approval_standard": "Medically necessary care is covered.", "default_on_uncertainty": "escalate"}, "appeals_process": {"appeal_enabled": true, "levels": ["initial_review", "secondary_review", "expert_review"], "response_target_days": 30}, "ai_behavior_rules": {"must_reference_policy_data": true, "must_never_invent_coverage": true, "must_refuse_if_policy_missing": true, "escalate_if_uncertain": true, "refuse_conditions": ["no_plan_loaded", "no_coverage_data", "ambiguous_coverage"]}, "support": {"support_channel": "instant_call", "trigger_conditions": ["user_requests_human", "policy_unclear", "urgent_case", "claim_over_threshold"]}, "jurisdiction_warnings": {"regional_medical_standards_vary": true, "currency_exchange_notice": true, "international_provider_disclaimer": true}, "compliance_flags": {"erisa_style_logic_only": true, "not_a_legal_plan": true, "not_for_distribution": true, "ai_reference_only": true}}'::jsonb,
  'EXAMPLE PLAN (pre-production): Self-funded employer health program (2025). Coverage philosophy: Any condition involving body, brain, or mental health is covered unless explicitly excluded. Covered services: emergency services, hospital care, surgery, diagnostics, outpatient care, mental health, prescriptions, preventive services, imaging, therapy, rehabilitation, maternity, pediatrics, oncology, chronic conditions. Cost model: No copayments, deductibles, coinsurance, or out-of-pocket maximum. Employer pays all valid claims. Eligibility: Employees (30+ hours/week), no waiting period, dependents allowed. Global access: Worldwide provider scope, any licensed provider, telehealth default, no network required, no referrals needed. Exclusions: Experimental/unapproved procedures, cosmetic-only treatments, non-medical products. Claims: Employee-submitted reimbursement flow, document upload required, currency handling enabled. Processing: 59-minute decision target, escalation if exceeded. Appeals: 3-level process, 30-day response target.'
WHERE NOT EXISTS (
  SELECT 1 FROM plans WHERE id = '00000000-0000-0000-0000-000000000001'::uuid
);

-- Step 5: Update all existing users to reference the global plan
UPDATE users 
SET plan_id = '00000000-0000-0000-0000-000000000001'::uuid
WHERE plan_id IS NOT NULL;
