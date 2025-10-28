import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({});

  const login = (userData) => {
    console.log("Logging user in...");
    setLoggedInUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    console.log("Logging user out...");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated, loggedInUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
