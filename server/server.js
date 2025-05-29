const express = require('express');
const { Pool } = require('pg');
const app = express();

const pool = new Pool({
  connectionString: 'postgresql://consumables_user:JX0t15m4LIukIMFZtTsA1FQu9s79J8aX@dpg-d0m7rb0dl3ps73c46af0-a.singapore-postgres.render.com/consumables_db',
  ssl: { rejectUnauthorized: false }
});

app.use(express.json());

app.post('/api/submit-checklist', async (req, res) => {
  const {
    user_id,
    general_condition,
    fork_camera,
    hydraulic_system,
    transitional_lift_control,
    lift_height_sensors,
    fork_alignment,
    battery_status,
    steering,
    emergency_stop,
    tyres
  } = req.body;

  try {
    const query = `
      INSERT INTO reach_truck_checklists (
        user_id, general_condition, fork_camera, hydraulic_system,
        transitional_lift_control, lift_height_sensors, fork_alignment,
        battery_status, steering, emergency_stop, tyres
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *;
    `;
    const values = [
      user_id,
      general_condition,
      fork_camera,
      hydraulic_system,
      transitional_lift_control,
      lift_height_sensors,
      fork_alignment,
      battery_status,
      steering,
      emergency_stop,
      tyres
    ];

    const result = await pool.query(query, values);
    res.status(200).json({ message: 'Checklist submitted successfully', data: result.rows[0] });
  } catch (err) {
    console.error('Error submitting checklist:', err);
    res.status(500).json({ error: 'Failed to submit checklist' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
