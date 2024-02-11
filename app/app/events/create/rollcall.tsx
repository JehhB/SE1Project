import RollcallEdit from "@/components/RollcallEdit";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";

function rollcall() {
  const params = useLocalSearchParams<{ key: string }>();
  return <RollcallEdit _key={params.key} goBack={() => router.back()} />;
}

export default rollcall;
