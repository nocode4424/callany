/*
  # Add preferences column to users table
  
  1. New Columns:
    - `call_types_preferences` (jsonb): Stores user call type preferences as a JSON array
  
  2. Changes:
    - Adds a new column to store preferences for the types of calls users want help with
*/

-- Add call_types_preferences to users table
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS call_types_preferences JSONB DEFAULT '[]'::jsonb;

COMMENT ON COLUMN public.users.call_types_preferences IS 'JSON array of call types the user wants help with';