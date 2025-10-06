// src/components/CustomAppBar.js
import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AddNewModal from '../Modal/AddNewModal';

export default function Appbar({ state, descriptors, navigation, onAddPress }) {
  return (
    <View style={styles.container}>
      <View style={styles.appBar}>
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const { options } = descriptors[route.key];
          const iconName = {
            Home: focused ? 'home' : 'home-outline',
            Profile: focused ? 'person' : 'person-outline',
            Search: focused ? 'trending-up-sharp' : 'trending-up-sharp',
            History: focused ? 'play-back' : 'play-back-outline',
          }[route.name] || 'ellipse';

          const onPress = () => {
            if (!focused) navigation.navigate(route.name);
          };

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={styles.iconContainer}
            >
              <Ionicons
                name={iconName}
                size={28}
                color={focused ? "black" : '#8e8e93'}
              />
            </TouchableOpacity>
          );
        })}
      </View>
      <TouchableOpacity onPress={onAddPress} style={styles.addButtonContainer}>
        <Text style={styles.addButton}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "center",
    columnGap: 10
  },

  appBar: {
    // position: 'absolute',
    // bottom: 20,
    // left: 10,

    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',

    backgroundColor: "white",
    borderRadius: 10,
    width: "70%",
    height: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1.5,
    borderColor: "black"
  },

  iconContainer: {
    flex: 1,
    alignItems: 'center',
  },

  addButtonContainer: {
    fontSize: "100",
    borderWidth: 1.5,
    borderColor: "black",
    borderRadius: 10,
    width: 60,
    height: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  addButton: {
    fontSize: "30",
  },
});
