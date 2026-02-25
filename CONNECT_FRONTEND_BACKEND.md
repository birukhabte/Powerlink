# Connect Frontend and Backend on Vercel

Both your frontend and backend are deployed on Vercel. Now you need to connect them.

## Step 1: Get Your Backend URL

1. Go to https://vercel.com/dashboard
2. Find your **backend** project
3. Copy the URL (e.g., `https://powerlink-backend.vercel.app`)

## Step 2: Add Backend URL to Frontend

### Via Vercel Dashboard:

1. Go to your **frontend** project in Vercel
2. Click **Settings** → **Environment Variables**
3. Click **Add New**
4. Enter:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://your-backend-url.vercel.app` (paste your backend URL)
   - **Environments**: Check **Production**, **Preview**, **Development**
5. Click **Save**

### Via CLI:

```bash
cd frontend/vite-project

vercel env add VITE_API_URL production
# Enter your backend URL when prompted

vercel env add VITE_API_URL preview
# Enter your backend URL when prompted

vercel --prod
```

## Step 3: Update Backend CORS

1. Open `backend/server.js`
2. Find the line with `'https://your-frontend-url.vercel.app'`
3. Replace it with your actual frontend URL
4. Commit and push:

```bash
git add backend/server.js
git commit -m "Update CORS with frontend URL"
git push
```

Vercel will automatically redeploy your backend.

## Step 4: Redeploy Frontend

After adding the environment variable:

1. Go to your frontend project in Vercel
2. Click **Deployments**
3. Click the **three dots** on the latest deployment
4. Click **Redeploy**

## Step 5: Test

Visit your frontend URL and try:
- Login
- Registration
- Any API call

You should no longer see "Cannot connect to server" error!

---

## Quick Reference

**Frontend URL**: `https://your-frontend.vercel.app`  
**Backend URL**: `https://your-backend.vercel.app`  
**Environment Variable**: `VITE_API_URL` = Backend URL

---

## Troubleshooting

### Still seeing "Cannot connect to server"?

1. **Check environment variable is set**:
   - Frontend Settings → Environment Variables
   - Verify `VITE_API_URL` exists

2. **Check backend is running**:
   - Visit: `https://your-backend-url.vercel.app/api/test`
   - Should return database timestamp

3. **Check CORS**:
   - Open browser console (F12)
   - Look for CORS errors
   - Make sure frontend URL is in backend's `allowedOrigins`

4. **Redeploy both**:
   - Redeploy backend first
   - Then redeploy frontend

---

## Environment Variables Summary

### Frontend (Vercel)
```
VITE_API_URL=https://your-backend.vercel.app
```

### Backend (Vercel)
```
DB_HOST=aws-1-eu-west-1.pooler.supabase.com
DB_PORT=6543
DB_NAME=postgres
DB_USER=postgres.dzgqffcebxrsbjyiitij
DB_PASSWORD=k7jeoEeP5iNBVefP
DATABASE_URL=postgresql://postgres.dzgqffcebxrsbjyiitij:k7jeoEeP5iNBVefP@aws-1-eu-west-1.pooler.supabase.com:6543/postgres
JWT_SECRET=ffd2968ae853c6f2cda1f67cc6e973dc4932574453dcd25de6fef3a98a3
PORT=5000
NODE_ENV=production
```

Make sure all these are set in your backend's Vercel environment variables!

---

## Success!

Once configured correctly:
- ✅ Frontend can call backend APIs
- ✅ Backend can access Supabase database
- ✅ CORS allows frontend-backend communication
- ✅ Your app works end-to-end!

🚀 Your PowerLink Ethiopia app is now fully deployed!
