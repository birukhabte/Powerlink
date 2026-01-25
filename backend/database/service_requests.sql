-- Create service_requests table for new connection requests
CREATE TABLE service_requests (
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
    documents JSONB, -- Store document metadata (file names, paths, etc.)
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'approved', 'rejected', 'assigned', 'in_progress', 'completed')),
    priority VARCHAR(50) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
    assigned_to INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    supervisor_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_service_requests_status ON service_requests(status);
CREATE INDEX idx_service_requests_created_at ON service_requests(created_at);
CREATE INDEX idx_service_requests_ticket_id ON service_requests(ticket_id);
CREATE INDEX idx_service_requests_priority ON service_requests(priority);
CREATE INDEX idx_service_requests_service_type ON service_requests(service_type);

-- Create a view for pending requests (for supervisor dashboard)
CREATE VIEW pending_service_requests AS
SELECT 
    id,
    ticket_id,
    service_type,
    full_name,
    phone,
    city,
    woreda,
    kebele,
    full_address,
    status,
    priority,
    created_at
FROM service_requests 
WHERE status IN ('pending', 'under_review')
ORDER BY 
    CASE priority 
        WHEN 'high' THEN 1 
        WHEN 'medium' THEN 2 
        WHEN 'low' THEN 3 
    END,
    created_at ASC;

