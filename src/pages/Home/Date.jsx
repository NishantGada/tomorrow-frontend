import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Date({ tomorrowDate }) {
	return (
		<View style={styles.dateContainer}>
			<Text style={styles.dateNumber}>{tomorrowDate["day"]}</Text>
			<Text style={styles.dateMonth}>{tomorrowDate["month_name"]}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	dateContainer: {
		padding: 6,
		alignItems: 'center',
		borderWidth: 2,
		borderColor: "#FFDAB9",
		borderRadius: 10,
		backgroundColor: "#FFDAB9"
	},

	dateNumber: {
		fontSize: 32,
		fontWeight: 'bold',
		color: '#333',
	},

	dateMonth: {
		fontSize: 14,
		color: '#777',
		textTransform: 'uppercase',
	},
})