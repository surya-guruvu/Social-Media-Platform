import React from "react"
import { Text, View, TextInput,Button,StyleSheet } from "react-native"

const LoginScreen = ()=>{
    return (
        <View style={styles.container}>
            <Text style={styles.container}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="username"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
            />

            <Button title="Login" onPress={()=>{}}></Button>
        </View>
    )
}
export default LoginScreen;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 16,
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
    },
  });

  