import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import SendRequest from '../../utils/SendRequest';

export default function Profile() {
  const { logout } = useAuth();
  const [lowCount, setLowCount] = useState(0);
  const [mediumCount, setMediumCount] = useState(0)
  const [highCount, setHighCount] = useState(0)

  const handleOnLogout = () => {
    logout();
  }

  const getCompletedTasksCountAPI = async () => {
    try {
      const response = await SendRequest("/tasks/completed", {}, "GET", {});
      response.data.data.map((item, index) => {
        if (item.priority == "low") setLowCount(item.count);
        if (item.priority == "medium") setMediumCount(item.count);
        if (item.priority == "high") setHighCount(item.count);
      })
    } catch (error) {
      console.log("error: ", error);
    }
  }

  useEffect(() => {
    getCompletedTasksCountAPI()
  }, [])

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F8FA" />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
              style={styles.profileImage}
            />
          </View>
          <View>
            <Text style={styles.name}>Nishant Gada</Text>
            <Text style={styles.role}>Software Engineer</Text>
            <Text style={styles.email}>ashmita.pal@example.com</Text>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Task Summary */}
        <View style={styles.statsCard}>
          <Text style={styles.sectionTitle}>Completed Tasks Summary</Text>
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{highCount}</Text>
              <Text style={styles.statLabel}>High</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{mediumCount}</Text>
              <Text style={styles.statLabel}>Medium</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{lowCount}</Text>
              <Text style={styles.statLabel}>Low</Text>
            </View>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Recent Activity */}
        <View style={styles.recentActivity}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>

          <View style={styles.activityItem}>
            <View style={styles.activityDot} />
            <Text style={styles.activityText}>
              Completed “Fix navigation bug”
            </Text>
          </View>

          <View style={styles.activityItem}>
            <View style={[styles.activityDot, { backgroundColor: '#FFD66B' }]} />
            <Text style={styles.activityText}>
              Updated “User login validation”
            </Text>
          </View>

          <View style={styles.activityItem}>
            <View style={[styles.activityDot, { backgroundColor: '#FF9F68' }]} />
            <Text style={styles.activityText}>
              Added “Setup AWS deployment”
            </Text>
          </View>
        </View>

        {/* Edit Profile Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity onPress={handleOnLogout} style={[styles.button, styles.logoutButton]}>
          <Text style={[styles.buttonText, styles.logoutText]}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  imageContainer: {
    marginRight: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  role: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  email: {
    fontSize: 13,
    color: '#8E8E93',
    marginTop: 4,
  },
  divider: {
    height: 20,
  },
  statsCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2E7D32',
  },
  statLabel: {
    fontSize: 13,
    color: '#555',
    marginTop: 4,
  },
  recentActivity: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  activityDot: {
    width: 10,
    height: 10,
    backgroundColor: '#6FCF97',
    borderRadius: 5,
    marginRight: 10,
  },
  activityText: {
    fontSize: 14,
    color: '#333',
  },
  button: {
    backgroundColor: '#1E88E5',
    marginTop: 24,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  logoutButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E53935',
  },
  logoutText: {
    color: '#E53935',
  },
});
