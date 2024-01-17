import AsyncStorage from '@react-native-async-storage/async-storage';
import {Tuple, configureStore} from '@reduxjs/toolkit';
import sessionReducer from '../slice/sessionSlice';
import {persistStore, persistReducer} from 'redux-persist';
import {thunk} from 'redux-thunk';

export const persistSessionReducer = persistReducer(
  {
    key: 'session',
    storage: AsyncStorage,
  },
  sessionReducer,
);

export const store = configureStore({
  reducer: {
    session: persistSessionReducer,
  },
  middleware: () => new Tuple(thunk),
});

export const persistor = persistStore(store);
