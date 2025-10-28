import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from './supabase';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Get signups endpoint called');
    
    // Fetch signups from Supabase, ordered by created_at descending
    const { data: signups, error } = await supabase
      .from('opef_waitlist')
      .select('email, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase fetch error:', JSON.stringify(error, null, 2));
      return res.status(500).json({ 
        error: 'Failed to fetch signups',
        details: error.message
      });
    }
    
    // Map created_at to timestamp for frontend compatibility
    const formattedSignups = signups?.map(s => ({
      email: s.email,
      timestamp: s.created_at
    })) || [];
    
    console.log(`✅ Fetched ${formattedSignups.length} signups`);
    
    return res.status(200).json({
      count: formattedSignups.length,
      signups: formattedSignups
    });
  } catch (error: any) {
    console.error('Error reading signups:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error?.message || 'Unknown error occurred'
    });
  }
}
