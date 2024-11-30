// routes/Taskers.js

const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET taskers based on serviceId, filtered by availability status and sorted by ratings if requested
router.get('/Taskers', async (req, res) => {
  const { serviceId, sortByRatings } = req.query;

  if (!serviceId) {
    return res.status(400).json({ message: 'Service ID is required' });
  }

  try {
    // Query to get taskers with availability status = 1 and optional sorting by rating
    const query = `
      SELECT 
        ps.tasker_profile_id AS tasker_Profile_Id, 
        CONCAT(u.firstname, ' ', u.lastname) AS taskerName,
        ps.experience, 
        ps.hourly_rate AS hourlyRate,
        tp.image AS taskerImage,
        tp.ratings AS averageRating
      FROM 
        ProvideService ps
      JOIN 
        TaskerProfile tp ON ps.tasker_Profile_Id = tp.tasker_Profile_Id
      JOIN 
        users u ON tp.id = u.id
      WHERE 
        ps.service_Id = ? 
        AND tp.availability_status = 1
      ${sortByRatings === 'true' ? 'ORDER BY tp.ratings DESC' : ''}
    `;

    db.query(query, [serviceId], (err, results) => {
      if (err) {
        console.error('Error fetching taskers:', err);
        return res.status(500).json({ message: 'Error fetching taskers' });
      }

      res.status(200).json(results);
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
