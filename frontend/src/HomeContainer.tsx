import React from 'react';
import HomeScreen from './HomeScreen';
import {decodeJWT} from './lib/jwt';
import {useSelector} from 'react-redux';
import {selectToken} from './slice/sessionSlice';

export default function HomeContainer({navigation}: any) {
  const token = useSelector(selectToken);

  const auth = token == null ? null : decodeJWT(token);
  const isAuth = auth != null && auth.userId != null;

  return (
    <HomeScreen
      joinEvent={() => {}}
      gotoEventCreation={() =>
        navigation.navigate(isAuth ? 'eventCreate' : 'events')
      }
    />
  );
}
