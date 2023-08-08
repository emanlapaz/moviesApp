import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://tkstvejkrczbaezqdbfh.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLIC_KEY; // Access environment variable

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
