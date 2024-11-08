const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Database configuration file

// Route to enroll in insurance
router.post('/Insurance', async (req, res) => {
  try {
    const { taskerID, insuranceType, coverageAmount } = req.body; // taskerID, insuranceType, coverageAmount from the frontend

    // Insert insurance enrollment details into the insurance table
    const query = `
      INSERT INTO insurance (tasker_id, insurance_type, coverage_amount, enrollment_date)
      VALUES (?, ?, ?, CURRENT_TIMESTAMP)
    `;

    db.query(query, [taskerID, insuranceType, coverageAmount], (err, result) => {
      if (err) {
        console.error('Error enrolling in insurance:', err);
        return res.status(500).json({ message: 'Error enrolling in insurance' });
      }

      // Return success response
      res.status(200).json({
        message: `Successfully enrolled in ${insuranceType} insurance!`,
        insuranceID: result.insertId, // Include the insurance ID of the newly inserted record
      });
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error processing request' });
  }
});

module.exports = router;
