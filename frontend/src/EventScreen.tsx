import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {
  FAB,
  Surface,
  Text,
  TouchableRipple,
  useTheme,
} from 'react-native-paper';

function EmptyList() {
  return <Text variant="labelLarge">No events</Text>;
}

export type EventScreenProps = {
  events: {eventId: string; eventName: string}[];
  createEvent: () => void;
  refetchEvent: () => void;
};

export default function EventScreen({
  events,
  createEvent,
  refetchEvent,
}: EventScreenProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <TouchableRipple onPress={refetchEvent}>
        <Text variant="headlineMedium">Events</Text>
      </TouchableRipple>
      <FlatList
        style={styles.list}
        data={events}
        renderItem={({item}) => (
          <Surface mode="flat" style={styles.listItem}>
            <TouchableRipple
              style={styles.listItemOuter}
              onPress={() => console.log(item.eventId)}>
              <>
                <Text variant="labelLarge">{item.eventName}</Text>
                <Text
                  variant="bodySmall"
                  style={{color: theme.colors.secondary}}>
                  {item.eventId}
                </Text>
              </>
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
