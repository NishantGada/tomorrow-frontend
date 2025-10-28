import { Ionicons } from '@expo/vector-icons';
import React, { useContext, useState } from 'react';
import { Alert, LayoutAnimation, Platform, StyleSheet, Text, TouchableOpacity, UIManager, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { TaskContext } from '../../context/TaskContext';
import SendRequest from '../../utils/SendRequest';
import TaskDetailModal from './TaskDetailModal';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const TaskCard = ({ category, tasks }) => {
  const [taskDetailModalVisible, setTaskDetailModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});
  const [expanded, setExpanded] = useState(false);
  const [swipedTaskId, setSwipedTaskId] = useState(null);
  
  const { refreshTasks } = useContext(TaskContext);
  const { loggedInUser } = useAuth();

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  const fetchTaskByTaskIdAPI = async (task_id) => {
    try {
      const response = await SendRequest(`/tasks/${task_id}`, {}, loggedInUser, "GET", {});
      setSelectedTask(response.data.data.task);
      openModal();
    } catch (error) {
      console.log("fetchTaskByTaskIdAPI error: ", error);
    }
  };

  const handleDeleteTask = (task_id) => {
    Alert.alert(
      'Delete Task?',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Yes', onPress: () => deleteTaskAPI(task_id) },
      ],
      { cancelable: true }
    );
  }

  const deleteTaskAPI = async (task_id) => {
    console.log("inside deleteTaskAPI");
    try {
      await SendRequest(`/task/${task_id}`, {}, loggedInUser, "DELETE", {});
      refreshTasks();
    } catch (error) {
      console.log("deleteTaskAPI error: ", error);
    }
  }

  const openModal = () => {
    setTaskDetailModalVisible(true);
  };

  const closeModal = () => {
    setTaskDetailModalVisible(false);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#f08080';
      case 'medium':
        return '#ffeb99';
      case 'low':
        return '#d4f4dd';
      default:
        return '#E5E7EB';
    }
  };

  return (
    <View style={styles.cardWrapper}>
      <TouchableOpacity
        style={[styles.header, { backgroundColor: category.headerColor }]}
        onPress={toggleExpand}
        activeOpacity={0.7}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerText}>{category.heading}</Text>
          <View style={styles.taskCount}>
            <Text style={styles.taskCountText}>{tasks.length}</Text>
          </View>
        </View>
        <Ionicons
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={22}
          color="black"
        />
      </TouchableOpacity>

      {!expanded && tasks.length > 0 && (
        <View style={styles.previewRow}>
          {tasks.slice(0, 3).map((task, idx) => (
            <View key={idx} style={[styles.previewBadge, { backgroundColor: getPriorityColor(task.priority) }]}>
              <Text style={styles.previewBadgeText}>{task.priority.charAt(0).toUpperCase()}</Text>
            </View>
          ))}
          {tasks.length > 3 && (
            <View style={styles.previewBadge}>
              <Text style={styles.previewBadgeText}>+{tasks.length - 3}</Text>
            </View>
          )}
        </View>
      )}

      {expanded && (
        <View style={styles.taskList}>
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <View key={task.task_id} style={styles.taskContainer}>
                <TouchableOpacity
                  onPress={() => fetchTaskByTaskIdAPI(task.task_id)}
                  style={styles.taskRow}
                  activeOpacity={0.7}
                >
                  <View style={[styles.priorityIndicator, { backgroundColor: getPriorityColor(task.priority) }]} />
                  <Text style={styles.taskText} numberOfLines={1}>{task.title}</Text>
                </TouchableOpacity>

                {swipedTaskId === task.task_id && (
                  <View style={styles.actionPanel}>
                    <TouchableOpacity
                      style={styles.deleteActionBtn}
                      onPress={() => handleDeleteTask(task.task_id)}
                      activeOpacity={0.8}
                    >
                      <Ionicons name="trash" size={18} color="white" />
                    </TouchableOpacity>
                  </View>
                )}

                <TouchableOpacity
                  style={[styles.menuButton, swipedTaskId === task.task_id && styles.menuButtonActive]}
                  onPress={() => setSwipedTaskId(swipedTaskId === task.task_id ? null : task.task_id)}
                  activeOpacity={0.6}
                >
                  <Ionicons name="ellipsis-vertical" size={18} color={swipedTaskId === task.task_id ? "#3B82F6" : "#9CA3AF"} />
                </TouchableOpacity>

                {index !== tasks.length - 1 && <View style={styles.divider} />}
              </View>
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
        deleteTaskAPI={deleteTaskAPI}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    width: '100%',
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginVertical: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  taskCount: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  taskCountText: {
    color: 'black',
    fontSize: 12,
    fontWeight: '700',
  },
  previewRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
    backgroundColor: '#FAFAFA',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  previewBadge: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewBadgeText: {
    color: 'black',
    fontSize: 12,
    fontWeight: '700',
  },
  taskList: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FAFAFA',
  },
  taskContainer: {
    position: 'relative',
    marginVertical: 8,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    backgroundColor: 'white',
    borderRadius: 10,
    gap: 12,
  },
  priorityIndicator: {
    width: 8,
    height: 40,
    borderRadius: 2,
  },
  taskText: {
    color: '#111827',
    fontSize: 15,
    fontWeight: '500',
    flex: 1,
  },
  menuButton: {
    position: 'absolute',
    right: 12,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  menuButtonActive: {
    backgroundColor: '#F0F4FF',
    borderRadius: 8,
  },
  actionPanel: {
    position: 'absolute',
    right: 50,
    top: 8,
    bottom: 8,
    flexDirection: 'row',
    gap: 8,
  },
  editActionBtn: {
    backgroundColor: '#A8D5E2',
    width: 44,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  deleteActionBtn: {
    backgroundColor: '#E8B4B4',
    width: 44,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 12,
  },
  emptyText: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    paddingVertical: 20,
  },
});

export default TaskCard;