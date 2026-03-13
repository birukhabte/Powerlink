# PowerLink Backend Deployment Guide - Render

Complete step-by-step guide to deploy your Node.js backend to Render.

## Prerequisites

- GitHub account
- Render account (free tier available at https://render.com)
- Supabase database already set up
- Backend code ready to deploy

## Deployment Steps

### Step 1: Prepare Your Backend for Deployment

#### 1.1 Create a `.gitignore` file in backend directory

```bash
node_modules/
.env
uploads/
*.log
.DS_Store
```

#### 1.2 Verify `package.json` has correct start script

Your backend/package.json should have:
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

#### 1.3 Update CORS configuration in `server.js`

Make sure your server.js includes your production frontend URL:
```javascript
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://powerlinkethiopiasystem.vercel.app',
  'https://your-frontend-domain.vercel.app', // Add your actual frontend URL
];
```

#### 1.4 Add health check endpoint (if not exists)

Add this to your server.js:
```javascript
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});
```

### Step 2: Push Code to GitHub

#### 2.1 Initialize Git (if not already done)

```bash
cd backend
git init
git add .
git commit -m "Initial backend commit for Render deployment"
```

#### 2.2 Create GitHub Repository

1. Go to https://github.com/new
2. Create a new repository (e.g., "powerlink-backend")
3. Don't initialize with README (you already have code)

#### 2.3 Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/powerlink-backend.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy on Render

#### 3.1 Create New Web Service

1. Go to https://dashboard.render.com
2. Click "New +" button
3. Select "Web Service"
4. Click "Connect a repository"
5. Authorize Render to access your GitHub
6. Select your backend repository

#### 3.2 Configure Web Service

Fill in the following settings:

**Basic Settings:**
- **Name:** `powerlink-backend` (or your preferred name)
- **Region:** Choose closest to your users (e.g., Frankfurt, Singapore)
- **Branch:** `main`
- **Root Directory:** `backend` (if backend is in subdirectory) OR leave blank if backend is at root
- **Runtime:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`

**Instance Type:**
- Select **Free** (for testing) or **Starter** ($7/month for production)

#### 3.3 Add Environment Variables

Click "Advanced" and add these environment variables:

```
PORT=5000
NODE_ENV=production
DATABASE_URL=your_supabase_connection_string
JWT_SECRET=your_secure_jwt_secret_key_here
```

**Important:** 
- Get DATABASE_URL from Supabase: Project Settings > Database > Connection String (URI)
- Generate a strong JWT_SECRET: `openssl rand -base64 32`

#### 3.4 Configure Auto-Deploy

- Enable "Auto-Deploy" (deploys automatically on git push)

#### 3.5 Create Web Service

Click "Create Web Service" button

### Step 4: Monitor Deployment

#### 4.1 Watch Build Logs

Render will show real-time logs:
- Installing dependencies
- Starting server
- Health checks

#### 4.2 Wait for Deployment

First deployment takes 2-5 minutes. Status will change from:
- "Building" → "Deploying" → "Live"

#### 4.3 Get Your Backend URL

Once live, Render provides a URL like:
```
https://powerlink-backend.onrender.com
```

### Step 5: Test Your Deployment

#### 5.1 Test Health Endpoint

```bash
curl https://powerlink-backend.onrender.com/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

#### 5.2 Test Database Connection

```bash
curl https://powerlink-backend.onrender.com/api/test
```

Expected response:
```json
{
  "message": "Database connected successfully!",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

#### 5.3 Test Authentication

```bash
curl -X POST https://powerlink-backend.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@powerlink.et","password":"admin123"}'
```

### Step 6: Update Frontend Configuration

Update your frontend `.env` file:

```env
VITE_API_URL=https://powerlink-backend.onrender.com
```

Redeploy your frontend on Vercel with the new API URL.

### Step 7: Configure Custom Domain (Optional)

#### 7.1 Add Custom Domain in Render

1. Go to your service settings
2. Click "Custom Domains"
3. Add your domain (e.g., api.powerlink.et)

#### 7.2 Update DNS Records

Add CNAME record in your DNS provider:
```
Type: CNAME
Name: api
Value: powerlink-backend.onrender.com
```

## Important Render Considerations

### Free Tier Limitations

- **Spins down after 15 minutes of inactivity**
- First request after spin-down takes 30-60 seconds (cold start)
- 750 hours/month free (enough for one service)
- Shared CPU and 512MB RAM

### Paid Tier Benefits ($7/month)

- Always running (no cold starts)
- Better performance
- More resources
- Custom domains included

### File Uploads

Render's filesystem is ephemeral. For persistent file storage:

**Option 1: Use Supabase Storage**
```javascript
// Install: npm install @supabase/supabase-js
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Upload file
const { data, error } = await supabase.storage
  .from('documents')
  .upload(`${ticketId}/${filename}`, file);
```

**Option 2: Use AWS S3 or Cloudinary**

## Troubleshooting

### Build Fails

**Error:** `Cannot find module`
- Solution: Ensure all dependencies are in package.json
- Run: `npm install --save missing-package`

**Error:** `ENOENT: no such file or directory`
- Solution: Check Root Directory setting in Render
- If backend is in subdirectory, set Root Directory to `backend`

### Server Won't Start

**Error:** `Port already in use`
- Solution: Use `process.env.PORT` in server.js
```javascript
const PORT = process.env.PORT || 5000;
```

**Error:** `Database connection failed`
- Solution: Verify DATABASE_URL environment variable
- Check Supabase connection string format

### CORS Errors

**Error:** `Access-Control-Allow-Origin`
- Solution: Add frontend URL to allowedOrigins in server.js
- Redeploy backend after changes

### Cold Starts (Free Tier)

**Issue:** First request takes 30-60 seconds
- Solution 1: Upgrade to paid tier ($7/month)
- Solution 2: Use a cron job to ping your API every 10 minutes
- Solution 3: Use UptimeRobot (free) to keep service awake

### Environment Variables Not Working

- Check spelling and case sensitivity
- Restart service after adding variables
- Verify in Render dashboard under "Environment"

## Monitoring & Maintenance

### View Logs

1. Go to Render dashboard
2. Select your service
3. Click "Logs" tab
4. View real-time logs

### Set Up Alerts

1. Go to service settings
2. Enable "Deploy Notifications"
3. Add email or Slack webhook

### Manual Redeploy

1. Go to service dashboard
2. Click "Manual Deploy"
3. Select "Clear build cache & deploy"

## Security Best Practices

1. **Never commit .env files**
2. **Use strong JWT secrets** (32+ characters)
3. **Enable HTTPS only** (Render provides free SSL)
4. **Restrict CORS** to your frontend domains only
5. **Keep dependencies updated**: `npm audit fix`
6. **Use environment variables** for all secrets

## Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] .env file NOT committed
- [ ] package.json has correct start script
- [ ] CORS configured with production URLs
- [ ] Render web service created
- [ ] Environment variables added
- [ ] Deployment successful
- [ ] Health endpoint tested
- [ ] Database connection tested
- [ ] API endpoints tested
- [ ] Frontend updated with new API URL
- [ ] Frontend redeployed

## Cost Estimate

### Free Tier
- **Cost:** $0/month
- **Limitations:** Cold starts, 750 hours/month
- **Best for:** Testing, development

### Starter Tier
- **Cost:** $7/month
- **Benefits:** Always on, better performance
- **Best for:** Production

### Pro Tier
- **Cost:** $25/month
- **Benefits:** More resources, priority support
- **Best for:** High traffic applications

## Next Steps

1. Deploy backend to Render
2. Test all endpoints
3. Update frontend with production API URL
4. Monitor logs for errors
5. Set up uptime monitoring
6. Consider upgrading to paid tier for production

## Support

- Render Documentation: https://render.com/docs
- Render Community: https://community.render.com
- Render Status: https://status.render.com

---

**Deployment Time:** ~10 minutes  
**First Deploy:** 2-5 minutes  
**Subsequent Deploys:** 1-2 minutes
