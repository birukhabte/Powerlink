-- Create outage_reports table
CREATE TABLE outage_reports (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    outage_type VARCHAR(100) NOT NULL,
    urgency VARCHAR(50) DEFAULT 'medium' CHECK (urgency IN ('low', 'medium', 'high')),
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'assigned', 'in-progress', 'resolved', 'cancelled')),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    address TEXT,
    estimated_affected VARCHAR(100),
    reason TEXT,
    technician_notes TEXT,
    reported_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    assigned_to INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_outage_reports_status ON outage_reports(status);
CREATE INDEX idx_outage_reports_created_at ON outage_reports(created_at);
CREATE INDEX idx_outage_reports_location ON outage_reports(latitude, longitude);
CREATE INDEX idx_outage_reports_urgency ON outage_reports(urgency);

-- Create a view for active outages (for map display)
CREATE VIEW active_outages AS
SELECT 
    id,
    title,
    description,
    outage_type,
    urgency,
    status,
    latitude,
    longitude,
    address,
    estimated_affected,
    created_at
FROM outage_reports 
WHERE status IN ('pending', 'assigned', 'in-progress')
ORDER BY urgency DESC, created_at DESC;