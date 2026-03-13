# Deployment Checklist

## ✅ Completed
- [x] Frontend deployed on Vercel
- [x] Database set up on Supabase
- [x] Backend prepared for deployment

## 🚀 Backend Deployment Steps

### Pre-deployment
- [ ] Backend code pushed to GitHub
- [ ] .gitignore file created
- [ ] Health endpoint added to server.js

### Render Configuration
- [ ] Render web service created
- [ ] GitHub repository connected
- [ ] Build/Start commands configured:
  - Build: `npm install`
  - Start: `npm start`
- [ ] Environment variables added:
  - [ ] `NODE_ENV=production`
  - [ ] `PORT=5000`
  - [ ] `DATABASE_URL=your_supabase_connection`
  - [ ] `JWT_SECRET=your_secret`

### Testing
- [ ] Health endpoint works: `/health`
- [ ] Database connection works: `/api/test`
- [ ] Authentication works: `/api/auth/login`
- [ ] CORS allows Vercel frontend

### Frontend Update
- [ ] Vercel environment variable updated with Render URL
- [ ] Frontend redeployed
- [ ] End-to-end testing completed

## 🔗 URLs
- Frontend: https://powerlinkethiopiasystem.vercel.app
- Backend: https://your-backend-url.onrender.com
- Database: Supabase

## 🛠️ Quick Commands

### Test Backend
```bash
# Health check
curl https://your-backend-url.onrender.com/health

# Database test
curl https://your-backend-url.onrender.com/api/test

# Login test
curl -X POST https://your-backend-url.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@powerlink.et","password":"admin123"}'
```

### Redeploy Frontend
```bash
# In Vercel dashboard or via CLI
vercel --prod
```

## ⚠️ Important Notes

1. **Free Tier Limitation**: Render free tier spins down after 15 minutes of inactivity
2. **Cold Start**: First request after spin-down takes 30-60 seconds
3. **File Uploads**: Use Supabase Storage instead of local filesystem
4. **Environment Variables**: Never commit .env files to GitHub

## 🆘 Troubleshooting

### Backend won't start
- Check Render logs in dashboard
- Verify environment variables
- Ensure DATABASE_URL is correct

### CORS errors
- Verify Vercel URL in allowedOrigins
- Check frontend VITE_API_URL

### Database connection fails
- Test Supabase connection string
- Check firewall settings
- Verify password in connection string

## 📞 Support
- Render: https://render.com/docs
- Vercel: https://vercel.com/docs
- Supabase: https://supabase.com/docs