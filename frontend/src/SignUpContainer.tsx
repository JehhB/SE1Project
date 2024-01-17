import React from 'react';
import SignUpPage from './SignUpPage';

export default function SignUpContainer({navigation}: any) {
  return (
    <SignUpPage
      gotoLoginPage={() => navigation.navigate('login')}
      singupUser={(name, email, password) => {
        console.log({name, email, password});
        navigation.navigate('index');
      }}
    />
  );
}
