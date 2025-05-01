/*
  # Fix RLS policies for contact_messages table

  1. Changes
     - Drop all existing policies on the contact_messages table
     - Create new policies that properly allow anonymous and authenticated users to insert records
     - Add explicit policy for service role to read all messages

  2. Security
     - Enable RLS on the contact_messages table
     - Set up proper policies for different user roles
*/

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can insert contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Service role can do all operations on contact_messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Service role can read all contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Authenticated users can create contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Anon users can create contact messages" ON public.contact_messages;

-- Ensure RLS is enabled
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policies with correct permissions
CREATE POLICY "Anyone can insert contact messages"
  ON public.contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Service role can do all operations on contact_messages"
  ON public.contact_messages
  FOR ALL
  TO service_role
  USING (true);

CREATE POLICY "Service role can read all contact messages"
  ON public.contact_messages
  FOR SELECT
  TO service_role
  USING (true);