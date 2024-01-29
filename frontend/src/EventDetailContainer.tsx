import React, {useEffect, useState} from 'react';
import EventDetailScreen from './EventDetailScreen';
import axiosClient from './lib/axiosClient';

export default function EventDetailContainer({route, navigation}: any) {
  const {eventId} = route.params;

  const [eventName, setEventName] = useState('');
  const [timeStart, setTimeStart] = useState(new Date());
  const [timeEnd, setTimeEnd] = useState(new Date());
  const [attendance, setAttendance] = useState([] as any);

  useEffect(() => {
    axiosClient
      .get(`/api/getEventInfo.php?eventId=${eventId}`)
      .then(response => {
        console.log(response.data);
        setEventName(response.data.eventName);
        setTimeEnd(new Date(response.data.timeEnd));
        setTimeStart(new Date(response.data.timeStart));
      })
      .catch(error => {
        console.log(error);
        navigation.navigate('events');
      });

    axiosClient
      .get(`/api/getAttendance.php?eventId=${eventId}`)
      .then(response => {
        setAttendance(response.data);
      })
      .catch(error => {
        console.log(error);
        navigation.navigate('events');
      });
  }, [eventId]);

  return (
    <EventDetailScreen
      attendances={attendance}
      eventName={eventName}
      timeStart={timeStart}
      timeEnd={timeEnd}
    />
  );
}
