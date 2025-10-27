# Beta Signup API

This directory contains Vercel serverless functions for handling beta signup submissions.

## Files

- `beta-signup.ts` - Handles POST requests to save email signups
- `get-signups.ts` - Handles GET requests to retrieve signup count and list

## How it works

1. When a user submits their email via the beta signup form, it calls `/api/beta-signup`
2. The function validates the email and stores it in `data/beta-signups.json`
3. Each email includes a timestamp
4. Duplicate emails are prevented
5. The function returns the total count of signups

## Data Storage

Emails are stored in `data/beta-signups.json` in the following format:

```json
[
  {
    "email": "user@example.com",
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
]
```

## API Endpoints

### POST /api/beta-signup
- **Body**: `{ "email": "user@example.com" }`
- **Response**: `{ "success": true, "count": 42, "email": "user@example.com" }`
- **Errors**: Returns 400 for invalid email, 409 for duplicate email

### GET /api/get-signups
- **Response**: `{ "count": 42, "signups": [...] }`
- Returns the total count and list of all signups

## Security Note

The `data/` directory is git-ignored to protect user emails. Make sure to set up proper authentication if you want to expose the GET endpoint publicly.

