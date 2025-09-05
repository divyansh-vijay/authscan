'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';


const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulate checking for existing session
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
    // Simulate login - in real app, this would call Supabase auth
    if (email && password) {
      const mockUser = {
        id: '1',
        name: email.includes('admin') ? 'System Admin' :
          email.includes('institution') ? 'Institution Officer' : 'Verifier',
        email,
        role: email.includes('admin') ? 'admin' :
          email.includes('institution') ? 'institution' : 'verifier',
        institution: email.includes('institution') ? 'Delhi University' : undefined
      };
      setUser(mockUser);
      localStorage.setItem('auth_user', JSON.stringify(mockUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
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
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}