# Bug Bounty Platform

A full-stack bug bounty platform with a static HTML/CSS/JS frontend and a TypeScript + Express + Prisma backend.

## What this repository contains

- User authentication (email/password + Google OAuth)
- Company profile creation
- Program (bounty) creation and listing
- Bug report submission and user report tracking
- Newsletter subscription endpoint
- Multi-page frontend with protected routes for authenticated users

## Tech stack

### Frontend
- HTML, CSS, vanilla JavaScript
- Static hosting (served locally with `http-server`)

### Backend
- Node.js + TypeScript
- Express 5
- Prisma ORM
- PostgreSQL
- Zod validation
- JWT-based authentication

## Project structure

```text
Bug-Bounty/
├── index.html                # Landing page
├── login.html                # Login page
├── signup.html               # Signup page (freelancer/company)
├── auth-callback.html        # OAuth callback page
├── discover.html             # Dashboard (protected)
├── mybug.html                # User reports page (protected)
├── newbug.html               # New bug UI page (protected)
├── profile.html              # Profile page (protected)
├── bounties.html             # Bounties listing UI
├── bug.html                  # Bug details UI
├── blog.html                 # Blog page
├── builders.html             # Builders page
├── admin.html                # Admin UI page
├── card.html
├── preloader.html
├── compiler.html
├── css/                      # Page-level and shared styles
├── js/                       # Frontend behavior/auth/navigation scripts
├── images/                   # Static assets and favicon set
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma     # Database schema
│   │   └── migrations/       # Prisma migrations
│   ├── src/
│   │   ├── app.ts            # Express app + middleware + route mounting
│   │   ├── server.ts         # HTTP server bootstrap/shutdown
│   │   ├── config/           # Env, logger, prisma, passport config
│   │   ├── common/           # Shared API/error helpers
│   │   ├── middleware/       # Error middleware
│   │   ├── services/         # Email service
│   │   └── modules/
│   │       ├── auth/
│   │       ├── company/
│   │       ├── program/
│   │       ├── report/
│   │       └── notification/
│   └── package.json
├── start.sh                  # Start backend + frontend (Unix)
├── start.bat                 # Start backend + frontend (Windows)
├── start-backend.sh          # Start backend only (Unix)
└── start-backend.bat         # Start backend only (Windows)
```

## Backend API routes

Base URL: `http://localhost:4000/api/v1`

### Auth
- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me` (auth required)
- `GET /auth/google`
- `GET /auth/google/callback`

### Company
- `POST /company` (auth required)
- `GET /company/me` (auth required)

### Program
- `POST /program` (auth required)
- `GET /program`
- `GET /program/:id`
- `PATCH /program/:id/activate` (auth required)

### Report
- `POST /report` (auth required)
- `GET /report/my` (auth required)
- `GET /report/:id` (auth required)

### Notification
- `POST /notification/subscribe`

### Health
- `GET /health`

## Local setup

## 1) Install dependencies

```bash
# backend dependencies
cd backend
npm install
```

## 2) Configure environment

Create `backend/.env` and provide all variables required by `backend/src/config/env.ts`.

## 3) Run database migrations

```bash
cd backend
npm run prisma:generate
npm run prisma:migrate
```

## 4) Start backend

```bash
cd backend
npm run dev
```

Backend runs on `http://localhost:4000`.

## 5) Start frontend

From repository root:

```bash
npx http-server -p 3000
```

Frontend runs on `http://localhost:3000`.

## Frontend authentication behavior

- Session tokens/user are stored in `localStorage` (`bb_access_token`, `bb_refresh_token`, `bb_user`)
- Protected pages call `requireAuth()` and redirect to `login.html` when not authenticated
- API helper is centralized in `js/auth.js`

## Scripts

### Root
- `start.sh` / `start.bat`: starts backend and frontend
- `start-backend.sh` / `start-backend.bat`: starts backend only

### Backend (`backend/package.json`)
- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run typecheck`
- `npm run lint`
- `npm run prisma:generate`
- `npm run prisma:migrate`
- `npm run prisma:deploy`
- `npm run prisma:studio`

## License

MIT (see `LICENSE`).
