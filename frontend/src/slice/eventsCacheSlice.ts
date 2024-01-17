import {createSlice} from '@reduxjs/toolkit';

export type EventsCacheState = {
  events: {eventId: string; eventName: string}[];
};

export const eventsCacheSlice = createSlice({
  name: 'eventsCache',
  initialState: {
    events: [],
  } as EventsCacheState,
  reducers: {
    clearEventsCache: state => {
      state.events = [];
    },
    setEventCache: (state, action) => {
      state.events = action.payload;
    },
  },
});

export const {clearEventsCache, setEventCache} = eventsCacheSlice.actions;

export const selectEvents = (state: {eventsCache: EventsCacheState}) =>
  state.eventsCache.events;

export default eventsCacheSlice.reducer;
