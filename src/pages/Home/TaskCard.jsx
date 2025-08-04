import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TaskModal from './TaskModal';
import TaskDetailModal from './TaskDetailModal';

const TaskCard = ({ category, tasks, setTasks }) => {
	const [modalVisible, setModalVisible] = useState(false);

	const [taskDetailModalVisible, setTaskDetailModalVisible] = useState(false);
	const [selectedTaskIndex, setSelectedTaskIndex] = useState(null)
	const [editedTitle, setEditedTitle] = useState('')
	const [editedDescription, setEditedDescription] = useState('')

	const openModal = (index) => {
		console.log("index: ", index);
		setSelectedTaskIndex(index)
		setEditedTitle(tasks[index].title)
		setEditedDescription(tasks[index].description)
		setTaskDetailModalVisible(true)
	}

	const closeModal = () => {
		setTaskDetailModalVisible(false)
		setSelectedTaskIndex(null)
	}

	const updateTask = () => {
		if (selectedTaskIndex !== null) {
			const updatedTasks = [...tasks]
			updatedTasks[selectedTaskIndex] = {
				title: editedTitle,
				description: editedDescription,
			}
			setTasks(updatedTasks)
		}
		closeModal()
	}

	const markDone = () => {
		if (selectedTaskIndex !== null) {
			const updatedTasks = [...tasks]
			updatedTasks.splice(selectedTaskIndex, 1)
			setTasks(updatedTasks)
		}
		closeModal()
	}

	const CreateNewTask = (task) => {
		setTasks(prevTasks => [...prevTasks, task]);
	};

	return (
		<View style={styles.container}>
			<TaskModal
				visible={modalVisible}
				onClose={() => setModalVisible(false)}
				onSubmit={CreateNewTask}
			/>

			<View style={[styles.header, category.headerColor]}>
				<Text style={styles.headerText}>{category.heading}</Text>
				<TouchableOpacity onPress={() => setModalVisible(true)}>
					<Ionicons name="add" size={28} color="black" />
				</TouchableOpacity>
			</View>

			<View style={[styles.taskList, category.contentColor]}>
				{tasks.map((task, index) => (
					<TouchableOpacity
						key={index}
						onPress={() => openModal(index)}
					>
						<Text style={styles.taskText}>{task.title}</Text>

						{index !== tasks.length - 1 && <View style={styles.divider} />}
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

export default TaskCard;
