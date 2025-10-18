import React, { useContext, useState } from 'react';
import { Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { TaskContext } from '../../context/TaskContext';
import SendRequest from '../../utils/SendRequest';
import PriorityDropdown from './PriorityDropdown';

export default function AddNewModal({ visible, setVisible }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selected, setSelected] = useState('high');

  const { refreshTasks } = useContext(TaskContext);

  const addNewTaskAPI = async ({ title, description, selected }) => {
    try {
      console.log({ title, description, selected });
      const response = await SendRequest("/task", {
        "title": title,
        "description": description,
        "priority": selected
      }, "POST", {});

      refreshTasks();
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmission = () => {
    if (title.trim()) {
      addNewTaskAPI({ title, description, selected });
      setTitle('');
      setDescription('');
      setVisible(false)
    } else {
      alert('Please enter a title.');
    }
  };

  return (
    <View style={styles.container}>
      <Modal
        visible={visible}
        animationType="slide"
        onRequestClose={() => setVisible(false)}
      >
        <SafeAreaView style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Create a new Task</Text>
            <View style={styles.addNewForm}>
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

              <PriorityDropdown selected={selected} setSelected={setSelected} />

              <TouchableOpacity style={styles.button} onPress={handleSubmission}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => setVisible(false)}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 1,
    borderColor: "black",
  },

  button: {
    padding: 20,
    borderWidth: 1.5,
    borderColor: "black",
    borderRadius: 8,
  },

  buttonText: {
    color: "black",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },

  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: "center",
  },

  addNewForm: {
    marginVertical: 30,
    display: "flex",
    rowGap: 20,
  },

  input: {
    borderWidth: 1.5,
    borderColor: "black",
    borderRadius: 10,

    backgroundColor: "white",
    padding: 20,
  },
});
