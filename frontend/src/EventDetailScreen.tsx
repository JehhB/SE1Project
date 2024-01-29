import {format} from 'date-fns';
import React from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {Surface, Text, useTheme} from 'react-native-paper';

export type EventDetailScreenProp = {
  eventName: string;
  timeStart: Date;
  timeEnd: Date;
  attendances: {
    attendanceId: string;
    registeredName: string;
    timestamp: string;
  }[];
};

function EmptyList() {
  return <Text variant="labelLarge">No recorded attendance</Text>;
}

export default function EventDetailScreen({
  eventName,
  timeStart,
  timeEnd,
  attendances,
}: EventDetailScreenProp) {
  const theme = useTheme();

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: theme.colors.background,
      }}>
      <Text variant="headlineMedium">{eventName}</Text>
      <Text variant="titleSmall">
        {format(timeStart, 'MM/dd hh:mma')}-{format(timeEnd, 'hh:mma')}
      </Text>

      <FlatList
        style={styles.list}
        data={attendances}
        renderItem={({item}) => (
          <Surface mode="flat" style={styles.listItem}>
            <Text variant="labelLarge">{item.registeredName}</Text>
            <Text variant="bodySmall" style={{color: theme.colors.secondary}}>
              {format(new Date(item.timestamp), 'yyyy-MM-dd hh:mma')}
            </Text>
          </Surface>
        )}
        keyExtractor={item => item.attendanceId}
        ListEmptyComponent={EmptyList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    marginTop: 32,
    borderRadius: 8,
  },
  listItem: {
    marginBottom: 16,
    padding: 8,
    borderRadius: 8,
  },
});
