import EventCreate from "@/components/EventCreate";
import { router } from "expo-router";
import React from "react";

function create() {
  return (
    <EventCreate
      editRollcall={(key) => {
        router.navigate({
          pathname: "events/create/rollcall",
          params: { key: key },
        });
      }}
      createEvent={() => {}}
      goBack={() => {
        router.back();
      }}
    />
  );
}

export default create;
