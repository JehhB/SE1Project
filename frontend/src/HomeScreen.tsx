import React, {useState} from 'react';
import {
  TextInput,
  Button,
  Portal,
  Dialog,
  Text,
  Snackbar,
} from 'react-native-paper';
import {View, StyleSheet, ScrollView} from 'react-native';

export type HomeScreenProps = {
  gotoEventCreation: () => void;
  joinEvent: (eventId: string, name: string) => void;
  name: string | null;
  errorVisibility: boolean;
  dismissError: () => void;
};

export default function HomeScreen({
  gotoEventCreation,
  joinEvent,
  name,
  errorVisibility,
  dismissError,
}: HomeScreenProps) {
  const [eventId, setEventId] = useState('');
  const [regName, setRegName] = useState(name);
  const [visible, setVisibility] = useState(false);

  function handleJoinEvent() {
    setRegName(name);
    setVisibility(true);
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            label="Enter Event Code"
            value={eventId}
            onChangeText={text => setEventId(text)}
            style={styles.textInput}
            mode="outlined"
          />
        </View>
        <Button
          mode="contained"
          onPress={handleJoinEvent}
          style={styles.button}
          disabled={eventId.length < 1}
          labelStyle={styles.buttonLabel}>
          JOIN NOW
        </Button>
      </View>
      <View>
        <Button
          mode="text"
          style={styles.button2}
          labelStyle={styles.buttonLabel2}
          onPress={gotoEventCreation}>
          Create event
        </Button>
      </View>
      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisibility(false)}>
          <Dialog.Title>Enter name for event</Dialog.Title>
          <Dialog.Content>
            <TextInput
              mode="outlined"
              label="Name"
              value={regName ?? ''}
              onChangeText={setRegName}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              disabled={(regName ?? '').length < 1}
              onPress={() => {
                joinEvent(eventId, regName ?? '');
                setVisibility(false);
              }}>
              Register
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Snackbar
        visible={errorVisibility}
        onDismiss={dismissError}
        action={{label: 'Dismiss', onPress: dismissError}}>
        Error encountered
      </Snackbar>
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
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
    marginLeft: 3,
    marginRight: 5,
    marginBottom: 7,
  },

  textInput: {
    fontSize: 20,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  button: {
    borderRadius: 15,
    height: 48.5,
    alignItems: 'center', // Center the content horizontally
    justifyContent: 'center', // Center the content vertically
  },
  buttonLabel: {
    alignSelf: 'center', // Align the label vertically in the center
  },
  button2: {
    marginTop: 1,
  },
  buttonLabel2: {
    fontSize: 18.5,
    marginTop: 1,
  },
});
