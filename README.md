# Meela Intake Form – Setup & Run Guide

This guide will help you set up and run both the backend (Rust/Poem/MongoDB) and frontend (React/Vite) for the Meela Intake Form project.

---

## Prerequisites

- **Node.js** (v18+ recommended)
- **npm** (comes with Node.js)
- **Rust** (https://rustup.rs/)
- **MongoDB Atlas** account (or local MongoDB instance)

---

## 1. Backend Setup

1. **Configure MongoDB:**
   - Edit [`backend/.env`](backend/.env) with your MongoDB connection string and database name.
   - Example:
     ```
     MONGO_URL="your-mongodb-connection-string"
     MONGO_DB="your-db-name"
     PORT=3005
     ```

2. **Install Rust dependencies:**
   ```sh
   cd meela-assignments/backend
   cargo build
   ```

3. **Run the backend server:**
   ```sh
   cargo run
   ```
   - The backend will start on [http://localhost:3005](http://localhost:3005).

---

## 2. Frontend Setup

1. **Install frontend dependencies:**
   ```sh
   cd ../frontend
   npm install
   ```

2. **Start the frontend dev server:**
   ```sh
   npm run dev
   ```
   - The frontend will start on [http://localhost:5173](http://localhost:5173) and proxy API requests to the backend.

---

## 3. Usage

- Open [http://localhost:5173](http://localhost:5173) in your browser.
- Click "Start New Form" to begin a new intake form.
- To resume, use the form ID from the URL or enter it on the home page.

---

## Troubleshooting

- Ensure MongoDB is accessible from your machine.
- If ports are in use, change them in `.env` (backend) or `vite.config.js` (frontend).

---

## Scripts Summary

| Directory         | Command         | Purpose                |
|-------------------|----------------|------------------------|
| backend           | `cargo run`    | Start backend server   |
| frontend          | `npm run dev`  | Start frontend (Vite)  |

---

