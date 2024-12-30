import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground } from "react-native";
import { useRouter } from "expo-router"; // useRouter for navigation

interface User {
  username: string;
  password: string;
}

const dummyUsers: User[] = [];

const App = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const router = useRouter(); // useRouter init 

  const displayMessage = (type: "success" | "error", text: string) => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 3000); // Hide msg after 3s
  };

  const handleRegister = () => {
    if (!username || !password || !confirmPassword) {
      displayMessage("error", "All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      displayMessage("error", "Passwords do not match.");
      return;
    }

    if (dummyUsers.some(user => user.username === username)) {
      displayMessage("error", "Username already exists.");
      return;
    }

    dummyUsers.push({ username, password });
    displayMessage("success", "Registration successful! You can now log in.");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setIsLogin(true);
  };

  const handleLogin = () => {
    if (!username || !password) {
      displayMessage("error", "All fields are required.");
      return;
    }

    const user = dummyUsers.find(
      user => user.username === username && user.password === password
    );

    if (user) {
      displayMessage("success", `Welcome, ${username}!`);
      setUsername("");
      setPassword("");

      // Navigate to the Home and pass parameter
      router.push({ pathname: "/home", params: { username } });
    } else {
      displayMessage("error", "Invalid username or password.");
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/b3.avif')} 
      style={styles.container} 
    >
      <View style={styles.formContainer}>
        <Text style={styles.title}>{isLogin ? "Login" : "Register"}</Text>

        {message ? (
          <View
            style={[
              styles.messageBox,
              messageType === "success" ? styles.successMessage : styles.errorMessage,
            ]}
          >
            <Text style={styles.messageText}>{message}</Text>
          </View>
        ) : null}

        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {!isLogin && (
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={isLogin ? handleLogin : handleRegister}
        >
          <Text style={styles.buttonText}>{isLogin ? "Login" : "Register"}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
          <Text style={styles.switchText}>
            {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "rgba(0, 0, 0, 0.93)", //transparent overlay
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#39ac39",
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  switchText: {
    color: "#39ac39",
    textAlign: "center",
    marginTop: 16,
    fontSize: 16,
  },
  messageBox: {
    padding: 12,
    marginBottom: 16,
    borderRadius: 4,
  },
  successMessage: {
    backgroundColor: "#d4edda",
    borderColor: "#c3e6cb",
  },
  errorMessage: {
    backgroundColor: "#f8d7da",
    borderColor: "#f5c6cb",
  },
  messageText: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default App;
