import React, { useState } from 'react';
import { Text, Card, Button } from 'react-native-paper';
import { View, StyleSheet, ScrollView } from 'react-native';

export default function HomeEvent() {
  const [text, setText] = useState('');

  // Assuming you have event data with name, timeIn, and timeOut
  const event = {
    eventName: 'Coastal Clean-Up',
    timeIn: '7:00 AM',
    timeOut: '5:00 PM',
    // Add more event data as needed
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Card>
            <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
            <Card.Content>
              <Text style={styles.eventName}>{event.eventName}</Text>
              <Text style={styles.eventTime}>{`${event.timeIn} - ${event.timeOut}`}</Text>
            </Card.Content>
          </Card>
        </View>
      </View>
      <View style={styles.inputContainer2}>
        <Button
          mode="contained"
          onPress={() => console.log('Pressed')}
          style={styles.button}
          labelStyle={styles.buttonLabel}
        >
          PRESENT
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 2,
    marginLeft: 3,
    marginRight: 5,
  },
  inputContainer2: {
    alignItems: 'center',
    marginTop: 1,
  },
  button: {
    marginTop: 10,
    width: '50%',
    borderRadius: 8,
  },
  buttonLabel: {
    fontSize: 18,
  },
  eventName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  eventTime: {
    fontSize: 18,
    marginTop: 5,
  },
});
