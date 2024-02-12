import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { PaperProvider, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { polyfillWebCrypto } from "expo-standard-web-crypto";

import "./global.css";
import { AppContainer, useAppContainer } from "@/lib/AppContainer";

export { ErrorBoundary } from "expo-router";

polyfillWebCrypto();
export const unstable_settings = {
  initialRouteName: "(index)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider>
      <AppContainer>
        <RootLayoutNav />
      </AppContainer>
    </PaperProvider>
  );
}

function RootLayoutNav() {
  const theme = useTheme();
  const { sessionRepository } = useAppContainer();
  useEffect(() => {
    sessionRepository.getSessionToken();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      />
    </SafeAreaView>
  );
}
