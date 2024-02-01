import Login from "@/components/Login";
import { router } from "expo-router";
import React from "react";

function login() {
  return (
    <Login
      handleLogin={(email, password) => console.log(email, password)}
      gotoSignin={() => router.navigate("/signin")}
    />
  );
}

export default login;
