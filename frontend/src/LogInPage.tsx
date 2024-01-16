import React, {useState} from 'react';
import {TextInput, Button} from 'react-native-paper';
import {Text, View, StyleSheet, ScrollView, Image} from 'react-native';

export default function LogInPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log(
      'Login pressed with username:',
      username,
      'and password:',
      password,
    );

  };

  const handleSignUp = () => {
    console.log('Sign Up pressed');
  };

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
          label="Username"
          value={username}
          onChangeText={text => setUsername(text)}
          style={styles.textInput}
          mode="outlined"
        />
        <TextInput
          label="Password"
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.textInput}
          mode="outlined"
        />
        <Button
          style={styles.button}
          mode="contained"
          onPress={handleLogin}
          labelStyle={styles.buttonLabel}>
          Log In
        </Button>
        <Button
          style={styles.button}
          mode="outlined"
          onPress={handleSignUp}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
