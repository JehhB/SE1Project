import React, { useState } from 'react';
import { Text, Card, Button } from 'react-native-paper';
import { View, StyleSheet, ScrollView } from 'react-native';

export default function HomeNoEvent() {
  const [text, setText] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Card>
            <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
            <Card.Content>
              <Text style={styles.eventStatus}>Event is Done and Unavailable</Text>
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
          Back to Home
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
  eventStatus: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
});
