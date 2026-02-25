# Supabase Setup & User Registration Test Plan

## 🎯 Goal
Connect your PowerLink Ethiopia app to Supabase and test user registration.

---

## 📋 Step-by-Step Plan

### STEP 1: Create Supabase Account & Project (5 minutes)

1. **Go to Supabase**
   - Visit: https://supabase.com
   - Click "Start your project"
   - Sign up with GitHub or Email

2. **Create New Project**
   - Click "New Project"
   - **Organization**: Create new or use existing
   - **Project Name**: `PowerLink-Ethiopia`
   - **Database Password**: Create a strong password
     - Example: `PowerLink2024!Secure`
     - ⚠️ SAVE THIS PASSWORD - You'll need it!
   - **Region**: Choose closest to Ethiopia
     - Recommended: `Frankfurt (eu-central-1)` or `Mumbai (ap-south-1)`
   - **Pricing Plan**: Free
   - Click "Create new project"
   - ⏳ Wait 2-3 minutes for setup

---

### STEP 2: Get Database Connection Details (2 minutes)

1. **Navigate to Database Settings**
   - In your Supabase dashboard
   - Click **Settings** (gear icon in sidebar)
   - Click **Database**

2. **Copy Connection Info**
   - Scroll to "Connection string"
   - You'll see something like:
   ```
   Host: db.abcdefghijklmnop.supabase.co
   Database name: postgres
   Port: 5432
   User: postgres
   Password: [your password]
   ```

3. **Copy the Connection Pooling URI** (recommended for production)
   - Mode: Transaction
   - Copy the full URI

---

### STEP 3: Update Backend Configuration (3 minutes)

1. **Open `backend/.env` file**

2. **Replace with Supabase credentials:**

```env
# Supabase PostgreSQL Configuration
DB_HOST=db.abcdefghijklmnop.supabase.co
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=your_supabase_password_here

# JWT Secret (keep your existing one)
JWT_SECRET=your_jwt_secret_here

# Server Port
PORT=5000
```

3. **Save the file**

---

### STEP 4: Create Users Table in Supabase (3 minutes)

1. **Go to SQL Editor**
   - In Supabase dashboard
   - Click **SQL Editor** in sidebar
   - Click **New Query**

2. **Copy and paste this SQL:**

```sql
-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role VARCHAR(50) DEFAULT 'customer',
    phone VARCHAR(20),
    address TEXT,
    is_active BOOLEAN DEFAULT true,
    email_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- Insert test admin user
INSERT INTO users (
    email, 
    username, 
    password_hash, 
    first_name, 
    last_name, 
    role
) VALUES (
    'admin@powerlink.et',
    'admin',
    '$2a$10$YourHashedPasswordHere',  -- We'll update this later
    'System',
    'Administrator',
    'admin'
) ON CONFLICT (email) DO NOTHING;

-- Verify table creation
SELECT * FROM users;
```

3. **Click "Run"** (or press Ctrl+Enter)
4. **Verify**: You should see "Success. No rows returned" or the admin user

---

### STEP 5: Test Database Connection (2 minutes)

1. **Create test script** (I'll create this for you)

2. **Run the test:**
```bash
cd backend
node scripts/test-supabase-connection.js
```

3. **Expected output:**
```
✅ Connected to Supabase!
Server time: 2024-01-15 10:30:45
📋 Tables: ['users']
```

---

### STEP 6: Create Admin User (2 minutes)

1. **Run admin creation script:**
```bash
cd backend
node scripts/create-admin.js
```

2. **Expected output:**
```
✅ Admin user created successfully!
📧 Email:     admin@powerlink.et
🔑 Password:  12345678
```

---

### STEP 7: Start Backend Server (1 minute)

```bash
cd backend
node server.js
```

**Expected output:**
```
Server running on port 5000
Connected to PostgreSQL database
```

---

### STEP 8: Test User Registration (5 minutes)

#### Option A: Using Frontend (Recommended)

1. **Start frontend** (in new terminal):
```bash
cd frontend/vite-project
npm run dev
```

2. **Open browser**: http://localhost:5173

3. **Register a new user:**
   - Click "Register"
   - Fill in the form:
     - First Name: `Test`
     - Last Name: `User`
     - Email: `test@example.com`
     - Username: `testuser`
     - Password: `password123`
     - Phone: `0912345678`
   - Click "Register"

4. **Check Supabase:**
   - Go to Supabase dashboard
   - Click **Table Editor**
   - Select **users** table
   - You should see your new user!

#### Option B: Using Postman/Thunder Client

**POST** `http://localhost:5000/api/auth/register`

**Body (JSON):**
```json
{
  "firstName": "Test",
  "lastName": "User",
  "email": "test@example.com",
  "username": "testuser",
  "password": "password123",
  "phone": "0912345678"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": 2,
    "email": "test@example.com",
    "username": "testuser",
    "firstName": "Test",
    "lastName": "User",
    "role": "customer"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### STEP 9: Verify in Supabase Dashboard (2 minutes)

1. **Go to Table Editor**
   - Supabase dashboard → **Table Editor**
   - Click **users** table

2. **You should see:**
   - Admin user (id: 1)
   - Test user (id: 2)
   - All fields populated correctly
   - `created_at` timestamp
   - `password_hash` (encrypted)

3. **Check data:**
   - Email is unique
   - Username is unique
   - Role is 'customer'
   - Password is hashed (not plain text)

---

### STEP 10: Test User Login (2 minutes)

1. **Login with new user:**
   - Go to http://localhost:5173/login
   - Email: `test@example.com`
   - Password: `password123`
   - Click "Login"

2. **Expected result:**
   - Redirected to customer dashboard
   - Welcome message shows "Welcome, Test!"
   - Can access customer features

---

## 🔍 Verification Checklist

After completing all steps, verify:

- [ ] Supabase project created
- [ ] Database credentials updated in `.env`
- [ ] Users table created in Supabase
- [ ] Backend connects to Supabase successfully
- [ ] Admin user exists in database
- [ ] Backend server running without errors
- [ ] Frontend can register new users
- [ ] New users appear in Supabase Table Editor
- [ ] Passwords are hashed (not plain text)
- [ ] Users can login with registered credentials
- [ ] User data persists after server restart

---

## 🐛 Troubleshooting

### Error: "Connection refused"
**Solution:** Check if DB_HOST and DB_PASSWORD are correct in `.env`

### Error: "relation 'users' does not exist"
**Solution:** Run the SQL script in Step 4 again

### Error: "duplicate key value violates unique constraint"
**Solution:** User already exists. Try different email/username

### Error: "password authentication failed"
**Solution:** Double-check DB_PASSWORD in `.env` matches Supabase

### Backend won't start
**Solution:** 
1. Check `.env` file exists and has correct values
2. Run `npm install` in backend folder
3. Check if port 5000 is already in use

---

## 📊 What to Check in Supabase

### Table Editor View
```
id | email              | username  | first_name | last_name | role     | created_at
---+--------------------+-----------+------------+-----------+----------+------------
1  | admin@powerlink.et | admin     | System     | Admin...  | admin    | 2024-01-15
2  | test@example.com   | testuser  | Test       | User      | customer | 2024-01-15
```

### SQL Query to Check Users
```sql
SELECT 
    id, 
    email, 
    username, 
    first_name, 
    last_name, 
    role, 
    created_at 
FROM users 
ORDER BY created_at DESC;
```

---

## 🎉 Success Indicators

You'll know it's working when:

1. ✅ Backend logs show "Connected to PostgreSQL database"
2. ✅ Registration form submits without errors
3. ✅ New user appears in Supabase Table Editor
4. ✅ User can login with registered credentials
5. ✅ Dashboard shows correct user name
6. ✅ Data persists after page refresh

---

## 📝 Next Steps After Successful Test

1. Create other tables (announcements, service_requests, outages)
2. Test all features with Supabase
3. Enable Row Level Security (RLS) for production
4. Set up Supabase Storage for file uploads
5. Deploy backend to cloud (Render/Railway)
6. Deploy frontend to Vercel/Netlify

---

## 🆘 Need Help?

If you encounter issues:
1. Check backend console for error messages
2. Check browser console (F12) for frontend errors
3. Verify Supabase dashboard shows the users table
4. Test connection with the test script
5. Share error messages for specific help

---

## 📞 Support Resources

- Supabase Docs: https://supabase.com/docs
- Supabase Discord: https://discord.supabase.com
- PostgreSQL Docs: https://www.postgresql.org/docs/
