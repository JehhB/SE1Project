import Signin from "@/components/Signin";
import { router } from "expo-router";
import React from "react";

function signin() {
  return (
    <Signin
      handleSignin={(email, password) => console.log(email, password)}
      gotoLogin={() => router.navigate("/login")}
    />
  );
}

export default signin;
