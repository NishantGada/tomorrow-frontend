import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AddNewModal from './src/components/Modal/AddNewModal';
import { AuthProvider } from './src/context/AuthContext';
import StackNavigator from './src/navigation/StackNavigator';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [visible, setVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          <StackNavigator visible={visible} setVisible={setVisible} />
        </NavigationContainer>

        {/* Global modal for adding tasks */}
        <AddNewModal visible={visible} setVisible={setVisible} />
      </AuthProvider>
    </SafeAreaProvider>
  );
}