/*
  # Create users and contact_messages tables

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `first_name` (text)
      - `last_name` (text)
      - `email` (text, unique)
      - `phone_number` (text)
      - `zip_code` (text)
      - `created_at` (timestamp)
    - `contact_messages`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `message` (text)
      - `created_at` (timestamp)
  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users and service role
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone_number text NOT NULL,
  zip_code text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for the users table
CREATE POLICY "Service role can do all operations on users"
  ON users
  FOR ALL
  TO service_role
  USING (true);

CREATE POLICY "Authenticated users can read their own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Authenticated users can update their own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Create policies for the contact_messages table
CREATE POLICY "Service role can do all operations on contact_messages"
  ON contact_messages
  FOR ALL
  TO service_role
  USING (true);

CREATE POLICY "Authenticated users can create contact messages"
  ON contact_messages
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Anon users can create contact messages"
  ON contact_messages
  FOR INSERT
  TO anon
  WITH CHECK (true);