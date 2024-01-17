import React, {useEffect} from 'react';
import ProfileScreen from './ProfileScreen';
import {useDispatch, useSelector} from 'react-redux';
import {changeToken, selectToken} from './slice/sessionSlice';
import {decodeJWT} from './lib/jwt';
import {Text} from 'react-native-paper';
import {
  changeUserId,
  changeUserName,
  selectName,
  selectUserId,
} from './slice/userCacheSlice';
import axios from 'axios';

export default function ProfileContainer() {
  const token = useSelector(selectToken);
  const userId = useSelector(selectUserId);
  const name = useSelector(selectName);
  const dispatch = useDispatch();

  const auth = token === null ? null : decodeJWT(token);
  if (auth === null || auth.userId === null) {
    dispatch(changeUserId(null));
    dispatch(changeUserName(null));
  }

  useEffect(() => {
    if (auth === null || auth.userId === null || userId === auth.userId) return;
    const interval = setInterval(() => {
      axios
        .get(`/api/user.php?userId=${auth.userId}`)
        .then(response => {
          dispatch(changeUserId(response.data.userId));
          dispatch(changeUserName(response.data.name));
          clearInterval(interval);
        })
        .catch(error => {});
    }, 2500);

    return () => clearInterval(interval);
  }, [userId, token]);

  function logout() {
    dispatch(changeToken(null));
    dispatch(changeUserId(null));
    dispatch(changeUserName(null));
  }

  return <ProfileScreen name={name} logout={logout} />;
}
