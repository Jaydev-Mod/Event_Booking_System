import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Check Local Storage on load
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);

    // 2. Setup Axios Interceptor (The Security Guard)
    const interceptor = axios.interceptors.response.use(
      (response) => response, // If response is good, do nothing
      (error) => {
        // If Backend says "401 Unauthorized" (Token bad/expired)
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('userInfo');
          setUser(null);
          // Hard redirect to login to clear state
          window.location.href = '/login'; 
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptor when app closes
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  const login = (userData) => {
    localStorage.setItem('userInfo', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
    window.location.href = '/login'; 
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;