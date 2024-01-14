import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import CheckBox from "expo-checkbox";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { context } from "../context/global";
import { fetchLoginUser } from "../api/fetch/fetchLoginUser";
import { validateToken } from "../api/fetch/validateToken";
import { containerStyles } from "../styles/containers";
import { textInputStyles } from "../styles/inputs";
import { checkboxStyles } from "../styles/checkbox";
import { buttonStyles } from "../styles/buttons";
import { imageStyles } from "../styles/image";
import { StatusBar } from "react-native";
import { statusBarStyles } from "../styles/statusBar";
import {
  putData,
  removeData,
  retrieveData,
} from "../api/fetch/fetchFromSecureStorage";

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
  const { domain, setActiveUser, landingBackgroundImage } = globalContext;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [securePassword, setSecurePassword] = useState(true);

  // Logging in automatically if the user has selected to do so
  useEffect(() => {
    const autoLogging = async () => {
      const token = await retrieveData("token");
      if (token) {
        const user = await validateToken(token, setLoginError, domain);
        setActiveUser(user);
        navigation.navigate("Home");
      }
    };
    autoLogging();
    return () => {};
  }, []);

  /**
   * Handles the login process.
   * @returns {Promise} - A promise that resolves to the user object if the login is successful, and undefined otherwise.
   */
  const handleLogin = async () => {
    // Implement your login logic here
    try {
      setIsLoading(true);
      console.log(domain);
      console.log(domain);
      console.log(domain);
      const response = await fetchLoginUser(
        username,
        password,
        setLoginError,
        domain
      );

      if (typeof response === "undefined") {
        setIsLoading(false);
        return;
      }

      const user = await validateToken(response.token, setLoginError, domain);
      setActiveUser(user);

      if (typeof user !== "undefined") {
        if (rememberMe) {
          await putData("token", response.token);
          console.log(`Stored token of ${username} in SecureStore`);
        } else {
          await removeData("token");
          console.log(`Removed token of ${username} from SecureStore`);
        }
        setLoginError("");
        setIsLoading(false);

        navigation.navigate("Home");
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      return error;
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
          {loginError ? (
            <Text style={textInputStyles.loginErrorText}>{loginError}</Text>
          ) : (
            <></>
          )}
          <Text style={textInputStyles.label}>Username</Text>
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
            <Text style={buttonStyles.buttonText}>
              {isLoading ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                "Log in"
              )}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={buttonStyles.backButton}
            onPress={handleSignUp}
          >
            <Text style={buttonStyles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default LandingScreen;
