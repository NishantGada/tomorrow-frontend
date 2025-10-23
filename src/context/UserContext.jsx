import React, { createContext, useEffect, useState } from 'react';
import SendRequest from '../utils/SendRequest';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [reload, setReload] = useState(false);

  const getUserDetailsAPI = async () => {
    try {
      const response = await SendRequest("/user", {}, "GET", {});
      setUser({
        ...user,
        first_name: response.data.data.user.first_name,
        last_name: response.data.data.user.last_name,
        phone: response.data.data.user.phone,
        email: response.data.data.user.email,
      })
    } catch (error) {
      console.log("error: ", error);
    }
  }

  const fetchUserDetails = () => setReload(prev => !prev);

  useEffect(() => {
    getUserDetailsAPI();
  }, [reload]);

  return (
    <UserContext.Provider value={{ user, setUser, fetchUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};