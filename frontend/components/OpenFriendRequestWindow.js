import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export const FriendRequestView = ({ activeUser, friendRequests, minUsers }) => {
  const userFriendRequests = friendRequests.filter(
    (friendRequest) =>
      friendRequest.to_user === activeUser.id && friendRequest.pending
  );
  return (
    <ScrollView>
      <Text>Open friend requests</Text>
      {userFriendRequests.map((friendRequest, idx) => (
        <FriendRequestCard
          friendRequest={friendRequest}
          senderInfo={minUsers.find(
            (item) => friendRequest.from_user === item.id
          )}
          key={`fr-card-${idx}`}
        />
      ))}
    </ScrollView>
  );
};

const FriendRequestCard = ({ friendRequest, senderInfo }) => {
  const onAccept = () => {
    // TODO: temporary
    console.log(`Accepting friend request`);
  };

  const onReject = () => {
    // TODO: temporary
    console.log(`Rejecting friend request`);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>Username: {senderInfo.username}</Text>
        <Text>Email: {senderInfo.email}</Text>
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
