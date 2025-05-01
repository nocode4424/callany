/*
  # Add INSERT policy for users table

  1. Security
    - Add policy allowing anonymous users to insert into users table
    - This is necessary for the initial user registration process

  This migration adds a permissive policy that allows both anonymous and 
  authenticated users to insert new records into the users table.
*/

-- Add policy to allow new user registration
CREATE POLICY "Anyone can register" 
ON public.users 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- Note: Existing policies for SELECT and UPDATE remain unchanged
-- These policies restrict users to only access their own data after authentication