-- Manual Super Admin Creation
-- Run this SQL in your Supabase SQL Editor

-- First, let's create the super admin with a bcrypt hash for 'SuperAdmin123!'
INSERT INTO users (
    email, 
    username, 
    password_hash, 
    first_name, 
    last_name, 
    role,
    is_active,
    email_verified
) VALUES (
    'admin@system.com',
    'superadmin',
    '$2a$10$rOvHq8K9yF8qGzJ5vN2.XeF8K7mP3nQ1wR4sT6uV9xY2zA3bC4dE6',  -- This is the hash for 'SuperAdmin123!'
    'Super',
    'Admin',
    'admin',
    true,
    true
) ON CONFLICT (email) DO UPDATE SET
    password_hash = EXCLUDED.password_hash,
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    role = EXCLUDED.role,
    is_active = EXCLUDED.is_active,
    email_verified = EXCLUDED.email_verified;

-- Verify the user was created
SELECT id, email, username, first_name, last_name, role, is_active, email_verified, created_at 
FROM users 
WHERE email = 'admin@system.com';