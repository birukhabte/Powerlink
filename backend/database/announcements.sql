-- Create announcement1 table
CREATE TABLE announcement1 (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'info' CHECK (type IN ('info', 'warning', 'success', 'error')),
    priority INTEGER DEFAULT 1 CHECK (priority BETWEEN 1 AND 5),
    is_active BOOLEAN DEFAULT true,
    created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NULL
);

-- Create indexes for better performance
CREATE INDEX idx_announcement1_active ON announcement1(is_active);
CREATE INDEX idx_announcement1_created_at ON announcement1(created_at);
CREATE INDEX idx_announcement1_priority ON announcement1(priority);

-- Table is ready for admin-created announcements
-- No sample data inserted - only admin can create announcements