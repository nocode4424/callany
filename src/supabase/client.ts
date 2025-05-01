import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// These environment variables need to be set in a .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Anon Key not found. Please check your .env file.');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Helper function to check if a user with the given phone number exists
/**
 * Check if a user with the given phone number exists in the users table.
 * Returns { exists, userData, error }.
 */
export const checkUserExists = async (phoneNumber: string) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('phone_number', phoneNumber)
      .maybeSingle();
    if (error) throw error;
    if (data) {
      return { exists: true, userData: data, error: null };
    }
    return { exists: false, userData: null, error: null };
  } catch (error) {
    console.error('Error checking if user exists:', error);
    return { exists: false, userData: null, error };
  }
};

// Helper function to create a new user in the database
/**
 * Create a new user record in the users table.
 * Expects fields: first_name, last_name, email, phone_number, zip_code.
 * Returns { data: UserRow, error }.
 */
export const createUser = async (userData: {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  zip_code: string;
  [key: string]: any;
}) => {
  try {
    const insertData = {
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.email,
      phone_number: userData.phone_number,
      zip_code: userData.zip_code,
    };
    const { data, error } = await supabase
      .from('users')
      .insert([insertData])
      .select('*')
      .single();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating user:', error);
    return { data: null, error };
  }
};