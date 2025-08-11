import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native'
import React, { useState } from 'react';

import Date from './Date'
import TaskCard from './TaskCard'

export default function Home({ navigation }) {
	const [tasks, setTasks] = useState([
		{
			"id": 1,
			"title": "task 1",
			"description": "task 1 description",
			"priority": "high"
		},
		{
			"id": 2,
			"title": "task 2",
			"description": "task 2 description",
			"priority": "high"
		},
		{
			"id": 3,
			"title": "task 3",
			"description": "task 3 description",
			"priority": "high"
		},
		{
			"id": 4,
			"title": "task 4",
			"description": "task 4 description",
			"priority": "medium"
		},
		{
			"id": 5,
			"title": "task 5",
			"description": "task 5 description",
			"priority": "medium"
		},
		{
			"id": 6,
			"title": "task 6",
			"description": "task 6 description",
			"priority": "medium"
		},
		{
			"id": 7,
			"title": "task 7",
			"description": "task 7 description",
			"priority": "low"
		},
		{
			"id": 8,
			"title": "task 8",
			"description": "task 8 description",
			"priority": "low"
		},
		{
			"id": 9,
			"title": "task 9",
			"description": "task 9 description",
			"priority": "low"
		},
	])

	const red = {
		heading: "High Priority",
		headerColor: { backgroundColor: "#F08080" },
		contentColor: { backgroundColor: "rgba(255, 105, 97, 0.3)" }
	}
	const yellow = {
		heading: "Medium Priority",
		headerColor: { backgroundColor: "#ffeb99" },
		contentColor: { backgroundColor: "rgba(255, 235, 153, 0.5)" }
	}
	const green = {
		heading: "Low Priority",
		headerColor: { backgroundColor: "#d4f4dd" },
		contentColor: { backgroundColor: "rgba(212, 244, 221, 0.5)" }
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "white", }}>
			<ScrollView style={styles.container} contentContainerStyle={styles.scrollViewStyle} showsVerticalScrollIndicator={false}>
				<View style={styles.header}>
					<View>
						<Text style={styles.heading}>What's</Text>
						<Text style={styles.heading2}>Tomorrow?</Text>
					</View>
					<Date />
				</View>

				<TaskCard category={red} tasks={tasks.filter(task => task.priority === "high")} setTasks={setTasks} />
				<TaskCard category={yellow} tasks={tasks.filter(task => task.priority === "medium")} setTasks={setTasks} />
				<TaskCard category={green} tasks={tasks.filter(task => task.priority === "low")} setTasks={setTasks} />
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
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
		justifyContent: "space-between",

		marginBottom: 20,
	},

	heading: {
		fontSize: 20,
		fontWeight: "bold",
	},

	heading2: {
		fontSize: 36,
		fontWeight: "bold",
		marginBottom: 10
	},
})