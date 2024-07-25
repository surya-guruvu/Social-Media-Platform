import React from 'react';
import { StatusBar, View, Text, StyleSheet,ScrollView} from 'react-native';
import AppNavigator from './Navigation/AppNavigator';

const App = () => {
   return (
      <>
        <AppNavigator/>
         <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#000" translucent={true}/>
         {/* <ScrollView style={styles.container}>
            <View>
              <Text>Welcome to My SM Platform</Text>
            </View>
         </ScrollView> */}
      </>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: StatusBar.currentHeight || 0, // Ensure the text is below the status bar
   },
   text: {
      fontSize: 20,
      color: '#000',
   },
});

export default App;

