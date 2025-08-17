// src/context/AuthContext.tsx
import { createContext, useContext, type ReactNode, useState, useEffect } from 'react';
import { login, getUser } from '../api/auth';

interface AuthContextType {
  user: unknown;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<unknown>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
      // جلب بيانات المستخدم عند التحميل
      getUser(savedToken).then(setUser).catch(console.error);
    }
  }, []);

  const handleLogin = async (username: string, password: string) => {
    const token = await login({ username, password });
    localStorage.setItem('token', token);
    setToken(token);
    const userData = await getUser(token);
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      login: handleLogin,
      logout: handleLogout,
      isAuthenticated: true,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};