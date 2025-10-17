import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function Login({ navigation }) {
  const [email, setEmail] = useState("ng@gmail.com");
  const [password, setPassword] = useState('qweqwe');
  const { login } = useAuth();

  // const handleLogin = (userData) => {
  //   login(userData); // sets user globally
  // };

  const handleSignupPress = () => {
    navigation.navigate("Signup");
  }

  const handleLogin = () => {
    if (!email || !password) {
      alert('Please fill all fields');
      return;
    }
    login();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome back</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{ display: "flex", flexDirection: "row", columnGap: 5 }} onPress={handleSignupPress}>
        <Text>Don’t have an account?</Text><Text style={styles.linkText}>Sign Up</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: '#F8F9FB' },
  title: { fontSize: 26, fontWeight: '700', color: '#1A1A1A', marginBottom: 24 },
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
