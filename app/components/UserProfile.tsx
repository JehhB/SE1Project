import React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

export type UserProfileProps = {
  handleLogout(): void;
  username: string;
};

function UserProfile(props: UserProfileProps) {
  return (
    <View className="flex-col items-start">
      <Text variant="headlineMedium">Hi {props.username}!</Text>
      <Button onPress={props.handleLogout}>Logout</Button>
    </View>
  );
}

export default UserProfile;
