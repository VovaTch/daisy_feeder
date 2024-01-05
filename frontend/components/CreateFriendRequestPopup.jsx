import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import { sendFriendRequest } from "../api/send/sendFriendRequest";
import { Dropdown } from "react-native-element-dropdown";
import { AntDesign, Ionicons } from "@expo/vector-icons";

import { dropdownStyles } from "../styles/dropdown";
import { modalStyles } from "../styles/modal";
import { buttonStyles } from "../styles/buttons";

/**
 * Send friend request popup, contains a dropdown of all available users, submit and cancel buttons
 * @param {*} props isVisible, onSubmit, onClose, minUsers, activeUser, domain
 * @returns SendFriendRequestPopup
 */
export const SendFriendRequestPopup = ({
  isVisible,
  onSubmit,
  onClose,
  minUsers,
  activeUser,
  domain,
}) => {
  const [selectedUser, setSelectedUser] = useState(null);

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
      alert("Please select a user to send a friend request to");
    } else {
      try {
        const data = {
          to_user: selectedUser.id,
          from_user: activeUser.id,
          approved: false,
          pending: true,
        };
        console.log(`Sending friend request to ${selectedUser.username}`);
        sendFriendRequest(data, domain);
        alert(`Sent friend request to ${selectedUser.username}`);
      } catch (error) {
        alert("Error sending friend request");
        console.log(error);
      }
    }
  };

  const renderItem = (item) => {
    return (
      <View style={dropdownStyles.item}>
        <Text style={dropdownStyles.textItem}>{item.label}</Text>
        {item.value === value && (
          <AntDesign
            style={dropdownStyles.icon}
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
    <Modal transparent={true} visible={isVisible}>
      <View style={modalStyles.modalContainer}>
        <View style={modalStyles.modalContent}>
          <Text style={modalStyles.modalTitle}>Send Friend Request</Text>
          <Dropdown
            style={dropdownStyles.dropdownMain}
            placeholderStyle={dropdownStyles.placeholderStyle}
            selectedTextStyle={dropdownStyles.selectedTextStyle}
            inputSearchStyle={dropdownStyles.inputSearchStyle}
            iconStyle={dropdownStyles.iconStyle}
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
            }}
            renderLeftIcon={() => (
              <AntDesign
                style={dropdownStyles.icon}
                color={isFocused ? "blue" : "black"}
                name="Safety"
                size={20}
              />
            )}
            renderItem={renderItem}
          />
          <TouchableOpacity
            style={buttonStyles.standardButton}
            onPress={() => {
              onSubmit();
              handleSendRequest();
            }}
          >
            <View style={buttonStyles.buttonRowContainer}>
              <Ionicons name="checkmark" style={buttonStyles.buttonIcon} />
              <Text style={buttonStyles.buttonText}>Send Request</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={buttonStyles.standardButton}
            onPress={onClose}
          >
            <View style={buttonStyles.buttonRowContainer}>
              <Ionicons name="close" style={buttonStyles.buttonIcon} />
              <Text style={buttonStyles.buttonText}>Close</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
