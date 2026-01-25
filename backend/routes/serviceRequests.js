const express = require('express');
const pool = require('../config/database');
const router = express.Router();

// Get all service requests (for supervisor dashboard)
router.get('/', async (req, res) => {
  try {
    const { status, priority } = req.query;

    let query = `
      SELECT 
        sr.id,
        sr.ticket_id,
        sr.service_type,
        sr.full_name,
        sr.phone,
        sr.city,
        sr.woreda,
        sr.kebele,
        sr.house_plot_number,
        sr.nearby_landmark,
        sr.full_address,
        sr.documents,
        sr.status,
        sr.priority,
        sr.supervisor_notes,
        sr.created_at,
        sr.updated_at,
        u1.username as created_by_username,
        u2.username as assigned_to_username
      FROM service_requests sr
      LEFT JOIN users u1 ON sr.created_by = u1.id
      LEFT JOIN users u2 ON sr.assigned_to = u2.id
    `;

    const conditions = [];
    const params = [];
    let paramCount = 1;

    if (status) {
      conditions.push(`sr.status = $${paramCount}`);
      params.push(status);
      paramCount++;
    }

    if (priority) {
      conditions.push(`sr.priority = $${paramCount}`);
      params.push(priority);
      paramCount++;
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ` ORDER BY 
      CASE sr.priority 
        WHEN 'high' THEN 1 
        WHEN 'medium' THEN 2 
        WHEN 'low' THEN 3 
      END,
      sr.created_at ASC`;

    const result = await pool.query(query, params);

    res.json({
      success: true,
      requests: result.rows
    });
  } catch (error) {
    console.error('Error fetching service requests:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch service requests'
    });
  }
});

// Get pending service requests (for supervisor dashboard)
router.get('/pending', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        sr.id,
        sr.ticket_id,
        sr.service_type,
        sr.full_name,
        sr.phone,
        sr.city,
        sr.woreda,
        sr.kebele,
        sr.full_address,
        sr.documents,
        sr.status,
        sr.priority,
        sr.created_at
      FROM service_requests sr
      WHERE sr.status IN ('pending', 'under_review')
      ORDER BY 
        CASE sr.priority 
          WHEN 'high' THEN 1 
          WHEN 'medium' THEN 2 
          WHEN 'low' THEN 3 
        END,
        sr.created_at ASC
    `);

    res.json({
      success: true,
      requests: result.rows
    });
  } catch (error) {
    console.error('Error fetching pending service requests:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch pending service requests'
    });
  }
});

// Create new service request (from customer)
router.post('/', async (req, res) => {
  try {
    const {
      ticketId,
      serviceType,
      fullName,
      phone,
      city,
      woreda,
      kebele,
      housePlotNumber,
      nearbyLandmark,
      fullAddress,
      documents,
      createdBy
    } = req.body;

    // Validate required fields
    if (!ticketId || !serviceType || !fullName || !phone || !city || !woreda || !kebele || !fullAddress) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    // Validate documents are provided
    if (!documents || !Array.isArray(documents) || documents.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'At least one document is required'
      });
    }

    const result = await pool.query(`
      INSERT INTO service_requests (
        ticket_id,
        service_type,
        full_name,
        phone,
        city,
        woreda,
        kebele,
        house_plot_number,
        nearby_landmark,
        full_address,
        documents,
        status,
        priority,
        created_by
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, 'pending', 'medium', $12)
      RETURNING *
    `, [
      ticketId,
      serviceType,
      fullName,
      phone,
      city,
      woreda,
      kebele,
      housePlotNumber || null,
      nearbyLandmark || null,
      fullAddress,
      JSON.stringify(documents),
      createdBy || null
    ]);

    res.status(201).json({
      success: true,
      message: 'Service request created successfully and sent to supervisor for review',
      request: result.rows[0]
    });
  } catch (error) {
    console.error('Error creating service request:', error);

    // Handle duplicate ticket_id error
    if (error.code === '23505') {
      return res.status(400).json({
        success: false,
        error: 'Ticket ID already exists'
      });
    }

    res.status(500).json({
      success: false,
      error: 'Failed to create service request'
    });
  }
});

// Update service request status (for supervisor)
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, supervisorNotes, assignedTo } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        error: 'Status is required'
      });
    }

    const updates = ['status = $1', 'updated_at = CURRENT_TIMESTAMP'];
    const params = [status];
    let paramCount = 2;

    if (supervisorNotes !== undefined) {
      updates.push(`supervisor_notes = $${paramCount}`);
      params.push(supervisorNotes);
      paramCount++;
    }

    if (assignedTo !== undefined) {
      updates.push(`assigned_to = $${paramCount}`);
      params.push(assignedTo);
      paramCount++;
    }

    params.push(id);

    const result = await pool.query(`
      UPDATE service_requests 
      SET ${updates.join(', ')}
      WHERE id = $${paramCount}
      RETURNING *
    `, params);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Service request not found'
      });
    }

    res.json({
      success: true,
      message: 'Service request status updated successfully',
      request: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating service request status:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update service request status'
    });
  }
});

// Get service request by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(`
      SELECT 
        sr.*,
        u1.username as created_by_username,
        u2.username as assigned_to_username
      FROM service_requests sr
      LEFT JOIN users u1 ON sr.created_by = u1.id
      LEFT JOIN users u2 ON sr.assigned_to = u2.id
      WHERE sr.id = $1
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Service request not found'
      });
    }

    res.json({
      success: true,
      request: result.rows[0]
    });
  } catch (error) {
    console.error('Error fetching service request:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch service request'
    });
  }
});

module.exports = router;

