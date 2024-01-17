import React from 'react';
import EventCreateScreen from './EventCreateScreen';
import {useSelector} from 'react-redux';
import {selectToken} from './slice/sessionSlice';
import axios from 'axios';
import {format} from 'date-fns';

export default function EventCreateContainer() {
  const token = useSelector(selectToken);
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

    axios
      .post('/api/event.php', eventData, {headers})
      .then(respone => {
        console.log(respone.data);
        axios
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
          })
          .catch(error => console.log({rollcall: 'rollcall', error}));
      })
      .catch(error => console.log({event: 'event', error}));
  }

  return <EventCreateScreen createEvent={createEvent} />;
}
