import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  userId: string | null;
  login: (token: string, id: string) => void;
  logout: () => void;
  checkAuthStatus: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const checkAuthStatus = useCallback(() => {
    const token = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId');
    
    if (token && storedUserId) {
      setIsLoggedIn(true);
      setUserId(storedUserId);
    } else {
      setIsLoggedIn(false);
      setUserId(null);
    }
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  useEffect(() => {
    window.addEventListener('storage', checkAuthStatus);
    return () => window.removeEventListener('storage', checkAuthStatus);
  }, [checkAuthStatus]);

  const login = useCallback((token: string, id: string) => {
    try {
      localStorage.setItem('token', token);
      localStorage.setItem('userId', id);
      setIsLoggedIn(true);
      setUserId(id);
    } catch (error) {
      console.error('로그인 상태 저장 중 오류 발생:', error);
    }
  }, []);

  const logout = useCallback(() => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      setIsLoggedIn(false);
      setUserId(null);
    } catch (error) {
      console.error('로그아웃 처리 중 오류 발생:', error);
    }
  }, []);

  const value = {
    isLoggedIn,
    userId,
    login,
    logout,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 