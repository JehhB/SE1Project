import React from "react";
import { FlatList, View } from "react-native";
import { FAB, List, Surface, Text, TouchableRipple } from "react-native-paper";

export type EventsListProps = {
  events: { name: string; id: string }[];
  gotoEventCreation(): void;
  gotoEventDetail(id: string): void;
};

function EventsList(props: EventsListProps) {
  return (
    <View className="relative flex-1 p-4">
      <View className="mb-2 flex-row items-center justify-between">
        <Text variant="titleLarge">Managed Events</Text>
      </View>
      {props.events.length == 0 ? (
        <Text className="italic">No events created yet.</Text>
      ) : (
        <FlatList
          data={props.events}
          renderItem={({ item }) => (
            <TouchableRipple
              className="rounded"
              onPress={() => props.gotoEventDetail(item.id)}
            >
              <Surface className="mb-2 flex-1">
                <List.Item
                  title={<Text className="text-sm">{item.name}</Text>}
                  description={
                    <Text className="text-xs italic">{item.id}</Text>
                  }
                />
              </Surface>
            </TouchableRipple>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
      <FAB
        icon="plus"
        onPress={props.gotoEventCreation}
        visible={true}
        className="absolute bottom-4 right-4"
      />
    </View>
  );
}

export default EventsList;
