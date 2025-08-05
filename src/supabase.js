
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jfofwxdoiyrkdbgjsddy.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impmb2Z3eGRvaXlya2RiZ2pzZGR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyODY3NDksImV4cCI6MjA2OTg2Mjc0OX0.r6IECHyu4jNL8L7iVK9WS6G0MH5o9k8y70xu6Fj5gFA'
export const supabase = createClient(supabaseUrl, supabaseKey)
