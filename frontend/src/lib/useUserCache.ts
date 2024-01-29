import axiosClient from './axiosClient';
import {
  changeUserId,
  changeUserName,
  selectUserId,
} from '../slice/userCacheSlice';
import {useEffect} from 'react';
import {decodeJWT} from './jwt';
import {useDispatch, useSelector} from 'react-redux';
import {selectToken} from '../slice/sessionSlice';

export default function useUserCache() {
  const token = useSelector(selectToken);
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();

  const auth = token === null ? null : decodeJWT(token);
  if (auth === null || auth.userId === null) {
    dispatch(changeUserId(null));
    dispatch(changeUserName(null));
  }

  useEffect(() => {
    if (auth == null || auth.userId == null || userId === auth.userId) return;
    const interval = setInterval(() => {
      axiosClient
        .get(`/api/user.php?userId=${auth.userId}`)
        .then(response => {
          console.log(response.data);
          dispatch(changeUserId(response.data.userId));
          dispatch(changeUserName(response.data.name));
          clearInterval(interval);
        })
        .catch(error => {
          console.log(error);
        });
    }, 2500);

    return () => clearInterval(interval);
  }, [userId, token]);
}
