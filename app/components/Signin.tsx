import useSnackbar from "@/lib/hooks/useSnackbar";
import React, { useRef, useState } from "react";
import { validate } from "email-validator";
import { TextInput as _TextInput, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

export type SigninProps = {
  handleSignin: (email: string, password: string) => void;
  gotoLogin: () => void;
};

function Signin({ handleSignin, gotoLogin }: SigninProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [snackbar, alert] = useSnackbar();

  const emailInput = useRef<_TextInput>(null);
  const passwordInput = useRef<_TextInput>(null);
  const confirmPasswordInput = useRef<_TextInput>(null);

  function _handleSignin() {
    if (email.length == 0) {
      alert("You must enter your email address");
      emailInput.current?.focus();
    } else if (password.length == 0) {
      alert("You must enter your password");
      passwordInput.current?.focus();
    } else if (confirmPassword.length == 0) {
      alert("You must confirm your password");
      confirmPasswordInput.current?.focus();
    } else if (!validate(email)) {
      alert("Invalid email address");
      emailInput.current?.focus();
    } else if (password !== confirmPassword) {
      alert("Passwords are not identical");
      passwordInput.current?.focus();
    } else if (password.length > 72) {
      alert("Password must not exist 72 characters");
      passwordInput.current?.focus();
    } else if (password.length < 8) {
      alert("Password must be at least 8 characters long");
      passwordInput.current?.focus();
    } else {
      handleSignin(email, password);
    }
  }

  return (
    <>
      <View className="w-full max-w-2xl flex-1 justify-center self-center p-4">
        <Text variant="headlineSmall" className="mb-8 self-center">
          Signin up!
        </Text>
        <View className="mb-6 gap-2">
          <TextInput
            ref={emailInput}
            returnKeyType="next"
            onSubmitEditing={() => passwordInput.current?.focus()}
            value={email}
            onChangeText={setEmail}
            label="Email"
            keyboardType="email-address"
            mode="outlined"
          />
          <TextInput
            ref={passwordInput}
            onSubmitEditing={() => confirmPasswordInput.current?.focus()}
            returnKeyType="next"
            label="Password"
            secureTextEntry
            mode="outlined"
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            ref={confirmPasswordInput}
            returnKeyType="go"
            onSubmitEditing={_handleSignin}
            label="Confirm password"
            secureTextEntry
            mode="outlined"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>
        <View className="gap-2">
          <Button mode="contained" onPress={_handleSignin}>
            Sign Up
          </Button>
          <Button mode="text" onPress={gotoLogin}>
            Already have an account?
          </Button>
        </View>
      </View>
      {snackbar}
    </>
  );
}

export default Signin;
