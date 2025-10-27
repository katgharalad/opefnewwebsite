import type { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from './firebase-admin';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    if (db) {
      // Use Firebase if available
      const signupsRef = db.collection('beta_signups');
      const snapshot = await signupsRef.orderBy('timestamp', 'desc').get();
      
      const signups = snapshot.docs.map(doc => ({
        email: doc.data().email,
        timestamp: doc.data().timestamp
      }));

      return res.status(200).json({
        count: signups.length,
        signups: signups
      });
    } else {
      // Fallback to in-memory storage
      const inMemorySignups = (global as any).signups || [];
      
      return res.status(200).json({
        count: inMemorySignups.length,
        signups: inMemorySignups
      });
    }

  } catch (error) {
    console.error('Error reading signups:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
