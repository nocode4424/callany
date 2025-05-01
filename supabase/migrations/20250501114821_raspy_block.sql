/*
  # Add calls table with user relationships
  
  1. New Tables
    - `calls` table for storing call request data
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users)
      - `target_name` (text)
      - `target_phone` (text)
      - `goal` (text)
      - `important_info` (text, nullable)
      - `acting_as` (text, constrained to 'self' or 'assistant')
      - `call_status` (text, default 'pending')
      - `transcript` (text, nullable)
      - `created_at` (timestamptz)
      - `agreed_to_terms` (boolean)
      - `agreed_at` (timestamptz)
      - `call_requested_at` (timestamptz)
      - `final_bundle` (jsonb)
      
  2. Security
    - Enable RLS on `calls` table
    - Only create policies if they don't already exist
*/

-- Create calls table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'calls') THEN
    CREATE TABLE public.calls (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES public.users(id),
      target_name TEXT NOT NULL,
      target_phone TEXT NOT NULL,
      goal TEXT NOT NULL,
      important_info TEXT,
      acting_as TEXT NOT NULL,
      call_status TEXT NOT NULL DEFAULT 'pending',
      transcript TEXT,
      created_at TIMESTAMPTZ DEFAULT now(),
      agreed_to_terms BOOLEAN NOT NULL DEFAULT false,
      agreed_at TIMESTAMPTZ,
      call_requested_at TIMESTAMPTZ,
      final_bundle JSONB,

      -- Add constraints
      CONSTRAINT calls_acting_as_check CHECK (acting_as IN ('self', 'assistant')),
      CONSTRAINT calls_call_status_check CHECK (call_status IN ('pending', 'inProgress', 'completed'))
    );
  END IF;
END $$;

-- Enable Row Level Security if not already enabled
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE schemaname = 'public' 
    AND tablename = 'calls' 
    AND rowsecurity = true
  ) THEN
    ALTER TABLE public.calls ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;

-- Create policies for the calls table only if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'calls' 
    AND policyname = 'Users can insert their own calls'
  ) THEN
    CREATE POLICY "Users can insert their own calls"
      ON public.calls
      FOR INSERT
      TO authenticated
      WITH CHECK (auth.uid() = user_id);
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'calls' 
    AND policyname = 'Users can read their own calls'
  ) THEN
    CREATE POLICY "Users can read their own calls"
      ON public.calls
      FOR SELECT
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'calls' 
    AND policyname = 'Users can update their own calls'
  ) THEN
    CREATE POLICY "Users can update their own calls"
      ON public.calls
      FOR UPDATE
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;
END $$;