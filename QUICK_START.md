# Quick Start: Test Firebase Locally

## What You Need Right Now

You have:
- ✅ Firebase project: `opef-beta`
- ✅ Firestore database created

You need to do:

### 1. Set Firestore Rules (5 minutes)

Go to: https://console.firebase.google.com/project/opef-beta/firestore/rules

Copy and paste:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /beta_signups/{document=**} {
      allow read, write: if true;
    }
  }
}
```

Click **"Publish"**

### 2. Get Service Account Key (2 minutes)

1. Go to: https://console.firebase.google.com/project/opef-beta/settings/serviceaccounts/adminsdk
2. Click **"Generate new private key"**
3. Click **"Generate key"**
4. Save the JSON file somewhere safe

### 3. Add Credentials to Local Environment

Create `.env.local` file in `/opef-bolt/`:

```bash
cd /Users/aaravsingh/opefwebsite/opef-bolt
nano .env.local
```

Paste this (replace with YOUR values from the downloaded JSON):

```env
FIREBASE_PROJECT_ID=opef-beta
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@opef-beta.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_FULL_KEY_HERE\n-----END PRIVATE KEY-----\n"
```

Save: `Ctrl+X`, then `Y`, then `Enter`

### 4. Test Connection

```bash
node test-firebase-setup.js
```

You should see: ✅ Success messages

### 5. Test the Signup Form

```bash
# Restart your dev server (it's probably running in another terminal)
# Then visit: http://localhost:5174
# Scroll to the beta signup form and submit an email
```

Check Firebase Console:
1. Go to: https://console.firebase.google.com/project/opef-beta/firestore/data
2. You should see `beta_signups` collection with your test signup!

## Success Checklist

- [ ] Firestore rules set to `allow read, write: if true`
- [ ] Service account key downloaded
- [ ] `.env.local` created with credentials
- [ ] `node test-firebase-setup.js` succeeds
- [ ] Can submit email via the form
- [ ] See signup in Firestore Console

Once all checked → You're ready to push! 🚀

