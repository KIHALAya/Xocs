import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    'https://wzbhrhyncdraoeswkisj.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6YmhyaHluY2RyYW9lc3draXNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc4MzI4OTUsImV4cCI6MjAzMzQwODg5NX0.MvFuinaMeQS6qq9iD2agSyXT_cl8BEAPtPi53KBb8JM');

export default supabase;
