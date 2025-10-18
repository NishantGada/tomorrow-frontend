// TaskDetailModal.js
import React, { useEffect, useState } from 'react'
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import SendRequest from '../../utils/SendRequest';

export default function TaskDetailModal({
  visible,
  closeModal,
  selectedTask,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const updateTaskAPI = async (updatedTaskObject) => {
    try {
      await SendRequest(`/task/${selectedTask.task_id}`, updatedTaskObject, "PUT", {});
      closeModal();
    } catch (error) {
      console.log("error: ", error);
    }
  }

  const handleOnUpdate = () => {
    const updatedTaskObject = {
      "title": title,
      "description": description,
      "priority": selectedTask.priority
    }

    updateTaskAPI(updatedTaskObject);
  }

  const deleteTaskAPI = async (task_id) => {
    console.log("inside deleteTaskAPI");
    try {
      await SendRequest(`/task/${task_id}`, {}, "DELETE", {});
    } catch (error) {
      console.log("error: ", error);
    }
  }

  const markTaskDoneAPI = async () => {
    try {
      await SendRequest(`/task/done`, selectedTask, "POST", {});
      deleteTaskAPI(selectedTask.task_id);
    } catch (error) {
      console.log("error: ", error);
    }
  }

  useEffect(() => {
    if (selectedTask) {
      setTitle(selectedTask.title);
      setDescription(selectedTask.description);
    }
  }, [selectedTask])

  return (
    <Modal visible={visible} animationType="none" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.heading}>Task Details</Text>

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

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={handleOnUpdate}>
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.doneButton]} onPress={markTaskDoneAPI}>
              <Text style={styles.buttonText}>Mark Done</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={closeModal}>
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
