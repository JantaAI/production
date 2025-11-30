-- Add profile fields to users table for support dashboard
-- Gender, age, and city will be collected during activation or profile setup

ALTER TABLE users ADD COLUMN IF NOT EXISTS gender TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS age INTEGER;
ALTER TABLE users ADD COLUMN IF NOT EXISTS city TEXT;

-- Note: Index on city + country would require a join, which is not standard PostgreSQL syntax
-- If needed, create a materialized view or use a computed column instead
-- For now, queries can join users with companies when filtering by location
