# Beta Signup Testing Guide

## 🧪 How to Test the Signup System Locally

### Starting the Servers

1. **Start the API server** (Terminal 1):
   ```bash
   npm run dev:server
   ```
   This runs on port 3001

2. **Start the Vite dev server** (Terminal 2):
   ```bash
   npm run dev
   ```
   This runs on port 5173

### Testing the Beta Signup

1. **Open the app**: http://localhost:5173

2. **Test the signup form**:
   - Scroll to the beta signup section
   - Enter an email address
   - Click "Request Early Access"
   - Verify you see a success message with the total count

3. **Test duplicate prevention**:
   - Try submitting the same email again
   - Should show error: "Email already registered"

4. **View all signups**:
   - Go to: http://localhost:5173/admin/signups
   - Verify emails are listed
   - Test CSV export button

### Manual API Testing (Optional)

**Test signup**:
```bash
curl -X POST http://localhost:3001/api/beta-signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

**Get signups**:
```bash
curl http://localhost:3001/api/get-signups
```

**Check data file**:
```bash
cat data/beta-signups.json
```

### ✅ What to Verify

- [ ] Form submission works
- [ ] Success message shows with count
- [ ] Duplicate emails are rejected
- [ ] Admin page shows all signups
- [ ] CSV export works
- [ ] Data persists in `data/beta-signups.json`
- [ ] Mobile shows normal cursor (custom cursor only on desktop)

### 🚀 Ready for Production

When you're ready to deploy:
1. Push to Vercel
2. The Vercel serverless functions will handle the API endpoints
3. Data will be stored in the Vercel file system (or you can integrate a database)

### ⚠️ Important

The `data/` directory is git-ignored to protect user emails. Make sure to backup or set up persistent storage in production!

