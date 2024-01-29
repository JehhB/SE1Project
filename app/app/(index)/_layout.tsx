import { Tabs } from "@/components/Tabs";
import React from "react";

export default function () {
  return (
    <Tabs>
      <Tabs.Screen options={{ title: "Home", tabBarIcon: "home" }} />
    </Tabs>
  );
}
