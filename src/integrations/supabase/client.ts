// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://nirviioabquxlzojmdgf.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pcnZpaW9hYnF1eGx6b2ptZGdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMzEwNTAsImV4cCI6MjA1OTgwNzA1MH0.FhejSw4h1SSF4Ka5SNQiI7QOjH4i8tzKiXXZN9r5rCs";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);