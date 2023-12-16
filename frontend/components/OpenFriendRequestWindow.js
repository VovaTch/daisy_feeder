import React, { useContext } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  updateFriendStatus,
  updateRequestStatus,
} from "../api/send/updateFriendRequestStatus";
import { context } from "../context/global";

export const FriendRequestView = ({ activeUser, friendRequests, minUsers }) => {
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
          friendRequestId={friendRequest.id}
          senderInfo={minUsers.find(
            (item) => friendRequest.from_user === item.id
          )}
          key={`fr-card-${idx}`}
        />
      ))}
    </ScrollView>
  );
};

const FriendRequestCard = ({ friendRequestId, senderInfo }) => {
  // get context
  const globalContext = useContext(context);
  const {
    domain,
    friendRequests,
    setFriendRequests,
    setActiveUser,
    activeUser,
  } = globalContext;

  const onAccept = () => {
    handlerRequestAnswer(
      friendRequestId,
      friendRequests,
      setFriendRequests,
      activeUser,
      setActiveUser,
      true,
      domain
    );
  };

  const onReject = () => {
    handlerRequestAnswer(
      friendRequestId,
      friendRequests,
      setFriendRequests,
      activeUser,
      setActiveUser,
      false,
      domain
    );
  };

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

const handlerRequestAnswer = (
  friendRequestId,
  friendRequests,
  setFriendRequests,
  activeUser,
  setActiveUser,
  answer,
  domain
) => {
  updateRequestStatus(
    friendRequestId,
    friendRequests,
    setFriendRequests,
    answer,
    domain
  );
  updateFriendStatus(activeUser, setActiveUser, friendRequests, domain);
  console.log(
    `${answer ? `Accepting` : `Rejecting`} friend request ${friendRequestId}`
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
