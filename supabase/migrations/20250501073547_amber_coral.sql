/*
  # Fix contact_messages RLS policies

  1. Security Changes
    - Drop existing RLS policies for contact_messages table
    - Create new policies that properly allow both anonymous and authenticated users to insert messages
    - Ensure RLS is enabled on the table
*/

-- Drop existing policies on contact_messages table
DROP POLICY IF EXISTS "Service role can do all operations on contact_messages" ON contact_messages;
DROP POLICY IF EXISTS "Authenticated users can create contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Anon users can create contact messages" ON contact_messages;

-- Re-enable RLS (just to be sure)
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Create new policies with correct permissions
CREATE POLICY "Service role can do all operations on contact_messages"
  ON contact_messages
  FOR ALL
  TO service_role
  USING (true);

CREATE POLICY "Anyone can insert contact messages"
  ON contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Add a policy to let the service role read all messages
CREATE POLICY "Service role can read all contact messages"
  ON contact_messages
  FOR SELECT
  TO service_role
  USING (true);