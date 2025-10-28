import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useAuth } from '../../context/AuthContext';
import { TaskContext } from '../../context/TaskContext';
import { UserContext } from '../../context/UserContext';
import SendRequest from '../../utils/SendRequest';
import { StyleConstants } from '../../utils/StyleConstants';
import Date from './Date';
import TaskCard from './TaskCard';

export default function Home({ visible }) {
  const [tomorrowDate, setTomorrowDate] = useState({});

  const { contextTasks, refreshTasks } = useContext(TaskContext);
  const { fetchUserDetails } = useContext(UserContext);
  const { loggedInUser } = useAuth();

  const getTomorrowDateAPI = async () => {
    console.log("inside getTomorrowDateAPI");
    try {
      const response = await SendRequest("/tomorrow-date", {}, loggedInUser, "GET", {});
      setTomorrowDate({
        "day": response.data.data.day,
        "month": response.data.data.month,
        "month_name": response.data.data.month_name
      })
    } catch (error) {
      console.log("getTomorrowDateAPI error: ", error);
    }
  }

  useEffect(() => {
    getTomorrowDateAPI();
    if (loggedInUser) fetchUserDetails();
  }, [])

  useEffect(() => {
    if (!visible) refreshTasks();
  }, [visible]);

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

        <TaskCard category={StyleConstants["high"]} tasks={contextTasks?.filter(task => task.priority === "high")} />
        <TaskCard category={StyleConstants["medium"]} tasks={contextTasks?.filter(task => task.priority === "medium")} />
        <TaskCard category={StyleConstants["low"]} tasks={contextTasks?.filter(task => task.priority === "low")} />
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