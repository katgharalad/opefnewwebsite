# Vercel Environment Setup - CRITICAL

## ⚠️ IMPORTANT: You MUST Set These Environment Variables in Vercel

The beta signup will **NOT work** without these environment variables configured in your Vercel project.

### Step-by-Step Instructions:

1. **Go to your Vercel dashboard**
   - Visit: https://vercel.com/dashboard
   - Navigate to your project: `opefnewwebsite`

2. **Navigate to Settings**
   - Click on your project name
   - Go to **Settings** → **Environment Variables**

3. **Add the following environment variables:**

   | Variable Name | Value |
   |--------------|-------|
   | `SUPABASE_URL` | `https://xkovxlzsmiyaeoswwqko.supabase.co` |
   | `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhrb3Z4bHpzbWl5YWVvc3d3cWtvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTU4NjcyMCwiZXhwIjoyMDc3MTYyNzIwfQ.OgkUucWYC0cvjQdwYm8boTRXQU-1y7fvuTVp2bmXqQE` |

4. **Select Environments**
   - Make sure to check: **Production**, **Preview**, and **Development**
   - Click **Save** for each environment

5. **Redeploy Your Application**
   - Go to **Deployments**
   - Click the three dots (⋯) next to the latest deployment
   - Select **Redeploy**
   - Or push a new commit to trigger automatic deployment

### Verify Environment Variables Are Set:

After deployment, check the logs:
1. Go to your deployment in Vercel
2. Click **Functions** tab
3. Click on the function (e.g., `/api/beta-signup`)
4. Check the logs - you should see detailed console output from our updated error logging

### Testing After Deployment:

1. **Test the signup form**
   - Visit your live site
   - Try to sign up with an email
   - Check the browser console for any errors

2. **Check Vercel Function Logs**
   - If it still fails, go to Vercel dashboard
   - Navigate to **Deployments** → Select your deployment
   - Go to **Functions** tab
   - Click on `/api/beta-signup`
   - Check the **Runtime Logs** to see the detailed error messages

3. **Verify Supabase**
   - Go to Supabase dashboard: https://supabase.com/dashboard/project/xkovxlzsmiyaeoswwqko/editor
   - Check if the table `opef_waitlist` exists
   - Verify it has the correct schema:
     - `email` (text, primary key)
     - `created_at` (timestamptz)
     - Optional columns: `source`, `confirmed`, `ua`, `ip_hash`

### Troubleshooting:

**Error: "Internal server error"**
- ✅ Environment variables are not set correctly in Vercel
- Solution: Double-check the variable names and values above

**Error: "Failed to fetch"**
- ✅ Supabase credentials are incorrect
- Solution: Verify the SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Vercel

**Error in logs: "relation does not exist"**
- ✅ The `opef_waitlist` table doesn't exist in Supabase
- Solution: Create the table using the SQL schema in SUPABASE_README.md

**No logs appearing**
- ✅ Function not being called correctly
- Solution: Check that the API route is accessible and verify vercel.json configuration

## Current Configuration:

- **Table Name**: `opef_waitlist`
- **Supabase URL**: `https://xkovxlzsmiyaeoswwqko.supabase.co`
- **API Endpoints**:
  - POST `/api/beta-signup` - Submit new email signup
  - GET `/api/get-signups` - Fetch all signups for admin panel

---

## 🚨 Action Required:

**PLEASE SET THE ENVIRONMENT VARIABLES IN VERCEL BEFORE TESTING AGAIN!**

Without these variables, the Supabase client cannot connect to your database, resulting in a 500 error.
