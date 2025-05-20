# Consumables Replenishment App

A web app to automate consumables stock replenishment with QR code login, stock submission, and supervisor dashboard.

## Setup
1. Clone the repository.
2. Install frontend dependencies: `cd client && npm install`.
3. Install backend dependencies: `cd server && npm install`.
4. Set up PostgreSQL database and run `database/schema.sql`.
5. Create a `.env` file in `server/` with database credentials based on `.env.example`.
6. Start the backend: `cd server && npm start`.
7. Start the frontend: `cd client && npm start`.

## Deployment
- Deploy on Render using `render.yaml`.
- Set environment variables in Render dashboard.
- Connect to Render PostgreSQL database.

## Usage
- Users scan QR codes to log in and submit stock status.
- Supervisor logs in with `supervisor` to view logs.
