// Simple dev server to mock API endpoints for local testing
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Initialize Supabase
const supabaseUrl = process.env.SUPABASE_URL || 'https://xkovxlzsmiyaeoswwqko.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhrb3Z4bHpzbWl5YWVvc3d3cWtvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTU4NjcyMCwiZXhwIjoyMDc3MTYyNzIwfQ.OgkUucWYC0cvjQdwYm8boTRXQU-1y7fvuTVp2bmXqQE';
const supabase = createClient(supabaseUrl, supabaseKey);

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
app.post('/api/beta-signup', async (req, res) => {
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
    
    // Check if email already exists in Supabase
    const { data: existingSignup } = await supabase
      .from('opef_waitlist')
      .select('email')
      .eq('email', normalizedEmail)
      .single();

    if (existingSignup) {
      // Get total count
      const { count } = await supabase
        .from('opef_waitlist')
        .select('*', { count: 'exact', head: true });
      
      return res.status(409).json({ 
        error: 'Email already registered',
        count: count || 0
      });
    }

    // Insert new signup into Supabase
    const { error: insertError } = await supabase
      .from('opef_waitlist')
      .insert({
        email: normalizedEmail,
        created_at: new Date().toISOString()
      });

    if (insertError) {
      console.error('Supabase insert error:', insertError);
      throw insertError;
    }

    // Get total count
    const { count } = await supabase
      .from('opef_waitlist')
      .select('*', { count: 'exact', head: true });

    console.log(`✅ New signup: ${normalizedEmail} (Total: ${count || 0})`);

    res.status(200).json({
      success: true,
      message: 'Email registered successfully',
      count: count || 0,
      email: normalizedEmail
    });

  } catch (error) {
    console.error('Error handling signup:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/get-signups
app.get('/api/get-signups', async (req, res) => {
  try {
    // Fetch signups from Supabase, ordered by created_at descending
    const { data: signups, error } = await supabase
      .from('opef_waitlist')
      .select('email, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase fetch error:', error);
      return res.status(500).json({ error: 'Failed to fetch signups' });
    }
    
    // Map created_at to timestamp for frontend compatibility
    const formattedSignups = signups?.map(s => ({
      email: s.email,
      timestamp: s.created_at
    })) || [];
    
    res.status(200).json({
      count: formattedSignups.length,
      signups: formattedSignups
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

