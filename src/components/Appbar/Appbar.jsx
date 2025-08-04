// src/components/CustomAppBar.js
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Appbar({ state, descriptors, navigation }) {
	return (
		<View style={styles.container}>
			{state.routes.map((route, index) => {
				const focused = state.index === index;
				const { options } = descriptors[route.key];
				const iconName = {
					Home: focused ? 'home' : 'home-outline',
					Profile: focused ? 'person' : 'person-outline',
					Search: focused ? 'search' : 'search-outline',
					History: focused ? 'time' : 'time-outline',
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
	);
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		bottom: 20,
		
		flexDirection: 'row',
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'space-around',

		backgroundColor: "white",
		borderRadius: 10,
		width: "80%",
		height: 70,
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
});
