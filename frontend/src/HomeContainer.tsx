import React, {useState} from 'react';
import HomeScreen from './HomeScreen';
import {decodeJWT} from './lib/jwt';
import {useSelector} from 'react-redux';
import {selectToken} from './slice/sessionSlice';
import {selectName} from './slice/userCacheSlice';
import axios from 'axios';

export default function HomeContainer({navigation}: any) {
  const token = useSelector(selectToken);
  const username = useSelector(selectName);
  const [errorVisibility, setErrorVisibility] = useState(false);

  const auth = token == null ? null : decodeJWT(token);
  const isAuth = auth != null && auth.userId != null;

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  } as any;
  if (token !== null) headers['Authorization'] = `Bearer ${token}`;

  function joinEvent(eventId: string, name: string) {
    axios
      .post(
        '/api/registeredEvent.php',
        {eventId, registeredName: name},
        headers,
      )
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        setErrorVisibility(true);
      });
  }

  return (
    <HomeScreen
      errorVisibility={errorVisibility}
      name={username ?? null}
      joinEvent={joinEvent}
      gotoEventCreation={() =>
        navigation.navigate(isAuth ? 'eventCreate' : 'events')
      }
      dismissError={() => setErrorVisibility(false)}
    />
  );
}
