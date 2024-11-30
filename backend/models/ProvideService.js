const express = require('express');
const router = express.Router();
const db = require('../config/db');

// POST route to provide a service
router.post('/services', async (req, res) => {
    const { taskerId, serviceId, experience, hourlyRate } = req.body;

    try {
        // Check if the task already exists for this tasker
        const checkQuery = `
            SELECT * FROM ProvideService
            WHERE tasker_Profile_Id = ? AND service_Id = ?
        `;

        db.query(checkQuery, [taskerId, serviceId], (checkErr, checkResult) => {
            if (checkErr) {
                console.error('Error checking service:', checkErr);
                return res.status(500).json({ message: 'Error checking service' });
            }

            if (checkResult.length > 0) {
                // Service already exists
                return res.status(400).json({ message: 'Service already added by tasker' });
            }

            // If no existing service, proceed to insert
            const insertQuery = `
                INSERT INTO ProvideService (tasker_Profile_Id, service_Id, experience, hourly_rate, created_at)
                VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
            `;

            db.query(insertQuery, [taskerId, serviceId, experience, hourlyRate], (insertErr, result) => {
                if (insertErr) {
                    console.error('Error providing service:', insertErr);
                    return res.status(500).json({ message: 'Error providing service' });
                }
                res.status(200).json({ message: 'Service provided successfully' });
            });
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error processing request' });
    }
});

module.exports = router;
