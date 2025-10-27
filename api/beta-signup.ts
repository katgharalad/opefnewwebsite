import type { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from './firebase-admin';

interface BetaSignupData {
  email: string;
  timestamp: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    // Validate email
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Normalize email to lowercase
    const normalizedEmail = email.toLowerCase().trim();

    // Check for duplicates using Firebase
    if (db) {
      // Use Firebase if available
      const signupsRef = db.collection('beta_signups');
      
      // Check if email already exists
      const existingSignup = await signupsRef.where('email', '==', normalizedEmail).get();
      
      if (!existingSignup.empty) {
        // Get total count
        const totalSignups = await signupsRef.get();
        return res.status(409).json({ 
          error: 'Email already registered',
          count: totalSignups.size 
        });
      }

      // Add new signup to Firebase
      await signupsRef.add({
        email: normalizedEmail,
        timestamp: new Date().toISOString()
      });

      // Get updated count
      const totalSignups = await signupsRef.get();

      console.log(`✅ New signup: ${normalizedEmail} (Total: ${totalSignups.size})`);

      return res.status(200).json({
        success: true,
        message: 'Email registered successfully',
        count: totalSignups.size,
        email: normalizedEmail
      });
    } else {
      // Fallback to in-memory storage if Firebase not configured
      // This is for local development without Firebase credentials
      const inMemorySignups = (global as any).signups || [];
      
      if (inMemorySignups.some((s: BetaSignupData) => s.email === normalizedEmail)) {
        return res.status(409).json({ 
          error: 'Email already registered',
          count: inMemorySignups.length 
        });
      }

      inMemorySignups.push({
        email: normalizedEmail,
        timestamp: new Date().toISOString()
      });
      (global as any).signups = inMemorySignups;

      console.log(`✅ New signup: ${normalizedEmail} (Total: ${inMemorySignups.length})`);

      return res.status(200).json({
        success: true,
        message: 'Email registered successfully',
        count: inMemorySignups.length,
        email: normalizedEmail
      });
    }

  } catch (error) {
    console.error('Error handling signup:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
