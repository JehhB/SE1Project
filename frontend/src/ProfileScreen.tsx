import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';


//Wala tong navigation, dipa ako naka install haha
const ProfileScreen = () => {
  const [user, setUser] = useState({
    name: 'Eco lang malakas',
    email: 'Goecoo@gmail.com',
    course: 'BSIT?',
  });
  useEffect(() => {
  }, []);

  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://picsum.photos/700' }} style={styles.avatar} />
      <Text style={styles.text}>Name: {user.name}</Text>
      <Text style={styles.text}>Email: {user.email}</Text>
      <Text style={styles.text}>Course: {user.course}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default ProfileScreen;
