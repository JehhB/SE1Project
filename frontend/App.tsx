import React from 'react';
import type {PropsWithChildren} from 'react';
import {PaperProvider, BottomNavigation} from 'react-native-paper';
import EventLogInToCreate from './src/EventLogInToCreate';
import HomeScreen from './src/HomeScreen';
import LogInPage from './src/LogInPage';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): React.JSX.Element {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'home',
      title: 'Home',
      focusedIcon: 'home',
      unfocusedIcon: 'home-outline',
    },
    {
      key: 'event',
      title: 'Event',
      focusedIcon: 'calendar',
      unfocusedIcon: 'calendar-outline',
    },
    {
      key: 'profile',
      title: 'Profile',
      focusedIcon: 'account',
      unfocusedIcon: 'account-outline',
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    event: EventLogInToCreate,
    profile: LogInPage,
  });

  return (
    <PaperProvider>
      <BottomNavigation
        navigationState={{index, routes}}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </PaperProvider>
  );
}

export default App;
