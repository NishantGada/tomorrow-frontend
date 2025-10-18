import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AddNewModal from './src/components/Modal/AddNewModal';
import { AuthProvider } from './src/context/AuthContext';
import StackNavigator from './src/navigation/StackNavigator';
import { TaskContextProvider } from './src/context/TaskContext';

export default function App() {
  const [visible, setVisible] = useState(false);

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <TaskContextProvider>
          <NavigationContainer>
            <StackNavigator visible={visible} setVisible={setVisible} />
          </NavigationContainer>

          {/* Global modal for adding tasks */}
          <AddNewModal visible={visible} setVisible={setVisible} />
        </TaskContextProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}