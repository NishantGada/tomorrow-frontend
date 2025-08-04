// TaskDetailModal.js
import React from 'react'
import {
	Modal,
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
} from 'react-native'

export default function TaskDetailModal({
	visible,
	onClose,
	task,
	onUpdate,
	onMarkDone,
	setEditedTitle,
	setEditedDescription,
}) {
	return (
		<Modal visible={visible} animationType="slide" transparent>
			<View style={styles.modalOverlay}>
				<View style={styles.modalContainer}>
					<Text style={styles.heading}>Task Details</Text>

					<TextInput
						style={styles.input}
						placeholder="Title"
						value={task.title}
						onChangeText={setEditedTitle}
					/>
					<TextInput
						style={[styles.input, { height: 100 }]}
						placeholder="Description"
						value={task.description}
						onChangeText={setEditedDescription}
						multiline
					/>

					<View style={styles.buttonRow}>
						<TouchableOpacity style={styles.button} onPress={onUpdate}>
							<Text style={styles.buttonText}>Update</Text>
						</TouchableOpacity>

						<TouchableOpacity style={[styles.button, styles.doneButton]} onPress={onMarkDone}>
							<Text style={styles.buttonText}>Mark Done</Text>
						</TouchableOpacity>
					</View>

					<TouchableOpacity onPress={onClose}>
						<Text style={styles.closeText}>Close</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	modalOverlay: {
		flex: 1,
		backgroundColor: '#000000aa',
		justifyContent: 'center',
		padding: 20,
	},
	modalContainer: {
		backgroundColor: 'white',
		borderRadius: 12,
		padding: 20,
		elevation: 5,
	},
	heading: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 15,
	},
	input: {
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 8,
		padding: 10,
		marginBottom: 15,
	},
	buttonRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	button: {
		backgroundColor: '#0077b6',
		padding: 10,
		borderRadius: 8,
		flex: 1,
		marginRight: 10,
	},
	doneButton: {
		backgroundColor: '#2a9d8f',
		marginRight: 0,
		marginLeft: 10,
	},
	buttonText: {
		color: 'white',
		textAlign: 'center',
	},
	closeText: {
		textAlign: 'center',
		marginTop: 15,
		color: 'gray',
	},
})
