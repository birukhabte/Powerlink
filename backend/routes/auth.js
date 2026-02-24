const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');

const router = express.Router();

// Register endpoint
// Register endpoint
router.post('/register', async (req, res) => {
  try {
    const { email, username, password, firstName, lastName, userType, bpNumber } = req.body;

    // Determine unique checks
    const conditions = [];
    const values = [];
    let paramCount = 1;

    if (email) {
      conditions.push(`email = $${paramCount++}`);
      values.push(email);
    }
    if (username) {
      conditions.push(`username = $${paramCount++}`);
      values.push(username);
    }
    if (bpNumber) {
      conditions.push(`bp_number = $${paramCount++}`);
      values.push(bpNumber);
    }

    if (conditions.length > 0) {
      const userExists = await pool.query(
        `SELECT * FROM users WHERE ${conditions.join(' OR ')}`,
        values
      );

      if (userExists.rows.length > 0) {
        return res.status(400).json({ error: 'User already exists' });
      }
    }

    // Hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Determine role - default to 'customer' if not specified
    const role = userType || 'customer';

    // Insert new user
    // We need to handle optional email and bpNumber in the INSERT
    const newUser = await pool.query(
      'INSERT INTO users (email, username, password_hash, first_name, last_name, role, bp_number) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, email, username, first_name, last_name, role, bp_number',
      [email || null, username, passwordHash, firstName, lastName, role, bpNumber || null]
    );

    res.status(201).json({
      message: 'User registered successfully',
      user: newUser.rows[0]
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body; // 'email' field holds the identifier (email/BP/username)

    // Find user by email, bp_number, or username
    const user = await pool.query(
      'SELECT * FROM users WHERE email = $1 OR bp_number = $1 OR username = $1',
      [email]
    );

    if (user.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const userData = user.rows[0];

    // Check password
    const validPassword = await bcrypt.compare(password, userData.password_hash);

    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token with role
    const token = jwt.sign(
      { userId: userData.id, email: userData.email, role: userData.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: userData.id,
        email: userData.email,
        username: userData.username,
        firstName: userData.first_name,
        lastName: userData.last_name,
        role: userData.role
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

module.exports = router;