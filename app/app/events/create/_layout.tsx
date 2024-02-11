import { EventCreateProvider } from "@/components/EventCreate";
import { Slot } from "expo-router";
import React from "react";

function _layout() {
  return (
    <EventCreateProvider>
      <Slot />
    </EventCreateProvider>
  );
}

export default _layout;
