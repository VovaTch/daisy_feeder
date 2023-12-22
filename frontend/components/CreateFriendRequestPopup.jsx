import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import SearchableDropdown from "react-native-searchable-dropdown";
import { sendFriendRequest } from "../api/send/sendFriendRequest";

export const SendFriendRequestPopup = ({
  isVisible,
  onSubmit,
  onClose,
  minUsers,
  activeUser,
  domain,
}) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [okButtonVisible, setOkButtonVisible] = useState(false);

  const allAvailableUsernames = minUsers.map((item) => {
    return {
      id: item.id,
      name: item.username,
    };
  }); // Replace with your actual list of usernames
  const availableUsernames = allAvailableUsernames.filter(
    (item) =>
      item.id !== activeUser.id && !activeUser.profile.friends.includes(item.id)
  );

  const handleSendRequest = () => {
    if (selectedUser === null) {
      setOkButtonVisible(true);
    } else {
      const data = {
        to_user: selectedUser.id,
        from_user: activeUser.id,
        approved: false,
        pending: true,
      };
      console.log(`Sending friend request to ${selectedUser}`);
      sendFriendRequest(data, domain);
      setOkButtonVisible(true);
    }
  };

  const handleSelectUser = (item) => {
    const selectedMinUser = minUsers.find((user) => user.id === item.id);
    setSelectedUser(selectedMinUser);
    console.log(`Selected user: ${selectedMinUser.username}`);
  };

  return (
    <Modal transparent={true} visible={isVisible} style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.title}>Send Friend Request</Text>
        {/*  */}
        <SearchableDropdown
          onTextChange={(text) => console.log(text)}
          // Listner on the searchable input
          onItemSelect={(item) => handleSelectUser(item)}
          // Called after the selection
          containerStyle={{ padding: 5 }}
          // Suggestion container style
          textInputStyle={{
            padding: 12,
            borderWidth: 0,
            borderRadius: 7,
            borderColor: "#ccc",
            backgroundColor: "#d4c5b9",
          }}
          itemStyle={{
            padding: 10,
            marginTop: 2,
            backgroundColor: "#f5decb",
            borderColor: "#bbb",
            borderWidth: 0,
            borderRadius: 7,
          }}
          itemTextStyle={{
            color: "#222",
          }}
          itemsContainerStyle={{
            maxHeight: "60%",
          }}
          items={availableUsernames}
          // Mapping of item array
          placeholder={selectedUser ? selectedUser.username : "Search User..."}
          // place holder for the search input
          resPtValue={false}
          // Reset textInput Value with true and false state
          underlineColorAndroid="transparent"
          // To remove the underline from the android input
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            onSubmit();
            handleSendRequest();
          }}
        >
          <Text style={styles.buttonText}>Send Request</Text>
        </TouchableOpacity>
        <SubmitResponseButton
          isVisible={okButtonVisible}
          onRequestClose={() => setOkButtonVisible(false)}
          selectedUser={selectedUser}
        />
        <TouchableOpacity style={styles.button} onPress={onClose}>
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const SubmitResponseButton = ({ isVisible, onRequestClose, selectedUser }) => {
  const handleOkPress = () => {
    onRequestClose(); // Close the modal
  };

  const renderModalContent = () => {
    if (!selectedUser) {
      return (
        <Text>
          No user was selected, please select a user to send a friend request
          to.
        </Text>
      );
    }

    return <Text>{`Sent a friend request to ${selectedUser.username}`}</Text>;
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onRequestClose}
    >
      <View style={styles.modalContainerInner}>
        <View style={styles.modalContentInner}>
          {renderModalContent()}
          <TouchableOpacity onPress={handleOkPress} style={styles.okButton}>
            <Text>OK</Text>
          </TouchableOpacity>
        </View>
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
    position: "absolute",
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    backgroundColor: "white",
    padding: 16,
    margin: "10%",
    width: "80%",
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
    backgroundColor: "#884400",
    padding: 10,
    borderRadius: 5,
    marginBottom: 8,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  modalContainerInner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContentInner: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  okButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "lightblue",
    borderRadius: 5,
  },
});
