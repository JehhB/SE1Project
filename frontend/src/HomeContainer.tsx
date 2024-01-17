import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {changeSession, selectSession} from './slice/sessionSlice';
import HomeScreen from './HomeScreen';

export default function HomeContainer() {
  const sessionId = useSelector(selectSession);
  const dispatch = useDispatch();

  useEffect(() => {
    if (sessionId === null) console.log(sessionId);
    dispatch(changeSession('asdfasd'));
  }, []);

  return <HomeScreen />;
}
