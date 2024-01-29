import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeContainer from './HomeContainer';
import SignUpContainer from './SignUpContainer';
import LogInContainer from './LogInContainer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import ProfileContainer from './ProfileContainer';
import EventContainer from './EventContainer';
import {useSession} from './lib/useSession';
import useUserCache from './lib/useUserCache';
import EventCreateContainer from './EventCreateContainer';
import {PermissionsAndroid} from 'react-native';
import EventDetailContainer from './EventDetailContainer';

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
        component={ProfileContainer}
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

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    console.log('granted', granted);
    if (granted === 'granted') {
      console.log('You can use Geolocation');
      return true;
    } else {
      console.log('You cannot use Geolocation');
      return false;
    }
  } catch (err) {
    return false;
  }
};

export default function AppActivity() {
  useSession();
  useUserCache();

  useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="index" component={IndexScreen} />
        <Stack.Screen name="login" component={LogInContainer} />
        <Stack.Screen name="signup" component={SignUpContainer} />
        <Stack.Screen name="eventCreate" component={EventCreateContainer} />
        <Stack.Screen name="eventDetail" component={EventDetailContainer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
