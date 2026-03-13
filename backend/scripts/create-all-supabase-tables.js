const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'postgres',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  ssl: false
});

async function createAllTables() {
    try {
        console.log('\n🔧 Creating all tables in Supabase...\n');
        
        // 1. Create users table
        console.log('1️⃣  Creating users table...');
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
        console.log('   ✅ Users table created');
        
        // Create users indexes
        await pool.query('CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)');
        await pool.query('CREATE INDEX IF NOT EXISTS idx_users_username ON users(username)');
        await pool.query('CREATE INDEX IF NOT EXISTS idx_users_role ON users(role)');
        console.log('   ✅ Users indexes created');
        
        // 2. Create announcements table
        console.log('\n2️⃣  Creating announcement1 table...');
        await pool.query(`
            CREATE TABLE IF NOT EXISTS announcement1 (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                content TEXT NOT NULL,
                type VARCHAR(50) DEFAULT 'info',
                date VARCHAR(100),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('   ✅ Announcement1 table created');
        
        await pool.query('CREATE INDEX IF NOT EXISTS idx_announcement1_type ON announcement1(type)');
        await pool.query('CREATE INDEX IF NOT EXISTS idx_announcement1_created_at ON announcement1(created_at)');
        console.log('   ✅ Announcement1 indexes created');
        
        // 3. Create outages table
        console.log('\n3️⃣  Creating outages table...');
        await pool.query(`
            CREATE TABLE IF NOT EXISTS outages (
                id SERIAL PRIMARY KEY,
                location VARCHAR(255) NOT NULL,
                coordinates JSONB,
                outage_type VARCHAR(100),
                reason VARCHAR(255),
                description TEXT,
                estimated_affected VARCHAR(50),
                urgency VARCHAR(50) DEFAULT 'medium',
                status VARCHAR(50) DEFAULT 'pending',
                reported_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('   ✅ Outages table created');
        
        await pool.query('CREATE INDEX IF NOT EXISTS idx_outages_status ON outages(status)');
        await pool.query('CREATE INDEX IF NOT EXISTS idx_outages_urgency ON outages(urgency)');
        await pool.query('CREATE INDEX IF NOT EXISTS idx_outages_reported_by ON outages(reported_by)');
        console.log('   ✅ Outages indexes created');
        
        // 4. Create service_requests table
        console.log('\n4️⃣  Creating service_requests table...');
        await pool.query(`
            CREATE TABLE IF NOT EXISTS service_requests (
                id SERIAL PRIMARY KEY,
                ticket_id VARCHAR(50) UNIQUE NOT NULL,
                service_type VARCHAR(100) NOT NULL,
                full_name VARCHAR(255) NOT NULL,
                phone VARCHAR(20) NOT NULL,
                city VARCHAR(100),
                woreda VARCHAR(100),
                kebele VARCHAR(100),
                house_plot_number VARCHAR(100),
                nearby_landmark VARCHAR(255),
                full_address TEXT NOT NULL,
                documents JSONB,
                status VARCHAR(50) DEFAULT 'pending',
                priority VARCHAR(50) DEFAULT 'medium',
                assigned_to INTEGER REFERENCES users(id) ON DELETE SET NULL,
                supervisor_notes TEXT,
                created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('   ✅ Service_requests table created');
        
        await pool.query('CREATE INDEX IF NOT EXISTS idx_service_requests_ticket_id ON service_requests(ticket_id)');
        await pool.query('CREATE INDEX IF NOT EXISTS idx_service_requests_status ON service_requests(status)');
        await pool.query('CREATE INDEX IF NOT EXISTS idx_service_requests_priority ON service_requests(priority)');
        await pool.query('CREATE INDEX IF NOT EXISTS idx_service_requests_created_by ON service_requests(created_by)');
        console.log('   ✅ Service_requests indexes created');
        
        // 5. Insert sample announcements
        console.log('\n5️⃣  Adding sample announcements...');
        await pool.query(`
            INSERT INTO announcement1 (title, content, type, date) VALUES
            ('Welcome to PowerLink Ethiopia', 'Our new digital platform is now live! Report outages, track repairs, and manage your electricity services online.', 'info', '2024-01-15'),
            ('Scheduled Maintenance', 'Planned maintenance in Bole area on Saturday 8AM-12PM. Power will be temporarily interrupted.', 'warning', '2024-01-16')
            ON CONFLICT DO NOTHING;
        `);
        console.log('   ✅ Sample announcements added');
        
        // Verify all tables
        console.log('\n📋 Verifying tables...');
        const result = await pool.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
            ORDER BY table_name
        `);
        
        console.log('\n✅ Tables created successfully:');
        result.rows.forEach(row => console.log('   -', row.table_name));
        
        // Count records
        const userCount = await pool.query('SELECT COUNT(*) FROM users');
        const announcementCount = await pool.query('SELECT COUNT(*) FROM announcement1');
        const outageCount = await pool.query('SELECT COUNT(*) FROM outages');
        const requestCount = await pool.query('SELECT COUNT(*) FROM service_requests');
        
        console.log('\n📊 Current records:');
        console.log('   - Users:', userCount.rows[0].count);
        console.log('   - Announcements:', announcementCount.rows[0].count);
        console.log('   - Outages:', outageCount.rows[0].count);
        console.log('   - Service Requests:', requestCount.rows[0].count);
        
        console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('✅ Database setup complete!');
        console.log('🔑 Next step: Run "node scripts/create-admin-supabase.js" to create admin user');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        
        await pool.end();
        process.exit(0);
        
    } catch (error) {
        console.error('\n❌ Error:', error.message);
        console.error('\nFull error:', error);
        process.exit(1);
    }
}

createAllTables();
