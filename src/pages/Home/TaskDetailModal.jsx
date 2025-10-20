// TaskDetailModal.js
import React, { useContext, useEffect, useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TaskContext } from '../../context/TaskContext';
import SendRequest from '../../utils/SendRequest';

export default function TaskDetailModal({
  visible,
  closeModal,
  selectedTask,
  deleteTaskAPI
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { refreshTasks } = useContext(TaskContext);

  const updateTaskAPI = async (updatedTaskObject) => {
    try {
      await SendRequest(`/task/${selectedTask.task_id}`, updatedTaskObject, "PUT", {});
      closeModal();
      refreshTasks();
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

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#f08080';
      case 'medium':
        return '#ffeb99';
      case 'low':
        return '#d4f4dd';
      default:
        return '#6B7280';
    }
  }

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return 'alert-circle';
      case 'medium':
        return 'ellipse';
      case 'low':
        return 'checkmark-circle';
      default:
        return 'help-circle';
    }
  }

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text style={styles.heading}>Task Details</Text>
              <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(selectedTask?.priority) }]}>
                <Ionicons name={getPriorityIcon(selectedTask?.priority)} size={12} color="#333" />
                <Text style={styles.priorityText}>{selectedTask?.priority?.toUpperCase()}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Ionicons name="close" size={22} color="#374151" />
            </TouchableOpacity>
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter task title"
              placeholderTextColor="#9CA3AF"
              value={title}
              onChangeText={setTitle}
            />
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.descriptionInput]}
              placeholder="Enter task description"
              placeholderTextColor="#9CA3AF"
              value={description}
              onChangeText={setDescription}
              multiline
              textAlignVertical="top"
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.updateButton} onPress={handleOnUpdate} title="Update">
              <Text style={styles.actionButtonText}>update</Text>
              <Ionicons name="pencil" size={16} color="white" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.doneButton} onPress={markTaskDoneAPI} title="Mark Done">
              <Text style={styles.actionButtonText}>mark done</Text>
              <Ionicons name="trophy" size={16} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    width: '85%',
    maxHeight: '85%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerLeft: {
    flex: 1,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  priorityBadge: {
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
  },
  priorityText: {
    color: '#333',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputSection: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    color: '#111827',
    backgroundColor: '#FAFAFA',
  },
  descriptionInput: {
    height: 110,
    paddingTop: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  updateButton: {
    backgroundColor: '#3B82F6',
    flex: 1,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: "row",
    columnGap: 5,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  doneButton: {
    backgroundColor: '#10B981',
    flex: 1,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: "row",
    columnGap: 5,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  deleteButton: {
    backgroundColor: '#EF4444',
    flex: 1,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
});