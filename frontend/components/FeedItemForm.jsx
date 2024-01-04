import React, { useContext, useState } from "react";
import {
  View,
  Modal,
  TextInput,
  Text,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

import { sendFeedItem } from "../api/send/sendFeedItem";
import { context } from "../context/global";
import { modalStyles } from "../styles/modal";
import { textInputStyles } from "../styles/inputs";
import { buttonStyles } from "../styles/buttons";
import { Ionicons } from "@expo/vector-icons";

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
      <View style={modalStyles.modalContainer}>
        <View style={modalStyles.modalContent}>
          {/* Food amount */}
          <Text>Food amount:</Text>
          <TextInput
            placeholder="Enter amount"
            keyboardType="numeric"
            style={textInputStyles.textInputLarge}
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
            style={buttonStyles.timeButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text>{`Pick ${feedingTime.toLocaleTimeString()}`}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              style={buttonStyles.timeButton}
              value={feedingTime}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={handleDateChange}
            />
          )}

          {/* Submit and cancel buttons */}
          <TouchableOpacity
            style={buttonStyles.standardButton}
            onPress={() => {
              onSubmit();
              handleSubmit();
            }}
          >
            <View style={buttonStyles.buttonRowContainer}>
              <Ionicons name="checkmark" style={buttonStyles.buttonIcon} />
              <Text style={buttonStyles.buttonText}>Submit</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={buttonStyles.standardButton}
            onPress={onClose}
          >
            <View style={buttonStyles.buttonRowContainer}>
              <Ionicons name="close" style={buttonStyles.buttonIcon} />
              <Text style={buttonStyles.buttonText}>Cancel</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
