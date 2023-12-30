import React, { useContext, useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import CheckBox from "expo-checkbox";
import * as SecureStore from "expo-secure-store";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { context } from "../context/global";
import { fetchLoginUser } from "../api/fetch/fetchLoginUser";
import { validateToken } from "../api/fetch/validateToken";
import { containerStyles } from "../styles/containers";
import { textInputStyles } from "../styles/inputs";
import { checkboxStyles } from "../styles/checkbox";
import { buttonStyles } from "../styles/buttons";

/**
 * Welcome to the Landing Screen – the gateway to foodie wonders and culinary adventures!
 *
 * This screen offers a cozy login experience, complete with a password eye and a chance to remember your foodie identity.
 * It's like a secret door to a realm of delicious delights, guarded by a password and a checkbox, Daisy-approved!
 *
 * @component
 * @example
 * // Just include this in your navigation stack, and start your foodie journey!
 * <LandingScreen navigation={navigation} />
 *
 * @param {Object} props - The Landing Screen props (because even screens have props, right?).
 * @param {Object} props.navigation - Navigation prop to help you navigate the culinary universe.
 *
 * @returns {JSX.Element} - A tasteful rendering of the login and sign-up experience.
 * @throws {CulinaryConfusionError} - In case the user can't decide between logging in or signing up.
 *
 * @version 1.0.0
 * @since Foodie-Odyssey Update
 * @author Dvovivov
 */
const LandingScreen = ({ navigation }) => {
  // context
  const globalContext = useContext(context);
  const { domain, setActiveUser } = globalContext;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [securePassword, setSecurePassword] = useState(true);

  // Logging in automatically if the user has selected to do so
  useEffect(() => {
    const autoLogging = async () => {
      const token = await SecureStore.getItemAsync("token");
      if (token) {
        const user = await validateToken(token, setLoginError, domain);
        setActiveUser(user);
        console.log(user);
        navigation.navigate("Home");
      }
    };
    autoLogging();
    return () => {};
  }, []);

  const handleLogin = async () => {
    // Implement your login logic here
    try {
      const response = await fetchLoginUser(
        username,
        password,
        setLoginError,
        domain
      );
      const user = await validateToken(response.token, setLoginError, domain);
      setActiveUser(user);
      navigation.navigate("Home");
      if (rememberMe) {
        await SecureStore.setItemAsync("token", response.token);
        console.log(`Stored token of ${username} in SecureStore`);
      } else {
        await SecureStore.deleteItemAsync("token");
        console.log(`Removed token of ${username} from SecureStore`);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  // Show password eye handler
  const toggleShowPassword = () => {
    setSecurePassword(!securePassword);
  };

  const handleSignUp = () => {
    // Implement your sign-up logic here
    console.log("Signing up...");
    navigation.navigate("Sign Up");
  };

  return (
    <View style={containerStyles.highLevelContainers}>
      <View style={containerStyles.formContainer}>
        <Text style={textInputStyles.label}>Username</Text>
        {loginError ? <Text>{loginError}</Text> : <></>}
        <TextInput
          style={textInputStyles.textInputLarge}
          autoCompleteType="name"
          textContentType="username"
          placeholder="Enter your username"
          value={username ? username : ""}
          onChangeText={setUsername}
        />

        {/* Password input with an eye */}

        <Text style={textInputStyles.label}>Password</Text>
        <View style={containerStyles.inputContainer}>
          <TextInput
            style={textInputStyles.textInputLarge}
            autoCompleteType="password"
            textContentType="password"
            placeholder="Enter your password"
            secureTextEntry={securePassword}
            value={password ? password : ""}
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

        <View style={checkboxStyles.checkboxContainer}>
          <CheckBox
            value={rememberMe}
            onValueChange={setRememberMe}
            style={checkboxStyles.checkbox}
          />
          <Text style={checkboxStyles.checkboxLabel}>Remember me</Text>
        </View>

        <TouchableOpacity
          style={buttonStyles.standardButton}
          onPress={handleLogin}
        >
          <Text style={buttonStyles.buttonText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={buttonStyles.backButton}
          onPress={handleSignUp}
        >
          <Text style={buttonStyles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LandingScreen;
