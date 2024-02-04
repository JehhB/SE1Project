import Signin from "@/components/Signin";
import { useAppContainer } from "@/lib/AppContainer";
import useSnackbar from "@/lib/hooks/useSnackbar";
import { router } from "expo-router";
import React from "react";

function signin() {
  const { sessionRepository } = useAppContainer();
  const [snackbar, alert] = useSnackbar();

  return (
    <>
      <Signin
        handleSignin={(email, password) => {
          sessionRepository
            .signin(email, password)
            .then(() => {
              router.replace("/login");
            })
            .catch((error) => {
              alert(error.message);
            });
        }}
        gotoLogin={() => router.navigate("/login")}
      />
      {snackbar}
    </>
  );
}

export default signin;
