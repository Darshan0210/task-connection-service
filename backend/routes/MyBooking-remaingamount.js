// In routes/booking.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Endpoint to mark the booking as completed, update the remaining amount, and set tasker's availability to 1
router.put('/pay-full', async (req, res) => {
  const { bookingId, remainingAmount, taskerId } = req.body;
  console.log('Received taskerId:', taskerId);

  try {
    // Query to fetch the current partial amount and calculate the new total amount
    const selectQuery = 'SELECT partial_amount FROM booking WHERE booking_id = ?';
    db.query(selectQuery, [bookingId], (err, result) => {
      if (err) {
        console.error('Error fetching booking data:', err);
        return res.status(500).json({ message: 'Error fetching booking data', error: err });
      }

      if (result.length === 0) {
        return res.status(404).json({ message: 'Booking not found' });
      }

      const partialAmount = result[0].partial_amount;
      const totalAmount = partialAmount + remainingAmount;  // Add remaining amount to partial amount

      // Update the booking with the full payment and change status to 'COMPLETED'
      const updateQuery = `
        UPDATE booking 
        SET partial_amount = ?, task_status = 'COMPLETED' 
        WHERE booking_id = ?
      `;
      db.query(updateQuery, [totalAmount, bookingId], (err, updateResult) => {
        if (err) {
          console.error('Error updating booking:', err);
          return res.status(500).json({ message: 'Error updating booking', error: err });
        }

        // After the booking is completed, update the tasker's availability status to 1 (available)
        const updateAvailabilityQuery = `
          UPDATE TaskerProfile
          SET availability_status = 1
          WHERE tasker_profile_id = ?
        `;
        db.query(updateAvailabilityQuery, [taskerId], (err, updateAvailabilityResult) => {
          if (err) {
            console.error('Error updating tasker availability:', err);
            return res.status(500).json({ message: 'Error updating tasker availability', error: err });
          }

          // Respond with a success message
          res.status(200).json({ message: 'Payment completed successfully, tasker availability updated to available, and booking marked as completed' });
        });
      });
    });
  } catch (error) {
    console.error('Error processing full payment:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
