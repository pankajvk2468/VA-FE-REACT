import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tempCredentials, setTempCredentials] = useState<{ email: string; password: string } | null>(null);

  useEffect(() => {
    // Check for stored auth token on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock: Check credentials and determine role
      // In production, the backend will validate and return user data
      setTempCredentials({ email, password });
      
      throw new Error('OTP_REQUIRED');
    } catch (error: any) {
      setIsLoading(false);
      if (error.message === 'OTP_REQUIRED') {
        throw error;
      }
      throw new Error('Invalid email or password');
    }
  };

  const verifyOTP = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login - Determine role based on email
      const email = tempCredentials?.email || '';
      let mockUser: User;
      
      // Admin user
      if (email === 'sandeep@iotasol.com') {
        mockUser = {
          id: '1',
          email: email,
          firstName: 'Sandeep',
          lastName: 'Admin',
          role: 'admin',
          phone: '(555) 123-4567',
        };
      }
      // Professional/Representative user
      else if (email === 'professional2@mailinator.com') {
        mockUser = {
          id: '2',
          email: email,
          firstName: 'Professional',
          lastName: 'User',
          role: 'representative',
          phone: '(555) 234-5678',
          companyName: 'VA Legal Services',
          isSuperAdmin: true,
        };
      }
      // Regular user
      else if (email === 'user1@mailinator.com') {
        mockUser = {
          id: '3',
          email: email,
          firstName: 'John',
          lastName: 'Doe',
          role: 'user',
          phone: '(555) 345-6789',
        };
      }
      // Default user for any other email
      else {
        mockUser = {
          id: '4',
          email: email,
          firstName: 'Test',
          lastName: 'User',
          role: 'user',
          phone: '(555) 456-7890',
        };
      }
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      setTempCredentials(null);
    } catch (error) {
      throw new Error('Invalid OTP code');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setTempCredentials(null);
  };

  const forgotPassword = async (email: string) => {
    // TODO: Replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Password reset email sent to:', email);
  };

  const resetPassword = async () => {
    // TODO: Replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Password reset successful');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    verifyOTP,
    logout,
    forgotPassword,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
