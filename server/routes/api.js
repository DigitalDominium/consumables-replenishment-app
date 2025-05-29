const express = require('express');
const router = express.Router();
const pool = require('../db/index');

router.post('/submit-full', async (req, res) => {
  const { userId, timestamp } = req.body;
  try {
    const formattedTimestamp = new Date(timestamp).toISOString().replace('T', ' ').substring(0, 19);
    await pool.query(
      'INSERT INTO stock_logs (user_id, type, timestamp) VALUES ($1, $2, $3)',
      [userId, 'full', formattedTimestamp]
    );
    res.status(200).send('Full stock recorded');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.post('/submit-discrepancy', async (req, res) => {
  const { userId, discrepancies, timestamp } = req.body;
  try {
    const formattedTimestamp = new Date(timestamp).toISOString().replace('T', ' ').substring(0, 19);
    await pool.query(
      'INSERT INTO stock_logs (user_id, type, details, timestamp) VALUES ($1, $2, $3, $4)',
      [userId, 'discrepancy', discrepancies.join(', '), formattedTimestamp]
    );
    res.status(200).send('Discrepancies recorded');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.post('/submit-checklist', async (req, res) => {
  const { userId, checklist, timestamp } = req.body;
  try {
    const formattedTimestamp = new Date(timestamp).toISOString().replace('T', ' ').substring(0, 19);
    await pool.query(
      'INSERT INTO reach_truck_checklists (user_id, general_condition, fork_camera, hydraulic_system, transitional_lift_control, lift_height_sensors, fork_alignment, battery_status, steering, emergency_stop, tyres, timestamp) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)',
      [
        userId,
        checklist.generalCondition,
        checklist.forkCamera,
        checklist.hydraulicSystem,
        checklist.transitionalLiftControl,
        checklist.liftHeightSensors,
        checklist.forkAlignment,
        checklist.batteryStatus,
        checklist.steering,
        checklist.emergencyStop,
        checklist.tyres,
        formattedTimestamp
      ]
    );
    res.status(200).send('Checklist recorded');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.get('/logs', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM stock_logs ORDER BY timestamp DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
