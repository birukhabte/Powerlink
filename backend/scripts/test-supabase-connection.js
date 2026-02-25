const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const pool = require('../config/database');

async function testSupabaseConnection() {
    console.log('\n🔍 Testing Supabase Connection...\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    try {
        // Test 1: Basic connection
        console.log('Test 1: Connecting to database...');
        const timeResult = await pool.query('SELECT NOW() as server_time');
        console.log('✅ Connected successfully!');
        console.log('   Server time:', timeResult.rows[0].server_time);
        
        // Test 2: Check database info
        console.log('\nTest 2: Checking database info...');
        const dbInfo = await pool.query(`
            SELECT 
                current_database() as database_name,
                current_user as user_name,
                version() as postgres_version
        `);
        console.log('✅ Database info retrieved:');
        console.log('   Database:', dbInfo.rows[0].database_name);
        console.log('   User:', dbInfo.rows[0].user_name);
        console.log('   Version:', dbInfo.rows[0].postgres_version.split(',')[0]);
        
        // Test 3: List tables
        console.log('\nTest 3: Listing tables...');
        const tables = await pool.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
            ORDER BY table_name
        `);
        
        if (tables.rows.length === 0) {
            console.log('⚠️  No tables found. You need to create tables first.');
            console.log('   Run the SQL script from SUPABASE_SETUP_PLAN.md Step 4');
        } else {
            console.log('✅ Tables found:');
            tables.rows.forEach(row => {
                console.log('   -', row.table_name);
            });
        }
        
        // Test 4: Check users table (if exists)
        const usersTableExists = tables.rows.some(row => row.table_name === 'users');
        if (usersTableExists) {
            console.log('\nTest 4: Checking users table...');
            const userCount = await pool.query('SELECT COUNT(*) as count FROM users');
            console.log('✅ Users table exists');
            console.log('   Total users:', userCount.rows[0].count);
            
            if (parseInt(userCount.rows[0].count) > 0) {
                const users = await pool.query(`
                    SELECT id, email, username, role, created_at 
                    FROM users 
                    ORDER BY created_at DESC 
                    LIMIT 5
                `);
                console.log('\n   Recent users:');
                users.rows.forEach(user => {
                    console.log(`   - ${user.email} (${user.role}) - ID: ${user.id}`);
                });
            }
        } else {
            console.log('\n⚠️  Users table not found.');
            console.log('   Create it using the SQL script in SUPABASE_SETUP_PLAN.md');
        }
        
        console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('✅ All tests passed! Supabase is ready to use.\n');
        
        await pool.end();
        process.exit(0);
        
    } catch (error) {
        console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.error('❌ Connection test failed!\n');
        console.error('Error:', error.message);
        
        if (error.code === 'ENOTFOUND') {
            console.error('\n💡 Troubleshooting:');
            console.error('   - Check DB_HOST in .env file');
            console.error('   - Verify your internet connection');
            console.error('   - Ensure Supabase project is active');
        } else if (error.code === '28P01') {
            console.error('\n💡 Troubleshooting:');
            console.error('   - Check DB_PASSWORD in .env file');
            console.error('   - Verify password matches Supabase project');
        } else if (error.code === '3D000') {
            console.error('\n💡 Troubleshooting:');
            console.error('   - Check DB_NAME in .env file');
            console.error('   - Should be "postgres" for Supabase');
        } else {
            console.error('\n💡 Full error details:');
            console.error(error);
        }
        
        console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        process.exit(1);
    }
}

// Display current configuration (without password)
console.log('\n📋 Current Configuration:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('Host:    ', process.env.DB_HOST || 'NOT SET');
console.log('Port:    ', process.env.DB_PORT || 'NOT SET');
console.log('Database:', process.env.DB_NAME || 'NOT SET');
console.log('User:    ', process.env.DB_USER || 'NOT SET');
console.log('Password:', process.env.DB_PASSWORD ? '***' + process.env.DB_PASSWORD.slice(-4) : 'NOT SET');

testSupabaseConnection();
