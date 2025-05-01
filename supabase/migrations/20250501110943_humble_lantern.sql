/*
  # Add profile image field to users table

  1. Changes
    - Add profile_image column to users table to store user profile picture URLs
*/

-- Add profile_image to users table
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS profile_image TEXT;