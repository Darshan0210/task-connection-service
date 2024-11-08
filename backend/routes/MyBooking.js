// routes/Bookings.js

const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET bookings for the logged-in user
router.get('/MyBooking', async (req, res) => {
  try {
    const query = `
      SELECT 
        booking_id, 
        tasker_id, 
        user_id, 
        total_amount, 
        partial_amount, 
        start_date, 
        end_date, 
        start_time, 
        end_time, 
        total_hours, 
        task_status 
      FROM 
        booking 
      WHERE 
        user_id = ?`; // Assuming user_id is available in session or JWT

    db.query(query, [req.user.id], (err, results) => {
      if (err) {
        console.error('Error fetching bookings:', err);
        return res.status(500).json({ message: 'Error fetching bookings' });
      }
      res.status(200).json(results);
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
