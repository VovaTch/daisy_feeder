import React, { useContext, useState } from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";

import { clearHistory } from "../api/send/deleteFeedItem";
import { context } from "../context/global";
import { containerStyles } from "../styles/containers";
import { buttonStyles } from "../styles/buttons";
import { modalStyles } from "../styles/modal";
import { Ionicons } from "@expo/vector-icons";

export const SettingsClearComponent = ({ foodItems, setFoodItems, style }) => {
  // context
  const globalContext = useContext(context);
  const { domain } = globalContext;

  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View>
      {/* Clear History Button */}
      <View>
        <TouchableOpacity
          style={style}
          onPress={() => handleClearHistory(setIsModalVisible)}
        >
          <View style={buttonStyles.buttonRowContainer}>
            <Ionicons name="trash-bin" style={buttonStyles.buttonIcon} />
            <Text style={buttonStyles.buttonText}>Clear History</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Confirmation Modal */}
      <Modal
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={modalStyles.modalContainer}>
          <View style={modalStyles.modalContent}>
            <Text style={modalStyles.modalTitle}>Clear History?</Text>
            <Text style={modalStyles.modalText}>
              Are you sure you want to clear your history?
            </Text>
            <View style={containerStyles.rowButtonContainer}>
              <TouchableOpacity
                style={buttonStyles.okButton}
                onPress={() =>
                  handleConfirmation(
                    foodItems,
                    setFoodItems,
                    setIsModalVisible,
                    domain
                  )
                }
              >
                <Text style={buttonStyles.buttonText}>OK</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={buttonStyles.cancelButton}
                onPress={() => handleCancel(setIsModalVisible)}
              >
                <Text style={buttonStyles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const handleClearHistory = (setIsModalVisible) => {
  setIsModalVisible(true);
};

const handleConfirmation = (data, setData, setIsModalVisible, domain) => {
  clearHistory(data, setData, domain);

  // After clearing history, close the modal
  setIsModalVisible(false);

  // Optionally, you can show a success message
  // Alert.alert("History Cleared", "Your history has been cleared successfully.");
};

const handleCancel = (setIsModalVisible) => {
  // If the user cancels, simply close the modal
  setIsModalVisible(false);
};
