import React from 'react';
import EventLogInToCreate from './EventLogInToCreate';
import {useSelector} from 'react-redux';
import {selectToken} from './slice/sessionSlice';
import {decodeJWT} from './lib/jwt';
import EventScreen from './EventScreen';

export default function EventContainer({navigation}: any) {
  const token = useSelector(selectToken);

  const auth = token == null ? null : decodeJWT(token);
  const isAuth = auth != null && auth.userId != null;

  return isAuth ? (
    <EventScreen
      events={[]}
      createEvent={() => navigation.navigate('eventCreate')}
    />
  ) : (
    <EventLogInToCreate
      gotoLoginPage={() => navigation.navigate('login')}
      gotoSigninPage={() => navigation.navigate('signup')}
    />
  );
}
