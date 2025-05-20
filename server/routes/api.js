const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/submit-full', async (req, res) => {
  const { userId, timestamp } = req.body;
  try {
    await pool.query(
      'INSERT INTO stock_logs (user_id, type, timestamp) VALUES ($1, $2, $3)',
      [userId, 'full', timestamp]
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
    await pool.query(
      'INSERT INTO stock_logs (user_id, type, details, timestamp) VALUES ($1, $2, $3, $4)',
      [userId, 'discrepancy', discrepancies.join(', '), timestamp]
    );
    res.status(200).send('Discrepancies recorded');
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
