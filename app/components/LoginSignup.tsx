import React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

export type LoginSignupProp = {
  gotoLogin(): void;
  gotoSignup(): void;
};

function LoginSignup(props: LoginSignupProp) {
  return (
    <View className="flex-1 justify-center p-4">
      <Text variant="headlineSmall" className="mb-8 self-center">
        Login to create events
      </Text>
      <Button mode="contained" className="mb-2" onPress={props.gotoLogin}>
        Login
      </Button>
      <Button mode="outlined" onPress={props.gotoSignup}>
        Signup
      </Button>
    </View>
  );
}

export default LoginSignup;
