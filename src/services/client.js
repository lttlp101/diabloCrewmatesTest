import { createClient } from "@supabase/supabase-js";

const URL = "https://kijbqugvvwpmdqepvscw.supabase.co";
const API_KEY =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpamJxdWd2dndwbWRxZXB2c2N3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3OTE5MTAsImV4cCI6MjA1OTM2NzkxMH0.GmIw4P04asurbwKAOammUbm9paHFFvDiSO3HUm82EZA";

// const URL = import.meta.env.VITE_SUPABASE_URL;
// const API_KEY = import.meta.env.VITE_SUPABASE_ANON_API_KEY;

export const supabase = createClient(URL, API_KEY);
