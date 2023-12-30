import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import { sendFriendRequest } from "../api/send/sendFriendRequest";
import { Dropdown } from "react-native-element-dropdown";
import { AntDesign, Ionicons } from "@expo/vector-icons";

import { dropdownStyles } from "../styles/dropdown";
import { modalStyles } from "../styles/modal";
import { buttonStyles } from "../styles/buttons";

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
      try {
        const data = {
          to_user: selectedUser.id,
          from_user: activeUser.id,
          approved: false,
          pending: true,
        };
        console.log(`Sending friend request to ${selectedUser.username}`);
        sendFriendRequest(data, domain);
        setOkButtonVisible(true);
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
              console.log(item.value);
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
          <SubmitResponseButton
            isVisible={okButtonVisible}
            onRequestClose={() => setOkButtonVisible(false)}
            selectedUser={selectedUser}
          />
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
      <View style={modalStyles.modalContainerInner}>
        <View style={modalStyles.modalContentInner}>
          {renderModalContent()}
          <TouchableOpacity
            onPress={handleOkPress}
            style={buttonStyles.okButton}
          >
            <Text>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
