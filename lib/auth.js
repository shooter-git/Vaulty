import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    if (token && storedUsername) {
      setIsAuthenticated(true);
      setUsername(storedUsername);
    }
  }, []);

  const login = async (username, password) => {
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', username, password })
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Authentication failed');
      }
      const { accessToken, username: responseUsername } = await response.json();
      localStorage.setItem('token', accessToken);
      localStorage.setItem('username', responseUsername);
      setIsAuthenticated(true);
      setUsername(responseUsername);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const signup = async (username, password) => {
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'signup', username, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Signup failed');
      }

      const { accessToken, username: responseUsername } = await response.json();
      localStorage.setItem('token', accessToken);
      localStorage.setItem('username', responseUsername);
      setIsAuthenticated(true);
      setUsername(responseUsername);
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsAuthenticated(false);
    setUsername(null);
    router.push('/login');
  };

  const refreshToken = async () => {
    try {
      const response = await fetch('/api/refresh', {
        method: 'POST',
        credentials: 'include', // This is important to include the refresh token cookie
      });
      if (response.ok) {
        const { accessToken } = await response.json();
        localStorage.setItem('token', accessToken);
        return accessToken;
      } else {
        throw new Error('Failed to refresh token');
      }
    } catch (error) {
      console.error('Token refresh error:', error);
      logout();
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, signup, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}