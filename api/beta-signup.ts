import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from './supabase';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Beta signup endpoint called');
    console.log('Request body:', req.body);
    
    const { email } = req.body;

    // Validate email
    if (!email || typeof email !== 'string') {
      console.log('Email validation failed: missing or wrong type');
      return res.status(400).json({ error: 'Email is required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Email validation failed: invalid format');
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    console.log('Processing email:', normalizedEmail);
    
    // Check if email already exists in Supabase
    console.log('Checking for existing signup...');
    const { data: existingSignup, error: queryError } = await supabase
      .from('opef_waitlist')
      .select('email')
      .eq('email', normalizedEmail)
      .single();

    if (queryError && queryError.code !== 'PGRST116') {
      console.error('Query error:', queryError);
      throw queryError;
    }

    if (existingSignup) {
      console.log('Email already exists');
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
    console.log('Inserting new signup...');
    const { error: insertError } = await supabase
      .from('opef_waitlist')
      .insert({
        email: normalizedEmail,
        created_at: new Date().toISOString()
      });

    if (insertError) {
      console.error('Supabase insert error:', JSON.stringify(insertError, null, 2));
      throw insertError;
    }

    console.log('Signup inserted successfully');

    // Get total count
    const { count } = await supabase
      .from('opef_waitlist')
      .select('*', { count: 'exact', head: true });

    console.log(`✅ New signup: ${normalizedEmail} (Total: ${count || 0})`);

    return res.status(200).json({
      success: true,
      message: 'Email registered successfully',
      count: count || 0,
      email: normalizedEmail
    });
  } catch (error: any) {
    console.error('Error handling signup:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error?.message || 'Unknown error occurred'
    });
  }
}
