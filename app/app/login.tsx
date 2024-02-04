import Login from "@/components/Login";
import { useAppContainer } from "@/lib/AppContainer";
import useSnackbar from "@/lib/hooks/useSnackbar";
import { router } from "expo-router";
import React from "react";

function login() {
  const { sessionRepository } = useAppContainer();
  const [snackbar, alert] = useSnackbar();

  return (
    <>
      <Login
        handleLogin={(email, password) => {
          sessionRepository
            .login(email, password)
            .then(() => {
              router.replace("/home");
            })
            .catch((error) => {
              console.log(error);
              alert(error.message);
            });
        }}
        gotoSignin={() => router.navigate("/signin")}
      />
      {snackbar}
    </>
  );
}

export default login;
