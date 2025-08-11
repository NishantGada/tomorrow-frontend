import { View, Text, SafeAreaView, StyleSheet, TextInput, ScrollView, FlatList } from 'react-native'
import React, { useState } from 'react'
import TaskCard from '../Home/TaskCard';

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

	const allTasks = [...redTasks, ...yellowTasks, ...greenTasks];
	console.log({ allTasks });

	const filteredCategories = allTasks.filter((item) =>
		item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
		item.description.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<SafeAreaView style={styles.safeArea}>
			<View style={styles.container}>
				<TextInput
					style={styles.search}
					placeholder="Search..."
					placeholderTextColor="white"
					value={searchQuery}
					onChangeText={setSearchQuery}
				/>

				<ScrollView style={{ marginVertical: 20 }}>
					{filteredCategories.map((category, index) => (
						<View key={index} style={{ padding: 15 }}>
							<Text style={{ fontSize: 18 }}>{category.title}</Text>
							<Text style={{ fontSize: 12, color: "lightgray" }}>{category.description}</Text>
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
		borderRadius: 8,
		backgroundColor: "#F08080",
		padding: 20,
	}
})