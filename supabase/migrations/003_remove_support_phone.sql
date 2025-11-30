-- Remove support_phone column from companies table
-- Support requests are now handled via internal support backend

ALTER TABLE companies DROP COLUMN IF EXISTS support_phone;
