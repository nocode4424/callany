import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase/client';
import type { Database } from '../supabase/types';

// Define the User type based on Supabase users table
type User = Database['public']['Tables']['users']['Row'];

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  /**
   * Manually set user session from a user row
   */
  login: (userData: User) => void;
  /**
   * Log in by phone number, throw if not found or on error
   */
  loginByPhone: (phoneNumber: string) => Promise<User>;
  /**
   * Sign up a new user with provided data, returns the created user
   */
  signup: (userData: Omit<User, 'id' | 'created_at'>) => Promise<User>;
  /**
   * Clears session
   */
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Load user from localStorage on init and validate
  useEffect(() => {
    const stored = localStorage.getItem('userSession');
    if (stored) {
      try {
        const parsed: User = JSON.parse(stored);
        // Optionally re-fetch to validate
        supabase
          .from('users')
          .select('*')
          .eq('phone_number', parsed.phone_number)
          .single()
          .then(({ data, error }) => {
            if (data && !error) {
              setUser(data);
            } else {
              // Clear invalid session
              localStorage.removeItem('userSession');
              setUser(null);
            }
            setIsLoading(false);
          });
      } catch (_err) {
        localStorage.removeItem('userSession');
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, []);
  /**
   * Log in by phone number: checks users table and persists session
   */
  const loginByPhone = async (phoneNumber: string): Promise<User> => {
    const { data, error } = await supabase
      .from<User>('users')
      .select('*')
      .eq('phone_number', phoneNumber)
      .maybeSingle();
    if (error) {
      throw error;
    }
    if (!data) {
      throw new Error('User not found');
    }
    // Persist session
    setUser(data);
    localStorage.setItem('userSession', JSON.stringify(data));
    return data;
  };
  /**
   * Sign up a new user: inserts into users table and persists session
   */
  const signup = async (newUser: Omit<User, 'id' | 'created_at'>): Promise<User> => {
    const insertData = {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      phone_number: newUser.phone_number,
      zip_code: newUser.zip_code,
    };
    const { data, error } = await supabase
      .from<User>('users')
      .insert([insertData])
      .select('*')
      .single();
    if (error) {
      throw error;
    }
    setUser(data);
    localStorage.setItem('userSession', JSON.stringify(data));
    return data;
  };

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('userSession', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userSession');
    // Redirect to home
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, loginByPhone, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
