import React, { createContext, useEffect, useState } from 'react';
import SendRequest from '../utils/SendRequest';

export const TaskContext = createContext();

export const TaskContextProvider = ({ children }) => {
  const [contextTasks, setContextTasks] = useState({});
  const [reload, setReload] = useState(false);

  const getTasksAPI = async () => {
    try {
      const response = await SendRequest("/tasks", {}, "GET", {});
      setContextTasks(response.data.data.tasks);
    } catch (error) {
      console.log("getTasksAPI error:", error);
    }
  };

  const refreshTasks = () => setReload(prev => !prev);

  useEffect(() => {
    getTasksAPI();
  }, [reload]);

  return (
    <TaskContext.Provider value={{ contextTasks, setContextTasks, refreshTasks }}>
      {children}
    </TaskContext.Provider>
  );
};