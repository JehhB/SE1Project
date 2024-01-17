import {createSlice} from '@reduxjs/toolkit';

export type UserCacheState = {
  name: string | null;
  userId: string | null;
};

export const userCacheSlice = createSlice({
  name: 'userCache',
  initialState: {
    name: null,
    userId: null,
  } as UserCacheState,
  reducers: {
    changeUserId: (state, action) => {
      state.userId = action.payload;
    },
    changeUserName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const {changeUserId, changeUserName} = userCacheSlice.actions;

export const selectUserId = (state: {userCache: UserCacheState}) =>
  state.userCache.userId;
export const selectName = (state: {userCache: UserCacheState}) =>
  state.userCache.name;

export default userCacheSlice.reducer;
