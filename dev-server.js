// Simple dev server to mock API endpoints for local testing
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Middleware to parse JSON
app.use(express.json());
app.use(express.static('dist'));

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const dataDir = path.join(__dirname, 'data');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const signupsFile = path.join(dataDir, 'beta-signups.json');

// POST /api/beta-signup
app.post('/api/beta-signup', (req, res) => {
  try {
    const { email } = req.body;

    // Validate email
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Email is required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Read existing signups
    let signups = [];
    if (fs.existsSync(signupsFile)) {
      try {
        const fileData = fs.readFileSync(signupsFile, 'utf-8');
        signups = JSON.parse(fileData);
      } catch (err) {
        console.error('Error reading signups:', err);
        signups = [];
      }
    }

    // Check for duplicates
    const existingSignup = signups.find(s => s.email === normalizedEmail);
    if (existingSignup) {
      return res.status(409).json({ 
        error: 'Email already registered',
        count: signups.length 
      });
    }

    // Add new signup
    const newSignup = {
      email: normalizedEmail,
      timestamp: new Date().toISOString()
    };

    signups.push(newSignup);

    // Write back to file
    fs.writeFileSync(signupsFile, JSON.stringify(signups, null, 2), 'utf-8');

    console.log(`✅ New signup: ${normalizedEmail} (Total: ${signups.length})`);

    res.status(200).json({
      success: true,
      message: 'Email registered successfully',
      count: signups.length,
      email: normalizedEmail
    });

  } catch (error) {
    console.error('Error handling signup:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/get-signups
app.get('/api/get-signups', (req, res) => {
  try {
    let signups = [];
    
    if (fs.existsSync(signupsFile)) {
      try {
        const fileData = fs.readFileSync(signupsFile, 'utf-8');
        signups = JSON.parse(fileData);
      } catch (err) {
        console.error('Error reading signups:', err);
      }
    }

    res.status(200).json({
      count: signups.length,
      signups: signups
    });

  } catch (error) {
    console.error('Error getting signups:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Dev API server running at http://localhost:${PORT}`);
  console.log(`📧 Signup endpoint: POST http://localhost:${PORT}/api/beta-signup`);
  console.log(`📊 Get signups: GET http://localhost:${PORT}/api/get-signups`);
});

