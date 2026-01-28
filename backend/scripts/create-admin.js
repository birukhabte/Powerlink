const bcrypt = require('bcryptjs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const pool = require('../config/database');

async function createAdmin() {
    try {
        console.log('🔧 Creating admin user...\n');

        // Admin credentials - CHANGE THESE!
        const adminData = {
            email: 'admin@powrlink',
            username: 'admin',
            password: '12345678', // ⚠️ CHANGE THIS PASSWORD!
            firstName: 'System',
            lastName: 'Administrator',
            role: 'admin'
        };

        // Check if admin already exists
        const existing = await pool.query(
            'SELECT * FROM users WHERE email = $1 OR role = $2',
            [adminData.email, 'admin']
        );

        if (existing.rows.length > 0) {
            console.log('⚠️  Admin user already exists. Resetting password...');

            // Hash password
            const passwordHash = await bcrypt.hash(adminData.password, 10);

            await pool.query(
                'UPDATE users SET password_hash = $1 WHERE email = $2',
                [passwordHash, adminData.email]
            );

            console.log('✅ Admin password updated successfully!');
            console.log('   Email:    ', adminData.email);
            console.log('   Password: ', adminData.password);

            await pool.end();
            process.exit(0);
        }

        // Hash password
        console.log('🔐 Hashing password...');
        const passwordHash = await bcrypt.hash(adminData.password, 10);

        // Create admin user
        console.log('💾 Inserting admin user into database...');
        const result = await pool.query(
            `INSERT INTO users (email, username, password_hash, first_name, last_name, role) 
             VALUES ($1, $2, $3, $4, $5, $6) 
             RETURNING id, email, username, first_name, last_name, role, created_at`,
            [
                adminData.email,
                adminData.username,
                passwordHash,
                adminData.firstName,
                adminData.lastName,
                adminData.role
            ]
        );

        const admin = result.rows[0];

        console.log('\n✅ Admin user created successfully!\n');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('📧 Email:    ', admin.email);
        console.log('👤 Username: ', admin.username);
        console.log('🔑 Password: ', adminData.password);
        console.log('👑 Role:     ', admin.role);
        console.log('🆔 User ID:  ', admin.id);
        console.log('📅 Created:  ', admin.created_at);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        console.log('⚠️  IMPORTANT SECURITY NOTICE:');
        console.log('   1. Change the password after first login!');
        console.log('   2. Delete or secure this script file!');
        console.log('   3. Never commit passwords to version control!\n');

        await pool.end();
        process.exit(0);

    } catch (error) {
        console.error('\n❌ Error creating admin user:');
        console.error('   ', error.message);

        if (error.code === 'ECONNREFUSED') {
            console.error('\n💡 Database connection failed. Make sure PostgreSQL is running.');
        } else if (error.code === '23505') {
            console.error('\n💡 User already exists with this email or username.');
        }

        process.exit(1);
    }
}

// Run the script
console.log('╔════════════════════════════════════════╗');
console.log('║   PowerLink Ethiopia - Admin Setup    ║');
console.log('╚════════════════════════════════════════╝\n');

createAdmin();
