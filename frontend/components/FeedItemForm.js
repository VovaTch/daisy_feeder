import React, { useState } from "react";
import {
  View,
  Modal,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

import { sendFeedItem } from "../api/send/sendFeedItem";
import { BASE_PATH_DEVELOPMENT } from "../api/proxy/settings";

export const FeedItemForm = ({ isVisible, onClose, onSubmit }) => {
  const [amount, setAmount] = useState("");
  const [feederName, setFeederName] = useState("");
  const [foodType, setFoodType] = useState("dry");
  const [feedingTime, setFeedingTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSubmit = () => {
    console.log({ amount, feederName, foodType, feedingTime });

    // Store all the fields in a dictionary
    const feedingData = {
      feeder: feederName,
      amount: parseInt(amount),
      datetime: feedingTime.toISOString(),
      food_choice: foodType,
    };

    // Send data
    sendFeedItem(feedingData, BASE_PATH_DEVELOPMENT);

    // Reset the form variables
    setAmount("");
    setFeederName("");
    setFoodType("dry");
    setFeedingTime(new Date());
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === "ios"); // On iOS, the date picker is modal
    if (selectedDate) {
      setFeedingTime(selectedDate);
    }
  };

  return (
    <Modal transparent={true} visible={isVisible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.formContainer}>
          {/* Feeder name */}
          <Text>Feeder&apos;s Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter feeder's name"
            value={feederName}
            onChangeText={(text) => setFeederName(text)}
          />

          {/* Food amount */}
          <Text>Food amount:</Text>
          <TextInput
            placeholder="Enter amount"
            keyboardType="numeric"
            style={styles.input}
            value={amount}
            onChangeText={(text) => setAmount(text)}
          />

          {/* Dry or wet */}
          <Text>Food Type:</Text>
          <Picker
            selectedValue={foodType}
            onValueChange={(itemValue) => setFoodType(itemValue)}
          >
            <Picker.Item label="Dry" value="dry" />
            <Picker.Item label="Wet" value="wet" />
          </Picker>

          {/* Time of feeding */}
          <Text>Feeding Time:</Text>
          <Button
            title={`Pick ${feedingTime.toLocaleTimeString()}`}
            onPress={() => setShowDatePicker(true)}
          />
          {showDatePicker && (
            <DateTimePicker
              value={feedingTime}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={handleDateChange}
            />
          )}

          {/* Submit and cancel buttons */}
          <Button
            title="Submit"
            onPress={() => {
              onSubmit();
              handleSubmit();
            }}
          />
          <Button title="Cancel" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
  },
  formContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5, // for Android shadow
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
