# Supabase Integration - opef_waitlist Table

## ✅ Configured Successfully!

The beta signup form is now integrated with Supabase and using the `opef_waitlist` table.

### Table Schema
```sql
create table public.opef_waitlist (
  email text not null,
  created_at timestamp with time zone not null default now(),
  source text null,
  confirmed boolean null default false,
  ua text null,
  ip_hash text null,
  constraint opef_waitlist_pkey primary key (email)
)
```

### API Endpoints

**POST `/api/beta-signup`**
- Validates email format
- Checks for duplicates
- Inserts into `opef_waitlist` table
- Returns total count

**GET `/api/get-signups`**
- Fetches all entries from `opef_waitlist`
- Ordered by `created_at` DESC
- Returns count and list of signups

### Supabase Configuration

- **URL**: `https://xkovxlzsmiyaeoswwqko.supabase.co`
- **Service Role Key**: Stored in `.env.local`
- **Table**: `opef_waitlist`

### Testing

```bash
# Start dev server
npm run dev:server

# In another terminal, test signup
curl -X POST http://localhost:3001/api/beta-signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# Get signups
curl http://localhost:3001/api/get-signups
```

### View Signups

1. **In your app**: Visit `/admin/signups`
2. **In Supabase Dashboard**: https://supabase.com/dashboard/project/xkovxlzsmiyaeoswwqko/editor

