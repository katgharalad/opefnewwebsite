# Firebase Setup Guide for Beta Signup

## 🚀 Quick Setup (10 minutes)

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select existing project
3. Name it (e.g., "OPEF-Beta-Signups")
4. Enable Google Analytics (optional)
5. Click "Create project"

### 2. Enable Firestore Database

1. In Firebase Console, go to **Build** → **Firestore Database**
2. Click **Create database**
3. Choose **Start in production mode**
4. Select a location (choose one close to your users)
5. Click **Enable**

### 3. Create Database Rules

Go to **Rules** tab and paste this (temporary - we'll lock it down later):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write for beta_signups collection
    match /beta_signups/{document=**} {
      allow read, write: if true;
    }
  }
}
```

Click **Publish**.

### 4. Get Firebase Admin Credentials

1. Go to **Project Settings** (gear icon) → **Service accounts**
2. Click **Generate new private key**
3. Download the JSON file
4. **Keep this file safe - it contains sensitive credentials!**

### 5. Add Environment Variables to Vercel

1. Go to your Vercel project dashboard
2. Go to **Settings** → **Environment Variables**
3. Add these variables (extract from the downloaded JSON file):

```bash
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...your key...\n-----END PRIVATE KEY-----\n
```

**Important**: Copy the `private_key` from the JSON file exactly, including the newlines.

### 6. Deploy

The API is already configured! Just deploy:

```bash
git add .
git commit -m "Add Firebase integration for beta signups"
git push origin main
```

Vercel will automatically deploy.

## ✅ Testing

After deployment:

1. Visit your site
2. Submit an email via the beta signup form
3. Check Firebase Console → Firestore Database
4. You should see a `beta_signups` collection with your entries!

## 🔒 Security (Important!)

### Step 1: Lock Down Firestore Rules

Once you confirm everything works, update your Firestore rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Deny all public access
    match /beta_signups/{document=**} {
      allow read, write: if false;
    }
  }
}
```

This ensures only your serverless functions can access the data.

### Step 2: Clean Up Admin Panel

Remove or password-protect the `/admin/signups` route in production.

## 🎯 What Happens Now?

- **Without Firebase**: Uses in-memory storage (data resets on cold start)
- **With Firebase**: Data persists permanently in Firestore

Both work! If Firebase credentials aren't configured, it falls back to in-memory.

## 📊 Monitoring

Check signups anytime in:
- **Firebase Console** → Firestore Database
- **Your admin page**: `your-site.vercel.app/admin/signups`

## 🔧 Troubleshooting

### "Firebase credentials not found" error
- Make sure environment variables are set in Vercel
- Redeploy after adding variables

### API returns 500 error
- Check Vercel function logs
- Verify Firebase project ID is correct
- Make sure Firestore is enabled

### Database writes fail
- Check Firestore rules allow writes (for initial testing)
- Verify service account has proper permissions

---

**Need help?** Check the Firebase console logs or Vercel function logs for detailed error messages.

