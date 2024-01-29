import React, {useEffect, useState} from 'react';
import HomeScreen from './HomeScreen';
import {decodeJWT} from './lib/jwt';
import {useDispatch, useSelector} from 'react-redux';
import {selectToken} from './slice/sessionSlice';
import {selectName} from './slice/userCacheSlice';
import axiosClient from './lib/axiosClient';
import {
  clearRegistrationCache,
  selectRegistration,
  setRegistrationCache,
} from './slice/registrationCacheSlice';
import AttendanceScreen from './AttendanceScreen';

export default function HomeContainer({navigation}: any) {
  const token = useSelector(selectToken);
  const username = useSelector(selectName);
  const registration = useSelector(selectRegistration);

  const dispatch = useDispatch();
  const [errorVisibility, setErrorVisibility] = useState(false);

  const auth = token == null ? null : decodeJWT(token);
  const isAuth = auth != null && auth.userId != null;

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  } as any;
  if (token !== null) headers['Authorization'] = `Bearer ${token}`;

  const clockIn = () => {
    if (registration) {
      const {registeredEventId, rollcallId} = registration;

      axiosClient
        .post('/api/attendance.php', {registeredEventId, rollcallId}, {headers})
        .then(response => {
          setErrorVisibility(false);
          dispatch(clearRegistrationCache());
        })
        .catch(error => {
          console.log('Clock in failed:', error);
        });
    }
  };

  function joinEvent(eventId: string, name: string) {
    axiosClient
      .post(
        '/api/registeredEvent.php',
        {eventId, registeredName: name},
        {headers},
      )
      .then(response => {
        axiosClient
          .get(
            `/api/registration.php?registeredEventId=${response.data.registeredEventId}`,
          )
          .then(response => {
            dispatch(setRegistrationCache(response.data.registration));
            console.log(response.data.registration);
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
        setErrorVisibility(true);
      });
  }

  return registration == null ? (
    <HomeScreen
      errorVisibility={errorVisibility}
      name={username ?? null}
      joinEvent={joinEvent}
      gotoEventCreation={() =>
        navigation.navigate(isAuth ? 'eventCreate' : 'events')
      }
      dismissError={() => setErrorVisibility(false)}
    />
  ) : (
    <AttendanceScreen
      hint="true"
      error={true}
      clockIn={clockIn}
      skip={() => dispatch(clearRegistrationCache())}
    />
  );
}
