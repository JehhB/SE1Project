import React from 'react';
import {PaperProvider, BottomNavigation} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import EventLogInToCreate from './src/EventLogInToCreate';
import HomeScreen from './src/HomeScreen';
import LogInPage from './src/LogInPage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SignUpPage from './src/SignUpPage';
import HomeNoEvent from './src/HomeNoEvent';
import ProfileScreen from './src/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const IndexScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused, color}) => (
            <Icon
              name={focused ? 'home' : 'home-outline'}
              size={26}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="events"
        component={EventLogInToCreate}
        options={{
          tabBarLabel: 'Events',
          tabBarIcon: ({focused, color}) => (
            <Icon
              name={focused ? 'calendar' : 'calendar-outline'}
              size={26}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({focused, color}) => (
            <Icon
              name={focused ? 'account' : 'account-outline'}
              size={26}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

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

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="index" component={IndexScreen} />
          <Stack.Screen name="login" component={LogInPage} />
          <Stack.Screen name="signup" component={SignUpPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
