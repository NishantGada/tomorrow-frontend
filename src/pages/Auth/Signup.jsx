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
      <Text style={styles.title}>Create your account</Text>

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
          placeholder="Password"
          secureTextEntry
          value={form.password}
          onChangeText={(v) => handleChange('password', v)}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleAlreadyHaveAnAccount}>
        <Text style={styles.linkText}>Already have an account? Log In</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: '#F8F9FB' },
  title: { fontSize: 24, fontWeight: '700', color: '#1A1A1A', marginBottom: 24 },
  inputContainer: { width: '100%', marginBottom: 20 },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#1E88E5',
    paddingVertical: 14,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  linkText: { color: '#1E88E5', fontSize: 14 },
});
