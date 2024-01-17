import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, ScrollView} from 'react-native';
import {
  Card,
  Button,
  TextInput as PaperTextInput,
  useTheme,
} from 'react-native-paper';

const EventCreateScreen = () => {
  const [eventName, setEventName] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [timeIn, setTimeIn] = useState('');
  const [timeOut, setTimeOut] = useState('');
  const theme = useTheme();

  const handleCreateEvent = () => {
    console.log('Create Event pressed');
  };

  const styles = StyleSheet.create({
    scrollViewContent: {
      flexGrow: 1,
      justifyContent: 'center',
      backgroundColor: theme.colors.background,
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    textInput: {
      width: '100%',
      height: 40,
      fontSize: 20,
      marginBottom: 10,
      borderRadius: 8,
      paddingLeft: 10,
    },
    overview: {
      marginTop: 20,
      alignItems: 'center',
    },
    overviewLabel: {
      fontSize: 25,
      fontWeight: 'bold',
    },
    overviewText: {
      fontSize: 23,
      marginTop: 5,
    },
    card: {
      marginTop: 20,
      width: '100%',
      borderRadius: 8,
      elevation: 4,
    },
    button: {
      marginTop: 20,
      width: '100%',
      borderRadius: 8,
    },
    buttonLabel: {
      fontSize: 18,
    },
  });

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.title}>Create Event</Text>
        <PaperTextInput
          label="Event Name"
          value={eventName}
          onChangeText={text => setEventName(text)}
          style={styles.textInput}
          mode="outlined"
        />
        <PaperTextInput
          label="Event Location"
          value={eventLocation}
          onChangeText={text => setEventLocation(text)}
          style={styles.textInput}
          mode="outlined"
        />
        <PaperTextInput
          label="Time-in"
          value={timeIn}
          onChangeText={text => setTimeIn(text)}
          style={styles.textInput}
          mode="outlined"
        />
        <PaperTextInput
          label="Time-out"
          value={timeOut}
          onChangeText={text => setTimeOut(text)}
          style={styles.textInput}
          mode="outlined"
        />

        {eventName || eventLocation || timeIn || timeOut ? (
          <View style={styles.overview}>
            <Text style={styles.overviewLabel}>Event Overview:</Text>
            <Text style={styles.overviewText}>{eventName}</Text>
            {eventLocation && (
              <Text
                style={
                  styles.overviewText
                }>{`Location: ${eventLocation}`}</Text>
            )}
            {timeIn && timeOut && (
              <Text
                style={styles.overviewText}>{`${timeIn} - ${timeOut}`}</Text>
            )}
          </View>
        ) : null}

        {/* Placeholder lang to para sa location hahaa*/}
        <Card style={styles.card}>
          <Card.Cover source={{uri: 'https://picsum.photos/700'}} />
        </Card>
        <Button
          mode="contained"
          onPress={handleCreateEvent}
          style={styles.button}
          labelStyle={styles.buttonLabel}>
          Create
        </Button>
      </View>
    </ScrollView>
  );
};

export default EventCreateScreen;
