import React, {useState} from 'react';
import EventCreateScreen from './EventCreateScreen';
import {useDispatch, useSelector} from 'react-redux';
import {selectToken} from './slice/sessionSlice';
import {format} from 'date-fns';
import {clearEventsCache} from './slice/eventsCacheSlice';
import axiosClient from './lib/axiosClient';

export default function EventCreateContainer({navigation}: any) {
  const [errorVisible, setErrorVisibility] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  } as any;
  if (token !== null) headers['Authorization'] = `Bearer ${token}`;

  function createEvent(
    eventName: string,
    isStrict: boolean,
    timeStart: Date,
    timeEnd: Date,
    location: [lng: number, lat: number][],
  ) {
    const eventData = {
      eventName,
    } as any;
    if (isStrict) eventData['isStrict'] = '';

    axiosClient
      .post('/api/event.php', eventData, {headers})
      .then(respone => {
        console.log(respone.data);
        dispatch(clearEventsCache());

        axiosClient
          .post(
            '/api/rollcall.php',
            {
              eventId: respone.data.eventId,
              location: JSON.stringify(location),
              timeStart: format(timeStart, 'yyyy-MM-dd HH:mm:ss'),
              timeEnd: format(timeEnd, 'yyyy-MM-dd HH:mm:ss'),
            },
            {headers},
          )
          .then(respone => {
            console.log(respone.data);
            navigation.navigate('events');
          })
          .catch(error => {
            setErrorMessage('Error while creating rollcall');
            setErrorVisibility(true);
          });
      })
      .catch(error => {
        setErrorMessage('Error while creating event');
        setErrorVisibility(true);
      });
  }

  return (
    <EventCreateScreen
      createEvent={createEvent}
      errorVisible={errorVisible}
      errorMessage={errorMessage}
      dimissError={() => setErrorVisibility(false)}
    />
  );
}
