import { View, Text, SafeAreaView, StyleSheet, TextInput, ScrollView, FlatList } from 'react-native'
import React, { useState } from 'react'
import TaskCard from '../Home/TaskCard';
import { StyleConstants } from '../../utils/StyleConstants';

export default function Search() {
	const [searchQuery, setSearchQuery] = useState('');
	const [redTasks, setRedTasks] = useState([
		{
			"id": 1,
			"title": "task 1",
			"description": "task 1 description"
		},
		{
			"id": 2,
			"title": "task 2",
			"description": "task 2 description"
		},
		{
			"id": 3,
			"title": "task 3",
			"description": "task 3 description"
		},
	])
	const [yellowTasks, setYellowTasks] = useState([
		{
			"id": 4,
			"title": "task 4",
			"description": "task 4 description"
		},
		{
			"id": 5,
			"title": "task 5",
			"description": "task 5 description"
		},
		{
			"id": 6,
			"title": "task 6",
			"description": "task 6 description"
		},
	])
	const [greenTasks, setGreenTasks] = useState([
		{
			"id": 7,
			"title": "task 7",
			"description": "task 7 description"
		},
		{
			"id": 8,
			"title": "task 8",
			"description": "task 8 description"
		},
		{
			"id": 9,
			"title": "task 9",
			"description": "task 9 description"
		},
	])

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

	const filteredTasks = tasks.filter((item) =>
		item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
		item.description.toLowerCase().includes(searchQuery.toLowerCase())
	);
	console.log({ filteredTasks });

	return (
		<SafeAreaView style={styles.safeArea}>
			<View style={styles.container}>
				<TextInput
					style={styles.search}
					placeholder="Search..."
					placeholderTextColor="black"
					value={searchQuery}
					onChangeText={setSearchQuery}
				/>

				<ScrollView style={{ marginVertical: 20 }}>
					{filteredTasks.map((task, index) => (
						<View key={index} style={styles.taskDisplayView}>
							<View style={[styles.colorBox, StyleConstants[task.priority].headerColor]}></View>
							<View>
								<Text style={{ fontSize: 18 }}>{task.title}</Text>
								<Text style={{ fontSize: 12, color: "lightgray" }}>{task.description}</Text>
							</View>
						</View>
					))}
				</ScrollView>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "white",
	},

	container: {
		flex: 1,
		padding: 20,
	},

	search: {
		backgroundColor: "white",
		padding: 15,

		borderWidth: 2,
		borderColor: "black",
		borderRadius: 8,
	},

	taskDisplayView: {
		padding: 15,

		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		columnGap: 10,
	},

	colorBox: {
		borderRadius: 8,

		width: 30,
		height: 30
	}
})