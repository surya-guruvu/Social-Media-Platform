import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const HomeScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Welcome to my SM Platform</Text>
    <Button title='Login'
      onPress={()=>navigation.navigate('Login')}
    />
    <Text>p</Text>
    <Button title='Register'
      onPress={()=>navigation.navigate('Register')}
    />
  </View>

);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default HomeScreen;
