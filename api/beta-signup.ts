import type { VercelRequest, VercelResponse } from '@vercel/node';

// In-memory storage (survives warm starts, resets on cold starts)
// For production, replace this with a database
let signups: Array<{ email: string; timestamp: string }> = [];

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

    // Check for duplicates
    if (signups.some(s => s.email === normalizedEmail)) {
      return res.status(409).json({ 
        error: 'Email already registered',
        count: signups.length 
      });
    }

    // Add to in-memory storage
    signups.push({
      email: normalizedEmail,
      timestamp: new Date().toISOString()
    });

    console.log(`✅ New signup: ${normalizedEmail} (Total: ${signups.length})`);

    return res.status(200).json({
      success: true,
      message: 'Email registered successfully',
      count: signups.length,
      email: normalizedEmail
    });

  } catch (error) {
    console.error('Error handling signup:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

