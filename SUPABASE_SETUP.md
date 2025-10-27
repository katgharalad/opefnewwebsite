# Supabase Setup for Beta Signups

## ✅ What's Been Set Up

The project is now configured to use Supabase for persistent beta signup storage.

### Files Modified/Created:
1. **`api/supabase.ts`** - Supabase client configuration
2. **`api/beta-signup.ts`** - Now uses Supabase to save signups
3. **`api/get-signups.ts`** - Now fetches from Supabase
4. **`dev-server.js`** - Updated to use Supabase for local development
5. **`.env.local`** - Contains Supabase credentials

### Your Supabase Configuration:
- **URL**: `https://xkovxllzsmiyaeoswwqko.supabase.co`
- **Service Role Key**: Added to `.env.local` (for server-side operations)

## 🗄️ Database Table Required

Make sure you have a table in Supabase named `beta_signups` with these columns:

```sql
CREATE TABLE beta_signups (
  id BIGSERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Optional: Add indexes for better performance
CREATE INDEX idx_beta_signups_email ON beta_signups(email);
CREATE INDEX idx_beta_signups_timestamp ON beta_signups(timestamp DESC);
```

### Column Schema:
- `id` - Auto-incrementing primary key
- `email` - Unique email address (TEXT, UNIQUE, NOT NULL)
- `timestamp` - Timestamp of signup (TIMESTAMPTZ)

## 🧪 Testing

### Local Development:
1. Start the dev server with Supabase integration:
   ```bash
   npm run dev:server
   ```

2. In another terminal, start the frontend:
   ```bash
   npm run dev
   ```

3. Test the signup form at `http://localhost:5173`

### Verify in Supabase:
1. Go to your Supabase dashboard
2. Navigate to `Table Editor` → `beta_signups`
3. Check that new signups appear there

## 📊 Admin Panel

View all signups at `/admin/signups` in your app.

## 🚀 Deployment to Vercel

When deploying to Vercel, add these environment variables in the Vercel dashboard:

1. Go to your project in Vercel
2. Settings → Environment Variables
3. Add:
   - `SUPABASE_URL` = `https://xkovxllzsmiyaeoswwqko.supabase.co`
   - `SUPABASE_SERVICE_ROLE_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (your service role key)

## ⚠️ Important Notes

- The service role key should **NEVER** be exposed in client-side code
- It's safe to use in API routes (server-side)
- Don't commit the service role key to git (it's already in `.gitignore`)
- For production, consider using Row Level Security (RLS) policies in Supabase

## 📝 How It Works

1. User enters email in the signup form
2. Frontend calls `POST /api/beta-signup` with the email
3. API validates email and checks for duplicates
4. If new, inserts into Supabase `beta_signups` table
5. Returns success with total count
6. Admin panel can fetch all signups via `GET /api/get-signups`

