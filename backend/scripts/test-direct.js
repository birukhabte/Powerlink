const { Pool} = require('pg');

console.log('\n🔍 Testing Supabase Connection Pooler (Direct)...\n');

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
        console.log('Connecting to Supabase Connection Pooler...');
        const result = await pool.query('SELECT NOW() as time, version()');
        console.log('\n✅ SUCCESS! Connected to Supabase!\n');
        console.log('Server time:', result.rows[0].time);
        console.log('PostgreSQL:', result.rows[0].version.split(',')[0]);
        
        // Check for tables
        const tables = await pool.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        `);
        
        console.log('\nTables:', tables.rows.length);
        tables.rows.forEach(t => console.log('  -', t.table_name));
        
        await pool.end();
        console.log('\n✅ Supabase is ready to use!\n');
        process.exit(0);
        
    } catch (error) {
        console.error('\n❌ Failed:', error.message);
        process.exit(1);
    }
}

test();
