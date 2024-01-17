import {createSlice} from '@reduxjs/toolkit';

export type SessionState = {
  token: string | null;
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    token: null,
  } as SessionState,
  reducers: {
    changeToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const {changeToken} = sessionSlice.actions;

export const selectToken = (state: {session: SessionState}) =>
  state.session.token;

export default sessionSlice.reducer;
