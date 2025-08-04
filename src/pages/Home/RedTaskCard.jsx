import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TaskModal from './TaskModal';
import TaskDetailModal from './TaskDetailModal';

const RedTaskCard = () => {
	const [modalVisible, setModalVisible] = useState(false);
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


	// variables used when you click on a specific task 
	const [taskDetailModalVisible, setTaskDetailModalVisible] = useState(false);
	const [selectedTaskIndex, setSelectedTaskIndex] = useState(null)
	const [editedTitle, setEditedTitle] = useState('')
	const [editedDescription, setEditedDescription] = useState('')


	const openModal = (index) => {
		console.log("index: ", index);
		setSelectedTaskIndex(index)
		setEditedTitle(redTasks[index].title)
		setEditedDescription(redTasks[index].description)
		setTaskDetailModalVisible(true)
	}

	const closeModal = () => {
		setTaskDetailModalVisible(false)
		setSelectedTaskIndex(null)
	}

	const updateTask = () => {
		if (selectedTaskIndex !== null) {
			const updatedTasks = [...redTasks]
			updatedTasks[selectedTaskIndex] = {
				title: editedTitle,
				description: editedDescription,
			}
			setRedTasks(updatedTasks)
		}
		closeModal()
	}

	const markDone = () => {
		if (selectedTaskIndex !== null) {
			const updatedTasks = [...redTasks]
			updatedTasks.splice(selectedTaskIndex, 1)
			setRedTasks(updatedTasks)
		}
		closeModal()
	}

	const CreateNewTask = (task) => {
		setRedTasks(prevTasks => [...prevTasks, task]);
	};

	return (
		<View style={styles.container}>
			<TaskModal
				visible={modalVisible}
				onClose={() => setModalVisible(false)}
				onSubmit={CreateNewTask}
			/>

			<View style={styles.header}>
				<Text style={styles.headerText}>Urgent Tasks</Text>
				<TouchableOpacity onPress={() => setModalVisible(true)}>
					<Ionicons name="add" size={28} color="#fff" />
				</TouchableOpacity>
			</View>

			<View style={styles.taskList}>
				{redTasks.map((task, index) => (
					<TouchableOpacity
						key={index}
						onPress={() => openModal(index)}
					>
						<Text style={styles.taskText}>{task.title}</Text>

						{index !== redTasks.length - 1 && <View style={styles.divider} />}
					</TouchableOpacity>
				))}
			</View>

			<TaskDetailModal
				visible={taskDetailModalVisible}
				onClose={closeModal}
				task={{ title: editedTitle, description: editedDescription }}
				onUpdate={updateTask}
				onMarkDone={markDone}
				setEditedTitle={setEditedTitle}
				setEditedDescription={setEditedDescription}
			/>

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
		backgroundColor: "#F08080",
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 16,
	},
	headerText: {
		color: '#fff',
		fontSize: 18,
		fontWeight: 'bold',
	},
	taskList: {
		flex: 8,
		backgroundColor: "rgba(255, 105, 97, 0.3)",
		paddingHorizontal: 16,
	},
	taskText: {
		color: 'black',
		fontSize: 16,
		fontWeight: "bold",
		paddingVertical: 20
	},

	divider: {
		height: 1,
		backgroundColor: 'black',
	}
});

export default RedTaskCard;
