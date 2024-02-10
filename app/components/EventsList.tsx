import { Loadable } from "@/lib/utils/Loadable";
import React from "react";
import { FlatList, View } from "react-native";
import {
  ActivityIndicator,
  FAB,
  List,
  Surface,
  Text,
  TouchableRipple,
} from "react-native-paper";

export type EventsListProps = {
  events: Loadable<{ name: string; id: string }[]>;
  handleRefresh(): void;
  gotoEventCreation(): void;
  gotoEventDetail(id: string): void;
};

function EventsList(props: EventsListProps) {
  const data =
    props.events.isLoading || props.events.error ? [] : props.events.data;

  return (
    <>
      <FlatList
        refreshing={props.events.isLoading}
        onRefresh={props.handleRefresh}
        data={data}
        ListHeaderComponent={
          <View className="mb-2 flex-row items-center justify-between">
            <Text variant="titleLarge">Managed Events</Text>
          </View>
        }
        ListEmptyComponent={
          props.events.error !== null ? (
            <Text className="italic">{props.events.error.message}</Text>
          ) : (
            <Text className="italic">No events created yet.</Text>
          )
        }
        renderItem={({ item }) => (
          <TouchableRipple
            className="rounded"
            onPress={() => props.gotoEventDetail(item.id)}
          >
            <Surface className="mb-2 flex-1">
              <List.Item
                title={<Text className="text-sm">{item.name}</Text>}
                description={<Text className="text-xs italic">{item.id}</Text>}
              />
            </Surface>
          </TouchableRipple>
        )}
        keyExtractor={(item) => item.id}
        className="p-4"
      />
      <FAB
        icon="plus"
        onPress={props.gotoEventCreation}
        visible={true}
        className="absolute bottom-4 right-4"
      />
    </>
  );
}

export default EventsList;
