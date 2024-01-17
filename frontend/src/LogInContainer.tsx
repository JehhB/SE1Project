import React from 'react';
import LogInPage from './LogInPage';

export default function LogInContainer({navigation}: any) {
  return (
    <LogInPage
      gotoSigninPage={() => navigation.navigate('signup')}
      loginUser={(email, password) => {
        console.log({email, password});
        navigation.navigate('index');
      }}
    />
  );
}
