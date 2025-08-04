import React, { useState } from 'react';
import {
	Modal,
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
} from 'react-native';

const TaskModal = ({ visible, onClose, onSubmit }) => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	const handleSubmission = () => {
		if (title.trim()) {
			onSubmit({ title, description });
			setTitle('');
			setDescription('');
			onClose();
		} else {
			alert('Please enter a title.');
		}
	};

	return (
		<Modal visible={visible} transparent animationType="slide">
			<View style={styles.modalOverlay}>
				<View style={styles.modalContainer}>
					<Text style={styles.heading}>Create New Task</Text>

					<TextInput
						style={styles.input}
						placeholder="Title"
						value={title}
						onChangeText={setTitle}
					/>

					<TextInput
						style={[styles.input, { height: 100 }]}
						placeholder="Description"
						value={description}
						onChangeText={setDescription}
						multiline
					/>

					<TouchableOpacity style={styles.button} onPress={handleSubmission}>
						<Text style={styles.buttonText}>Submit</Text>
					</TouchableOpacity>

					<TouchableOpacity onPress={onClose}>
						<Text style={styles.cancelText}>Cancel</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
};

export default TaskModal;

const styles = StyleSheet.create({
	modalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.5)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalContainer: {
		width: '90%',
		backgroundColor: '#fff',
		borderRadius: 20,
		padding: 20,
		elevation: 10,
	},
	heading: {
		fontSize: 22,
		fontWeight: '600',
		marginBottom: 20,
		textAlign: 'center',
	},
	input: {
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 12,
		padding: 12,
		marginBottom: 15,
		fontSize: 16,
	},
	button: {
		backgroundColor: '#1ABC9C',
		paddingVertical: 12,
		borderRadius: 12,
		marginTop: 10,
		alignItems: 'center',
	},
	buttonText: {
		color: '#fff',
		fontWeight: '600',
		fontSize: 16,
	},
	cancelText: {
		marginTop: 10,
		color: '#FF6F61',
		textAlign: 'center',
		fontSize: 16,
	},
});
