# Vercel Deployment Guide

## 🚀 Quick Deployment

### 1. Push Your Code

```bash
git add .
git commit -m "Add beta signup system, optimize cursor, hide dropdown menu"
git push origin main
```

### 2. Automatic Deployment

If your project is already connected to Vercel, it will automatically deploy when you push!

## 📧 Setting Up Beta Signup on Vercel

### Important: Vercel Serverless Functions Limitations

Vercel serverless functions have **read-only filesystem** except for `/tmp`. This means our current approach of writing to `data/beta-signups.json` **won't work** in production on Vercel's free tier.

### Recommended Solutions

#### Option 1: Use a Database (Recommended for Production)

**Best for**: Production with multiple users

Set up one of these databases:

1. **Supabase** (Easy, Free tier available)
   - Sign up at https://supabase.com
   - Create a new project
   - Create a table called `beta_signups` with columns: `email` (text), `timestamp` (timestamp)
   - Get your database URL and service key

2. **Vercel KV** (Built-in, Pay-as-you-go)
   - In Vercel dashboard, go to Storage → Create Database
   - Choose KV (Redis)
   - Use it to store emails

3. **MongoDB Atlas** (Free tier available)
   - Create a free cluster
   - Store signups there

#### Option 2: Use an Email Service

**Best for**: Small scale, notification-based

Use services like:
- Resend (you already have it installed!)
- SendGrid
- Mailchimp

Update the API to send an email instead of storing locally.

### 🛠️ Quick Fix: Make it Work on Vercel Now

If you want to deploy NOW and fix the storage later, here's a temporary solution:

1. The API functions will work but won't persist data
2. You can manually implement email notifications
3. Or add a simple database integration

### 📝 For Now: Email Notifications

Update your API to send emails when someone signs up:

```typescript
// In api/beta-signup.ts, replace the file writing with:
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Add after validation:
await resend.emails.send({
  from: 'noreply@yourdomain.com',
  to: 'your-email@example.com',
  subject: `New Beta Signup: ${normalizedEmail}`,
  html: `<p>Email: ${normalizedEmail}</p><p>Total signups: ${signups.length + 1}</p>`
});
```

## 🔧 Environment Variables

If using email or database, add these in Vercel:

1. Go to your project in Vercel dashboard
2. Settings → Environment Variables
3. Add:
   - `RESEND_API_KEY` (if using Resend)
   - Database connection strings if using a DB

## 🧪 Testing

After deployment:
1. Visit your site: `https://your-domain.vercel.app`
2. Test the beta signup form
3. Check if you receive emails (if configured)
4. Visit: `https://your-domain.vercel.app/admin/signups` to view signups

## 🎯 Next Steps

1. Choose a storage solution (database recommended)
2. Update the API files to use that storage
3. Add environment variables in Vercel
4. Test the full flow

---

**Note**: The dev server (`dev-server.js`) is for local testing only. Vercel will use the functions in the `/api` folder automatically!

