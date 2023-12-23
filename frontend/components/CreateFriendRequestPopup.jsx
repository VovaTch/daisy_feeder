import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { sendFriendRequest } from "../api/send/sendFriendRequest";
import { Dropdown } from "react-native-element-dropdown";
import { AntDesign } from "@expo/vector-icons";

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

  // Additional
  const [value, setValue] = useState(null);
  const [isFocused, setIsFocused] = useState(false);

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
  const dropdownAvailableUsernames = availableUsernames.map((item) => {
    return {
      label: item.name,
      value: item.name,
    };
  });

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

  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value && (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
      </View>
    );
  };

  const handleSelectUser = (item) => {
    const selectedMinUser = minUsers.find(
      (user) => user.username === item.value
    );
    setSelectedUser(selectedMinUser);
    console.log(`Selected user: ${selectedMinUser.username}`);
  };

  return (
    <Modal transparent={true} visible={isVisible} style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.title}>Send Friend Request</Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={dropdownAvailableUsernames}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocused ? "Select a friend..." : "..."}
          searchPlaceholder="Search for a friend"
          value={value}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(item) => {
            setValue(item.value);
            setIsFocused(false);
            handleSelectUser(item);
            console.log(item.value);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocused ? "blue" : "black"}
              name="Safety"
              size={20}
            />
          )}
          renderItem={renderItem}
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
  dropdown: {
    margin: 16,
    height: 50,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    width: 300,
    elevation: 2,
  },
  placeholderStyle: {
    fontSize: 14,
    color: "#aaa",
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    marginLeft: 150,
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
