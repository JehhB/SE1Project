import AsyncStorage from '@react-native-async-storage/async-storage';
import {Tuple, configureStore} from '@reduxjs/toolkit';
import sessionReducer from '../slice/sessionSlice';
import userCacheReducer from '../slice/userCacheSlice';
import eventsCacheReducer from '../slice/eventsCacheSlice';
import registrationCacheReducer from '../slice/registrationCacheSlice';
import {persistStore, persistReducer} from 'redux-persist';
import {thunk} from 'redux-thunk';

export const persistSessionReducer = persistReducer(
  {
    key: 'session',
    storage: AsyncStorage,
  },
  sessionReducer,
);

export const persistUserCacheReducer = persistReducer(
  {
    key: 'userCache',
    storage: AsyncStorage,
  },
  userCacheReducer,
);

export const persistEventsCacheReducer = persistReducer(
  {
    key: 'eventsCache',
    storage: AsyncStorage,
  },
  eventsCacheReducer,
);

export const persistRegistrationCacheReducer = persistReducer(
  {
    key: 'registrationCache',
    storage: AsyncStorage,
  },
  registrationCacheReducer,
);

export const store = configureStore({
  reducer: {
    session: persistSessionReducer,
    userCache: persistUserCacheReducer,
    eventsCache: persistEventsCacheReducer,
    registrationCache: persistRegistrationCacheReducer,
  },
  middleware: () => new Tuple(thunk),
});

export const persistor = persistStore(store);
