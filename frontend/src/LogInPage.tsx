import React, {useState} from 'react';
import {TextInput, Button, useTheme} from 'react-native-paper';
import {Text, View, StyleSheet, ScrollView, Image} from 'react-native';

export type LogInPageProp = {
  gotoSigninPage: () => void;
  loginUser: (email: string, password: string) => void;
};

export default function LogInPage({gotoSigninPage, loginUser}: LogInPageProp) {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const styles = StyleSheet.create({
    scrollViewContent: {
      flexGrow: 1,
      justifyContent: 'center',
      backgroundColor: theme.colors.background,
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
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
  });

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={{uri: 'https://picsum.photos/700'}}
            style={styles.logo}
          />
        </View>
        <Text style={styles.title}>Log In Now!</Text>
        <TextInput
          label="Email"
          value={email}
          keyboardType="email-address"
          onChangeText={setEmail}
          style={styles.textInput}
          mode="outlined"
        />
        <TextInput
          label="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.textInput}
          mode="outlined"
        />
        <Button
          style={styles.button}
          mode="contained"
          onPress={() => loginUser(email, password)}
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
