import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Text} from 'react-native-paper';

export type ProfileScreenProp = {
  name?: string | null;
  logout: () => void;
};

const ProfileScreen = ({name, logout}: ProfileScreenProp) => {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">
        {name !== null && name !== undefined ? `Hi ${name}!` : 'Hello!'}
      </Text>
      {name !== null && name !== undefined && (
        <Button onPress={logout}>Logout</Button>
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
});

export default ProfileScreen;
