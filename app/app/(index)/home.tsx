import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

function home() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text>{process.env.EXPO_PUBLIC_SUPABASE_URL}</Text>
      <Text>{process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY}</Text>
    </View>
  );
}

export default home;
