import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import CheckBox from "expo-checkbox";

import { context } from "../context/global";

const LandingScreen = ({ navigation }) => {
  // context
  const globalContext = useContext(context);
  const { setIsLoggedIn } = globalContext;

  const [emailOrName, setEmailOrName] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [securePassword, setSecurePassword] = useState(true);

  // If we are at the logging screen, we aren't logged in.
  useEffect(() => setIsLoggedIn(false), []);

  const handleLogin = () => {
    // Implement your login logic here
    console.log(`Logging in with email or username ${emailOrName}.`);
    setIsLoggedIn(true);
    navigation.navigate("Home");
  };

  const handleSignUp = () => {
    // Implement your sign-up logic here
    console.log("Signing up...");
    navigation.navigate("Sign Up");
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Email or Name</Text>
        <TextInput
          style={styles.input}
          autoCompleteType="email"
          textContentType="username"
          placeholder="Enter your email or name"
          value={emailOrName}
          onChangeText={setEmailOrName}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          autoCompleteType="password"
          textContentType="password"
          placeholder="Enter your password"
          secureTextEntry={securePassword}
          value={password}
          onChangeText={setPassword}
        />

        <View style={styles.checkboxContainer}>
          <CheckBox
            value={rememberMe}
            onValueChange={setRememberMe}
            style={styles.checkbox}
          />
          <Text style={styles.checkboxLabel}>Remember me</Text>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
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
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  checkbox: {
    alignSelf: "center",
  },
  checkboxLabel: {
    color: "white",
    marginLeft: 8,
  },
  loginButton: {
    backgroundColor: "#884400",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  signUpButton: {
    backgroundColor: "transparent",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default LandingScreen;