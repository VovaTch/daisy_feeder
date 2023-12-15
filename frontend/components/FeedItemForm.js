import React, { useContext, useState } from "react";
import {
  View,
  Modal,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

import { sendFeedItem } from "../api/send/sendFeedItem";
import { context } from "../context/global";

export const FeedItemForm = ({ isVisible, onClose, onSubmit }) => {
  // context
  const globalContext = useContext(context);
  const { domain, activeUser } = globalContext;

  const [amount, setAmount] = useState("");
  // const [feederName, setFeederName] = useState("");
  const [foodType, setFoodType] = useState("dry");
  const [feedingTime, setFeedingTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSubmit = () => {
    // Store all the fields in a dictionary
    const feedingData = {
      feeder: activeUser.id,
      amount: parseInt(amount),
      datetime: feedingTime.toISOString(),
      food_choice: foodType,
    };

    console.log(activeUser);

    // Send data
    sendFeedItem(feedingData, domain);

    // Reset the form variables
    setAmount("");
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
          <View>
            <Picker
              selectedValue={foodType}
              onValueChange={(itemValue) => setFoodType(itemValue)}
            >
              <Picker.Item label="Dry" value="dry" />
              <Picker.Item label="Wet" value="wet" />
            </Picker>
          </View>

          {/* Time of feeding */}
          <Text>Feeding Time:</Text>
          <TouchableOpacity
            style={styles.buttonTime}
            onPress={() => setShowDatePicker(true)}
          >
            <Text>{`Pick ${feedingTime.toLocaleTimeString()}`}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              style={styles.button}
              value={feedingTime}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={handleDateChange}
            />
          )}

          {/* Submit and cancel buttons */}
          <TouchableOpacity
            style={styles.buttonSubmit}
            onPress={() => {
              onSubmit();
              handleSubmit();
            }}
          >
            <Text style={styles.textSubmit}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonCancel} onPress={onClose}>
            <Text style={styles.textCancel}>Cancel</Text>
          </TouchableOpacity>
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
  button: {
    backgroundColor: "white",
    borderColor: "#dddddd",
    borderRadius: 10,
    borderWidth: 1,
    margin: 5,
    padding: 10,
  },
  buttonSubmit: {
    backgroundColor: "rgba(191,255,191,0.2)",
    borderColor: "#dddddd",
    borderRadius: 10,
    borderWidth: 1,
    margin: 5,
    padding: 10,
  },
  textSubmit: {
    fontSize: 24,
    color: "rgb(0, 70, 0)",
    textAlign: "center",
    fontWeight: "bold",
  },
  textCancel: {
    fontSize: 24,
    color: "rgb(70, 0, 0)",
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonCancel: {
    backgroundColor: "rgba(255,191,191,0.2)",
    borderColor: "#dddddd",
    borderRadius: 10,
    borderWidth: 1,
    margin: 5,
    padding: 10,
  },
  buttonTime: {
    backgroundColor: "white",
    borderColor: "#dddddd",
    borderRadius: 10,
    borderWidth: 1,
    margin: 5,
    marginBottom: 25,
    paddingTop: 30,
    paddingBottom: 30,
    padding: 10,
  },
});
