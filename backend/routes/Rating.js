// In routes/booking.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Endpoint to submit a rating
router.post('/submit-rating', async (req, res) => {
  const { taskerId, rating } = req.body;

  try {
    // Update the rating for the specific tasker in the TaskerProfile table
    const updateQuery = `UPDATE TaskerProfile SET ratings = ? WHERE tasker_profile_id = ?`;
    db.query(updateQuery, [rating, taskerId], (err, result) => {
      if (err) {
        console.error('Error updating rating:', err);
        return res.status(500).json({ message: 'Error submitting rating', error: err });
      }

      // Now calculate the average rating for the tasker
      const avgQuery = `SELECT AVG(ratings) AS average_rating FROM TaskerProfile WHERE tasker_profile_id = ?`;
      db.query(avgQuery, [taskerId], (err, result) => {
        if (err) {
          console.error('Error calculating average rating:', err);
          return res.status(500).json({ message: 'Error calculating average rating', error: err });
        }

        const averageRating = result[0].average_rating;

        // Update the tasker's average rating in the taskers table
        

          // Respond with success
          res.status(200).json({ message: 'Rating submitted successfully!' });
        });
      });
    }

   catch (error) {
    console.error('Error submitting rating:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
