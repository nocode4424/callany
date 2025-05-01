/*
  # Convert user IDs to phone numbers
  
  1. Changes
    - Temporarily drop foreign key constraint on calls table
    - Cast phone_number to UUID when updating user IDs
    - Update related call records to use new user IDs 
    - Restore foreign key constraint
    - Ensure RLS is enabled on calls table
*/

-- First, we need to disable any foreign key constraints temporarily
ALTER TABLE public.calls DROP CONSTRAINT IF EXISTS calls_user_id_fkey;

-- Create a new temporary migration function
DO $$ 
BEGIN
  -- Update existing users to set their ID equal to their phone_number (with proper type casting)
  UPDATE public.users
  SET id = phone_number::uuid
  WHERE id::text != phone_number;

  -- Update calls table to reference the new user IDs
  UPDATE public.calls c
  SET user_id = u.phone_number::uuid
  FROM public.users u
  WHERE c.user_id = u.id AND u.id::text != u.phone_number;
END $$;

-- Re-add the foreign key constraint
ALTER TABLE public.calls
ADD CONSTRAINT calls_user_id_fkey
FOREIGN KEY (user_id) REFERENCES public.users(id);

-- Ensure RLS is enabled on calls table 
ALTER TABLE public.calls ENABLE ROW LEVEL SECURITY;