import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function Login({ navigation }) {
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("qweasd2");
  const { login } = useAuth();

  const handleSignupPress = () => {
    navigation.navigate("Signup");
  }

  const validateCredentials = async () => {
    try {
      return true
    } catch (error) {
      return false
    }
  }

  const raiseInvalidCredentialsError = async () => {
    alert('Invalid Credentials!');
  }

  // const redirectToHomePage = (email, password) => {
  //   console.log("redirectToHomePage email, password: ", email, password);
  //   setLoggedInUser({ ...loggedInUser, username: email, password: password });
  // }

  const handleLogin = () => {
    if (!email || !password) {
      alert('Please fill all fields');
      return;
    }
    const userData = {
      username: email,
      password: password
    }
    validateCredentials() ? login(userData) : raiseInvalidCredentialsError()
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subTitle}>Let's build your tomorrow!</Text>
      </View>

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
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    rowGap: 20,
    padding: 24,
    backgroundColor: '#F8F9FB'
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  subTitle: {
    fontSize: 16,
    color: '#1A1A1A',
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'column',
    rowGap: '20'
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
    backgroundColor: '#1E88E5',
    paddingVertical: 14,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16
  },
  linkText: {
    color: '#1E88E5',
    fontSize: 14
  },
});
