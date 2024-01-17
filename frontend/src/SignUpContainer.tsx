import React, {useState} from 'react';
import SignUpPage from './SignUpPage';
import {useDispatch, useSelector} from 'react-redux';
import {changeToken, selectToken} from './slice/sessionSlice';
import axios from 'axios';

export default function SignUpContainer({navigation}: any) {
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  function handleSignup(username: string, email: string, password: string) {
    if (password.length < 8) {
      setErrorVisible(true);
      setErrorMessage('Password too short');
      return;
    }

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    } as any;
    if (token !== null) headers['Authorization'] = `Bearer ${token}`;

    axios
      .post(
        '/api/user.php',
        {
          action: 'signin',
          username,
          email,
          password,
        },
        {
          headers,
        },
      )
      .then(response => {
        dispatch(changeToken(response.data.token));
        navigation.navigate('index');
      })
      .catch(error => {
        setErrorVisible(true);
        setErrorMessage('error encountered');
      });
  }

  return (
    <SignUpPage
      gotoLoginPage={() => navigation.navigate('login')}
      singupUser={handleSignup}
      errorVisible={errorVisible}
      closeError={() => setErrorVisible(false)}
      errorMessage={errorMessage}
    />
  );
}
