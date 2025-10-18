import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TaskModal from './TaskModal';
import TaskDetailModal from './TaskDetailModal';
import SendRequest from '../../utils/SendRequest';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const TaskCard = ({ category, tasks, setTasks }) => {
  const [taskDetailModalVisible, setTaskDetailModalVisible] = useState(false);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);
  const [expanded, setExpanded] = useState(false); // Accordion state

  const [selectedTask, setSelectedTask] = useState({});

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  const fetchTaskByTaskIdAPI = async (task_id) => {
    try {
      const response = await SendRequest(`/tasks/${task_id}`, {}, "GET", {});
      setSelectedTask(response.data.data.task);
      openModal();
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const openModal = () => {
    setTaskDetailModalVisible(true);
  };

  const closeModal = () => {
    setTaskDetailModalVisible(false);
    setSelectedTaskIndex(null);
  };

  return (
    <View style={styles.cardWrapper}>
      <TouchableOpacity
        style={[styles.header, category.headerColor]}
        onPress={toggleExpand}
        activeOpacity={1}
      >
        <Text style={styles.headerText}>{category.heading}</Text>
        <Ionicons
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="black"
          style={{ marginLeft: 8 }}
        />
      </TouchableOpacity>

      {expanded && (
        <View style={[styles.taskList, category.contentColor]}>
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => fetchTaskByTaskIdAPI(task.task_id)}
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
        closeModal={closeModal}
        selectedTask={selectedTask}
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
    alignItems: 'center',
    padding: 20,
    justifyContent: "space-between",
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
