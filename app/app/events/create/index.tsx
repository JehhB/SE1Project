import EventCreate, { RollcallInfo } from "@/components/EventCreate";
import { useAppContainer } from "@/lib/AppContainer";
import useSnackbar from "@/lib/hooks/useSnackbar";
import { router } from "expo-router";
import React from "react";

function create() {
  const { createdEventsRepository } = useAppContainer();
  const [snackbar, alert] = useSnackbar();

  return (
    <>
      <EventCreate
        editRollcall={(key) => {
          router.navigate({
            pathname: "events/create/rollcall",
            params: { key: key },
          });
        }}
        createEvent={(
          name: string,
          isStrict: boolean,
          rollcalls: RollcallInfo[],
        ) => {
          createdEventsRepository
            .createEvent(
              name,
              isStrict,
              rollcalls.map((rollcall) => ({
                description: rollcall.description,
                location: rollcall.location,
                timestart: rollcall.timestart.toISOString(),
                timeend: rollcall.timeend.toISOString(),
              })),
            )
            .then(() => {
              router.replace("/events");
            })
            .catch((error) => {
              alert(error.message ?? "Unknown error");
            });
        }}
        goBack={() => {
          router.back();
        }}
      />
      {snackbar}
    </>
  );
}

export default create;
