import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native'
import React, { useState } from 'react';

import Date from './Date'
import TaskCard from './TaskCard'
import { StyleConstants } from '../../utils/StyleConstants';

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

				<TaskCard category={StyleConstants["high"]} tasks={tasks.filter(task => task.priority === "high")} setTasks={setTasks} />
				<TaskCard category={StyleConstants["medium"]} tasks={tasks.filter(task => task.priority === "medium")} setTasks={setTasks} />
				<TaskCard category={StyleConstants["low"]} tasks={tasks.filter(task => task.priority === "low")} setTasks={setTasks} />
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