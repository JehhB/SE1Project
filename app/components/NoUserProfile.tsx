import React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import PropType from "prop-types";

export type NoUserProfileProp = {
  gotoLogin: () => void;
};

function NoUserProfile(props: NoUserProfileProp) {
  const data: any[] = [null, null];

  return (
    <View className="mb-4 flex-row items-center justify-between">
      <Text variant="headlineMedium">Hello!</Text>
      <Button mode="contained" onPress={props.gotoLogin}>
        Log In
      </Button>
    </View>
  );
}

NoUserProfile.propType = {
  handleLogin: PropType.func.isRequired,
};

export default NoUserProfile;
