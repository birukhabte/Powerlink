const express = require('express');
const pool = require('../config/database');
const router = express.Router();

// GET /api/notices - List all active notices
router.get('/', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM notices ORDER BY created_at DESC'
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching notices:', error);
        res.status(500).json({ error: 'Server error fetching notices' });
    }
});

// POST /api/notices - Create a new notice
router.post('/', async (req, res) => {
    try {
        const { title, message, type, target, schedule } = req.body;

        const result = await pool.query(
            `INSERT INTO notices (title, message, type, target, schedule) 
             VALUES ($1, $2, $3, $4, $5) 
             RETURNING id, title, message, type, target, schedule, created_at, status, views`,
            [title, message, type || 'announcement', target || 'all', schedule || null]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating notice:', error);
        res.status(500).json({ error: 'Server error creating notice' });
    }
});

// DELETE /api/notices/:id - Delete a notice
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM notices WHERE id = $1 RETURNING id', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Notice not found' });
        }

        res.json({ message: 'Notice deleted successfully' });
    } catch (error) {
        console.error('Error deleting notice:', error);
        res.status(500).json({ error: 'Server error deleting notice' });
    }
});

module.exports = router;
