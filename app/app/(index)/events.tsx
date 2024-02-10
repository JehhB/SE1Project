import EventsList from "@/components/EventsList";
import LoginSignup from "@/components/LoginSignup";
import { useAppContainer } from "@/lib/AppContainer";
import { router } from "expo-router";
import { observer } from "mobx-react-lite";
import React from "react";

const Events = observer(() => {
  const { sessionRepository, createdEventsRepository } = useAppContainer();

  const userId = sessionRepository.getUserId();
  const createdEvents = createdEventsRepository.getCreatedEvents();

  if (userId == null) {
    return (
      <LoginSignup
        gotoLogin={() => router.navigate("/login")}
        gotoSignup={() => router.navigate("/signup")}
      />
    );
  }

  return (
    <EventsList
      events={createdEvents}
      handleRefresh={() => {
        createdEventsRepository.refetchEvents();
      }}
      gotoEventCreation={() => router.navigate("events/create")}
      gotoEventDetail={() => {}}
    />
  );
});

export default Events;
