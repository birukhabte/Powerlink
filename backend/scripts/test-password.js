const { Pool } = require('pg');
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'postgres',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  ssl: false
});

async function test() {
    try {
        console.log('Testing connection with environment variables...');
        const result = await pool.query('SELECT NOW()');
        console.log('✅ Connected successfully!');
        console.log('Time:', result.rows[0].now);
        await pool.end();
    } catch (error) {
        console.log('❌ Failed:', error.message);
        console.log('Check your .env file for correct database credentials');
    }
}

test();
