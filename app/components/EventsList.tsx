import { CreatedEvent } from "@/lib/model/entity/CreatedEvent";
import { Loadable } from "@/lib/utils/Loadable";
import React from "react";
import { FlatList, Platform, View } from "react-native";
import { FAB, List, Surface, Text, TouchableRipple } from "react-native-paper";

function formatShortId(id: string) {
  return `${id.slice(0, 3)}-${id.slice(3, 7)}-${id.slice(7, 10)}`;
}

export type EventsListProps = {
  events: Loadable<CreatedEvent[]>;
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
        className={
          /* Temporary fixed for doubled padding in web 
             when swipe to refresh is enabled. */
          Platform.OS == "web" ? "p-2" : "p-4"
        }
        refreshing={props.events.isLoading}
        onRefresh={() => {
          props.handleRefresh();
        }}
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
          <Surface className="mb-2 flex-1 rounded">
            <TouchableRipple onPress={() => props.gotoEventDetail(item.id)}>
              <List.Item
                title={<Text variant="labelLarge">{item.name}</Text>}
                description={
                  <Text variant="bodySmall">{formatShortId(item.shortid)}</Text>
                }
              />
            </TouchableRipple>
          </Surface>
        )}
        keyExtractor={(item) => item.id}
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
