'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(undefined);

// Mock token management
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';
const REFRESH_TOKEN_KEY = 'refresh_token';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = localStorage.getItem(TOKEN_KEY);
        const storedUser = localStorage.getItem(USER_KEY);
        
        if (storedToken && storedUser) {
          const userData = JSON.parse(storedUser);
          const tokenData = JSON.parse(storedToken);
          
          // Check if token is expired
          if (tokenData.expiresAt && new Date() > new Date(tokenData.expiresAt)) {
            // Try to refresh token
            const refreshed = await refreshToken();
            if (refreshed) {
              setToken(refreshed);
              setUser(userData);
            } else {
              // Clear expired session
              clearAuthData();
            }
          } else {
            setToken(tokenData);
            setUser(userData);
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        clearAuthData();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Clear all auth data
  const clearAuthData = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    setUser(null);
    setToken(null);
  }, []);

  // Generate mock token
  const generateToken = useCallback((userData) => {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours
    
    return {
      accessToken: `mock_token_${userData.id}_${Date.now()}`,
      refreshToken: `refresh_${userData.id}_${Date.now()}`,
      expiresAt: expiresAt.toISOString(),
      tokenType: 'Bearer'
    };
  }, []);

  // Refresh token
  const refreshToken = useCallback(async () => {
    try {
      const storedRefreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
      if (!storedRefreshToken) return null;

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData = JSON.parse(localStorage.getItem(USER_KEY));
      const newToken = generateToken(userData);
      
      localStorage.setItem(TOKEN_KEY, JSON.stringify(newToken));
      localStorage.setItem(REFRESH_TOKEN_KEY, newToken.refreshToken);
      
      return newToken;
    } catch (error) {
      console.error('Error refreshing token:', error);
      return null;
    }
  }, [generateToken]);

  // Login function
  const login = async (email, password) => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (email && password) {
        const mockUser = {
          id: Math.random().toString(36).substr(2, 9),
          name: email.includes('admin') ? 'System Admin' :
            email.includes('institution') ? 'Institution Officer' : 'Verifier',
          email,
          role: email.includes('admin') ? 'admin' :
            email.includes('institution') ? 'institution' : 'verifier',
          institution: email.includes('institution') ? 'Delhi University' : undefined,
          lastLogin: new Date().toISOString(),
          permissions: getPermissionsByRole(email.includes('admin') ? 'admin' :
            email.includes('institution') ? 'institution' : 'verifier')
        };

        const tokenData = generateToken(mockUser);
        
        // Store in localStorage
        localStorage.setItem(TOKEN_KEY, JSON.stringify(tokenData));
        localStorage.setItem(USER_KEY, JSON.stringify(mockUser));
        localStorage.setItem(REFRESH_TOKEN_KEY, tokenData.refreshToken);
        
        setUser(mockUser);
        setToken(tokenData);
        
        return { success: true, user: mockUser };
      }
      
      return { success: false, error: 'Invalid credentials' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed' };
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        name: userData.name,
        email: userData.email,
        role: userData.role || 'verifier',
        institution: userData.institution,
        createdAt: new Date().toISOString(),
        permissions: getPermissionsByRole(userData.role || 'verifier')
      };

      const tokenData = generateToken(newUser);
      
      // Store in localStorage
      localStorage.setItem(TOKEN_KEY, JSON.stringify(tokenData));
      localStorage.setItem(USER_KEY, JSON.stringify(newUser));
      localStorage.setItem(REFRESH_TOKEN_KEY, tokenData.refreshToken);
      
      setUser(newUser);
      setToken(tokenData);
      
      return { success: true, user: newUser };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Registration failed' };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = useCallback(() => {
    clearAuthData();
    // In a real app, you might want to call an API to invalidate the token
  }, [clearAuthData]);

  // Check if user has permission
  const hasPermission = useCallback((permission) => {
    if (!user || !user.permissions) return false;
    return user.permissions.includes(permission);
  }, [user]);

  // Check if user has role
  const hasRole = useCallback((role) => {
    if (!user) return false;
    return user.role === role;
  }, [user]);

  // Check if user has any of the specified roles
  const hasAnyRole = useCallback((roles) => {
    if (!user) return false;
    return roles.includes(user.role);
  }, [user]);

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isLoading,
      login,
      register,
      logout,
      refreshToken,
      hasPermission,
      hasRole,
      hasAnyRole,
      isAuthenticated: !!user && !!token
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// Helper function to get permissions by role
function getPermissionsByRole(role) {
  const permissions = {
    admin: [
      'read:all',
      'write:all',
      'delete:all',
      'manage:users',
      'manage:institutions',
      'manage:certificates',
      'view:analytics',
      'manage:system'
    ],
    institution: [
      'read:own',
      'write:own',
      'manage:own_certificates',
      'view:own_analytics'
    ],
    verifier: [
      'read:certificates',
      'verify:certificates',
      'view:verification_history'
    ]
  };
  
  return permissions[role] || permissions.verifier;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}