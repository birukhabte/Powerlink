const pool = require('../config/database');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const createServiceRequestsTable = async () => {
    try {
        console.log('🔧 Initializing service_requests table...');

        const query = `
            CREATE TABLE IF NOT EXISTS service_requests (
                id SERIAL PRIMARY KEY,
                ticket_id VARCHAR(50) UNIQUE NOT NULL,
                service_type VARCHAR(100) NOT NULL,
                full_name VARCHAR(255) NOT NULL,
                phone VARCHAR(20) NOT NULL,
                city VARCHAR(100) NOT NULL,
                woreda VARCHAR(100) NOT NULL,
                kebele VARCHAR(100) NOT NULL,
                house_plot_number VARCHAR(100),
                nearby_landmark TEXT,
                full_address TEXT NOT NULL,
                documents JSONB,
                status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'approved', 'rejected', 'assigned', 'in_progress', 'completed')),
                priority VARCHAR(50) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
                assigned_to INTEGER,
                created_by INTEGER,
                supervisor_notes TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            -- Create indexes for better performance
            CREATE INDEX IF NOT EXISTS idx_service_requests_status ON service_requests(status);
            CREATE INDEX IF NOT EXISTS idx_service_requests_created_at ON service_requests(created_at);
            CREATE INDEX IF NOT EXISTS idx_service_requests_ticket_id ON service_requests(ticket_id);
            CREATE INDEX IF NOT EXISTS idx_service_requests_priority ON service_requests(priority);
            CREATE INDEX IF NOT EXISTS idx_service_requests_service_type ON service_requests(service_type);
        `;

        await pool.query(query);
        console.log('✅ Service_requests table created successfully!');
        console.log('✅ Indexes created successfully!');

        await pool.end();
        process.exit(0);

    } catch (error) {
        console.error('❌ Error creating service_requests table:', error);
        process.exit(1);
    }
};

createServiceRequestsTable();
