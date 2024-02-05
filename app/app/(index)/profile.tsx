import NoUserProfile from "@/components/NoUserProfile";
import AttendanceList from "@/components/AttendanceList";
import React from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { observer } from "mobx-react-lite";
import { useAppContainer } from "@/lib/AppContainer";
import UserProfile from "@/components/UserProfile";

const profile = observer(() => {
  const { sessionRepository, userRepository } = useAppContainer();

  const userId = sessionRepository.getUserId();
  const username = userRepository.getUserName();

  return (
    <View className="flex-1 p-4">
      {userId === null ? (
        <NoUserProfile gotoLogin={() => router.navigate("/login")} />
      ) : (
        <UserProfile
          handleLogout={() => {
            sessionRepository.logout();
          }}
          username={username}
        />
      )}
      <AttendanceList attendances={[null, null]} handleSync={() => {}} />
    </View>
  );
});

export default profile;
