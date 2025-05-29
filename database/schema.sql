CREATE TABLE stock_logs (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(50) NOT NULL,
  type VARCHAR(20) NOT NULL,
  details TEXT,
  timestamp TIMESTAMP NOT NULL
);

CREATE TABLE reach_truck_checklists (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(50) NOT NULL,
  general_condition BOOLEAN NOT NULL,
  fork_camera BOOLEAN NOT NULL,
  hydraulic_system BOOLEAN NOT NULL,
  transitional_lift_control BOOLEAN NOT NULL,
  lift_height_sensors BOOLEAN NOT NULL,
  fork_alignment BOOLEAN NOT NULL,
  battery_status BOOLEAN NOT NULL,
  steering BOOLEAN NOT NULL,
  emergency_stop BOOLEAN NOT NULL,
  tyres BOOLEAN NOT NULL,
  timestamp TIMESTAMP NOT NULL
);
