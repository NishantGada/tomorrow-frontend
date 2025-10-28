import { Ionicons } from '@expo/vector-icons';
import React, { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Keyboard,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { TaskContext } from '../../context/TaskContext';
import { UserContext } from '../../context/UserContext';
import SendRequest from '../../utils/SendRequest';

export default function Profile() {
  const { logout, loggedInUser } = useAuth();
  const { contextTasks } = useContext(TaskContext);
  const { user, fetchUserDetails } = useContext(UserContext);

  const [lowCount, setLowCount] = useState(0);
  const [mediumCount, setMediumCount] = useState(0);
  const [highCount, setHighCount] = useState(0);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editTab, setEditTab] = useState('general');
  const [loading, setLoading] = useState(false);

  const [updatedFirstName, setUpdatedFirstName] = useState(user.first_name);
  const [updatedLastName, setUpdatedLastName] = useState(user.last_name);
  const [updatedPhone, setUpdatedPhone] = useState(user.phone);

  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordVerified, setPasswordVerified] = useState(false);

  const handleOnLogout = () => {
    logout();
  };

  const getCompletedTasksCountAPI = async () => {
    try {
      const response = await SendRequest("/tasks/completed", {}, loggedInUser, "GET", {});
      response.data.data.map((item) => {
        if (item.priority === "low") setLowCount(item.count);
        if (item.priority === "medium") setMediumCount(item.count);
        if (item.priority === "high") setHighCount(item.count);
      });
    } catch (error) {
      console.log("getCompletedTasksCountAPI error: ", error);
    }
  };

  const verifyCurrentPassword = async () => {
    if (!currentPassword.trim()) {
      alert('Please enter your current password');
      return;
    }
    setLoading(true);
    try {
      await SendRequest("/verify-password", { password: currentPassword }, loggedInUser, "POST", {});
      setPasswordVerified(true);
    } catch (error) {
      alert('Incorrect password. Please try again.');
      console.log("verifyCurrentPassword error: ", error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserDetailsAPI = async () => {
    setLoading(true);

    const request_body = {
      first_name: updatedFirstName,
      last_name: updatedLastName,
      phone: updatedPhone,
    }

    try {
      await SendRequest("/user", request_body, loggedInUser, "PUT", {});

      setEditModalVisible(false);
      fetchUserDetails();
    } catch (error) {
      alert('Failed to update profile');
      console.log("updateUserDetailsAPI error: ", error);
    } finally {
      setLoading(false);
    }
  };

  const updatePasswordAPI = async () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await SendRequest("/change-password", {
        newPassword,
      }, loggedInUser, "PUT", {});

      alert('Password changed successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setPasswordVerified(false);
      setEditModalVisible(false);
    } catch (error) {
      alert('Failed to change password');
      console.log("updatePasswordAPI error: ", error);
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = () => {
    setEditTab('general');
    setPasswordVerified(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setEditModalVisible(true);
  };

  const closeEditModal = () => {
    Keyboard.dismiss();
    setEditModalVisible(false);
  };

  useEffect(() => {
    getCompletedTasksCountAPI();
  }, [contextTasks]);

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
            <TouchableOpacity style={styles.editImageButton}>
              <Ionicons name="camera" size={16} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.name}>{user.first_name} {user.last_name}</Text>
            <Text style={styles.email}>{user.email}</Text>
            <Text style={styles.phone}>{user.phone}</Text>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Task Summary */}
        <View style={styles.statsCard}>
          <Text style={styles.sectionTitle}>Completed Tasks</Text>
          <View style={styles.statsRow}>
            <View style={[styles.statBox, styles.statBoxHigh]}>
              <Ionicons name="alert-circle" size={24} color="#f08080" />
              <Text style={styles.statNumber}>{highCount}</Text>
              <Text style={styles.statLabel}>High</Text>
            </View>
            <View style={[styles.statBox, styles.statBoxMedium]}>
              <Ionicons name="ellipse" size={24} color="#ffeb99" />
              <Text style={styles.statNumber}>{mediumCount}</Text>
              <Text style={styles.statLabel}>Medium</Text>
            </View>
            <View style={[styles.statBox, styles.statBoxLow]}>
              <Ionicons name="checkmark-circle" size={24} color="#d4f4dd" />
              <Text style={styles.statNumber}>{lowCount}</Text>
              <Text style={styles.statLabel}>Low</Text>
            </View>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Edit Profile Button */}
        <TouchableOpacity style={[styles.button, styles.editButton]} onPress={openEditModal}>
          <Ionicons name="pencil" size={18} color="black" />
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity
          onPress={handleOnLogout}
          style={[styles.button, styles.logoutButton]}
        >
          <Ionicons name="log-out" size={18} color="#E53935" />
          <Text style={[styles.buttonText, styles.logoutText]}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal visible={editModalVisible} animationType="fade" transparent>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={Keyboard.dismiss}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Account Settings</Text>
              <TouchableOpacity
                onPress={closeEditModal}
                disabled={loading}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#374151" />
              </TouchableOpacity>
            </View>

            {/* Tab Navigation */}
            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[styles.tab, editTab === 'general' && styles.tabActive]}
                onPress={() => setEditTab('general')}
                disabled={loading}
              >
                <Text style={[styles.tabText, editTab === 'general' && styles.tabTextActive]}>
                  General
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, editTab === 'password' && styles.tabActive]}
                onPress={() => setEditTab('password')}
                disabled={loading}
              >
                <Text style={[styles.tabText, editTab === 'password' && styles.tabTextActive]}>
                  Password
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.formContent} showsVerticalScrollIndicator={false}>
              {/* General Tab */}
              {editTab === 'general' && (
                <>
                  <View style={styles.formSection}>
                    <Text style={styles.label}>First Name</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your first name"
                      placeholderTextColor="#9CA3AF"
                      value={updatedFirstName}
                      onChangeText={setUpdatedFirstName}
                      editable={!loading}
                    />
                  </View>

                  <View style={styles.formSection}>
                    <Text style={styles.label}>Last Name</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your last name"
                      placeholderTextColor="#9CA3AF"
                      value={updatedLastName}
                      onChangeText={setUpdatedLastName}
                      editable={!loading}
                    />
                  </View>

                  <View style={styles.formSection}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                      style={[styles.input, { backgroundColor: 'lightgray', color: 'gray' }]}
                      placeholder="Enter your email"
                      placeholderTextColor="lightgray"
                      value={user.email}
                      editable={false}
                      keyboardType="email-address"
                    />
                  </View>

                  <View style={styles.formSection}>
                    <Text style={styles.label}>Phone</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your phone number"
                      placeholderTextColor="#9CA3AF"
                      value={updatedPhone}
                      onChangeText={setUpdatedPhone}
                      editable={!loading}
                      keyboardType="phone-pad"
                    />
                  </View>
                </>
              )}

              {/* Password Tab */}
              {editTab === 'password' && (
                <>
                  {!passwordVerified ? (
                    <>
                      <Text style={styles.passwordNote}>
                        Verify your current password to proceed
                      </Text>
                      <View style={styles.formSection}>
                        <Text style={styles.label}>Current Password</Text>
                        <View style={styles.passwordInputContainer}>
                          <TextInput
                            style={styles.passwordInput}
                            placeholder="Enter current password"
                            placeholderTextColor="#9CA3AF"
                            value={currentPassword}
                            onChangeText={setCurrentPassword}
                            secureTextEntry={!showCurrentPassword}
                            editable={!loading}
                          />
                          <TouchableOpacity
                            onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                            disabled={loading}
                          >
                            <Ionicons
                              name={showCurrentPassword ? 'eye' : 'eye-off'}
                              size={20}
                              color="#9CA3AF"
                            />
                          </TouchableOpacity>
                        </View>
                      </View>

                      <TouchableOpacity
                        style={[styles.verifyButton, loading && styles.buttonDisabled]}
                        onPress={verifyCurrentPassword}
                        disabled={loading}
                      >
                        {loading ? (
                          <ActivityIndicator color="white" />
                        ) : (
                          <>
                            <Ionicons name="checkmark" size={18} color="white" />
                            <Text style={styles.verifyButtonText}>Verify Password</Text>
                          </>
                        )}
                      </TouchableOpacity>
                    </>
                  ) : (
                    <>
                      <View style={styles.verifiedBadge}>
                        <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                        <Text style={styles.verifiedText}>Password verified</Text>
                      </View>

                      <View style={styles.formSection}>
                        <Text style={styles.label}>New Password</Text>
                        <View style={styles.passwordInputContainer}>
                          <TextInput
                            style={styles.passwordInput}
                            placeholder="Enter new password"
                            placeholderTextColor="#9CA3AF"
                            value={newPassword}
                            onChangeText={setNewPassword}
                            secureTextEntry={!showNewPassword}
                            editable={!loading}
                          />
                          <TouchableOpacity
                            onPress={() => setShowNewPassword(!showNewPassword)}
                            disabled={loading}
                          >
                            <Ionicons
                              name={showNewPassword ? 'eye' : 'eye-off'}
                              size={20}
                              color="#9CA3AF"
                            />
                          </TouchableOpacity>
                        </View>
                      </View>

                      <View style={styles.formSection}>
                        <Text style={styles.label}>Confirm Password</Text>
                        <View style={styles.passwordInputContainer}>
                          <TextInput
                            style={styles.passwordInput}
                            placeholder="Confirm new password"
                            placeholderTextColor="#9CA3AF"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry={!showConfirmPassword}
                            editable={!loading}
                          />
                          <TouchableOpacity
                            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                            disabled={loading}
                          >
                            <Ionicons
                              name={showConfirmPassword ? 'eye' : 'eye-off'}
                              size={20}
                              color="#9CA3AF"
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </>
                  )}
                </>
              )}
            </ScrollView>

            {/* Modal Buttons */}
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={closeEditModal}
                disabled={loading}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={editTab === 'general' ? updateUserDetailsAPI : updatePasswordAPI}
                disabled={loading || (editTab === 'password' && !passwordVerified)}
              >
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <>
                    <Ionicons
                      name={editTab === 'password' ? 'lock-closed' : 'checkmark'}
                      size={18}
                      color="white"
                    />
                    <Text style={styles.saveButtonText}>
                      {editTab === 'general' ? 'Save Changes' : 'Update Password'}
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
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
    position: 'relative',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#1E88E5',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  headerInfo: {
    flex: 1,
    rowGap: 5
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  email: {
    fontSize: 13,
    color: '#8E8E93',
  },
  phone: {
    fontSize: 13,
    color: '#8E8E93',
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
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    backgroundColor: '#FAFAFA',
  },
  statBoxHigh: {
    backgroundColor: '#FEF2F2',
  },
  statBoxMedium: {
    backgroundColor: '#FFFBF0',
  },
  statBoxLow: {
    backgroundColor: '#F0FDF4',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  button: {
    backgroundColor: '#1E88E5',
    marginTop: 24,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  buttonText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 15,
  },
  editButton: {
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: "black"
  },
  logoutButton: {
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#E53935',
    shadowColor: '#E53935',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
  },
  logoutText: {
    color: '#E53935',
  },
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
    width: '90%',
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 1.5,
    borderBottomColor: '#E5E7EB',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#1E88E5',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  tabTextActive: {
    color: '#1E88E5',
  },
  formContent: {
    marginBottom: 20,
    maxHeight: 300,
  },
  formSection: {
    marginBottom: 16,
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
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: '#FAFAFA',
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    fontSize: 15,
    color: '#111827',
  },
  passwordNote: {
    fontSize: 13,
    color: '#6B7280',
    backgroundColor: '#F0F4FF',
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
  verifyButton: {
    backgroundColor: '#10B981',
    paddingVertical: 12,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  verifyButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 16,
    gap: 8,
  },
  verifiedText: {
    color: '#10B981',
    fontWeight: '600',
    fontSize: 14,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  cancelButton: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
  },
  cancelButtonText: {
    color: '#374151',
    fontWeight: '600',
    fontSize: 15,
  },
  saveButton: {
    backgroundColor: '#1E88E5',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});