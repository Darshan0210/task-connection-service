// In routes/booking.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Endpoint to fetch bookings for a specific user
router.get('/myBookings', (req, res) => {
  console.log('Received request at /myBookings endpoint'); // Log when endpoint is hit

  const userId = req.query.userId;
  console.log('User ID from query:', userId); // Log the received userId

  // Check if userId is provided
  if (!userId) {
    console.log('User ID not provided'); // Log if userId is missing
    return res.status(400).json({ message: 'User ID is required' });
  }

  // SQL query
  const query = `
    SELECT 
      booking_id,
      tasker_id,
      total_amount,
      partial_amount,
      start_date,
      end_date,
      start_time,
      end_time,
      total_hours,
      task_status
    FROM booking
    WHERE user_id = ?
  `;

  console.log('Executing query with userId:', userId); // Log before executing the query

  // Execute the query
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error executing query:', err); // Log any error during query execution
      return res.status(500).json({ message: 'Server error' });
    }

    console.log('Query executed successfully'); // Log successful execution of query
    console.log('Fetched bookings:', results); // Log the results of the query

    res.status(200).json(results);
  });
});

module.exports = router;
