import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

import Home from './src/pages/Home/Home';
import Profile from './src/pages/Profile/Profile';
import Appbar from './src/components/Appbar/Appbar';
import Search from './src/pages/Search/Search';
import Previous from './src/pages/Previous/Previous';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider style={styles.safeArea}>
      <NavigationContainer>
        <Tab.Navigator
          tabBar={props => <Appbar {...props} />}
          screenOptions={{ headerShown: false }}
        >
          <Tab.Screen name="Home" component={Home} />
          {/* <Tab.Screen name="Search" component={Search} /> */}
          <Tab.Screen name="Previous" component={Previous} />
          <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
});