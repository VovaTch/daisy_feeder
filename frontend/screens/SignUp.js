import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { context } from "../context/global";
import { createUser } from "../api/send/createUser";

const SignUpScreen = ({ navigation }) => {
  // context
  const globalContext = useContext(context);
  const { domain, setMinUsers } = globalContext;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [securePassword, setSecurePassword] = useState(true);
  const [confirmSecurePassword, setConfirmSecurePassword] = useState(true);

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    } else {
      const newUser = {
        username: username,
        email: email,
        password: password,
        profile: { friends: [] },
      };
      createUser(newUser, setMinUsers, domain);
      alert(`Username ${username} was created!`);
      navigation.navigate("Landing");
    }
  };

  const handleBackToLogin = () => {
    // Navigate back to the login screen
    navigation.navigate("Landing");
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          value={username}
          style={styles.input}
          autoCompleteType="username"
          textContentType="username"
          placeholder="Choose a username"
          autoCapitalize="none"
          onChangeText={setUsername}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          style={styles.input}
          autoCompleteType="email"
          textContentType="emailAddress"
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          value={password}
          style={styles.input}
          autoCompleteType="password"
          textContentType="password"
          placeholder="Enter your password"
          secureTextEntry={securePassword}
          onChangeText={setPassword}
        />

        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          value={confirmPassword}
          style={styles.input}
          autoCompleteType="password"
          textContentType="password"
          placeholder="Confirm your password"
          secureTextEntry={confirmSecurePassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={handleBackToLogin}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    width: "80%",
  },
  label: {
    color: "white",
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    color: "black",
    backgroundColor: "white",
  },
  signupButton: {
    backgroundColor: "#884400",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  backButton: {
    backgroundColor: "transparent",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default SignUpScreen;
