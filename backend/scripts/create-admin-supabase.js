const bcrypt = require('bcryptjs');
const { Pool } = require('pg');

const pool = new Pool({
  host: 'aws-1-eu-west-1.pooler.supabase.com',
  port: 6543,
  database: 'postgres',
  user: 'postgres.dzgqffcebxrsbjyiitij',
  password: 'k7jeoEeP5iNBVefP',
  ssl: false
});

async function removeAdmin() {
    try {
        console.log('\n�️  Removing admin user from Supabase...\n');

        const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';

        // Check if admin exists
        const existing = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [adminEmail]
        );

        if (existing.rows.length > 0) {
            // Remove the admin
            await pool.query(
                'DELETE FROM users WHERE email = $1',
                [adminEmail]
            );
            console.log('✅ Admin user removed successfully!');
        } else {
            console.log('⚠️  Admin user not found in database.');
        }

        await pool.end();
        process.exit(0);

    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

removeAdmin();
