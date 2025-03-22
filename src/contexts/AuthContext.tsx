import React, { createContext, useState, useContext } from 'react';

interface User {
  userId: string;
  role: 'USER' | 'ADMIN';
  token: string;
}

interface LoginResponse {
  responseType: 'SUCCESS' | 'ERROR';
  data: {
    token: string;
    userId: string;
    role: 'USER' | 'ADMIN';
  };
  message: string;
}

interface AuthContextType {
  user: User | null;
  login: (response: LoginResponse) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (response: LoginResponse) => {
    const userData: User = {
      userId: response.data.userId,
      role: response.data.role,
      token: response.data.token
    };
    
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated: !!user 
    }}>
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