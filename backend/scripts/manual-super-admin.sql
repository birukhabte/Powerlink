-- Manual Super Admin Creation
-- Run this SQL in your Supabase SQL Editor
-- Replace the email and credentials with your actual values

-- Create the super admin with environment-based credentials
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
    'admin@example.com',  -- Replace with your admin email
    'superadmin',
    '$2a$10$YourHashedPasswordWillBeHere',  -- Replace with actual hash
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

-- Verify the user was created (replace email)
SELECT id, email, username, first_name, last_name, role, is_active, email_verified, created_at 
FROM users 
WHERE email = 'admin@example.com';