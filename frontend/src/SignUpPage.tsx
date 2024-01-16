import React, {useState} from 'react';
import {TextInput, Button} from 'react-native-paper';
import {Text, View, StyleSheet, ScrollView, Image} from 'react-native';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    console.log(
      'Sign Up pressed with Name:',
      name,
      'Email:',
      email,
      'Password:',
      password,
    );
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
        <Text style={styles.title}>Signing up!</Text>
        <TextInput
          label="Username"
          value={name}
          onChangeText={text => setName(text)}
          style={styles.textInput}
          mode="outlined"
        />
        <TextInput
          label="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          keyboardType="email-address"
          style={styles.textInput}
          mode="outlined"
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry
          style={styles.textInput}
          mode="outlined"
        />
        <Button
          style={styles.button}
          mode="contained"
          onPress={handleSignUp}
          labelStyle={styles.buttonLabel}>
          Sign Up
        </Button>
        <View style={styles.inputContainer2}>
          <Button mode="text" onPress={() => console.log('Pressed')}
          labelStyle={styles.buttonLabel2}>
            Already have an account?
          </Button>
        </View>
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
    padding: 15,
    alignItems: 'center',
  },
  textInput: {
    fontSize: 20,
    width: '100%',
    marginBottom: 5,
    borderRadius: 8,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  button: {
    marginTop: 10,
    width: '100%',
    height: 45,
    borderRadius: 5,
  },
  buttonLabel: {
    fontSize: 18,
    textAlign: 'center',
  },
  buttonLabel2: {
    fontSize: 17,
    textAlign: 'center',
  },
  inputContainer2: {
    alignItems: 'center',
    marginTop: 10,
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
