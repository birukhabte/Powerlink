const { Pool} = require('pg');

console.log('\n🔍 Testing Supabase Connection Pooler (Direct)...\n');

const pool = new Pool({
  host: 'aws-1-eu-west-1.pooler.supabase.com',
  port: 6543,
  database: 'postgres',
  user: 'postgres.dzgqffcebxrsbjyiitij',
  password: 'k7jeoEeP5iNBVefP',
  ssl: false  // Try without SSL for pooler
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
