# Implementation Plan: Start Frontend and Backend servers

## Objective
Start both the backend API server and the frontend development server to run the PowerLink Ethiopia application locally.

## Prerequisites
- Node.js installed
- PostgreSQL database running (for backend)

## Steps

### 1. Start the Backend Server
1.  Open a terminal.
2.  Navigate to the backend directory:
    ```
    c:\Users\Biruk\Desktop\PowerLink-Ethiopia\backend
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```
    *This will start the server on http://localhost:5000*

### 2. Start the Frontend Server
1.  Open a **new** terminal (keep the backend terminal open and running).
2.  Navigate to the frontend directory:
    ```
    c:\Users\Biruk\Desktop\PowerLink-Ethiopia\frontend\vite-project
    ```
3.  Run the Vite development server:
    ```bash
    npm run dev
    ```
    *This will start the frontend on http://localhost:5173 (usually)*

### 3. Verification
- Open a browser and go to the frontend URL (e.g., `http://localhost:5173`).
- Try to log in or interact with the app to ensure the backend is reachable.
