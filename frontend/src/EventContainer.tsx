import React from 'react';
import EventLogInToCreate from './EventLogInToCreate';

export default function EventContainer({navigation}: any) {
  return (
    <EventLogInToCreate
      gotoLoginPage={() => navigation.navigate('login')}
      gotoSigninPage={() => navigation.navigate('signup')}
    />
  );
}
