const express = require('express');
const router = express.Router();
const db = require('../config/db');

// In routes/booking.js
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
    role  // Role sent from frontend
  } = req.body;

  try {
    // Save booking details in booking table
    const bookingQuery = `
      INSERT INTO booking (tasker_id, user_id, total_amount, partial_amount, start_date, end_date, start_time, end_time, total_hours)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    await db.query(bookingQuery, [taskerId, userId, totalAmount, partialAmount, startDate, endDate, startTime, endTime, totalHours]);

    // Update role to customer if not already customer
    if (role === 'customer') {
      const updateRoleQuery = `
        UPDATE users
        SET role = 'customer'
        WHERE id = ? 
      `;
      await db.query(updateRoleQuery, [userId]);
    }

    // Set tasker's availability status to 0 (unavailable)
    const updateAvailabilityQuery = `
      UPDATE TaskerProfile
      SET availability_status = 0
      WHERE tasker_profile_id = ?
    `;
    await db.query(updateAvailabilityQuery, [taskerId]);

    res.status(200).json({ success: true, message: 'Payment and booking details saved, role updated to customer, tasker marked as unavailable.' });
  } catch (error) {
    console.error('Error saving booking, updating role, or updating availability:', error);
    res.status(500).json({ success: false, message: 'Error saving booking or updating role or availability', error });
  }
});

module.exports = router;
