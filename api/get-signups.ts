import type { VercelRequest, VercelResponse } from '@vercel/node';

// In-memory storage (shared with beta-signup.ts via module-level variable)
// This survives warm starts but resets on cold starts
// For production, replace with a database (Supabase, MongoDB, Vercel KV, etc.)

interface BetaSignupData {
  email: string;
  timestamp: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Try to get signups from the shared module
    // Since modules are cached, we need to use global or a shared approach
    // For now, return empty array with explanation
    // In production, this should fetch from a database
    
    return res.status(200).json({
      count: 0,
      signups: [],
      note: 'In-memory storage is being used. For production, implement a database.'
    });

  } catch (error) {
    console.error('Error reading signups:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
