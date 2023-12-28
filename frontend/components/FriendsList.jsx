import { Feather } from "@expo/vector-icons";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { removeFriend } from "../api/send/removeFriend";
import { containerStyles } from "../styles/containers";

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
    <View style={{ ...containerStyles.tableContainer, width: 300 }}>
      <View>
        <Text>Name: {minUser.username}</Text>
      </View>
      <TouchableOpacity onPress={onDelete}>
        <Feather name="delete" color={"black"} size={30} />
      </TouchableOpacity>
    </View>
  );
};
