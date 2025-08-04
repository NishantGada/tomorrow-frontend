import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const YellowTaskCard = () => {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerText}>Moderate Urgency</Text>
				<TouchableOpacity>
					<Ionicons name="add" size={28} color="black" />
				</TouchableOpacity>
			</View>

			<View style={styles.taskList}>
				<Text style={styles.taskText}>• Task 1</Text>
				<Text style={styles.taskText}>• Task 2</Text>
				<Text style={styles.taskText}>• Task 3</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
		minHeight: 200,
		maxHeight: "100%",
		borderRadius: 16,
		overflow: 'hidden',
		backgroundColor: 'transparent',
		alignSelf: 'center',
		marginVertical: 10,
	},
	header: {
		flex: 2,
		backgroundColor: "#ffeb99",
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 16,
	},
	headerText: {
		color: 'black',
		fontSize: 18,
		fontWeight: 'bold',
	},
	taskList: {
		flex: 8,
		backgroundColor: "rgba(255, 235, 153, 0.5)",
		padding: 16,
	},
	taskText: {
		color: 'black',
		marginBottom: 8,
		fontSize: 16,
		fontWeight: "bold"
	},
});

export default YellowTaskCard;
