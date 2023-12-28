import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import { containerStyles } from "../styles/containers";
import { buttonStyles } from "../styles/buttons";

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
      <Text>
        {userFriendRequests.length === 0
          ? `No pending friend requests`
          : `Pending friend requests:`}
      </Text>
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
    </ScrollView>
  );
};

const FriendRequestCard = ({ senderInfo, onAccept, onReject }) => {
  return (
    <View style={containerStyles.tableContainer}>
      <View>
        <Text>{senderInfo.username}</Text>
      </View>
      <View style={containerStyles.rowButtonContainer}>
        <TouchableOpacity onPress={onAccept} style={buttonStyles.okButton}>
          <Text>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onReject} style={buttonStyles.cancelButton}>
          <Text>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
