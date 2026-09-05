# Bug Bounty Platform - Project Summary

## 📋 Project Overview
This is a **Bug Bounty Platform** that connects companies with security researchers (debuggers) to find and fix security vulnerabilities. Companies can post bounty programs, and researchers can submit bug reports to earn rewards, certifications, and badges.

## 🏗️ Architecture

### Frontend (HTML/CSS/JS)
- **Static Website** with multiple pages
- **Tech Stack**: Vanilla HTML, CSS, JavaScript
- **Location**: Root directory (`X:\Bug-Bounty\`)

### Backend (Node.js/Express/TypeScript)
- **RESTful API** built with Express
- **Tech Stack**: 
  - Node.js v20+
  - TypeScript
  - Express v5
  - Prisma ORM
  - PostgreSQL database
  - JWT authentication
  - Cloudinary (image uploads)
- **Location**: `X:\Bug-Bounty\backend\`

## 📁 Project Structure

```
Bug-Bounty/
├── Frontend (Root)
│   ├── index.html          # Landing/home page
│   ├── login.html          # Login page
│   ├── signup.html         # Signup page
│   ├── discover.html       # Dashboard
│   ├── bounties.html       # Browse bounties
│   ├── bug.html            # Bug details
│   ├── mybug.html          # User's submitted bugs
│   ├── newbug.html         # Submit new bug
│   ├── profile.html        # User profile
│   ├── blog.html           # Blog page
│   ├── admin.html          # Admin panel
│   ├── builders.html       # Builders/developers page
│   ├── css/                # Stylesheets
│   ├── js/                 # JavaScript files
│   └── images/             # Images and assets
│
└── backend/
    ├── src/
    │   ├── server.ts       # Server entry point
    │   ├── app.ts          # Express app configuration
    │   ├── modules/        # Feature modules
    │   │   ├── auth/       # Authentication
    │   │   ├── company/    # Company management
    │   │   ├── program/    # Bounty programs
    │   │   ├── report/     # Bug reports
    │   │   ├── leaderboard/
    │   │   ├── notifications/
    │   │   └── researchers/
    │   ├── config/         # Configuration
    │   └── middleware/     # Express middleware
    ├── prisma/
    │   ├── schema.prisma   # Database schema
    │   └── migrations/     # Database migrations
    ├── package.json
    ├── .env                # Environment variables (EXISTS)
    └── .env.example        # Example environment config
```

## 🎯 Key Features

### For Companies
- Register and create company profiles
- Post bounty programs with rewards
- Review and manage bug submissions
- Award badges and certifications to researchers

### For Researchers/Debuggers
- Browse available bounty programs
- Submit bug reports
- Earn rewards and certifications
- Track performance on leaderboard
- Build reputation through badges

### Platform Features
- User authentication (JWT-based)
- Role-based access (Researcher, Company, Admin)
- File uploads (Cloudinary integration)
- Rate limiting for API protection
- Secure bug report submission
- Leaderboard system
- Notification system

## 🔌 API Endpoints

Based on `app.ts`, the backend provides:

- **Auth**: `/api/v1/auth/*` - Login, signup, token refresh
- **User Profile**: `/api/v1/auth/me` - Current user info
- **Companies**: `/api/v1/company/*` - Company CRUD operations
- **Programs**: `/api/v1/program/*` - Bounty program management
- **Reports**: `/api/v1/report/*` - Bug report submissions
- **Health Check**: `/health` - Server health status

## 🗄️ Database

- **Type**: PostgreSQL
- **ORM**: Prisma
- **Status**: Schema and migrations exist

### Main Models (from schema.prisma):
- Users (with roles: RESEARCHER, COMPANY, ADMIN)
- Companies
- Programs (Bounty programs)
- Reports (Bug submissions)
- Rewards
- Notifications
- Leaderboard entries
- Verifications

## 🚀 How to Run

### Prerequisites
- ✅ Node.js v20+ (Installed)
- ✅ npm (Installed)
- ⚠️  PostgreSQL database (Need to verify)
- ✅ Backend dependencies (Installed)
- ✅ .env file (EXISTS)

### Running the Backend
```bash
cd X:/Bug-Bounty/backend

# Generate Prisma Client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Start development server
npm run dev

# Backend will run on: http://localhost:4000
```

### Running the Frontend
```bash
# Option 1: Use a simple HTTP server
cd X:/Bug-Bounty
npx http-server -p 3000

# Option 2: Use Python
python -m http.server 3000

# Option 3: Use live-server (with auto-reload)
npx live-server --port=3000

# Frontend will run on: http://localhost:3000
```

## 🔐 Environment Configuration

The backend `.env` file is configured with:
- Database connection (PostgreSQL)
- JWT secrets for authentication
- Cloudinary for file uploads
- Cookie configuration
- Rate limiting settings
- Email service configuration

## 🌐 Live Deployment

Based on index.html:
- **Domain**: https://bugbounty.arpitgarg.xyz/
- **Google Analytics**: Configured (G-9B6GBHEL5H)

## 📝 Recent Git Activity

```
190df9a - gtag
35ae844 - links and my bug and blog page build
2ff988f - links updation and profile page updation
8df99fa - some connection of files done
```

## 🔧 Tech Stack Summary

**Frontend:**
- HTML5, CSS3, JavaScript (ES6+)
- Custom animations and cursor effects
- Responsive design
- Google Fonts (Moderustic, Urbanist)

**Backend:**
- Node.js + Express 5
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT authentication
- bcrypt for password hashing
- Cloudinary for file storage
- Helmet (security)
- CORS enabled
- Rate limiting
- Winston/Pino logging

## 🎨 UI/UX Features

- Custom cursor effects
- Particle effects on login page
- Responsive navigation
- Modern card-based layouts
- Mobile-friendly design
- Interactive elements and animations
