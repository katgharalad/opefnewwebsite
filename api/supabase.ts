import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL || 'https://xkovxlzsmiyaeoswwqko.supabase.co';
// Use service role key for server-side operations to bypass RLS
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhrb3Z4bHpzbWl5YWVvc3d3cWtvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTU4NjcyMCwiZXhwIjoyMDc3MTYyNzIwfQ.OgkUucWYC0cvjQdwYm8boTRXQU-1y7fvuTVp2bmXqQE';

export const supabase = createClient(supabaseUrl, supabaseKey);

