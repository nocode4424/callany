/*
  # Disable Row Level Security for users and contact_messages tables

  1. Changes
    - Disable RLS on `users` table
    - Disable RLS on `contact_messages` table

  This migration removes row level security restrictions from these tables,
  allowing any operations (SELECT, INSERT, UPDATE, DELETE) without restrictions.
*/

-- Disable Row Level Security on users table
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- Disable Row Level Security on contact_messages table
ALTER TABLE public.contact_messages DISABLE ROW LEVEL SECURITY;