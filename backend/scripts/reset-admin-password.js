const bcrypt = require('bcryptjs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const pool = require('../config/database');

async function resetPassword() {
    try {
        const email = 'admin@powerlink.et';
        const newPassword = 'admin123';

        console.log('\n🔐 Resetting admin password...\n');

        // Hash the new password
        const passwordHash = await bcrypt.hash(newPassword, 10);

        // Update the password
        const result = await pool.query(
            'UPDATE users SET password_hash = $1 WHERE email = $2 RETURNING id, email, username, first_name, last_name',
            [passwordHash, email]
        );

        if (result.rows.length === 0) {
            console.log('❌ Admin user not found with email:', email);
        } else {
            const admin = result.rows[0];
            console.log('✅ Password reset successfully!\n');
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.log('📧 Email:    ', admin.email);
            console.log('👤 Username: ', admin.username);
            console.log('🔑 Password: ', newPassword);
            console.log('👤 Name:     ', admin.first_name, admin.last_name);
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        }

        await pool.end();
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

resetPassword();
