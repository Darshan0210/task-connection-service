const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Endpoint to verify payment and store booking details
router.post('/payment-verification', async (req, res) => {
  const {
    razorpay_payment_id,
    taskerId,
    userId,
    totalAmount,
    partialAmount,
    startDate,
    endDate,
    startTime,
    endTime,
    totalHours,
  } = req.body;

  try {
    const isPaymentValid = razorpay_payment_id ? true : false;

    if (isPaymentValid) {
      const query = `
        INSERT INTO booking (
          tasker_id, 
          user_id, 
          total_amount, 
          partial_amount, 
          start_date, 
          end_date, 
          start_time, 
          end_time, 
          total_hours
        ) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const values = [
        taskerId,
        parseInt(userId),
        totalAmount,
        partialAmount,
        startDate,
        endDate,
        startTime,
        endTime,
        totalHours,
      ];

      db.query(query, values, (err, results) => {
        if (err) {
          return res.status(500).json({ message: 'Error saving booking', error: err });
        }

        res.status(200).json({ success: true, message: 'Booking saved successfully' });
      });
    } else {
      res.status(400).json({ success: false, message: 'Invalid payment' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
