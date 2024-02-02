import useSnackbar from "@/lib/hooks/useSnackbar";
import { validate } from "email-validator";
import React, { useRef, useState } from "react";
import { View, TextInput as _TextInput } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";

export type LoginProps = {
  handleLogin: (email: string, password: string) => void;
  gotoSignin: () => void;
};

function Login({ handleLogin, gotoSignin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailInput = useRef<_TextInput>(null);
  const passwordInput = useRef<_TextInput>(null);

  const [snackbar, alert] = useSnackbar();

  function _handleLogin() {
    if (email.length == 0) {
      alert("You must enter your email address");
      emailInput.current?.focus();
    } else if (password.length == 0) {
      alert("You must enter your password");
      passwordInput.current?.focus();
    } else if (!validate(email)) {
      alert("Invalid email address");
      emailInput.current?.focus();
    } else {
      handleLogin(email, password);
    }
  }

  return (
    <>
      <View className="w-full max-w-2xl flex-1 justify-center self-center p-4">
        <Text variant="headlineSmall" className="mb-8 self-center">
          Log In Now!
        </Text>
        <View className="mb-6 gap-2">
          <TextInput
            ref={emailInput}
            onSubmitEditing={() => {
              passwordInput.current?.focus();
              console.log("test");
            }}
            returnKeyType="next"
            blurOnSubmit={false}
            label="Email"
            value={email}
            keyboardType="email-address"
            onChangeText={setEmail}
            mode="outlined"
          />
          <TextInput
            ref={passwordInput}
            onSubmitEditing={_handleLogin}
            returnKeyType="go"
            label="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            mode="outlined"
          />
        </View>
        <View className="gap-2">
          <Button mode="contained" onPress={_handleLogin}>
            Log In
          </Button>
          <Button mode="outlined" onPress={gotoSignin}>
            Sign Up
          </Button>
        </View>
      </View>

      {snackbar}
    </>
  );
}

export default Login;
