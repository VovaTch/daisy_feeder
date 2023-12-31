import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import { containerStyles } from "../styles/containers";
import { buttonStyles } from "../styles/buttons";
import { tableStyles } from "../styles/table";
import { Ionicons } from "@expo/vector-icons";

export const FriendRequestView = ({
  activeUser,
  friendRequests,
  minUsers,
  onAccept,
  onReject,
}) => {
  const userFriendRequests = friendRequests.filter(
    (friendRequest) =>
      friendRequest.to_user === activeUser.id && friendRequest.pending
  );

  return (
    <ScrollView>
      <Text style={tableStyles.settingsTitle}>
        {userFriendRequests.length === 0
          ? `No pending friend requests`
          : `Pending friend requests:`}
      </Text>
      <View style={containerStyles.settingsContainer}>
        {userFriendRequests.map((friendRequest, idx) => (
          <FriendRequestCard
            senderInfo={minUsers.find(
              (item) => friendRequest.from_user === item.id
            )}
            key={`fr-card-${idx}`}
            onAccept={() => onAccept(friendRequest.id)}
            onReject={() => onReject(friendRequest.id)}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const FriendRequestCard = ({ senderInfo, onAccept, onReject }) => {
  return (
    <View style={containerStyles.tableContainer}>
      <View>
        <Text style={tableStyles.innerText}>{senderInfo.username}</Text>
      </View>
      <View style={{ ...containerStyles.rowButtonContainer, width: "60%" }}>
        <TouchableOpacity onPress={onAccept} style={buttonStyles.okButton}>
          <View style={{ ...buttonStyles.buttonRowContainer, left: 0 }}>
            <Ionicons
              name="checkmark"
              style={{ ...buttonStyles.buttonIcon, marginRight: 0 }}
            />
            {/* <Text style={buttonStyles.buttonText}>Accept</Text> */}
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onReject} style={buttonStyles.cancelButton}>
          <View style={{ ...buttonStyles.buttonRowContainer, left: 0 }}>
            <Ionicons
              name="close"
              style={{ ...buttonStyles.buttonIcon, marginRight: 0 }}
            />
            {/* <Text style={buttonStyles.buttonText}>Reject</Text> */}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
