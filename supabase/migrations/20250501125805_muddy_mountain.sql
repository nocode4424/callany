/*
  # Implement phone number as user ID

  1. Changes:
    - Modify the users table to use phone_number as the primary ID
    - Add a migration to ensure all users have their ID set to their phone number
    - Update constraints and foreign key references

  2. Security:
    - Ensure RLS policies continue to work with the new ID structure
*/

-- First, we need to disable any foreign key constraints temporarily
ALTER TABLE public.calls DROP CONSTRAINT IF EXISTS calls_user_id_fkey;

-- Create a new temporary migration function
DO $$ 
BEGIN
  -- Update existing users to set their ID equal to their phone_number
  UPDATE public.users
  SET id = phone_number
  WHERE id != phone_number;

  -- Update calls table to reference the new user IDs
  UPDATE public.calls c
  SET user_id = u.phone_number
  FROM public.users u
  WHERE c.user_id = u.id AND u.id != u.phone_number;
END $$;

-- Re-add the foreign key constraint
ALTER TABLE public.calls
ADD CONSTRAINT calls_user_id_fkey
FOREIGN KEY (user_id) REFERENCES public.users(id);

-- Ensure RLS is enabled on calls table 
ALTER TABLE public.calls ENABLE ROW LEVEL SECURITY;