/*
  # Fix RLS policies for users and calls tables
  
  1. Security
    - Re-enable RLS on users table
    - Ensure anonymous users can register
    - Fix policy for authenticated users to insert calls
    - Duplicate user policies to make sure they're applied correctly
    
  This migration addresses the RLS policy issues that are preventing users from
  registering accounts and creating calls.
*/

-- Make sure the users table has RLS enabled
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Make sure the calls table has RLS enabled
ALTER TABLE calls ENABLE ROW LEVEL SECURITY;

-- Drop and recreate the primary user policies to ensure they work correctly
DROP POLICY IF EXISTS "Users can read their own data" ON users;
DROP POLICY IF EXISTS "Users can update their own data" ON users;

-- Recreate policies for users table
CREATE POLICY "Users can read their own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Ensure anonymous users can register (create users)
DROP POLICY IF EXISTS "Anyone can register" ON users;
CREATE POLICY "Anyone can register"
  ON users
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Drop and recreate the calls policies to ensure they work correctly
DROP POLICY IF EXISTS "Users can insert their own calls" ON calls;
DROP POLICY IF EXISTS "Users can read their own calls" ON calls;
DROP POLICY IF EXISTS "Users can update their own calls" ON calls;

-- Recreate policies for calls table
CREATE POLICY "Users can insert their own calls"
  ON calls
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read their own calls"
  ON calls
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own calls"
  ON calls
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);