import React, {useState} from 'react';
import LogInPage from './LogInPage';
import {useDispatch, useSelector} from 'react-redux';
import {changeToken, selectToken} from './slice/sessionSlice';
import axios from 'axios';

export default function LogInContainer({navigation}: any) {
  const [errorVisible, setErrorVisible] = useState(false);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  function handleLogin(email: string, password: string) {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    } as any;
    if (token !== null) headers['Authorization'] = `Bearer ${token}`;

    axios
      .post(
        '/api/user.php',
        {
          action: 'login',
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
        console.log(error);
        setErrorVisible(true);
      });
  }

  return (
    <LogInPage
      gotoSigninPage={() => navigation.navigate('signup')}
      loginUser={handleLogin}
      errorVisible={errorVisible}
      dismissError={() => setErrorVisible(false)}
    />
  );
}
