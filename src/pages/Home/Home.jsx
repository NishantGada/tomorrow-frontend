import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react';

import Date from './Date'
import TaskCard from './TaskCard'
import { StyleConstants } from '../../utils/StyleConstants';
import SendRequest from '../../utils/SendRequest';
// import { GlobalConstants } from '../../utils/GlobalConstants';
// import { formatDateSimple } from '../../utils/GetDate';

export default function Home({ navigation }) {
  const [tasks, setTasks] = useState([])
  const [tomorrowDate, setTomorrowDate] = useState({});

  const getTasksAPI = async () => {
    try {
      const response = await SendRequest("/tasks", {}, "GET", {});
      console.log("response: ", response.data.data.tasks);
      setTasks(...tasks, response.data.data.tasks)

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

  // const today = new Date();
  // const todayFormatted = formatDateSimple(today);
  // const todaysTasks = tasks.filter(task => task.date_added === todayFormatted);
  // console.log({ todaysTasks });

  useEffect(() => {
    getTomorrowDateAPI();
    getTasksAPI();
  }, [])

  console.log(tomorrowDate);

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

        <TaskCard category={StyleConstants["high"]} tasks={tasks.filter(task => task.priority === "high")} setTasks={setTasks} />
        <TaskCard category={StyleConstants["medium"]} tasks={tasks.filter(task => task.priority === "medium")} setTasks={setTasks} />
        <TaskCard category={StyleConstants["low"]} tasks={tasks.filter(task => task.priority === "low")} setTasks={setTasks} />
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