import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

import Home from './src/pages/Home/Home';
import Profile from './src/pages/Profile/Profile';
import Appbar from './src/components/Appbar/Appbar';
import Search from './src/pages/Search/Search';
import Previous from './src/pages/Previous/Previous';
import AddNewModal from './src/components/Modal/AddNewModal';

const Tab = createBottomTabNavigator();

export default function App() {
  const [visible, setVisible] = useState(false);

  return (
    <SafeAreaProvider style={styles.safeArea}>
      <NavigationContainer>
        <Tab.Navigator
          tabBar={props => (
            <Appbar
              {...props}
              onAddPress={() => setVisible(true)}
            />
          )}
          screenOptions={{ headerShown: false }}
        >
          <Tab.Screen name="Home" component={Home} />
          {/* <Tab.Screen name="Search" component={Search} />
          <Tab.Screen name="Previous" component={Previous} /> */}
          <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
      </NavigationContainer>

      <AddNewModal visible={visible} setVisible={setVisible} />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
});