import React, { useState } from "react";
import { View } from "react-native";
import { Text, TextInput, Button, Snackbar } from "react-native-paper";

export type LoginProps = {
  handleLogin: (email: string, password: string) => void;
  gotoSignin: () => void;
};

function Login({ handleLogin, gotoSignin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<null | string>(null);
  function dismissError() {
    setError(null);
  }

  return (
    <>
      <View className="w-full max-w-2xl flex-1 justify-center self-center p-4">
        <Text variant="headlineSmall" className="mb-8 self-center">
          Log In Now!
        </Text>
        <View className="mb-6 gap-2">
          <TextInput
            label="Email"
            value={email}
            keyboardType="email-address"
            onChangeText={setEmail}
            mode="outlined"
          />
          <TextInput
            label="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            mode="outlined"
          />
        </View>
        <View className="gap-2">
          <Button mode="contained" onPress={() => handleLogin(email, password)}>
            Log In
          </Button>
          <Button mode="outlined" onPress={gotoSignin}>
            Sign Up
          </Button>
        </View>
      </View>

      <Snackbar
        visible={error != null}
        onDismiss={dismissError}
        action={{
          label: "Dismiss",
          onPress: dismissError,
        }}
      >
        {error}
      </Snackbar>
    </>
  );
}

export default Login;
