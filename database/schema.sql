CREATE TABLE stock_logs (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(50) NOT NULL,
  type VARCHAR(20) NOT NULL,
  details TEXT,
  timestamp TIMESTAMP NOT NULL
);

