import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://lwmdnsxxwrqqcvmvzqkq.supabase.co";

const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3bWRuc3h4d3JxcWN2bXZ6cWtxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzMjQwNDUsImV4cCI6MjA4ODkwMDA0NX0.wOk3Dgy-eyp5dwtsdFEVFEshU8xppdl3WKgvl_0vJyw";

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false,
    },
  }
);
