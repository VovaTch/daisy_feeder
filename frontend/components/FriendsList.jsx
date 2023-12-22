import { Feather } from "@expo/vector-icons";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { removeFriend } from "../api/send/removeFriend";

export const FriendListView = ({ activeUser, setActiveUser, minUsers }) => {
  const minUsersFriends = minUsers.filter((item) =>
    activeUser.profile.friends.includes(item.id)
  );
  return (
    <ScrollView>
      {minUsersFriends.length === 0 ? (
        <Text>No friends to display</Text>
      ) : (
        <Text>Friend List:</Text>
      )}
      {minUsersFriends.map((minUserFriend, idx) => (
        <FriendCard
          key={`f-card-${idx}`}
          friendId={minUserFriend.id}
          activeUser={activeUser}
          setActiveUser={setActiveUser}
          minUser={minUserFriend}
        />
      ))}
    </ScrollView>
  );
};

export const FriendCard = ({
  friendId,
  activeUser,
  setActiveUser,
  minUser,
}) => {
  const onDelete = () => {
    removeFriend(friendId, activeUser, setActiveUser);
    console.log(`Deleting friend username: ${minUser.username}`);
  };
  return (
    <View style={styles.container}>
      <View>
        <Text>Name: {minUser.username}</Text>
        <Text>Email: {minUser.email}</Text>
      </View>
      <TouchableOpacity onPress={onDelete}>
        <Feather name="delete" color={"black"} size={40} />
      </TouchableOpacity>
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
