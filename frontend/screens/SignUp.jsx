import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import { context } from "../context/global";
import { createUser } from "../api/send/createUser";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { emailIsValidated } from "../utils/Others";
import { containerStyles } from "../styles/containers";
import { textInputStyles } from "../styles/inputs";
import { buttonStyles } from "../styles/buttons";
import { imageStyles } from "../styles/image";
import { StatusBar } from "react-native";
import { statusBarStyles } from "../styles/statusBar";

/**
 * Daisy's Sign Up Screen.
 *
 * This screen allows users to sign up for Daisy's app. Users can enter their username, email, password, and confirm password.
 * If all fields are filled, a valid email is entered, and the passwords match, the user is created and a success message is displayed.
 * Otherwise, appropriate error messages are shown.
 *
 * Daisy, the clever and curious cat, welcomes you to her app and hopes you enjoy your experience!
 *
 * @component
 * @param {object} navigation - The navigation object provided by React Navigation.
 * @returns {JSX.Element} - The Sign Up screen component.
 */
const SignUpScreen = ({ navigation }) => {
  // context
  const globalContext = useContext(context);
  const { domain, setMinUsers, landingBackgroundImage } = globalContext;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [securePassword, setSecurePassword] = useState(true);
  const [confirmSecurePassword, setConfirmSecurePassword] = useState(true);

  // Show password eye handler
  const toggleShowPassword = () => {
    setSecurePassword(!securePassword);
  };

  // Show password eye handler
  const toggleShowConfirmPassword = () => {
    setConfirmSecurePassword(!confirmSecurePassword);
  };

  const handleSignUp = () => {
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      alert("Please fill in all fields");
      return;
    }

    if (!emailIsValidated(email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const newUser = {
      username: username,
      email: email,
      password: password,
      profile: { friends: [] },
    };
    createUser(newUser, setMinUsers, domain);
    alert(`Username ${username} was created!`);
    navigation.navigate("Landing");
  };

  const handleBackToLogin = () => {
    // Navigate back to the login screen
    navigation.navigate("Landing");
  };

  return (
    <ImageBackground
      source={landingBackgroundImage}
      style={imageStyles.backgroundImage}
    >
      <StatusBar
        backgroundColor={statusBarStyles.backgroundColor}
        barStyle={statusBarStyles.barStyle}
      />
      <View style={containerStyles.highLevelContainers}>
        <View style={containerStyles.formContainer}>
          <Text style={textInputStyles.label}>Username</Text>
          <TextInput
            value={username}
            style={textInputStyles.textInputLarge}
            autoCompleteType="username"
            textContentType="username"
            placeholder="Choose a username"
            autoCapitalize="none"
            onChangeText={setUsername}
          />

          <Text style={textInputStyles.label}>Email</Text>
          <TextInput
            value={email}
            style={textInputStyles.textInputLarge}
            autoCompleteType="email"
            textContentType="emailAddress"
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={setEmail}
          />

          <Text style={textInputStyles.label}>Password</Text>
          <View style={containerStyles.inputContainer}>
            <TextInput
              value={password}
              style={textInputStyles.textInputLarge}
              autoCompleteType="password"
              textContentType="password"
              placeholder="Enter your password"
              secureTextEntry={securePassword}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              style={textInputStyles.eyeIcon}
              onPress={toggleShowPassword}
            >
              <MaterialCommunityIcons
                name={securePassword ? "eye-outline" : "eye-off-outline"}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>

          <Text style={textInputStyles.label}>Confirm Password</Text>
          <View style={textInputStyles.inputContainer}>
            <TextInput
              value={confirmPassword}
              style={textInputStyles.textInputLarge}
              autoCompleteType="password"
              textContentType="password"
              placeholder="Confirm your password"
              secureTextEntry={confirmSecurePassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity
              style={textInputStyles.eyeIcon}
              onPress={toggleShowConfirmPassword}
            >
              <MaterialCommunityIcons
                name={confirmSecurePassword ? "eye-outline" : "eye-off-outline"}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={buttonStyles.standardButton}
            onPress={handleSignUp}
          >
            <Text style={buttonStyles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={buttonStyles.backButton}
            onPress={handleBackToLogin}
          >
            <Text style={buttonStyles.buttonText}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default SignUpScreen;
