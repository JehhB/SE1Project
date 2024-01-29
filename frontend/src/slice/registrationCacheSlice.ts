import {createSlice} from '@reduxjs/toolkit';

export type RegistrationCacheState = {
  registration: {
    registeredEventId: string;
    eventId: string;
    eventName: string;
    rollcallId: string;
    timeStart: string;
    timeEnd: string;
    location: string;
  } | null;
};

export const registrationCacheSlice = createSlice({
  name: 'registrationCache',
  initialState: {
    registration: null,
  } as RegistrationCacheState,
  reducers: {
    clearRegistrationCache: state => {
      state.registration = null;
    },
    setRegistrationCache: (state, action) => {
      state.registration = action.payload;
    },
  },
});

export const {clearRegistrationCache, setRegistrationCache} =
  registrationCacheSlice.actions;

export const selectRegistration = (state: {
  registrationCache: RegistrationCacheState;
}) => state.registrationCache.registration;

export default registrationCacheSlice.reducer;
