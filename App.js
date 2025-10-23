import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AddNewModal from './src/components/Modal/AddNewModal';
import { AuthProvider } from './src/context/AuthContext';
import { TaskContextProvider } from './src/context/TaskContext';
import { UserContextProvider } from './src/context/UserContext';
import StackNavigator from './src/navigation/StackNavigator';

export default function App() {
  const [visible, setVisible] = useState(false);

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <TaskContextProvider>
          <UserContextProvider>
            <NavigationContainer>
              <StackNavigator visible={visible} setVisible={setVisible} />
            </NavigationContainer>

            {/* Global modal for adding tasks */}
            <AddNewModal visible={visible} setVisible={setVisible} />
          </UserContextProvider>
        </TaskContextProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}