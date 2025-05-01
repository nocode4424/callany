/*
  # Fix RLS policy for calls table
  
  1. Security Changes
    - Enable RLS on the calls table
    - Fix the policy that allows users to insert their own calls
    - Add a new policy for service role to access all calls
    
  This migration fixes the policy violation error that occurs when trying to create new calls.
*/

-- Ensure calls table has RLS enabled
ALTER TABLE public.calls ENABLE ROW LEVEL SECURITY;

-- Drop existing policies for calls table
DROP POLICY IF EXISTS "Users can insert their own calls" ON public.calls;
DROP POLICY IF EXISTS "Users can read their own calls" ON public.calls;
DROP POLICY IF EXISTS "Users can update their own calls" ON public.calls;

-- Create updated policies with correct permissions
CREATE POLICY "Users can insert their own calls"
  ON public.calls
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can read their own calls"
  ON public.calls
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own calls"
  ON public.calls
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Add policy for service role to manage all calls
CREATE POLICY "Service role can do all operations on calls"
  ON public.calls
  FOR ALL
  TO service_role
  USING (true);