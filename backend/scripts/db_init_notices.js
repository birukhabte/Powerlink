const pool = require('../config/database');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const createNoticesTable = async () => {
    try {
        console.log('🔧 Initializing notices table...');

        const query = `
            CREATE TABLE IF NOT EXISTS notices (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                message TEXT NOT NULL,
                type VARCHAR(50) DEFAULT 'announcement', -- announcement, emergency, maintenance
                target VARCHAR(50) DEFAULT 'all',        -- all, customers, specific
                status VARCHAR(50) DEFAULT 'active',
                views INTEGER DEFAULT 0,
                schedule TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;

        await pool.query(query);
        console.log('✅ Notices table created successfully!');

        // Add some dummy data if empty
        const count = await pool.query('SELECT COUNT(*) FROM notices');
        if (parseInt(count.rows[0].count) === 0) {
            console.log('📝 Seeding initial notices...');
            const insertQuery = `
                INSERT INTO notices (title, message, type, target, created_at)
                VALUES 
                ('Welcome to PowerLink', 'This is a sample announcement for the new system.', 'announcement', 'all', NOW()),
                ('System Maintenance', 'Scheduled maintenance for Sunday 2AM - 4AM.', 'maintenance', 'all', NOW());
            `;
            await pool.query(insertQuery);
            console.log('✅ Dummy notices inserted.');
        }

        await pool.end();
        process.exit(0);

    } catch (error) {
        console.error('❌ Error creating notices table:', error);
        process.exit(1);
    }
};

createNoticesTable();
