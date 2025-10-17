import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainTabs from './MainTabs';
import { useAuth } from '../context/AuthContext';
import Login from '../pages/Auth/Login';
import Signup from '../pages/Auth/Signup';

const Stack = createNativeStackNavigator();

export default function StackNavigator({ visible, setVisible }) {
  const { isAuthenticated } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <>
          <Stack.Screen name="Login">
            {props => <Login {...props} />}
          </Stack.Screen>
          <Stack.Screen name="Signup">
            {props => <Signup {...props} />}
          </Stack.Screen>
        </>
      ) : (
        <Stack.Screen name="MainTabs">
          {props => <MainTabs {...props} visible={visible} setVisible={setVisible} />}
        </Stack.Screen>
      )}
    </Stack.Navigator>
  );
}
