# PowerLink Ethiopia

A comprehensive digital platform for managing electricity services, outage reporting, and service requests for PowerLink Ethiopia.

## Overview

PowerLink Ethiopia is a full-stack web application that enables customers to report power outages, submit service requests, track tickets, and receive announcements. The platform includes role-based access for customers, technicians, supervisors, and administrators.

## Features

### Customer Features
- Report power outages with location details
- Submit service requests (new connections, repairs, etc.)
- Track ticket status in real-time
- View announcements and alerts
- Manage personal profile

### Technician Features
- View assigned service requests
- Update ticket status
- Add work notes and progress updates
- Access customer information

### Supervisor Features
- Assign tickets to technicians
- Monitor all service requests
- Review and approve work
- Generate reports

### Admin Features
- User account management
- Staff registration
- System-wide announcements
- Analytics and reporting
- Outage management

## Tech Stack

### Frontend
- React 19.2.0
- Vite 7.2.4
- React Router DOM 7.11.0
- Tailwind CSS 4.1.18
- Framer Motion (animations)
- Recharts (data visualization)
- Axios (HTTP client)
- Lucide React (icons)

### Backend
- Node.js with Express 4.18.2
- PostgreSQL (via Supabase)
- JWT Authentication
- Bcrypt (password hashing)
- Multer (file uploads)
- CORS enabled

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database (or Supabase account)
- Git

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Powerlink
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=5000
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

### 3. Frontend Setup

```bash
cd frontend/vite-project
npm install
```

Create a `.env` file in the frontend/vite-project directory:

```env
VITE_API_URL=http://localhost:5000
```

### 4. Database Setup

#### Option A: Using Supabase (Recommended)

1. Create a Supabase account at https://supabase.com
2. Create a new project
3. Copy the connection string from Project Settings > Database
4. Run the SQL schema:
   ```bash
   # Copy contents of SUPABASE_TABLES.sql into Supabase SQL Editor and execute
   ```

#### Option B: Local PostgreSQL

1. Install PostgreSQL
2. Create a database:
   ```bash
   createdb powerlink
   ```
3. Run the schema:
   ```bash
   psql powerlink < SUPABASE_TABLES.sql
   ```

### 5. Create Admin User

```bash
cd backend
node scripts/create-admin-supabase.js
```

Default admin credentials:
- Email: admin@powerlink.et
- Password: admin123

## Running the Application

### Development Mode

Open two terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend will run on http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend/vite-project
npm run dev
```
Frontend will run on http://localhost:5173

### Production Mode

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend/vite-project
npm run build
npm run preview
```

## Project Structure

```
Powerlink/
├── backend/
│   ├── config/
│   │   ├── database.js
│   │   └── supabase-db.js
│   ├── database/
│   │   ├── announcements.sql
│   │   ├── outages.sql
│   │   └── service_requests.sql
│   ├── routes/
│   │   ├── auth.js
│   │   ├── announcements.js
│   │   ├── users.js
│   │   ├── outages.js
│   │   ├── service-requests.js
│   │   └── uploads.js
│   ├── scripts/
│   │   ├── create-admin-supabase.js
│   │   └── test-supabase-connection.js
│   ├── uploads/
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   └── vite-project/
│       ├── src/
│       │   ├── Auth/
│       │   │   ├── Login.jsx
│       │   │   └── Register.jsx
│       │   ├── Navbar/
│       │   │   ├── Home.jsx
│       │   │   ├── Sidebar.jsx
│       │   │   ├── SupervisorSidebar.jsx
│       │   │   └── TechnicianSidebar.jsx
│       │   ├── RolePages/
│       │   │   ├── Admin/
│       │   │   ├── Customer/
│       │   │   ├── Supervisor/
│       │   │   └── Technician/
│       │   ├── App.jsx
│       │   └── main.jsx
│       ├── package.json
│       └── .env
├── SUPABASE_TABLES.sql
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Announcements
- `GET /api/announcements` - Get all announcements
- `POST /api/announcements` - Create announcement (admin)
- `PUT /api/announcements/:id` - Update announcement (admin)
- `DELETE /api/announcements/:id` - Delete announcement (admin)

### Service Requests
- `GET /api/service-requests` - Get all service requests
- `POST /api/service-requests` - Create service request
- `PUT /api/service-requests/:id` - Update service request
- `GET /api/service-requests/:ticketId` - Get specific ticket

### Outages
- `GET /api/outages` - Get all outages
- `POST /api/outages` - Report outage
- `PUT /api/outages/:id` - Update outage status

### Users
- `GET /api/users` - Get all users (admin)
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (admin)

## User Roles

- **customer**: Regular users who can submit requests and report outages
- **technician**: Field workers who handle service requests
- **supervisor**: Managers who assign and oversee work
- **admin**: Full system access and user management

## File Uploads

The system supports document uploads for service requests. Files are stored in:
```
backend/uploads/{TICKET_ID}/
```

Supported formats: PDF, images (JPG, PNG)

## Testing

### Test Database Connection
```bash
cd backend
node scripts/test-supabase-connection.js
```

### Test API
```bash
curl http://localhost:5000/api/test
```

## Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables
4. Deploy

### Backend (Railway/Render)
1. Push code to GitHub
2. Connect repository to hosting platform
3. Set environment variables
4. Deploy

See deployment guides:
- `DEPLOYMENT_GUIDE.md`
- `FRONTEND_DEPLOYMENT_READY.md`

## Troubleshooting

### Backend won't start
- Check if PostgreSQL is running
- Verify DATABASE_URL in .env
- Ensure port 5000 is not in use

### Frontend won't start
- Run `npm install` in frontend/vite-project
- Check if backend is running
- Verify VITE_API_URL in .env

### Database connection errors
- Test connection: `node scripts/test-supabase-connection.js`
- Verify Supabase credentials
- Check firewall settings

### Permission denied for nodemon
- Run: `npm install` in backend directory
- Use `npm start` instead of `npm run dev`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is proprietary software for PowerLink Ethiopia.


## Authors

PowerLink Ethiopia Development Team

---

**Version:** 1.0.0  
**Last Updated:** March 2026
