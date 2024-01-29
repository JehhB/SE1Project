import { Tabs } from "@/components/Tabs";
import React from "react";

export default function () {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{ title: "Home", tabBarIcon: "home" }}
      />
      <Tabs.Screen
        name="events"
        options={{ title: "Events", tabBarIcon: "calendar" }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: "Profile", tabBarIcon: "account" }}
      />
    </Tabs>
  );
}
