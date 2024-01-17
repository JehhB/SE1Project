import React, {useEffect} from 'react';
import EventLogInToCreate from './EventLogInToCreate';
import {useDispatch, useSelector} from 'react-redux';
import {selectToken} from './slice/sessionSlice';
import {decodeJWT} from './lib/jwt';
import EventScreen from './EventScreen';
import {selectEvents, setEventCache} from './slice/eventsCacheSlice';
import axios from 'axios';

export default function EventContainer({navigation}: any) {
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  const auth = token == null ? null : decodeJWT(token);
  const isAuth = auth != null && auth.userId != null;

  const eventsCache = useSelector(selectEvents);
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  } as any;
  if (token !== null) headers['Authorization'] = `Bearer ${token}`;

  function refetchEvents() {
    if (!isAuth) return;
    axios
      .get('/api/event.php', {headers})
      .then(response => {
        console.log(response.data);
        const events = response.data.map(({eventId, name}: any) => ({
          eventId,
          eventName: name,
        }));
        dispatch(setEventCache(events));
      })
      .catch(error => console.log(error));
  }

  useEffect(() => {
    refetchEvents();
  }, []);

  return isAuth ? (
    <EventScreen
      refetchEvent={refetchEvents}
      events={eventsCache}
      createEvent={() => navigation.navigate('eventCreate')}
    />
  ) : (
    <EventLogInToCreate
      gotoLoginPage={() => navigation.navigate('login')}
      gotoSigninPage={() => navigation.navigate('signup')}
    />
  );
}
