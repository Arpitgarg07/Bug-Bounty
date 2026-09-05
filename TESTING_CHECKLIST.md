# 🧪 Testing Checklist

## ✅ Pre-Testing Setup

- [ ] PostgreSQL database is running
- [ ] Backend `.env` file is configured with all required variables
- [ ] Database migrations completed: `npx prisma migrate dev`
- [ ] Prisma client generated: `npx prisma generate`
- [ ] Backend server is running on `http://localhost:4000`
- [ ] Frontend is accessible on `http://localhost:3000` (or your chosen port)

---

## 1️⃣ Dynamic Navbar Testing

### Test Case 1: Unauthenticated User
- [ ] Open `http://localhost:3000/index.html`
- [ ] Navbar button shows "Login / Sign Up"
- [ ] Click button → redirects to `login.html`

### Test Case 2: Authenticated User
- [ ] Login using any method (Google or regular)
- [ ] Return to `http://localhost:3000/index.html`
- [ ] Navbar button now shows "Dashboard"
- [ ] Click button → redirects to `discover.html`

---

## 2️⃣ Newsletter Subscription Testing

### Test Case 1: Valid Email Subscription
- [ ] Open `http://localhost:3000/index.html`
- [ ] Scroll to "Keep notified" section
- [ ] Enter valid email: `test@example.com`
- [ ] Click arrow button
- [ ] Success message appears: "Successfully subscribed!"
- [ ] Check subscriber inbox for confirmation email
- [ ] Check admin inbox (NOTIFICATION_EMAIL_TO) for notification

### Test Case 2: Invalid Email
- [ ] Enter invalid email: `notanemail`
- [ ] Click arrow button
- [ ] Error message appears: "Please enter a valid email address"

### Test Case 3: Duplicate Subscription
- [ ] Enter already subscribed email
- [ ] Click arrow button
- [ ] Error message: "Email already subscribed"

---

## 3️⃣ Google OAuth Testing

### Test Case 1: New User Signup with Google
- [ ] Open `http://localhost:3000/signup.html`
- [ ] Click "Continue" on "Sign up as Freelancer"
- [ ] Click "Sign up with Google" button
- [ ] Google authentication popup opens
- [ ] Login with Google account
- [ ] Redirected to `auth-callback.html` (loading screen)
- [ ] Automatically redirected to `discover.html`
- [ ] User is logged in (check localStorage for tokens)

### Test Case 2: Existing User Login with Google
- [ ] Open `http://localhost:3000/login.html`
- [ ] Click "Login with Google" button
- [ ] Google authentication popup opens
- [ ] Login with previously used Google account
- [ ] Redirected to `discover.html`
- [ ] User is logged in

### Test Case 3: Google OAuth Error Handling
- [ ] Start Google OAuth flow
- [ ] Close popup or cancel authentication
- [ ] Should redirect back to `login.html?error=google_auth_failed`

---

## 4️⃣ Regular Authentication Testing

### Test Case 1: Sign Up (Freelancer)
- [ ] Open `http://localhost:3000/signup.html`
- [ ] Select "Sign up as Freelancer"
- [ ] Fill in all fields:
  - First Name: `John`
  - Last Name: `Doe`
  - Email: `john.doe@example.com`
  - Phone: Valid phone number
  - Password: `SecurePass123!`
  - Confirm Password: `SecurePass123!`
- [ ] Click "Sign up"
- [ ] Redirected to `discover.html`
- [ ] User is logged in

### Test Case 2: Sign Up (Company)
- [ ] Select "Sign up as Company"
- [ ] Fill in all company fields
- [ ] Click "Sign up"
- [ ] Redirected to `discover.html`
- [ ] User is logged in
- [ ] Company profile created

### Test Case 3: Login
- [ ] Open `http://localhost:3000/login.html`
- [ ] Enter email and password
- [ ] Click "Sign in"
- [ ] Redirected to `discover.html`
- [ ] User is logged in

### Test Case 4: Invalid Login
- [ ] Enter wrong email or password
- [ ] Click "Sign in"
- [ ] Error message appears: "Invalid email or password"

---

## 5️⃣ Protected Routes Testing

### Test Case 1: Accessing Protected Page (Logged Out)
- [ ] Clear localStorage (logout)
- [ ] Try to access `discover.html` directly
- [ ] Should redirect to `login.html`

### Test Case 2: Accessing Protected Page (Logged In)
- [ ] Login successfully
- [ ] Access `discover.html`
- [ ] Page loads correctly
- [ ] Access `profile.html`
- [ ] Page loads correctly
- [ ] Access `mybug.html`
- [ ] Page loads correctly

---

## 6️⃣ Navigation Testing

### All Pages Navigation
Test these pages are accessible and working:
- [ ] `index.html` - Landing page
- [ ] `login.html` - Login page
- [ ] `signup.html` - Signup page
- [ ] `discover.html` - Discover page (protected)
- [ ] `profile.html` - Profile page (protected)
- [ ] `mybug.html` - My Bugs page (protected)
- [ ] `newbug.html` - New Bug page (protected)
- [ ] `bounties.html` - Bounties listing
- [ ] `blog.html` - Blog page

### Navigation Links
From any page, test:
- [ ] Logo → redirects to `index.html`
- [ ] Home → `index.html`
- [ ] About → scrolls to about section
- [ ] Bounties → `bounties.html`
- [ ] Blog → `blog.html`
- [ ] FAQ → scrolls to FAQ section

---

## 7️⃣ Backend API Testing

### Health Check
```bash
curl http://localhost:4000/health
```
Expected: `{"success":true,"status":"ok"}`

### Register User
```bash
curl -X POST http://localhost:4000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "testuser@example.com",
    "password": "SecurePass123!",
    "confirmPassword": "SecurePass123!"
  }'
```

### Login User
```bash
curl -X POST http://localhost:4000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@example.com",
    "password": "SecurePass123!"
  }'
```

### Newsletter Subscribe
```bash
curl -X POST http://localhost:4000/api/v1/notification/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email": "subscriber@example.com"}'
```

---

## 8️⃣ Browser Console Testing

Open browser console (F12) and check:
- [ ] No JavaScript errors on page load
- [ ] No CORS errors
- [ ] localStorage contains correct keys after login:
  - `bb_access_token`
  - `bb_refresh_token`
  - `bb_user`
- [ ] Network requests return proper status codes

---

## 9️⃣ Email Testing

### Email Service Connection
Check backend logs for:
```
Email service connection verified
```

### Emails Sent
When subscribing to newsletter, check both:
1. **Subscriber Email:**
   - Subject: "Thank you for subscribing to Bug Bounty updates!"
   - Contains welcome message
   - Has "Visit Bug Bounty Platform" button

2. **Admin Email:**
   - Subject: "New Bug Bounty Newsletter Subscription"
   - Contains subscriber email
   - Shows timestamp

---

## 🐛 Common Issues & Solutions

### Issue: Google OAuth fails
- **Solution:** Check GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in `.env`
- Verify callback URL in Google Console matches: `http://localhost:4000/api/v1/auth/google/callback`

### Issue: Email not sending
- **Solution:** Use Gmail App Password, not regular password
- Enable 2FA on Gmail, then create App Password
- Check MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASSWORD

### Issue: Database connection error
- **Solution:** Ensure PostgreSQL is running
- Verify DATABASE_URL format: `postgresql://user:password@localhost:5432/database`

### Issue: CORS errors
- **Solution:** Check FRONTEND_BASE_URL in backend `.env` matches your frontend URL
- Ensure backend is running on port 4000

### Issue: Tokens not saving
- **Solution:** Check browser localStorage isn't disabled
- Clear browser cache and try again

### Issue: Navbar doesn't update
- **Solution:** Check `nav-helper.js` is loaded in HTML
- Check browser console for JavaScript errors
- Verify localStorage has tokens after login

---

## ✅ Testing Complete Checklist

After completing all tests above:
- [ ] All authentication flows working
- [ ] Dynamic navbar updates correctly
- [ ] Newsletter subscription working
- [ ] Emails being sent and received
- [ ] All pages accessible and loading
- [ ] No console errors
- [ ] Backend API responding correctly
- [ ] Protected routes enforcing authentication
- [ ] Google OAuth fully functional

---

## 📊 Test Results Template

```
TESTING DATE: ___________
TESTER: ___________

✅ PASSED | ❌ FAILED | ⚠️ ISSUES

□ Dynamic Navbar: _____
□ Newsletter Subscription: _____
□ Google OAuth: _____
□ Regular Auth: _____
□ Protected Routes: _____
□ Navigation: _____
□ Backend API: _____
□ Email Service: _____

NOTES:
_________________________________
_________________________________
_________________________________
```

---

**Ready to Test?** Start with Pre-Testing Setup, then proceed through each section in order!
