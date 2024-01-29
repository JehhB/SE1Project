import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import {
  createMaterialBottomTabNavigator,
  MaterialBottomTabNavigationOptions,
  MaterialBottomTabNavigationEventMap,
} from "react-native-paper/react-navigation";
import { withLayoutContext } from "expo-router";

const { Navigator } = createMaterialBottomTabNavigator();

export const Tabs = withLayoutContext<
  MaterialBottomTabNavigationOptions & { href?: string | null },
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialBottomTabNavigationEventMap
>(Navigator, (screens) =>
  screens.filter(
    (screen) =>
      typeof screen.options === "function" || screen.options?.href !== null
  )
);
