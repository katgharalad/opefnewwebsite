import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from './supabase';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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

    return res.status(200).json({
      success: true,
      message: 'Email registered successfully',
      count: count || 0,
      email: normalizedEmail
    });
  } catch (error) {
    console.error('Error handling signup:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
