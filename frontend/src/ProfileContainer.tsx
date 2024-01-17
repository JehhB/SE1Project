import React from 'react';
import ProfileScreen from './ProfileScreen';
import {useDispatch, useSelector} from 'react-redux';
import {changeToken} from './slice/sessionSlice';
import {changeUserId, changeUserName, selectName} from './slice/userCacheSlice';
import axios from 'axios';

export default function ProfileContainer({navigation}: any) {
  const name = useSelector(selectName);
  const dispatch = useDispatch();

  function logout() {
    axios
      .get('/api/session.php?logout=')
      .then(response => {
        console.log(response.data);

        dispatch(changeToken(response.data.token));
        dispatch(changeUserId(null));
        dispatch(changeUserName(null));
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <ProfileScreen
      name={name}
      logout={logout}
      login={() => navigation.navigate('login')}
    />
  );
}
