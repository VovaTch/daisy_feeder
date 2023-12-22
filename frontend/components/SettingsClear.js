import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";

import { clearHistory } from "../api/send/deleteFeedItem";
import { context } from "../context/global";

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
          <Text style={styles.buttonText}>Clear History</Text>
        </TouchableOpacity>
      </View>

      {/* Confirmation Modal */}
      <Modal
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Clear History?</Text>
            <Text style={styles.modalText}>
              Are you sure you want to clear your history?
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.okButton}
                onPress={() =>
                  handleConfirmation(
                    foodItems,
                    setFoodItems,
                    setIsModalVisible,
                    domain
                  )
                }
              >
                <Text style={styles.buttonText}>OK</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => handleCancel(setIsModalVisible)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    margin: 15,
    padding: 15,
    background: "rgba(255, 255, 255, 0.2)",
  },
  settingsCard: {
    background: "rgba(255, 255, 255, 0.3)",
    margin: 15,
    padding: 15,
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 75,
    paddingRight: 75,
    borderColor: "rgba(0, 0, 0, 0.2)",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  okButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#884400",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    alignSelf: "center",
    marginVertical: "1.5%",
    marginTop: "4%",
    width: "100%",
  },
});
