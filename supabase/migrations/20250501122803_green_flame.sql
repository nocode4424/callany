/*
  # Fix Row Level Security Policies

  1. Changes
     - Enable Row Level Security on the users table
     - Ensure all policies are correctly applied
     - Fix INSERT policy for calls table to properly use auth.uid()

  2. Security
     - Ensures authenticated users can only access their own data
     - Ensures proper security enforcement on all tables
*/

-- Enable RLS on users table as it has policies defined but RLS is not enabled
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Drop and recreate the INSERT policy for calls to ensure it's using the correct auth.uid() function
DROP POLICY IF EXISTS "Users can insert their own calls" ON calls;
CREATE POLICY "Users can insert their own calls" 
ON calls 
FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);