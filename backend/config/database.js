const { Pool } = require('pg');

// Force reload environment variables
delete require.cache[require.resolve('dotenv')];
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

// Determine if we're using Supabase pooler or direct connection
const isSupabasePooler = process.env.DB_HOST && process.env.DB_HOST.includes('pooler.supabase.com');
const isSupabaseDirect = process.env.DB_HOST && process.env.DB_HOST.includes('supabase.co') && !isSupabasePooler;

// Connection configuration
const connectionConfig = process.env.DATABASE_URL ? {
  connectionString: process.env.DATABASE_URL,
  ssl: isSupabaseDirect ? { rejectUnauthorized: false } : false
} : {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  // Pooler doesn't need SSL, direct connection does
  ssl: isSupabaseDirect ? { rejectUnauthorized: false } : false
};

const pool = new Pool(connectionConfig);

// Test the connection
pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Database connection error:', err);
});

module.exports = pool;