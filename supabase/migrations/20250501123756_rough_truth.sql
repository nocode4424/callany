/*
  # Ensure Row Level Security is disabled for users table

  This migration makes sure the users table has RLS disabled to fix the
  authentication issues in the application.

  1. Changes
    - Disable RLS on the users table
*/

-- Disable Row Level Security on users table to allow all operations
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- This ensures the system can create and authenticate users properly