import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Text} from 'react-native-paper';

export type ProfileScreenProp = {
  name?: string | null;
  logout: () => void;
  login: () => void;
};

const ProfileScreen = ({name, logout, login}: ProfileScreenProp) => {
  return (
    <View style={styles.container}>
      {name != null ? (
        <>
          <Text variant="headlineMedium">Hi {name}!</Text>
          <Button onPress={logout}>Logout</Button>
        </>
      ) : (
        <View style={styles.row}>
          <Text variant="headlineMedium">Hello!</Text>
          <Button mode="contained" onPress={login}>
            Log In
          </Button>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
  },
});

export default ProfileScreen;
