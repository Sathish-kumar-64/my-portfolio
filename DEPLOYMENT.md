# Production Deployment Guide - Sathish Kumar Portfolio

This document provides step-by-step instructions to deploy the Full Stack Portfolio website to production.

---

## 1. Database Setup: Neon PostgreSQL / Supabase

1. Create a free account at **[Neon.tech](https://neon.tech)** or **[Supabase.com](https://supabase.com)**.
2. Create a new PostgreSQL database named `portfolio_db`.
3. Copy your database connection string, formatted as:
   `postgres://[user]:[password]@[host]:5432/[database]?sslmode=require`

---

## 2. Backend Deployment: Render

1. Sign in to **[Render.com](https://render.com)**.
2. Click **New +** -> **Blueprints** and connect your GitHub repository `portfolio`.
3. Render will detect `backend/render.yaml` automatically.
4. Set the `DATABASE_URL` environment variable to your Neon/Supabase connection string.
5. Deploy the Blueprint. Once built, copy your backend URL e.g., `https://portfolio-backend-xyz.onrender.com`.
6. Run the initial data seed command from Render Shell:
   ```bash
   python manage.py seed_portfolio
   ```

---

## 3. Frontend Deployment: Vercel

1. Sign in to **[Vercel.com](https://vercel.com)**.
2. Click **Add New...** -> **Project** and import your `portfolio` repository.
3. Set **Root Directory** to `frontend`.
4. Add the Environment Variable:
   - `VITE_API_BASE_URL` = `https://portfolio-backend-xyz.onrender.com/api/v1`
5. Click **Deploy**. Vercel will build and serve your site at `https://portfolio-sathish.vercel.app`.

---

## 4. Environment Variables Checklist

### Backend (Render)
- `SECRET_KEY` = `your-production-secret-key`
- `DEBUG` = `False`
- `ALLOWED_HOSTS` = `.onrender.com,.vercel.app,yourcustomdomain.com`
- `DATABASE_URL` = `postgres://...`
- `CORS_ALLOWED_ORIGINS` = `https://your-app.vercel.app`

### Frontend (Vercel)
- `VITE_API_BASE_URL` = `https://portfolio-backend-xyz.onrender.com/api/v1`
