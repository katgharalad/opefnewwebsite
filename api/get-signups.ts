import type { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';
import path from 'path';

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
    // Path to the JSON file storing beta signups
    const filePath = path.join(process.cwd(), 'data', 'beta-signups.json');

    // Read existing signups
    let signups: BetaSignupData[] = [];
    if (fs.existsSync(filePath)) {
      try {
        const fileData = fs.readFileSync(filePath, 'utf-8');
        signups = JSON.parse(fileData);
      } catch (err) {
        console.error('Error reading signups file:', err);
      }
    }

    // Return count and list (you can add authentication here if needed)
    return res.status(200).json({
      count: signups.length,
      signups: signups
    });

  } catch (error) {
    console.error('Error reading signups:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

