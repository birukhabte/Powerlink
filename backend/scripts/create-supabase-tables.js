const { Pool } = require('pg');

const pool = new Pool({
  host: 'aws-1-eu-west-1.pooler.supabase.com',
  port: 6543,
  database: 'postgres',
  user: 'postgres.dzgqffcebxrsbjyiitij',
  password: 'k7jeoEeP5iNBVefP',
  ssl: false
});

async function createTables() {
    try {
        console.log('\n📋 Creating tables in Supabase...\n');
        
        // Create users table
        console.log('Creating users table...');
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                username VARCHAR(100) UNIQUE NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                first_name VARCHAR(100),
                last_name VARCHAR(100),
                role VARCHAR(50) DEFAULT 'customer',
                phone VARCHAR(20),
                address TEXT,
                is_active BOOLEAN DEFAULT true,
                email_verified BOOLEAN DEFAULT false,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('✅ Users table created');
        
        // Create indexes
        console.log('Creating indexes...');
        await pool.query('CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)');
        await pool.query('CREATE INDEX IF NOT EXISTS idx_users_username ON users(username)');
        await pool.query('CREATE INDEX IF NOT EXISTS idx_users_role ON users(role)');
        console.log('✅ Indexes created');
        
        // Verify
        const result = await pool.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        `);
        
        console.log('\n✅ Tables in database:');
        result.rows.forEach(row => console.log('  -', row.table_name));
        
        await pool.end();
        console.log('\n✅ Database setup complete!\n');
        process.exit(0);
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

createTables();
