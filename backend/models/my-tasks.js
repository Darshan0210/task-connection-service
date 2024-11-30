const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Endpoint to get bookings for a specific tasker
router.get('/tasker-bookings', async (req, res) => {
  const { taskerId } = req.query;

  try {
    if (!taskerId) {
      return res.status(400).json({ message: 'Tasker ID is required' });
    }

    const query = `
      SELECT 
        b.booking_id AS booking_id,
        b.start_date,
        b.end_date,
        b.start_time,
        b.end_time,
        b.total_amount,
        u.firstname AS customerFirstName,
        u.lastname AS customerLastName,
        u.phone AS customerPhone,
        u.email AS customerEmail,
        b.task_status AS task_status
      FROM booking b
      JOIN users u ON b.user_id = u.id
      WHERE b.tasker_id = ?
    `;

    db.query(query, [taskerId], (err, results) => {
      if (err) {
        console.error('Error fetching bookings:', err);
        return res.status(500).json({ message: 'Error fetching bookings', error: err });
      }

      res.status(200).json({ bookings: results });
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Endpoint to update tasker availability status only
router.put('/taskers/:taskerId/complete', async (req, res) => {
  const { taskerId } = req.params;

  try {
    const updateTaskerProfileQuery = `
      UPDATE TaskerProfile
      SET availability_status = 1
      WHERE tasker_profile_id = ?
    `;

    // Update tasker availability status
    db.query(updateTaskerProfileQuery, [taskerId], (err, updateResult) => {
      if (err) {
        console.error('Error updating availability status in tasker profile:', err);
        return res.status(500).json({ message: 'Error updating tasker availability status', error: err });
      }

      if (updateResult.affectedRows > 0) {
        return res.status(200).json({ message: 'Tasker availability updated successfully' });
      } else {
        return res.status(404).json({ message: 'Tasker not found in tasker profile' });
      }
    });
  } catch (error) {
    console.error('Error updating tasker availability:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
