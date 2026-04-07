import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Try to get user from localStorage on initial load
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('nexus_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Login function
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('nexus_user', JSON.stringify(userData));
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('nexus_user');
    // Optional: Redirect to home or login after logout
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth easily
export const useAuth = () => useContext(AuthContext);