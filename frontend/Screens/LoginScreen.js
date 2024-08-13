import axios from "axios"
import React, { useState } from "react"
import { Text, View, TextInput,Button,StyleSheet } from "react-native"
import { authorize } from "react-native-app-auth"

const LoginScreen = ({navigation})=>{

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  
  const handleSubmit = () => {
    axios.post(
      "http://192.168.1.8:8080/login",
      {
        "username":username,
        "password":password
      },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
    .then((response) => {
      console.log("response");
      console.log(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const config = {
    clientId: '266457616490-5764bd465sse2e98uk9p34i27hiqct19.apps.googleusercontent.com',
    redirectUrl: 'https://auth.expo.io/ayrus2000/social-media-frontend', // e.g., myapp://callback
    scopes: ['openid', 'profile', 'email'],
    serviceConfiguration: {
      authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
      tokenEndpoint: 'https://oauth2.googleapis.com/token',
      revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
    },
  };

  const signIn = async () => {
    try {
      // Initiates OAuth2 flow, redirects user to Google for login
      console.log(authorize);
      console.log(config);
      const result = await authorize(config);
      console.log('Result of oAuth:', result);
    } catch (error) {
      // console.log(result);
      console.error('Login failed', error);
    }
  };

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput
            style={styles.input}
            placeholder="username"
            textContentType="username"
            autoComplete="username"
            onChangeText={(text)=>{setUsername(text)}}
        />
        <TextInput
            style={styles.input}
            placeholder="Password"
            textContentType="password"
            autoComplete="password"
            onChangeText={(text)=>{setPassword(text)}}
            secureTextEntry
        />

        <Button title="Login" onPress={handleSubmit}/>

        <Button title="Sign In with Google" onPress={signIn} />
    </View>
  )
}
export default LoginScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding:16
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  }
});

  