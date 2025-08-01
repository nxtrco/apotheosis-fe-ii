'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

interface User {
  email: string;
  user_status?: 'active' | 'deactivated';
  role?: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (token: string, refreshToken: string, user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check for existing session on initial load
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('access_token');
      const userStr = localStorage.getItem('user');
      
      if (token && userStr) {
        try {
          const userData = JSON.parse(userStr);
          
          // Check if user is deactivated
          if (userData.user_status === 'deactivated') {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('user');
            router.push('/blocked');
            return;
          }
          
          setUser(userData);
        } catch (e) {
          // Invalid user data in localStorage
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('user');
        }
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, [router]);

  const login = (token: string, refreshToken: string, userData: User) => {
    // Check if user is deactivated during login
    if (userData.user_status === 'deactivated') {
      router.push('/blocked');
      return;
    }
    
    localStorage.setItem('access_token', token);
    localStorage.setItem('refresh_token', refreshToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/signin');
  };

  const contextValue: AuthContextType = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// HOC for protected routes
export function withAuth(Component: React.ComponentType) {
  return function WithAuth(props: any) {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !isAuthenticated) {
        router.replace('/signin');
      }
    }, [loading, isAuthenticated, router]);

    if (loading) {
      return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    if (!isAuthenticated) {
      return null;
    }

    return <Component {...props} />;
  };
} 