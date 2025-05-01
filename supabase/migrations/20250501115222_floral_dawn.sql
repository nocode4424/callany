/*
  # Add agreed_at column to calls table
  
  1. Changes
    - Adds the missing `agreed_at` column to the `calls` table if it doesn't exist
    - This fix addresses the "Could not find the 'agreed_at' column of 'calls'" error
*/

-- Check if the calls table exists and add the agreed_at column if it doesn't already have it
DO $$ 
BEGIN
  -- Add agreed_at column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'calls' 
    AND column_name = 'agreed_at'
  ) THEN
    ALTER TABLE public.calls ADD COLUMN agreed_at TIMESTAMPTZ;
  END IF;
  
  -- Add agreed_to_terms column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'calls' 
    AND column_name = 'agreed_to_terms'
  ) THEN
    ALTER TABLE public.calls ADD COLUMN agreed_to_terms BOOLEAN NOT NULL DEFAULT false;
  END IF;
  
  -- Add call_requested_at column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'calls' 
    AND column_name = 'call_requested_at'
  ) THEN
    ALTER TABLE public.calls ADD COLUMN call_requested_at TIMESTAMPTZ;
  END IF;
  
  -- Add final_bundle column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'calls' 
    AND column_name = 'final_bundle'
  ) THEN
    ALTER TABLE public.calls ADD COLUMN final_bundle JSONB;
  END IF;
END $$;