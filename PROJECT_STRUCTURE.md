# PowerLink Ethiopia - Project Structure

## 📁 Complete Folder Structure

```
Powerlink/
├── 📁 .gemini/                          # AI-generated documentation
│   ├── APPROVAL_REJECTION_NOTIFICATION_SYSTEM.md
│   ├── DEBUGGING_GUIDE.md
│   ├── DOCUMENT_SUBMISSION_FIX.md
│   ├── ISSUE_RESOLVED.md
│   ├── REJECTION_MODAL_IMPLEMENTATION.md
│   ├── TICKET_FLOW_GUIDE.md
│   └── TICKET_TRACKING_SYSTEM.md
│
├── 📁 .git/                             # Git version control
│   └── [Git internal files]
│
├── 📁 .vscode/                          # VS Code settings
│   └── settings.json
│
├── 📁 backend/                          # Node.js Backend Server
│   ├── 📁 .git/                         # Separate git for backend deployment
│   ├── 📁 config/                       # Database configurations
│   │   ├── database.js                  # PostgreSQL config
│   │   └── supabase-db.js              # Supabase connection
│   │
│   ├── 📁 database/                     # SQL schema files
│   │   ├── announcements.sql
│   │   ├── outages.sql
│   │   └── service_requests.sql
│   │
│   ├── 📁 node_modules/                 # Backend dependencies
│   │   └── [NPM packages]
│   │
│   ├── 📁 routes/                       # API route handlers
│   │   ├── announcements.js             # Announcements CRUD
│   │   ├── auth.js                      # Authentication routes
│   │   ├── notices.js                   # Notice management
│   │   ├── outages.js                   # Outage reporting
│   │   ├── service-requests.js          # Service request handling
│   │   ├── serviceRequests.js           # Alternative service requests
│   │   ├── uploads.js                   # File upload handling
│   │   └── users.js                     # User management
│   │
│   ├── 📁 scripts/                      # Utility scripts
│   │   ├── check-admin.js               # Admin verification
│   │   ├── create-admin-supabase.js     # Create admin user
│   │   ├── create-admin.js              # Local admin creation
│   │   ├── create-all-supabase-tables.js # Database setup
│   │   ├── create-supabase-tables.js    # Table creation
│   │   ├── db_init_notices.js           # Initialize notices
│   │   ├── db_init_outages.js           # Initialize outages
│   │   ├── db_init_service_requests.js  # Initialize service requests
│   │   ├── modify_users_table.js        # User table modifications
│   │   ├── reset-admin-password.js      # Password reset
│   │   ├── test-direct.js               # Direct DB test
│   │   ├── test-password.js             # Password testing
│   │   ├── test-supabase-connection.js  # Connection testing
│   │   └── test-supabase-pooler.js      # Pool testing
│   │
│   ├── 📁 uploads/                      # File storage (ephemeral on Render)
│   │   ├── SRV-2024-00222/             # Ticket-specific uploads
│   │   ├── SRV-2024-03296/
│   │   ├── SRV-2024-03452/
│   │   ├── SRV-2024-03660/
│   │   ├── SRV-2024-03742/
│   │   ├── SRV-2024-04218/
│   │   ├── SRV-2024-04643/
│   │   ├── SRV-2024-05277/
│   │   ├── SRV-2024-05359/
│   │   ├── SRV-2024-06130/
│   │   ├── SRV-2024-06844/
│   │   ├── SRV-2024-07025/
│   │   ├── SRV-2024-07340/
│   │   ├── SRV-2024-08378/
│   │   └── SRV-2024-08725/
│   │
│   ├── .env                             # Environment variables (not committed)
│   ├── .gitignore                       # Git ignore rules
│   ├── package.json                     # Backend dependencies
│   ├── package-lock.json                # Dependency lock file
│   └── server.js                        # Main server file
│
├── 📁 frontend/                         # React Frontend Application
│   └── 📁 vite-project/                 # Vite React project
│       ├── 📁 node_modules/             # Frontend dependencies
│       │   └── [NPM packages]
│       │
│       ├── 📁 public/                   # Static assets
│       │   └── vite.svg                 # Vite logo
│       │
│       ├── 📁 src/                      # Source code
│       │   ├── 📁 assets/               # Images and static files
│       │   │   ├── 📁 back gallery/     # Background images
│       │   │   ├── 24seven.png
│       │   │   ├── 24sevenn.jpg
│       │   │   ├── award.jpg
│       │   │   ├── back.jpg
│       │   │   ├── back1.jpg
│       │   │   ├── bulboff.jpg
│       │   │   ├── bulbon.jpg
│       │   │   ├── connections.jpg
│       │   │   ├── image.png
│       │   │   ├── linked in background.png
│       │   │   ├── Linkedin.png
│       │   │   ├── logo.avif
│       │   │   ├── logo1.jpg
│       │   │   ├── mission.png
│       │   │   ├── powerlink.avif
│       │   │   ├── react.svg
│       │   │   ├── relocation.jpg
│       │   │   └── urgent.jpg
│       │   │
│       │   ├── 📁 Auth/                 # Authentication components
│       │   │   ├── Login.jsx            # Login form
│       │   │   └── Register.jsx         # Registration form
│       │   │
│       │   ├── 📁 components/           # Reusable components
│       │   │   ├── AdminAnnouncements.jsx # Admin announcement management
│       │   │   └── SimpleGISMap.jsx     # Map component
│       │   │
│       │   ├── 📁 config/               # Configuration files
│       │   │   └── api.js               # API configuration
│       │   │
│       │   ├── 📁 hooks/                # Custom React hooks
│       │   │   └── useAnnouncements.js  # Announcements hook
│       │   │
│       │   ├── 📁 Navbar/               # Navigation components
│       │   │   ├── About.jsx            # About page
│       │   │   ├── Contact.jsx          # Contact page
│       │   │   ├── DashboardLayout.jsx  # Dashboard wrapper
│       │   │   ├── Home.jsx             # Home page
│       │   │   ├── HomeImage.css        # Home styling
│       │   │   ├── Services.jsx         # Services page
│       │   │   ├── Sidebar.jsx          # Main sidebar
│       │   │   ├── SupervisorSidebar.jsx # Supervisor navigation
│       │   │   └── TechnicianSidebar.jsx # Technician navigation
│       │   │
│       │   ├── 📁 RolePages/            # Role-based pages
│       │   │   ├── 📁 Admin/            # Administrator pages
│       │   │   │   ├── AdminDashboard.jsx    # Admin dashboard
│       │   │   │   ├── Chat.jsx              # Admin chat
│       │   │   │   ├── ManageAcc.jsx         # Account management
│       │   │   │   ├── ManageAccounts.jsx    # User accounts
│       │   │   │   ├── NoticeAndAlerts.jsx   # Announcements
│       │   │   │   ├── Report.jsx            # Reports
│       │   │   │   └── StaffRegister.jsx     # Staff registration
│       │   │   │
│       │   │   ├── 📁 Customer/         # Customer pages
│       │   │   │   ├── CustDashboard.jsx     # Customer dashboard
│       │   │   │   ├── Request_Service.jsx   # Service requests
│       │   │   │   └── Ticket.jsx            # Ticket tracking
│       │   │   │
│       │   │   ├── 📁 Supervisor/       # Supervisor pages
│       │   │   │   ├── DocValidation.jsx     # Document validation
│       │   │   │   ├── ManageRequest.jsx     # Request management
│       │   │   │   ├── SupervisorDashboard.jsx # Supervisor dashboard
│       │   │   │   └── SupervisorLayout.jsx  # Supervisor layout
│       │   │   │
│       │   │   └── 📁 Technician/       # Technician pages
│       │   │       ├── TaskList.jsx          # Task management
│       │   │       ├── TechDashboard.jsx     # Technician dashboard
│       │   │       └── TechLayout.jsx        # Technician layout
│       │   │
│       │   ├── App.css                  # Global styles
│       │   ├── App.jsx                  # Main App component
│       │   ├── index.css                # Base styles
│       │   └── main.jsx                 # React entry point
│       │
│       ├── .env.example                 # Environment template
│       ├── .gitignore                   # Git ignore rules
│       ├── DEPLOY_NOW.md                # Quick deploy guide
│       ├── DEPLOYMENT_CHECKLIST.md     # Deployment checklist
│       ├── DEPLOYMENT_GUIDE.md          # Detailed deployment guide
│       ├── eslint.config.js             # ESLint configuration
│       ├── index.html                   # HTML template
│       ├── package.json                 # Frontend dependencies
│       ├── package-lock.json            # Dependency lock file
│       ├── pre-deploy-check.js          # Pre-deployment checks
│       ├── QUICK_DEPLOY.md              # Quick deployment
│       ├── README_DEPLOYMENT.md         # Deployment README
│       ├── README.md                    # Frontend README
│       ├── VERCEL_TROUBLESHOOTING.md   # Vercel troubleshooting
│       ├── vercel.json                  # Vercel configuration
│       └── vite.config.js               # Vite configuration
│
├── 📄 Root Level Files                  # Project documentation
├── .gitignore                           # Main git ignore
├── CONNECT_FRONTEND_BACKEND.md          # Connection guide
├── DEPLOYMENT_ARCHITECTURE.md          # Architecture overview
├── DEPLOYMENT_CHECKLIST.md             # Deployment checklist
├── DEPLOYMENT_SUMMARY.md               # Deployment summary
├── FRONTEND_DEPLOYMENT_READY.md        # Frontend deployment
├── package.json                        # Root package.json
├── package-lock.json                   # Root lock file
├── QUICK_START_SUPABASE.md             # Supabase quick start
├── README.md                           # Main project README
├── RENDER_DEPLOYMENT_GUIDE.md          # Render deployment guide
├── server_startup_plan.md              # Server startup plan
├── SETUP_COMPLETE.md                   # Setup completion
├── SUPABASE_MIGRATION_GUIDE.md         # Database migration
├── SUPABASE_SETUP_PLAN.md              # Database setup
├── SUPABASE_TABLES.sql                 # Database schema
├── temp_home.jsx                       # Temporary home component
└── test-backend.sh                     # Backend testing script
```

## 🏗️ Architecture Overview

### Frontend (React + Vite)
- **Framework**: React 19.2.0 with Vite 7.2.4
- **Styling**: Tailwind CSS 4.1.18
- **Routing**: React Router DOM 7.11.0
- **State Management**: React hooks + Context
- **Animations**: Framer Motion
- **Charts**: Recharts
- **HTTP Client**: Axios
- **Icons**: Lucide React

### Backend (Node.js + Express)
- **Runtime**: Node.js with Express 4.18.2
- **Database**: PostgreSQL via Supabase
- **Authentication**: JWT + Bcrypt
- **File Uploads**: Multer
- **CORS**: Enabled for cross-origin requests
- **Environment**: dotenv for configuration

### Database (Supabase PostgreSQL)
- **Tables**: users, announcements, outages, service_requests
- **Features**: Row Level Security, Real-time subscriptions
- **Storage**: File uploads (recommended over local storage)

## 🚀 Deployment Stack

### Current Deployment
- **Frontend**: Vercel (https://powerlinkethiopiasystem.vercel.app)
- **Database**: Supabase (PostgreSQL)
- **Backend**: Ready for Render deployment

### Recommended Production Stack
- **Frontend**: Vercel (CDN, automatic deployments)
- **Backend**: Render ($7/month for always-on)
- **Database**: Supabase (managed PostgreSQL)
- **File Storage**: Supabase Storage (persistent)
- **Monitoring**: Render logs + Supabase dashboard

## 📋 Key Features by Role

### Customer Features
- Service request submission
- Outage reporting
- Ticket tracking
- Profile management

### Technician Features
- Task assignment view
- Work progress updates
- Customer information access

### Supervisor Features
- Request assignment
- Document validation
- Team management
- Progress monitoring

### Admin Features
- User management
- System announcements
- Analytics and reports
- Staff registration

## 🔧 Development Commands

### Backend
```bash
cd backend
npm install          # Install dependencies
npm run dev          # Development with nodemon
npm start            # Production mode
```

### Frontend
```bash
cd frontend/vite-project
npm install          # Install dependencies
npm run dev          # Development server
npm run build        # Production build
npm run preview      # Preview production build
```

## 📦 Key Dependencies

### Backend Dependencies
- **express**: Web framework
- **pg**: PostgreSQL client
- **jsonwebtoken**: JWT authentication
- **bcryptjs**: Password hashing
- **multer**: File uploads
- **cors**: Cross-origin requests
- **dotenv**: Environment variables

### Frontend Dependencies
- **react**: UI library
- **react-router-dom**: Routing
- **axios**: HTTP client
- **tailwindcss**: CSS framework
- **framer-motion**: Animations
- **recharts**: Data visualization
- **lucide-react**: Icons

## 🔐 Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=production
DATABASE_URL=postgresql://...
JWT_SECRET=your_secret_key
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-url.onrender.com
```

## 📁 Important Directories

- **`backend/routes/`**: API endpoint definitions
- **`backend/scripts/`**: Database and admin utilities
- **`frontend/src/RolePages/`**: Role-specific UI components
- **`frontend/src/components/`**: Reusable React components
- **`backend/uploads/`**: File storage (ephemeral on Render)

## 🚨 Deployment Notes

1. **File Uploads**: Use Supabase Storage in production (Render filesystem is ephemeral)
2. **Environment Variables**: Never commit .env files
3. **CORS**: Update allowedOrigins with production URLs
4. **Database**: Supabase handles backups and scaling
5. **Monitoring**: Use Render logs and Supabase dashboard

This structure supports a scalable, role-based electricity service management system with clear separation of concerns and modern development practices.