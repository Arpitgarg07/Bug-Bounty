# Bug Bounty Platform - Setup Guide

## Backend Setup Complete ✅

### Features Implemented:

1. **Google OAuth Authentication**
   - Sign up with Google
   - Login with Google
   - Automatic user creation and linking

2. **Email Notification Service**
   - Newsletter subscription on landing page
   - Automated welcome emails to subscribers
   - Admin notifications for new subscriptions

3. **Dynamic Navbar**
   - Shows "Login / Sign Up" for unauthenticated users
   - Shows "Dashboard" for authenticated users
   - Automatically updates based on auth state

4. **Complete Backend API**
   - User authentication (register, login, Google OAuth)
   - JWT token-based auth
   - Protected routes
   - Company management
   - Bug bounty programs
   - Report submission

---

## Environment Configuration

### Backend `.env` Setup

Copy `.env.example` to `.env` in the `backend` directory and update the following:

```env
# Google OAuth (Required for Google Login)
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:4000/api/v1/auth/google/callback

# Email Service (Required for notifications)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_SECURE=false
MAIL_USER=your-email@gmail.com
MAIL_PASSWORD=your-app-password
NOTIFICATION_EMAIL_TO=your-notification-email@gmail.com

# Database (Update with your PostgreSQL credentials)
DATABASE_URL=postgresql://bugbounty_user:YourPassword@localhost:5432/bugbounty_db?schema=public

# JWT Secrets (Generate strong random strings)
JWT_ACCESS_SECRET=your-access-secret-at-least-32-characters-long
JWT_REFRESH_SECRET=your-refresh-secret-at-least-32-characters-long
```

---

## Getting Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Application type: Web application
6. Authorized redirect URIs:
   - `http://localhost:4000/api/v1/auth/google/callback`
   - `http://127.0.0.1:4000/api/v1/auth/google/callback`
7. Copy the Client ID and Client Secret to your `.env` file

---

## Database Setup

1. Install PostgreSQL if not installed
2. Create database:
   ```bash
   createdb bugbounty_db
   ```

3. Run migrations:
   ```bash
   cd backend
   npx prisma migrate dev
   ```

4. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

---

## Running the Application

### Start Backend:
```bash
cd backend
npm run dev
```
Backend runs on: `http://localhost:4000`

### Start Frontend:
Open `index.html` in your browser or use a local server:
```bash
# Using Python
python -m http.server 3000

# Using Node.js http-server
npx http-server -p 3000
```
Frontend runs on: `http://localhost:3000`

---

## Testing the Features

### 1. Test Landing Page Navbar
- Visit `http://localhost:3000/index.html`
- Without login: Button shows "Login / Sign Up"
- After login: Button shows "Dashboard"

### 2. Test Newsletter Subscription
- On landing page, find "Keep notified" section
- Enter your email
- Click the arrow button
- Check your email for confirmation

### 3. Test Google OAuth
- Go to Login page
- Click "Login with Google"
- Authenticate with Google
- You'll be redirected to discover.html after successful login

### 4. Test Regular Login/Signup
- Create account via signup.html
- Login via login.html
- Access protected pages (discover, profile, mybug)

---

## File Structure

```
Bug-Bounty/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── passport.ts          # Google OAuth config
│   │   │   └── env.ts               # Environment variables
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   │   ├── google-auth.controller.ts
│   │   │   │   └── auth.routes.ts
│   │   │   └── notification/
│   │   │       ├── notification.controller.ts
│   │   │       └── notification.routes.ts
│   │   └── services/
│   │       └── email.service.ts     # Email sending service
│   ├── prisma/
│   │   └── schema.prisma            # Database schema
│   └── .env                         # Environment variables
├── js/
│   ├── auth.js                      # Auth helper functions
│   └── nav-helper.js                # Dynamic navbar updates
├── index.html                       # Landing page with newsletter
├── login.html                       # Login with Google OAuth
├── signup.html                      # Signup with Google OAuth
└── auth-callback.html               # OAuth callback handler
```

---

## Troubleshooting

### Google OAuth Not Working
- Check GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in `.env`
- Verify callback URL matches Google Console settings
- Ensure frontend URL in FRONTEND_BASE_URL is correct

### Email Not Sending
- For Gmail, use App Password (not regular password)
- Enable "Less secure app access" or use App Passwords
- Check MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASSWORD

### Database Connection Failed
- Verify PostgreSQL is running
- Check DATABASE_URL format
- Ensure database exists

### CORS Errors
- Check FRONTEND_BASE_URL in backend .env matches your frontend URL
- Ensure backend is running on port 4000

---

## Next Steps

1. **Production Deployment**
   - Update OAuth callback URLs for production domain
   - Use production email service (SendGrid, AWS SES)
   - Set secure environment variables
   - Enable HTTPS

2. **Additional Features**
   - Email verification for regular signups
   - Password reset functionality
   - Two-factor authentication
   - Profile picture upload

3. **Testing**
   - Write unit tests for auth flows
   - E2E tests for OAuth
   - Email sending tests

---

## Support

For issues or questions:
1. Check backend logs: `npm run dev` output
2. Check browser console for frontend errors
3. Verify all environment variables are set correctly

---

## Security Notes

⚠️ **Important:**
- Never commit `.env` file to git
- Use strong JWT secrets (minimum 32 characters)
- Keep Google OAuth secrets secure
- Use HTTPS in production
- Implement rate limiting for auth endpoints
