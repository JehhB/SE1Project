import Signup from "@/components/Signup";
import { useAppContainer } from "@/lib/AppContainer";
import useSnackbar from "@/lib/hooks/useSnackbar";
import { router } from "expo-router";
import React from "react";

function signup() {
  const { sessionRepository, userRepository } = useAppContainer();
  const [snackbar, alert] = useSnackbar();

  async function handleSignup(
    email: string,
    username: string,
    password: string,
  ) {
    try {
      await sessionRepository.signup(email, password);
      await sessionRepository.login(email, password);
      await userRepository.setUserName(username);
      router.replace("/home");
    } catch (error: any) {
      alert(error.message);
    }
  }

  return (
    <>
      <Signup
        handleSignup={handleSignup}
        gotoLogin={() => router.navigate("/login")}
      />
      {snackbar}
    </>
  );
}

export default signup;
