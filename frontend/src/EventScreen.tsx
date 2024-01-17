import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {FAB, Surface, Text, TouchableRipple} from 'react-native-paper';

function EmptyList() {
  return <Text variant="labelLarge">No events</Text>;
}

export type EventScreenProps = {
  events: {eventId: string; eventName: string}[];
  createEvent: () => {};
};

export default function EventScreen({events, createEvent}: EventScreenProps) {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Events</Text>
      <FlatList
        style={styles.list}
        data={events}
        renderItem={({item}) => (
          <Surface mode="flat" style={styles.listItem}>
            <TouchableRipple
              style={styles.listItemOuter}
              onPress={() => console.log(item.eventId)}>
              <Text>{item.eventName}</Text>
            </TouchableRipple>
          </Surface>
        )}
        keyExtractor={item => item.eventId}
        ListEmptyComponent={EmptyList}
      />
      <FAB icon="plus" style={styles.fab} onPress={createEvent} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  list: {
    marginTop: 32,
  },
  listItemOuter: {
    padding: 20,
    borderRadius: 8,
  },
  listItem: {
    marginBottom: 16,
    borderRadius: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
