import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

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

        <View style={styles.aiContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 5 }}>
            <Text style={styles.aiTextHeading}>AI Summary</Text>
            <MaterialCommunityIcons name="star-four-points-outline" size={16} color="black" />
          </View>
          <Text style={styles.aiTextSummary}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. A magnam aliquid modi esse temporibus rem dolor ipsa illum veniam qui, fuga tempora, cum quo ducimus libero quisquam voluptates. Voluptatibus, veritatis.
          </Text>

          {/* future feature (MAYBE) */}
          {/* <TouchableOpacity style={styles.aiAskQuestionButton}>
            <Text>Ask a question</Text>
            <Feather name="arrow-right" size={16} color="black" />
          </TouchableOpacity> */}
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
    fontSize: 18,
    fontWeight: "bold",
  },

  heading2: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 10
  },

  aiContainer: {
    rowGap: 5
  },

  aiTextHeading: {
    fontWeight: 'bold',
    fontSize: '16'
  },

  aiTextSummary: {
    color: 'gray',
    textAlign: 'justify',
  },

  // aiAskQuestionButton: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   alignSelf: 'flex-start',
  //   columnGap: '5',

  //   borderWidth: 1.5,
  //   borderRadius: 10,
  //   marginVertical: 10,
  //   padding: 10,
  // }
})