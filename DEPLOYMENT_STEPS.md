# Deployment Guide for Render & Vercel

## Prerequisites
- GitHub account with your code pushed
- Render account (free at render.com)
- Vercel account (free at vercel.com)
- MongoDB Atlas account (already set up ✓)

---

## PART 1: Deploy Backend to Render

### Step 1: Push Code to GitHub
```bash
cd c:\Users\DELL\OneDrive\Desktop\bnv
git add .
git commit -m "Setup for Render & Vercel deployment"
git push origin main
```

### Step 2: Create Render Web Service
1. Go to [render.com](https://render.com)
2. Sign in or create account
3. Click **"New +"** → **"Web Service"**
4. Connect your GitHub repository
5. Select **main** branch

### Step 3: Configure Deployment
- **Name**: `user-management-api`
- **Environment**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Plan**: Free (or Paid for production)

### Step 4: Add Environment Variables
In Render dashboard → Environment tab, add:
```
MONGODB_URI = mongodb+srv://harshingh28_db_user:Harsh1234@cluster0.gwccgof.mongodb.net/bnv?appName=Cluster0
PORT = 5000
NODE_ENV = production
CORS_ORIGIN = https://your-project.vercel.app (update after frontend deployment)
```

### Step 5: Deploy
- Click **"Deploy"**
- Build will take 3-5 minutes
- **Copy your backend URL**: `https://user-management-api.onrender.com` (or similar)

### Step 6: Update Backend CORS (After Frontend Deployed)
- Go back to Render → Environment Variables
- Update `CORS_ORIGIN` to include your Vercel frontend URL
- Example: `https://your-project.vercel.app,http://localhost:5173`

---

## PART 2: Deploy Frontend to Vercel

### Step 1: Ensure Files are Ready
Frontend `.env.production` is already set to:
```
VITE_API_URL=/api
```

This automatically routes API calls to `/api`, which will be handled by your backend.

### Step 2: Create Vercel Project
1. Go to [vercel.com](https://vercel.com)
2. Sign in or create account
3. Click **"Add New"** → **"Project"**
4. Import your GitHub repository
5. Click **"Import"**

### Step 3: Configure Build Settings
In the project settings:
- **Framework**: Select **"Vite"**
- **Root Directory**: `frontend-vite`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node Version**: 18.x

### Step 4: Add Environment Variables
Go to Settings → Environment Variables:
```
VITE_API_URL = /api
```

### Step 5: Deploy
- Click **"Deploy"**
- Build will take 1-2 minutes
- **Copy your frontend URL**: `https://your-project.vercel.app` (or similar)

---

## PART 3: Connect Frontend & Backend

### Step 1: Update Backend CORS in Render
1. Go to Render Dashboard → Your backend service
2. Go to **Environment** tab
3. Update `CORS_ORIGIN` to:
```
https://your-project.vercel.app,http://localhost:5173,http://localhost:3000
```
4. Your backend will automatically redeploy

### Step 2: Test the Connection
1. Open your Vercel frontend URL in browser: `https://your-project.vercel.app`
2. Try creating a new user
3. Open **DevTools** (F12) → **Network** tab
4. You should see API calls to `/api/users` returning **Status 200**
5. Users should appear on the list page

### Step 3: Enable Auto-Deployment
Both services automatically deploy when you push to GitHub:
- Push to `main` branch
- Render rebuilds backend (3-5 min)
- Vercel rebuilds frontend (1-2 min)
- Changes live automatically

---

## Deployment Summary

| Component | Platform | URL | Auto-Deploy |
|-----------|----------|-----|------------|
| **Backend API** | Render | https://user-management-api.onrender.com | Push to GitHub → Auto-build |
| **Frontend** | Vercel | https://your-project.vercel.app | Push to GitHub → Auto-build |

---

## Troubleshooting

### CORS Error in Frontend
**Error**: "Access to XMLHttpRequest blocked by CORS"
**Fix**: Update backend `CORS_ORIGIN` in Render to include your Vercel URL

### API Returns 404
**Error**: "Cannot POST /api/users"
**Possible causes**:
- Backend API not deployed yet
- VITE_API_URL not set correctly (`/api` is correct)
- Backend service not running on Render

**Fix**:
1. Verify backend is deployed and running on Render
2. Check Render service health in dashboard
3. Check API health at: https://user-management-api.onrender.com/api/health

### Frontend Not Loading
**Error**: "Cannot GET /"
**Fix**: 
1. Ensure frontend was built successfully (check Vercel build logs)
2. Vercel shows all build errors in dashboard
3. Try `npm run build` locally to verify

### MongoDB Connection Failed
**Error**: "MongooseServerSelectionError"
**Fix**:
1. Verify MongoDB URI is correct in Render environment variables
2. Go to MongoDB Atlas → Network Access
3. Ensure `0.0.0.0/0` (all IPs) is whitelisted
4. Restart the Render service

### Slow First Load on Render
Render free tier spins down after 15 min of inactivity. First request takes 30 sec to wake up.
- Upgrade to paid plan for instant starts
- Or visit regularly to keep it active

---

## Environment Variables Reference

### Backend (.env.production on Render)
```properties
MONGODB_URI=mongodb+srv://harshingh28_db_user:Harsh1234@cluster0.gwccgof.mongodb.net/bnv?appName=Cluster0
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://your-project.vercel.app,http://localhost:5173
```

### Frontend (.env.production on Vercel)
```properties
VITE_API_URL=/api
```

---

## Quick Links

- **Render Dashboard**: https://dashboard.render.com
- **Vercel Dashboard**: https://vercel.com/dashboard
- **MongoDB Atlas**: https://cloud.mongodb.com
- **GitHub**: https://github.com

---

## Next Steps After Deployment

1. ✅ Deploy backend to Render
2. ✅ Deploy frontend to Vercel
3. ✅ Test API connection
4. ✅ Enable auto-deployment
5. Set up monitoring (optional)
6. Add custom domain (optional)
7. Set up email notifications (optional)

---

**Your app is production-ready!** 🚀
