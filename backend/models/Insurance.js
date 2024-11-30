const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Route to check tasker eligibility
router.get('/Insurance', async (req, res) => {
  const taskerId = req.query.taskerId;  // Get taskerId from query parameter
  console.log('Received taskerId:', taskerId);

  try {
    // Check number of completed tasks
    const taskCountQuery = `
      SELECT COUNT(*) AS completedTasks
      FROM booking
      WHERE tasker_id = ? AND task_status = 'completed'
    `;
    db.query(taskCountQuery, [taskerId], (err, results) => {
      if (err) {
        console.error('Error fetching task count:', err);
        return res.status(500).json({ message: 'Error checking task count' });
      }

      const completedTasks = results[0].completedTasks;

      // Check if tasker has booked eligible services
      const eligibleServicesQuery = `
        SELECT ps.service_id
        FROM ProvideService ps
        JOIN Service s ON ps.service_id = s.service_id
        WHERE ps.tasker_profile_id = ?
          AND s.service_name IN ('Housekeeping','Plumbing','Electrical Work','Carpentry','Physical Therapy')
      `;
      db.query(eligibleServicesQuery, [taskerId], (err, serviceResults) => {
        if (err) {
          console.error('Error fetching eligible services:', err);
          return res.status(500).json({ message: 'Error checking eligible services' });
        }

        const eligibleServices = serviceResults.length > 0;

        // Determine eligibility
        if (completedTasks >= 1 && eligibleServices) {
          return res.status(200).json({ eligible: true });
        } else {
          return res.status(200).json({ eligible: false });
        }
      });
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to enroll tasker in insurance
router.post('/Insert', async (req, res) => {
  const { taskerID, insuranceType, coverageAmount } = req.body;

  try {
    const query = `
      INSERT INTO Insurance (tasker_profile_id, insurance_type, coverage_amount)
      VALUES (?, ?, ?)
    `;
    db.query(query, [taskerID, insuranceType, coverageAmount], (err, result) => {
      if (err) {
        console.error('Error enrolling in insurance:', err);
        return res.status(500).json({ message: 'Error enrolling in insurance' });
      }
      res.status(200).json({ message: `${insuranceType} enrollment successful!` });
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/submitClaim', async (req, res) => {
  const { taskerId, amount } = req.body;  // Destructure values from the request body

  try {
    // Update the Insurance table with the claim amount for the specific tasker
    const query = `
      UPDATE Insurance
      SET claim_amount = ?
      WHERE tasker_profile_id = ?`;
      
    db.query(query, [amount, taskerId], (err, result) => {
      if (err) {
        console.error('Error updating claim amount:', err);
        return res.status(500).json({ message: 'Error updating claim amount', error: err });
      }

      // Respond with success message
      res.status(200).json({ message: `Claim for tasker ${taskerId} submitted successfully!` });
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error', error: error });
  }
});


module.exports = router;
