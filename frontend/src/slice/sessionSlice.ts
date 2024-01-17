import {createSlice} from '@reduxjs/toolkit';

export type SessionState = {
  sessionId: string | null;
  userId: string | null;
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    sessionId: null,
    userId: null,
  } as SessionState,
  reducers: {
    changeSession: (state, action) => {
      state.sessionId = action.payload;
    },
  },
});

export const {changeSession} = sessionSlice.actions;

export const selectSession = (state: {session: SessionState}) =>
  state.session.sessionId;

export default sessionSlice.reducer;
