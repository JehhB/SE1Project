import Signin from "@/components/Signin";
import { useAppContainer } from "@/lib/AppContainer";
import useSnackbar from "@/lib/hooks/useSnackbar";
import { router } from "expo-router";
import React from "react";

function signin() {
  const { sessionRepository, userRepository } = useAppContainer();
  const [snackbar, alert] = useSnackbar();

  async function handleSignin(
    email: string,
    username: string,
    password: string,
  ) {
    try {
      await sessionRepository.signin(email, password);
      await sessionRepository.login(email, password);
      await userRepository.setUserName(username);
      router.replace("/home");
    } catch (error: any) {
      alert(error.message);
    }
  }

  return (
    <>
      <Signin
        handleSignin={handleSignin}
        gotoLogin={() => router.navigate("/login")}
      />
      {snackbar}
    </>
  );
}

export default signin;
