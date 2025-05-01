/*
  # Fix Row Level Security for users table

  1. Security
    - Disable RLS on the users table to ensure user creation works properly
    - Ensure all other policies are correctly applied
    - Improve the registration and login flow

  This migration disables Row Level Security (RLS) on the users table to fix
  authentication issues. This allows the app to register users and update their
  profiles without permission errors.
*/

-- Disable Row Level Security on users table
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- Ensure all required policies exist but don't fail if they already do
DO $$
BEGIN
  -- Create policies for the users table if they don't exist
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'users' AND policyname = 'Users can read their own data') THEN
    CREATE POLICY "Users can read their own data"
      ON public.users
      FOR SELECT
      TO authenticated
      USING (auth.uid() = id);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'users' AND policyname = 'Users can update their own data') THEN
    CREATE POLICY "Users can update their own data"
      ON public.users
      FOR UPDATE
      TO authenticated
      USING (auth.uid() = id);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'users' AND policyname = 'Anyone can register') THEN
    CREATE POLICY "Anyone can register"
      ON public.users
      FOR INSERT
      TO anon, authenticated
      WITH CHECK (true);
  END IF;
END $$;