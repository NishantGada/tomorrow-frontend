import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native'
import React from 'react'
import RedTaskCard from './RedTaskCard'
import YellowTaskCard from './YellowTaskCard'
import GreenTaskCard from './GreenTaskCard'
import Date from './Date'

export default function Home({ navigation }) {
	return (
		<ScrollView style={styles.container} contentContainerStyle={styles.scrollViewStyle}>
			<View style={styles.header}>
				<View>
					<Text style={styles.heading}>What's</Text>
					<Text style={styles.heading2}>Tomorrow?</Text>
				</View>
				<Date />
			</View>

			<RedTaskCard />
			<YellowTaskCard />
			<GreenTaskCard />
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		paddingTop: 20,
		paddingHorizontal: 20,
	},

	scrollViewStyle: {
		paddingBottom: 100
	},

	header: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},

	heading: {
		fontSize: 24,
		fontWeight: "bold",
	},

	heading2: {
		fontSize: 36,
		fontWeight: "bold",
		marginBottom: 10
	},
})