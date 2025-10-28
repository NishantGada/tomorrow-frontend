import React, { createContext, useState } from 'react';
import SendRequest from '../utils/SendRequest';
import { useAuth } from './AuthContext';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const { loggedInUser } = useAuth();

  const getUserDetailsAPI = async () => {
    try {
      const response = await SendRequest("/user", {}, loggedInUser, "GET", {});
      setUser({
        ...user,
        first_name: response.data.data.user.first_name,
        last_name: response.data.data.user.last_name,
        phone: response.data.data.user.phone,
        email: response.data.data.user.email,
      })
    } catch (error) {
      console.log("getUserDetailsAPI error: ", error);
    }
  }

  const fetchUserDetails = () => getUserDetailsAPI();

  return (
    <UserContext.Provider value={{ user, setUser, fetchUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};