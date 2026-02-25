const pool = require('../config/database');

const modifyUsersTable = async () => {
    try {
        console.log('Connecting to database...');

        // Add bp_number column
        await pool.query(`
            ALTER TABLE users 
            ADD COLUMN IF NOT EXISTS bp_number VARCHAR(50) UNIQUE;
        `);
        console.log('Added bp_number column.');

        // Make email nullable (optional, if we allow registration without email)
        // Note: Check constraints first, but generally:
        await pool.query(`
            ALTER TABLE users 
            ALTER COLUMN email DROP NOT NULL;
        `);
        console.log('Made email nullable.');

        console.log('Database modification successful.');
    } catch (error) {
        console.error('Error modifying database:', error);
    } finally {
        await pool.end();
    }
};

modifyUsersTable();
