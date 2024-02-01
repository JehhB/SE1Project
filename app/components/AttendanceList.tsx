import React from "react";
import { FlatList, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Icon,
  List,
  Surface,
  Text,
  TouchableRipple,
  useTheme,
} from "react-native-paper";

export type AttendanceListProps = {
  attendances: any[];
  isSynced?: boolean;
  isSyncing?: boolean;
  handleSync: () => void;
};

function AttendanceList({
  attendances,
  isSynced = true,
  isSyncing = false,
  handleSync,
}: AttendanceListProps) {
  const theme = useTheme();

  return (
    <>
      <View className="mb-2 flex-row items-center justify-between">
        <Text variant="titleLarge">Past attendance</Text>
        <TouchableRipple
          className="h-12 w-12 items-center justify-center"
          disabled={!isSynced && !isSyncing}
          onPress={handleSync}
        >
          {isSynced ? (
            <Icon source="cloud-check-outline" size={24} />
          ) : isSyncing ? (
            <ActivityIndicator size={24} />
          ) : (
            <Icon source="cloud-sync-outline" size={16} />
          )}
        </TouchableRipple>
      </View>
      {attendances.length == 0 ? (
        <Text className="italic">No recorded attendance yet.</Text>
      ) : (
        <FlatList
          data={attendances}
          renderItem={(item) => (
            <Surface className="mb-2 rounded">
              <List.Item
                title={
                  <>
                    <Text className="text-sm">Event name&nbsp;</Text>
                    <Text className="text-sm italic">(00:00-23:59)</Text>
                  </>
                }
                description="Clocked in at 00:01"
              />
            </Surface>
          )}
        />
      )}
    </>
  );
}

export default AttendanceList;