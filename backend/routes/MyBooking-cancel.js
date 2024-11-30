const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Endpoint to cancel a booking
router.put('/cancel-booking', async (req, res) => {
  const { bookingId, taskerId } = req.body;  // Ensure matching property names with frontend

  try {
    // Update the task_status to 'CANCELLED'
    const updateBookingQuery = `
      UPDATE booking 
      SET task_status = 'CANCELLED' 
      WHERE booking_id = ?
    `;
    await db.query(updateBookingQuery, [bookingId]);

    // Set tasker's availability status back to 1 (available)
    const updateAvailabilityQuery = `
      UPDATE TaskerProfile
      SET availability_status = 1
      WHERE tasker_profile_id = ?
    `;
    await db.query(updateAvailabilityQuery, [taskerId]);

    // Respond with a success message
    res.status(200).json({ message: 'Booking cancelled successfully, tasker marked as available.' });
  } catch (error) {
    console.error('Error canceling booking or updating availability:', error);
    res.status(500).json({ message: 'Error canceling booking or updating availability', error });
  }
});

module.exports = router;
