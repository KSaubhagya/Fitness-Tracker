
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from "react-native";

type User = {
  username: string;
  password: string;
};

const App = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Registration
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    const userExists = users.find((user) => user.username === username && user.password === password);
    if (userExists) {
      Alert.alert("Success", "Login successful!");
    } else {
      Alert.alert("Error", "Invalid username or password.");
    }
  };

  const handleRegister = () => {
    if (!username || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    const userExists = users.some((user) => user.username === username);
    if (userExists) {
      Alert.alert("Error", "Username already exists.");
      return;
    }

    setUsers([...users, { username, password }]);
    Alert.alert("Success", "Registration successful!");
    setIsLogin(true); // Switch to login after registration
    clearFields();
  };

  const clearFields = () => {
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>{isLogin ? "Login" : "Register"}</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {!isLogin && (
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={isLogin ? handleLogin : handleRegister}
      >
        <Text style={styles.buttonText}>
          {isLogin ? "Login" : "Register"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.switchButton}
        onPress={() => {
          setIsLogin(!isLogin);
          clearFields();
        }}
      >
        <Text style={styles.switchButtonText}>
          {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: " #39ac39",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  switchButton: {
    marginTop: 15,
    alignItems: "center",
  },
  switchButtonText: {
    color: "#39ac39",
    fontWeight: "bold",
  },
});

export default App;
