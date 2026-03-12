import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const isConfigured = supabaseUrl && supabaseUrl !== 'YOUR_SUPABASE_PROJECT_URL' && supabaseAnonKey && supabaseAnonKey !== 'YOUR_SUPABASE_ANON_KEY'

if (!isConfigured) {
  console.warn('Supabase is not configured yet. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.')
}

// Ensure the application doesn't crash on boot if keys are not set
// We'll export a mock client if not configured, or createClient if it looks valid
export const supabase = isConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : { auth: { signInWithPassword: () => ({ error: { message: 'Supabase not configured' } }) }, from: () => ({ select: () => ({ eq: () => ({ single: () => ({ data: null, error: null }) }) }) }) };

