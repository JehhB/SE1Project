import React, {useState} from 'react';
import {TextInput, Button} from 'react-native-paper';
import {Text, View, StyleSheet, ScrollView, Image} from 'react-native';

export interface EventLogInToCreateProps {
  gotoLoginPage: () => void;
  gotoSigninPage: () => void;
}

export default function EventLogInToCreate({
  gotoLoginPage,
  gotoSigninPage,
}: EventLogInToCreateProps) {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Text style={styles.overviewLabel}>Log in to Create Event</Text>
        </View>
        <Button
          style={styles.button}
          mode="contained"
          onPress={gotoLoginPage}
          labelStyle={styles.buttonLabel}>
          Log In
        </Button>
        <Button
          style={styles.button}
          mode="outlined"
          onPress={gotoSigninPage}
          labelStyle={styles.buttonLabel}>
          Sign Up
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  textInput: {
    fontSize: 20,
    width: '100%',
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    width: '100%',
    borderRadius: 8,
  },
  buttonLabel: {
    fontSize: 18,
  },
  overview: {
    marginTop: 20,
    alignItems: 'center',
  },
  overviewLabel: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  overviewText: {
    fontSize: 23,
    marginTop: 5,
  },
});
