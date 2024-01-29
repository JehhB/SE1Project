import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {selectRegistration} from './slice/registrationCacheSlice';
import {Button, Dialog, HelperText, Portal, Text} from 'react-native-paper';
import {View, PermissionsAndroid, TouchableWithoutFeedback} from 'react-native';
import {format} from 'date-fns';
import Geolocation from 'react-native-geolocation-service';
import {checklocation} from './lib/checklocation';

export type AttendanceScreenProp = {
  error: boolean;
  hint: string;
  clockIn: () => void;
  skip: () => void;
};

export default function AttendanceScreen({
  error,
  hint,
  clockIn,
  skip,
}: AttendanceScreenProp) {
  const registration = useSelector(selectRegistration);
  if (registration == null) return <Text>No attendance</Text>;
  const [confirm, setConfirm] = useState(false);

  const timeStart = new Date(registration.timeStart);
  const timeEnd = new Date(registration.timeEnd);

  const [onTime, setOnTime] = useState(false);
  const [inPosition, setInPosition] = useState(false);
  const [mocked, setMocked] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      const current = new Date();
      setOnTime(current >= timeStart && current < timeEnd);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  function checkPosition(position: [number, number]) {
    setInPosition(checklocation(position, JSON.parse(registration?.location!)));
  }

  useEffect(() => {
    let watcher = null as number | null;

    Geolocation.watchPosition(
      position => {
        checkPosition([position.coords.latitude, position.coords.longitude]);
        setMocked(position.mocked != undefined && position.mocked);
      },
      error => console.log(error),
      {
        enableHighAccuracy: true,
        forceRequestLocation: true,
        distanceFilter: 10,
      },
    );

    return () => {
      if (watcher != null) Geolocation.clearWatch(watcher);
    };
  }, []);

  return (
    <View style={{justifyContent: 'center', padding: 20, flex: 1}}>
      <TouchableWithoutFeedback
        onPress={() => {
          Geolocation.getCurrentPosition(
            position => {
              checkPosition([
                position.coords.latitude,
                position.coords.longitude,
              ]);
              setMocked(position.mocked != undefined && position.mocked);
            },
            error => console.log(error),
            {
              enableHighAccuracy: true,
              forceRequestLocation: true,
              distanceFilter: 50,
            },
          );
        }}>
        <Text variant="headlineMedium">{registration.eventName}</Text>
      </TouchableWithoutFeedback>
      <Text variant="titleSmall">
        {format(timeStart, 'MM/dd hh:mma')}-{format(timeEnd, 'hh:mma')}
      </Text>
      <Button
        mode="contained"
        disabled={!onTime || !inPosition || mocked}
        onPress={clockIn}
        style={{height: 80, justifyContent: 'center', marginTop: 32}}>
        CLOCK IN
      </Button>
      <HelperText visible={!onTime || !inPosition || mocked} type="info">
        {!onTime
          ? 'It is outside the clock in period'
          : !inPosition
          ? 'Outside event area'
          : !mocked
          ? 'Mocked GPS detected'
          : 'Uknowrn'}
      </HelperText>
      <Button
        mode="text"
        onPress={() => setConfirm(true)}
        style={{justifyContent: 'center', marginTop: 16}}>
        Skip event
      </Button>
      <Portal>
        <Dialog visible={confirm} onDismiss={() => setConfirm(false)}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              Are you sure you want to skip event?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setConfirm(false)}>No</Button>
            <Button
              onPress={() => {
                skip();
                setConfirm(false);
              }}>
              Yes
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}
