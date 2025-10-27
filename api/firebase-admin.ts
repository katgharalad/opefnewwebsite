import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin SDK for serverless functions
let db: FirebaseFirestore.Firestore | null = null;

try {
  // Check if Firebase is already initialized
  if (getApps().length === 0) {
    // Try to initialize with credentials from environment
    if (process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL) {
      initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        }),
      });
      db = getFirestore();
      console.log('✅ Firebase Admin initialized');
    } else {
      console.log('⚠️ Firebase credentials not found, using in-memory storage');
    }
  } else {
    db = getFirestore();
  }
} catch (error) {
  console.error('Error initializing Firebase Admin:', error);
}

export { db };

