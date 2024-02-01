import React from "react";
import { FlatList, View } from "react-native";
import { Button, IconButton, List, Surface, Text } from "react-native-paper";
import PropType from "prop-types";

export type NoUserProfileProp = {
  handleLogin: () => void;
};

function NoUserProfile({ handleLogin }: NoUserProfileProp) {
  const data: any[] = [null, null];

  return (
    <View className="justify-between flex-row items-center mb-4">
      <Text variant="headlineMedium">Hello!</Text>
      <Button mode="contained" onPress={handleLogin}>
        Log In
      </Button>
    </View>
  );
}

NoUserProfile.propType = {
  handleLogin: PropType.func.isRequired,
};

export default NoUserProfile;
