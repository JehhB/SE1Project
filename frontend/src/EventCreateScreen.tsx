import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {
  Button,
  TextInput,
  Text,
  useTheme,
  RadioButton,
  Surface,
  TouchableRipple,
} from 'react-native-paper';
import {DatePickerModal, TimePickerModal} from 'react-native-paper-dates';
import locations from './locations/locations';
import {set, addMinutes, addDays} from 'date-fns/fp';
import {format} from 'date-fns';
import {Image} from 'react-native';

export type EventCreateScreenProp = {
  createEvent(
    eventName: string,
    isStrict: boolean,
    timeStart: Date,
    timeEnd: Date,
    location: [lng: number, lat: number][],
  ): void;
};

const EventCreateScreen = ({createEvent}: EventCreateScreenProp) => {
  const [eventName, setEventName] = useState('');
  const [dateVisibility, setDateVisibility] = useState(false);
  const [timeStartPickerVisibility, showTimeStart] = useState(false);
  const [timeEndPickerVisibility, showTimeEnd] = useState(false);
  const [locationId, setLocationId] = useState(0);

  const [timeStart, setTimeStart] = useState(new Date());
  const [timeEnd, setTimeEnd] = useState(addMinutes(15, new Date()));

  const theme = useTheme();

  const handleCreateEvent = () => {
    console.log({timeStart, timeEnd});
  };

  const styles = StyleSheet.create({
    scrollViewContent: {
      flexGrow: 1,
      justifyContent: 'center',
      backgroundColor: theme.colors.background,
    },
    container: {
      flex: 1,
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
    button: {
      marginTop: 20,
      width: '100%',
      borderRadius: 8,
    },
    buttonLabel: {
      fontSize: 18,
    },
    row: {
      alignSelf: 'stretch',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 8,
    },
    buttonSet: {
      width: 112,
    },
  });

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.title}>Create Event</Text>
        <TextInput
          label="Event Name"
          value={eventName}
          onChangeText={text => setEventName(text)}
          style={styles.textInput}
          mode="outlined"
        />

        <View style={styles.row}>
          <View>
            <Text variant="labelLarge">Date</Text>
            <Text>{format(timeStart, 'MM/dd')}</Text>
          </View>
          <Button
            mode="outlined"
            style={styles.buttonSet}
            onPress={() => setDateVisibility(true)}>
            Set date
          </Button>
        </View>
        <View style={styles.row}>
          <View>
            <Text variant="labelLarge">Time start</Text>
            <Text>{format(timeStart, 'hh:mm aa')}</Text>
          </View>
          <Button
            mode="outlined"
            style={styles.buttonSet}
            onPress={() => showTimeStart(true)}>
            Set start
          </Button>
        </View>
        <View style={styles.row}>
          <View>
            <Text variant="labelLarge">Time end</Text>
            <Text>{format(timeEnd, 'hh:mm aa')}</Text>
          </View>
          <Button
            mode="outlined"
            style={styles.buttonSet}
            onPress={() => showTimeEnd(true)}>
            Set end
          </Button>
        </View>
        <Text variant="titleMedium" style={{marginVertical: 16}}>
          Choose location
        </Text>

        <RadioButton.Group
          value={String(locationId)}
          onValueChange={val => setLocationId(Number(val))}>
          {locations.map((loc, i) => (
            <Surface
              mode="flat"
              key={i}
              style={{
                marginBottom: 16,
                borderRadius: 8,
              }}>
              <TouchableRipple
                onPress={() => setLocationId(i)}
                style={{
                  padding: 8,
                  gap: 8,
                  borderRadius: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <>
                  <Image source={loc.image} style={{width: 80, height: 80}} />
                  <RadioButton value={String(i)} />
                  <Text>{loc.name}</Text>
                </>
              </TouchableRipple>
            </Surface>
          ))}
        </RadioButton.Group>

        <Button
          mode="contained"
          onPress={handleCreateEvent}
          disabled={timeStart > timeEnd || eventName.length < 1}
          style={styles.button}
          labelStyle={styles.buttonLabel}>
          Create
        </Button>

        <DatePickerModal
          locale="en"
          mode="single"
          visible={dateVisibility}
          onDismiss={() => setDateVisibility(false)}
          onConfirm={({date}) => {
            const currentTime = set(
              {hours: 0, minutes: 0, seconds: 0, milliseconds: 0},
              new Date(),
            );
            const selectedTime = new Date(date?.toDateString()!);
            if (selectedTime >= currentTime) {
              setTimeStart(selectedTime);
            }
            setDateVisibility(false);
          }}
        />
        <TimePickerModal
          locale="en"
          visible={timeStartPickerVisibility}
          hours={timeStart.getHours()}
          minutes={timeStart.getMinutes()}
          onDismiss={() => showTimeStart(false)}
          onConfirm={time => {
            setTimeStart(t => set(time, t));
            showTimeStart(false);
          }}
        />
        <TimePickerModal
          locale="en"
          visible={timeEndPickerVisibility}
          onDismiss={() => showTimeEnd(false)}
          hours={timeEnd.getHours()}
          minutes={timeEnd.getMinutes()}
          onConfirm={time => {
            let selectedTime = set(time, timeStart);
            if (timeStart > selectedTime)
              selectedTime = addDays(1, selectedTime);
            setTimeEnd(selectedTime);
            showTimeEnd(false);
          }}
        />
      </View>
    </ScrollView>
  );
};

export default EventCreateScreen;
