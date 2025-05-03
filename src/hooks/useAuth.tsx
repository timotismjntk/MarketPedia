
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";

export type UserRole = 'buyer' | 'seller' | 'admin';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role?: UserRole) => Promise<void>;
  logout: () => void;
  verifyOTP: (otp: string) => Promise<boolean>;
  sendOTP: (phoneOrEmail: string) => Promise<void>;
  hasRole: (roles: UserRole | UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();
  
  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      const savedUser = localStorage.getItem('user');
      
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (error) {
          console.error('Failed to parse stored user data', error);
          localStorage.removeItem('user');
        }
      }
      
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);
  
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Mock login API call
      // In a real app, this would be an actual API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: '1',
        name: 'John Doe',
        email,
        role: 'buyer', // Default role
        avatar: '/placeholder.svg'
      };
      
      // Save user to localStorage
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      
      toast({
        title: 'Login successful',
        description: `Welcome back, ${mockUser.name}!`,
      });
    } catch (error) {
      toast({
        title: 'Login failed',
        description: 'Please check your credentials and try again.',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const register = async (name: string, email: string, password: string, role: UserRole = 'buyer') => {
    setIsLoading(true);
    
    try {
      // Mock registration API call
      // In a real app, this would be an actual API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: Date.now().toString(),
        name,
        email,
        role,
        avatar: '/placeholder.svg'
      };
      
      // Save user to localStorage
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      
      toast({
        title: 'Registration successful',
        description: `Welcome to our marketplace, ${name}!`,
      });
    } catch (error) {
      toast({
        title: 'Registration failed',
        description: 'There was an error with your registration.',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out.',
    });
  };
  
  const verifyOTP = async (otp: string): Promise<boolean> => {
    try {
      // Mock OTP verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful verification for demo
      if (otp === '123456') {
        toast({
          title: 'Verification successful',
          description: 'Your phone number has been verified.',
        });
        return true;
      } else {
        toast({
          title: 'Verification failed',
          description: 'Invalid OTP. Please try again.',
          variant: 'destructive',
        });
        return false;
      }
    } catch (error) {
      toast({
        title: 'Verification error',
        description: 'There was an error verifying your OTP.',
        variant: 'destructive',
      });
      return false;
    }
  };
  
  const sendOTP = async (phoneOrEmail: string): Promise<void> => {
    try {
      // Mock sending OTP
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'OTP Sent',
        description: `A verification code has been sent to ${phoneOrEmail}.`,
      });
    } catch (error) {
      toast({
        title: 'Failed to send OTP',
        description: 'There was an error sending the verification code.',
        variant: 'destructive',
      });
      throw error;
    }
  };
  
  const hasRole = (roles: UserRole | UserRole[]): boolean => {
    if (!user) return false;
    
    if (Array.isArray(roles)) {
      return roles.includes(user.role);
    }
    
    return user.role === roles;
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        verifyOTP,
        sendOTP,
        hasRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
