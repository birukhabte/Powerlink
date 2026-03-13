const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: false
});

async function createSuperAdmin() {
    try {
        console.log('🔧 Creating super admin user...');
        console.log('Environment check:');
        console.log('- Email:', process.env.SUPER_ADMIN_EMAIL);
        console.log('- First Name:', process.env.SUPER_ADMIN_FIRST_NAME);
        console.log('- Last Name:', process.env.SUPER_ADMIN_LAST_NAME);
        console.log('- DB Host:', process.env.DB_HOST);

        const adminData = {
            email: process.env.SUPER_ADMIN_EMAIL,
            username: 'superadmin',
            password: process.env.SUPER_ADMIN_PASSWORD,
            firstName: process.env.SUPER_ADMIN_FIRST_NAME,
            lastName: process.env.SUPER_ADMIN_LAST_NAME,
            role: 'admin'
        };

        console.log('Testing database connection...');
        await pool.query('SELECT NOW()');
        console.log('✅ Database connected!');

        // Check if admin exists
        console.log('Checking if admin exists...');
        const existing = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [adminData.email]
        );

        if (existing.rows.length > 0) {
            console.log('⚠️  Super admin already exists. Updating password...');
            const passwordHash = await bcrypt.hash(adminData.password, 10);
            await pool.query(
                'UPDATE users SET password_hash = $1, first_name = $2, last_name = $3 WHERE email = $4',
                [passwordHash, adminData.firstName, adminData.lastName, adminData.email]
            );
            console.log('✅ Super admin updated!');
        } else {
            console.log('Creating new super admin...');
            const passwordHash = await bcrypt.hash(adminData.password, 10);
            await pool.query(
                `INSERT INTO users (email, username, password_hash, first_name, last_name, role) 
                 VALUES ($1, $2, $3, $4, $5, $6)`,
                [adminData.email, adminData.username, passwordHash, adminData.firstName, adminData.lastName, adminData.role]
            );
            console.log('✅ Super admin created!');
        }

        console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('📧 Email:    ', adminData.email);
        console.log('🔑 Password: ', adminData.password);
        console.log('👤 Name:     ', `${adminData.firstName} ${adminData.lastName}`);
        console.log('🎭 Role:     ', adminData.role);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        await pool.end();
        process.exit(0);

    } catch (error) {
        console.error('❌ Error:', error.message);
        console.error('Stack:', error.stack);
        await pool.end();
        process.exit(1);
    }
}

createSuperAdmin();