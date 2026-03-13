const bcrypt = require('bcryptjs');

async function hashPassword() {
    const password = process.env.SUPER_ADMIN_PASSWORD || 'defaultpassword';
    const hash = await bcrypt.hash(password, 10);
    console.log('Password hash generated');
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
    '${process.env.SUPER_ADMIN_EMAIL || 'admin@example.com'}',
    'superadmin',
    '${hash}',
    '${process.env.SUPER_ADMIN_FIRST_NAME || 'Super'}',
    '${process.env.SUPER_ADMIN_LAST_NAME || 'Admin'}',
    'admin'
) ON CONFLICT (email) DO UPDATE SET
    password_hash = EXCLUDED.password_hash,
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name;
    `);
}

hashPassword();