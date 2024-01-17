import React, {useState} from 'react';
import {TextInput, Button} from 'react-native-paper';
import {View, StyleSheet, ScrollView} from 'react-native';

export type HomeScreenProps = {
  gotoEventCreation: () => void;
};

export default function HomeScreen({gotoEventCreation}: HomeScreenProps) {
  const [text, setText] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            label="Enter Event Code"
            value={text}
            onChangeText={inputText => setText(inputText)}
            style={styles.textInput}
            mode="outlined"
          />
        </View>
        <Button
          mode="contained"
          onPress={gotoEventCreation}
          style={styles.button}
          labelStyle={styles.buttonLabel}>
          JOIN NOW
        </Button>
      </View>
      <View>
        <Button
          mode="text"
          onPress={() => console.log('Pressed')}
          style={styles.button2}
          labelStyle={styles.buttonLabel2}>
          Create event?
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
