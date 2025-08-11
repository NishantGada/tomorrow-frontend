import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TaskModal from './TaskModal';
import TaskDetailModal from './TaskDetailModal';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
	UIManager.setLayoutAnimationEnabledExperimental(true);
}

const TaskCard = ({ category, tasks, setTasks }) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [taskDetailModalVisible, setTaskDetailModalVisible] = useState(false);
	const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);
	const [editedTitle, setEditedTitle] = useState('');
	const [editedDescription, setEditedDescription] = useState('');
	const [expanded, setExpanded] = useState(false); // Accordion state

	const toggleExpand = () => {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		setExpanded(!expanded);
	};

	const openModal = (index) => {
		setSelectedTaskIndex(index);
		setEditedTitle(tasks[index].title);
		setEditedDescription(tasks[index].description);
		setTaskDetailModalVisible(true);
	};

	const closeModal = () => {
		setTaskDetailModalVisible(false);
		setSelectedTaskIndex(null);
	};

	const updateTask = () => {
		if (selectedTaskIndex !== null) {
			const updatedTasks = [...tasks];
			updatedTasks[selectedTaskIndex] = {
				title: editedTitle,
				description: editedDescription,
			};
			setTasks(updatedTasks);
		}
		closeModal();
	};

	const markDone = () => {
		if (selectedTaskIndex !== null) {
			const updatedTasks = [...tasks];
			updatedTasks.splice(selectedTaskIndex, 1);
			setTasks(updatedTasks);
		}
		closeModal();
	};

	const CreateNewTask = (task) => {
		setTasks(prevTasks => [...prevTasks, task]);
	};

	return (
		<View style={styles.cardWrapper}>
			<TaskModal
				visible={modalVisible}
				onClose={() => setModalVisible(false)}
				onSubmit={CreateNewTask}
			/>

			<View style={[styles.header, category.headerColor]}>
				<TouchableOpacity
					style={styles.headerLeft}
					onPress={toggleExpand}
					activeOpacity={0.1}
				>
					<Text style={styles.headerText}>{category.heading}</Text>
					<Ionicons
						name={expanded ? 'chevron-up' : 'chevron-down'}
						size={20}
						color="black"
						style={{ marginLeft: 8 }}
					/>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => setModalVisible(true)}>
					<Ionicons name="add-circle" size={28} color="black" />
				</TouchableOpacity>
			</View>

			{expanded && (
				<View style={[styles.taskList, category.contentColor]}>
					{tasks.length > 0 ? (
						tasks.map((task, index) => (
							<TouchableOpacity
								key={index}
								onPress={() => openModal(index)}
								style={styles.taskRow}
							>
								<Text style={styles.taskText}>{task.title}</Text>
								{index !== tasks.length - 1 && <View style={styles.divider} />}
							</TouchableOpacity>
						))
					) : (
						<Text style={styles.emptyText}>No tasks yet</Text>
					)}
				</View>
			)}

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
	cardWrapper: {
		width: '100%',
		borderRadius: 12,
		overflow: 'hidden',
		backgroundColor: '#fff',
		marginVertical: 8,
		elevation: 3, // Android shadow
		shadowColor: '#000', // iOS shadow
		shadowOpacity: 0.1,
		shadowRadius: 4,
		shadowOffset: { width: 0, height: 2 },
	},

	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingVertical: 14,
		backgroundColor: '#f5f5f5',
	},

	headerLeft: {
		flexDirection: 'row',
		alignItems: 'center',
	},

	headerText: {
		color: 'black',
		fontSize: 18,
		fontWeight: 'bold',
	},

	taskList: {
		paddingHorizontal: 16,
		paddingVertical: 10,
		backgroundColor: '#fafafa',
	},

	taskText: {
		color: 'black',
		fontSize: 16,
		fontWeight: "bold",
		paddingVertical: 20
	},
	divider: {
		height: 1,
		backgroundColor: "black",
	},
	emptyText: {
		fontSize: 14,
		color: '#999',
		textAlign: 'center',
		paddingVertical: 10,
	},
});

export default TaskCard;
