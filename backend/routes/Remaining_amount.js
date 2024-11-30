const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Endpoint to get the remaining amount for a booking
router.get('/remaining-amount', (req, res) => {
  const bookingId = parseInt(req.query.bookingId, 10);
  console.log('Received bookingId:', bookingId);

  if (isNaN(bookingId)) {
    return res.status(400).json({ error: 'Invalid bookingId parameter' });
  }

  console.log('Executing query to call calculate_remaining_amount function');

  // Call the SQL function 'calculate_remaining_amount'
  db.query('SELECT calculate_remaining_amount(?) AS remaining_amount', [bookingId], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      return res.status(500).json({ error: 'Error fetching remaining amount' });
    }

    console.log('Database result:', results);

    if (results && results.length > 0) {
      const remainingAmount = results[0].remaining_amount;
      res.json({ remainingAmount });
    } else {
      res.status(404).json({ error: 'Booking not found or invalid bookingId.' });
    }
  });
});

module.exports = router;
