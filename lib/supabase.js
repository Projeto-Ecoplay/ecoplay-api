const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

let cached;

function getSupabase() {
  if (cached) {
    return cached;
  }
  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      'Defina SUPABASE_URL e SUPABASE_ANON_KEY (ou SUPABASE_SERVICE_ROLE_KEY) no .env'
    );
  }
  cached = createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
  return cached;
}

/**
 * Cliente Supabase para uso no servidor (sem sessão persistente).
 * Usa SERVICE_ROLE_KEY se existir; caso contrário, ANON_KEY.
 */
function supabase() {
  return getSupabase();
}

module.exports = { supabase, getSupabase };
