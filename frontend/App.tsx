import React from 'react';
import {PaperProvider} from 'react-native-paper';
import {persistor, store} from './src/store/store';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import AppActivity from './src/AppActivity';

function App(): React.JSX.Element {
  return (
    <PaperProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppActivity />
        </PersistGate>
      </Provider>
    </PaperProvider>
  );
}

export default App;
