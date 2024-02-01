import NoUserProfile from "@/components/NoUserProfile";
import AttendanceList from "@/components/AttendanceList";
import React from "react";
import { View } from "react-native";
import { router } from "expo-router";

function Profile() {
  return (
    <View className="flex-1 p-4">
      <NoUserProfile handleLogin={() => router.navigate("/login")} />
      <AttendanceList attendances={[null, null]} handleSync={() => {}} />
    </View>
  );
}

export default Profile;
