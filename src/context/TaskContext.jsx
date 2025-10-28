import React, { createContext, useEffect, useState } from 'react';
import SendRequest from '../utils/SendRequest';
import { useAuth } from './AuthContext';

export const TaskContext = createContext();

export const TaskContextProvider = ({ children }) => {
  const [contextTasks, setContextTasks] = useState([]);
  const [reloadTasks, setReloadTasks] = useState(false);

  const { loggedInUser } = useAuth();

  const getTasksAPI = async () => {
    console.log("inside getTasksAPI");
    try {
      const response = await SendRequest("/tasks", {}, loggedInUser, "GET", {});
      setContextTasks(response.data.data.tasks);
    } catch (error) {
      console.log("getTasksAPI error:", error);
    }
  };

  const refreshTasks = () => setReloadTasks(prev => !prev);

  useEffect(() => {
    if (loggedInUser && Object.keys(loggedInUser).length > 0) {
      getTasksAPI();
    }
  }, [reloadTasks, loggedInUser]);

  return (
    <TaskContext.Provider value={{ contextTasks, setContextTasks, refreshTasks }}>
      {children}
    </TaskContext.Provider>
  );
};