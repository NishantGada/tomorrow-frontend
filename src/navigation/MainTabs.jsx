// src/MainTabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../pages/Profile/Profile';
import { useAuth } from '../context/AuthContext';
import Home from '../pages/Home/Home';
import Appbar from '../components/Appbar/Appbar';

const Tab = createBottomTabNavigator();

export default function MainTabs({ visible, setVisible }) {
  return (
    <Tab.Navigator
      tabBar={props => <Appbar {...props} onAddPress={() => setVisible(true)} />}
      screenOptions={{ headerShown: false, tabBarStyle: { height: 0, backgroundColor: 'transparent' } }}
    >
      <Tab.Screen name="Home">
        {props => <Home {...props} visible={visible} setVisible={setVisible} />}
      </Tab.Screen>

      <Tab.Screen name="Profile">
        {props => <Profile {...props} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
