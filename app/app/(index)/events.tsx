import LoginSignup from "@/components/LoginSignup";
import { useAppContainer } from "@/lib/AppContainer";
import { router } from "expo-router";
import { observer } from "mobx-react-lite";
import React from "react";
import { Text } from "react-native-paper";

const Events = observer(() => {
  const { sessionRepository } = useAppContainer();
  const userId = sessionRepository.getUserId();

  if (userId == null) {
    return (
      <LoginSignup
        gotoLogin={() => router.navigate("/login")}
        gotoSignup={() => router.navigate("/signup")}
      />
    );
  }

  return <Text>Events</Text>;
});

export default Events;
