import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function Signup({ onLoginPress, onSignupSuccess, navigation }) {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' });

  const handleAlreadyHaveAnAccount = () => {
    navigation.navigate("Login");
  }

  const handleChange = (field, value) => setForm({ ...form, [field]: value });

  const handleSignup = () => {
    if (!form.email || !form.password || !form.firstName || !form.lastName) {
      alert('Please fill all fields');
      return;
    }
    onSignupSuccess();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Text style={styles.title}>Create your account</Text>
        <Text style={styles.subTitle}>Start building your tomorrow!</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={form.firstName}
          onChangeText={(v) => handleChange('firstName', v)}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={form.lastName}
          onChangeText={(v) => handleChange('lastName', v)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={form.email}
          onChangeText={(v) => handleChange('email', v)}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          keyboardType="phone-pad"
          value={form.email}
          onChangeText={(v) => handleChange('email', v)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={form.password}
          onChangeText={(v) => handleChange('password', v)}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.handleAlreadyHaveAnAccount} onPress={handleAlreadyHaveAnAccount}>
        <Text>Already have an account?</Text>
        <Text style={styles.linkText}>Log In</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 24,
    rowGap: 20,
    backgroundColor: '#F8F9FB'
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  subTitle: {
    fontSize: 14,
    color: 'gray',
  },
  inputContainer: {
    width: '100%',
    rowGap: 20
  },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    paddingVertical: 14,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',

    borderWidth: 1.5,
    borderColor: 'black',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: 'black',
    fontWeight: '600',
    fontSize: 16
  },
  linkText: {
    color: '#1E88E5',
    fontSize: 14
  },
  handleAlreadyHaveAnAccount: {
    flexDirection: 'row',
    columnGap: 5
  }
});
