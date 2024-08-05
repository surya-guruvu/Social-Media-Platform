import axios from "axios"
import React, { useState } from "react"
import { Text, View, TextInput,Button,StyleSheet } from "react-native"

const RegisterScreen = ({navigation})=>{

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  
  const handleSubmit = () => {
    axios.post(
      "http://192.168.1.8:8080/register",
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

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
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

        <Button title="Register" onPress={handleSubmit}/>
    </View>
  )
}
export default RegisterScreen;


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

  