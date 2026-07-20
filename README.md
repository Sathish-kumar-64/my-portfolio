# Sathish Kumar - Full Stack Developer Portfolio

A modern, high-performance, responsive Full Stack Portfolio website built with **React 19**, **Vite**, **Tailwind CSS**, **Django REST Framework**, **JWT Authentication**, and **PostgreSQL**.

Designed and engineered following **SOLID, KISS, and DRY principles** with a **Feature-Based (Micro-Folder) Architecture** and a reusable **Generic CRUD Engine**.

---

## 🌟 Architecture Overview

```
portfolio/
├── frontend/                     # React 19 + Vite + Tailwind CSS Application
│   ├── src/
│   │   ├── common/              # Shared Components, Utilities, Hooks & UI Layouts
│   │   ├── modules/             # Feature Modules (Home, About, Skills, Projects, Blog, Contact, Admin)
│   │   ├── services/            # Axios API Clients & Services
│   │   ├── assets/              # Static Assets & Icons
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── backend/                      # Django + DRF Clean Architecture Application
│   ├── config/                  # Django Global Settings & Routing
│   ├── modules/                 # Feature Apps (Profile, Skills, Projects, Experience, Certificates, Blog, Contact)
│   │   └── common/              # Reusable Generic CRUD Engine (Base Models, Serializers, Views, Pagination)
│   ├── manage.py
│   └── requirements.txt
│
└── README.md
```

---

## 🚀 Tech Stack

### Frontend
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS + Custom Dark Mode & Glassmorphism Design
- **Animations**: Framer Motion
- **Routing**: React Router DOM v7
- **HTTP Client**: Axios
- **Icons**: React Icons / Lucide React

### Backend
- **Core**: Django 5.x + Django REST Framework (DRF)
- **Authentication**: SimpleJWT (Access & Refresh Tokens)
- **Database**: PostgreSQL (Neon / Supabase)
- **API Documentation**: drf-spectacular (Swagger & Redoc)
- **Server**: Gunicorn

---

## 🛠️ Local Development Setup

### 1. Prerequisites
- Node.js (v18+)
- Python (v3.10+)
- PostgreSQL (or SQLite for quick local development)

### 2. Backend Setup
```bash
cd backend
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```
The Django API will be accessible at `http://127.0.0.1:8000/api/v1/`
Swagger API docs: `http://127.0.0.1:8000/api/schema/swagger-ui/`

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The React App will be accessible at `http://localhost:5173/`

---

## 🌐 Deployment Overview
- **Frontend**: Hosted on Vercel
- **Backend**: Hosted on Render
- **Database**: PostgreSQL on Neon / Supabase
- **CI/CD**: GitHub Actions

---

## 📝 License
MIT License. Created by Sathish Kumar.
