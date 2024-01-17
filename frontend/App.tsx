import React from 'react';
import {PaperProvider, BottomNavigation} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './src/HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfileScreen from './src/ProfileScreen';
import EventContainer from './src/EventContainer';
import SignUpContainer from './src/SignUpContainer';
import LogInContainer from './src/LogInContainer';
import {persistor, store} from './src/store/store';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import HomeContainer from './src/HomeContainer';

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const IndexScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="home"
        component={HomeContainer}
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
        component={EventContainer}
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
  return (
    <PaperProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name="index" component={IndexScreen} />
              <Stack.Screen name="login" component={LogInContainer} />
              <Stack.Screen name="signup" component={SignUpContainer} />
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </PaperProvider>
  );
}

export default App;
