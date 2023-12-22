import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

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
    <View style={styles.container}>
      <View>
        <Text>{senderInfo.username}</Text>
        <Text>{senderInfo.email}</Text>
      </View>
      <View>
        <TouchableOpacity onPress={onAccept}>
          <Text>Accept</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={onReject}>
          <Text>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // Row layout to create two columns
    justifyContent: "space-between", // Space evenly between columns
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: "#ccc",
    borderWidth: 0,
    borderRadius: 10,
    marginTop: 5,
    margin: 5,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
});
