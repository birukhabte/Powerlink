const bcrypt = require('bcryptjs');

async function hashPassword() {
    const password = 'SuperAdmin123!';
    const hash = await bcrypt.hash(password, 10);
    console.log('Password hash for SuperAdmin123!:');
    console.log(hash);
    
    // SQL to insert the super admin
    console.log('\nSQL to run in Supabase SQL Editor:');
    console.log(`
INSERT INTO users (
    email, 
    username, 
    password_hash, 
    first_name, 
    last_name, 
    role
) VALUES (
    'admin@system.com',
    'superadmin',
    '${hash}',
    'Super',
    'Admin',
    'admin'
) ON CONFLICT (email) DO UPDATE SET
    password_hash = EXCLUDED.password_hash,
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name;
    `);
}

hashPassword();