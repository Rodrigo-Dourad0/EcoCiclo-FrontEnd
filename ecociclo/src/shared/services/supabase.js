import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oxwxiyiupvtbxragwcwe.supabase.co';


const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94d3hpeWl1cHZ0YnhyYWd3Y3dlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQyNjQ1NTIsImV4cCI6MjA5OTg0MDU1Mn0.ewExnkYIGUMoLZKovz2xKyILPujjeVME-YGLzSGb2b4';

export const supabase = createClient(supabaseUrl, supabaseKey);