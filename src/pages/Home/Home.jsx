import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { TaskContext } from '../../context/TaskContext';
import SendRequest from '../../utils/SendRequest';
import { StyleConstants } from '../../utils/StyleConstants';
import Date from './Date';
import TaskCard from './TaskCard';

export default function Home({ visible, setVisible }) {
  const [tasks, setTasks] = useState([])
  const [tomorrowDate, setTomorrowDate] = useState({});

  const { contextTasks, refreshTasks } = useContext(TaskContext);

  const getTasksAPI = async () => {
    try {
      const response = await SendRequest("/tasks", {}, "GET", {});
      setTasks(response.data.data.tasks)

    } catch (error) {
      console.log("error: ", error);
    }
  }

  const getTomorrowDateAPI = async () => {
    try {
      const response = await SendRequest("/tomorrow-date", {}, "GET", {});
      setTomorrowDate({
        "day": response.data.data.day,
        "month": response.data.data.month,
        "month_name": response.data.data.month_name
      })
    } catch (error) {
      console.log("error: ", error);
    }
  }

  useEffect(() => {
    getTomorrowDateAPI();
    getTasksAPI();
  }, [contextTasks])

  useEffect(() => {
    if (!visible) refreshTasks();
  }, [visible, setVisible]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", }}>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollViewStyle} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.heading}>What's</Text>
            <Text style={styles.heading2}>Tomorrow?</Text>
          </View>
          <Date tomorrowDate={tomorrowDate} />
        </View>

        <TaskCard category={StyleConstants["high"]} tasks={tasks?.filter(task => task.priority === "high")} setTasks={setTasks} />
        <TaskCard category={StyleConstants["medium"]} tasks={tasks?.filter(task => task.priority === "medium")} setTasks={setTasks} />
        <TaskCard category={StyleConstants["low"]} tasks={tasks?.filter(task => task.priority === "low")} setTasks={setTasks} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },

  scrollViewStyle: {
    paddingBottom: 100
  },

  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    marginBottom: 20,
  },

  heading: {
    fontSize: 20,
    fontWeight: "bold",
  },

  heading2: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 10
  },
})