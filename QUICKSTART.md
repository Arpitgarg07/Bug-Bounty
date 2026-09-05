# 🐛 Bug Bounty Platform

A full-stack bug bounty platform connecting companies with security researchers.

## 🚀 Quick Start

### Windows (Easiest)
Just double-click `start.bat` in the project root!

### Manual Start

**Terminal 1 - Backend:**
```bash
cd X:/Bug-Bounty/backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd X:/Bug-Bounty
npx http-server -p 3000
```

## 🌐 Access URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **Health Check**: http://localhost:4000/health

## 🔐 Test Login

After signup, use your credentials. Example:
- **Email**: john@example.com
- **Password**: Test@1234 _(must have: uppercase, lowercase, number, special char, 8+ chars)_

## 📋 Prerequisites

- ✅ Node.js v20+
- ✅ PostgreSQL running
- ✅ Database: `bugbounty_db` created
- ✅ npm dependencies installed

## 📚 Documentation

See `PRODUCTION_SETUP.md` for complete documentation including:
- Full authentication flow
- API endpoints
- Database schema
- Security features
- Testing guide

## 🎯 Features

✅ User Authentication (JWT)
✅ Role-based Access (Researcher, Company, Admin)
✅ Protected Routes
✅ Bug Submission System
✅ Bounty Programs
✅ Company Profiles
✅ Responsive Design
✅ Real-time Form Validation

## 🔧 Tech Stack

**Frontend:**
- HTML5, CSS3, JavaScript (ES6+)
- Fetch API for HTTP requests
- LocalStorage for session management

**Backend:**
- Node.js + Express 5
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- bcrypt Password Hashing

## 📝 Project Status

🟢 **Production Ready** - All core features implemented and working!

---

Made with ❤️ by Arpit Garg
