import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

export const SendFriendRequestPopup = ({ isVisible, onSubmit, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const availableUsernames = ["user1", "user2", "user3"]; // Replace with your actual list of usernames

  const handleSendRequest = () => {
    // TODO: Implement logic to send friend request
    console.log(`Sending friend request to ${selectedUser}`);
    // TODO: Close the modal after sending the request
    onClose();
  };
  console.log(
    `The create-request should be ${isVisible ? `visible` : `invisible`}`
  );

  return (
    <Modal transparent={true} visible={isVisible} style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.title}>Send Friend Request</Text>
        <TextInput
          style={styles.input}
          placeholder="Search for usernames"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Picker
          style={styles.picker}
          selectedValue={selectedUser}
          onValueChange={(itemValue) => setSelectedUser(itemValue)}
        >
          <Picker.Item label="Select a username" value={null} />
          {availableUsernames.map((username) => (
            <Picker.Item key={username} label={username} value={username} />
          ))}
        </Picker>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            onSubmit();
            handleSendRequest();
          }}
        >
          <Text style={styles.buttonText}>Send Request</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onClose}>
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
  },
  modalContent: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    padding: 16,
    margin: "10%",
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  picker: {
    height: 40,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginBottom: 8,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});
