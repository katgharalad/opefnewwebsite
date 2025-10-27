import type { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';
import path from 'path';

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

    // Create data directory if it doesn't exist
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Path to the JSON file storing beta signups
    const filePath = path.join(dataDir, 'beta-signups.json');

    // Read existing signups
    let signups: BetaSignupData[] = [];
    if (fs.existsSync(filePath)) {
      try {
        const fileData = fs.readFileSync(filePath, 'utf-8');
        signups = JSON.parse(fileData);
      } catch (err) {
        console.error('Error reading signups file:', err);
        // If file exists but can't be read, start fresh
        signups = [];
      }
    }

    // Check if email already exists
    const existingSignup = signups.find(s => s.email === normalizedEmail);
    if (existingSignup) {
      return res.status(409).json({ 
        error: 'Email already registered',
        count: signups.length 
      });
    }

    // Add new signup
    const newSignup: BetaSignupData = {
      email: normalizedEmail,
      timestamp: new Date().toISOString()
    };

    signups.push(newSignup);

    // Write back to file
    fs.writeFileSync(filePath, JSON.stringify(signups, null, 2), 'utf-8');

    // Return success with count
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

